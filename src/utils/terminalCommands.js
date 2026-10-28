const links = {
  github: 'https://github.com/maliya2002',
  linkedin: 'https://www.linkedin.com/in/malith-madushan-a3a6b0263',
  website: 'https://malithmadushan.site',
  lms: 'https://sliit-lms.vercel.app/',
  buddhist: 'https://boraluketiya-buddhist-center.vercel.app/',
};
const sections = ['home', 'about', 'skills', 'work', 'contact'];
export const commandNames = ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'social', 'whoami', 'clear', 'cls', 'ls', 'dir', 'cat', 'pwd', 'date', 'echo', 'history', 'open', 'goto'];

export function runCommand(input, { info = {}, history = [], now = new Date() } = {}) {
  const [raw = '', ...args] = input.trim().split(/\s+/);
  const command = raw.toLowerCase();
  const argument = args.join(' ');
  if (command === 'clear' || command === 'cls') return { clear: true };
  if (command === 'resume') return { text: 'Downloading Malith_Madushan_CV.pdf', download: true };
  if (command === 'date') return { text: now.toLocaleString() };
  if (command === 'echo') return { text: argument };
  if (command === 'pwd') return { text: '/portfolio (virtual, read-only)' };
  if (command === 'ls' || command === 'dir') return { text: 'about.txt  skills.txt  projects.txt  contact.txt\nMalith_Madushan_CV.pdf' };
  if (command === 'history') return { text: history.map((entry, i) => `${i + 1}  ${entry}`).join('\n') };
  if (command === 'cat') {
    const file = argument.toLowerCase();
    if (!['about.txt', 'skills.txt', 'projects.txt', 'contact.txt'].includes(file)) return { error: true, text: 'File not found. Run ls to see available files.' };
    return { text: info[file.replace('.txt', '')] };
  }
  if (command === 'open') {
    const name = argument.toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(links, name)) return { error: true, text: `Usage: open ${Object.keys(links).join(' | ')}` };
    return { text: `Opening ${links[name]}`, url: links[name] };
  }
  if (command === 'goto') {
    const section = argument.toLowerCase();
    return sections.includes(section) ? { text: `Navigating to ${section}`, section } : { error: true, text: `Usage: goto ${sections.join(' | ')}` };
  }
  if (Object.prototype.hasOwnProperty.call(info, command)) return { text: info[command] };
  return { error: true, text: `Unknown command: ${raw}. Type help. This terminal supports portfolio commands, not operating-system commands.` };
}
