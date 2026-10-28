import emailjs from '@emailjs/browser';

export const contactEmail = 'malithmadushan25@gmail.com';

export function sendContactMessage(form) {
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();
  if (!name || !email || !message) return Promise.reject(new Error('Please complete all fields.'));
  return emailjs.send(
    process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_b9cuwb4',
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_r6ikwxt',
    {
      name, email, message,
      from_name: name, from_email: email, reply_to: email,
      to_name: 'Malith Madushan', to_email: contactEmail,
      subject: `Portfolio message from ${name}`,
    },
    { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'HvWSoaNi9OrKZSEW_' },
  );
}

export function contactErrorMessage(error) {
  const status = Number(error?.status);
  if (status === 429) return 'The email service is busy or has reached its sending limit. Please use your email app below.';
  if ([400, 401, 403, 404, 412].includes(status)) return `The email service could not accept this message (code ${status}). Please use your email app below.`;
  return 'Your message could not be confirmed. Check your connection or use your email app below.';
}

export function contactMailto(form) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(`Portfolio message from ${form.name.trim() || 'a visitor'}`)}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nReply to: ${form.email}`)}`;
}
