import emailjs from '@emailjs/browser';
import { sendContactMessage, contactErrorMessage, contactMailto } from './contactDelivery';
jest.mock('@emailjs/browser', () => ({ send: jest.fn() }));
beforeEach(() => jest.clearAllMocks());
test('sends trimmed values and reply-to fields expected by email templates', async () => {
  emailjs.send.mockResolvedValue({status:200});
  await sendContactMessage({name:' Visitor ',email:' visitor@example.com ',message:' Hello '});
  expect(emailjs.send).toHaveBeenCalledWith(expect.any(String),expect.any(String),expect.objectContaining({name:'Visitor',from_name:'Visitor',email:'visitor@example.com',reply_to:'visitor@example.com',message:'Hello'}),expect.objectContaining({publicKey:expect.any(String)}));
});
test('does not send whitespace-only messages', async () => {
  await expect(sendContactMessage({name:'Visitor',email:'visitor@example.com',message:'  '})).rejects.toThrow();
  expect(emailjs.send).not.toHaveBeenCalled();
});
test('surfaces delivery rejection rather than reporting success', async () => {
  emailjs.send.mockRejectedValue({status:403,text:'Forbidden'});
  await expect(sendContactMessage({name:'Visitor',email:'visitor@example.com',message:'Hello'})).rejects.toEqual(expect.objectContaining({status:403}));
  expect(contactErrorMessage({status:403})).toContain('403');
  expect(contactErrorMessage({status:429})).toContain('limit');
});
test('email fallback preserves punctuation and message content', () => {
  const url=contactMailto({name:'A & B',email:'test@example.com',message:'Hello? One & two'});
  expect(url).toContain('mailto:malithmadushan25@gmail.com?');
  expect(decodeURIComponent(url)).toContain('Hello? One & two');
  expect(url).toContain('A%20%26%20B');
});
