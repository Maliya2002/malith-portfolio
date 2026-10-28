import { runCommand } from './terminalCommands';

test('preserves echo case and prints command history', () => {
  expect(runCommand('echo Hello World').text).toBe('Hello World');
  expect(runCommand('history', { history: ['ls', 'date'] }).text).toBe('1  ls\n2  date');
});
test('only opens named links and rejects prototype properties', () => {
  expect(runCommand('open github').url).toBe('https://github.com/maliya2002');
  for (const input of ['open javascript:alert(1)', 'open constructor', 'constructor', 'cat ../../secret']) {
    expect(runCommand(input).error).toBe(true);
  }
});
test('reads virtual files and returns actions', () => {
  expect(runCommand('cat about.txt', { info: { about: 'Malith' } }).text).toBe('Malith');
  expect(runCommand('goto work').section).toBe('work');
  expect(runCommand('goto missing').error).toBe(true);
  expect(runCommand('resume').download).toBe(true);
  expect(runCommand('cls').clear).toBe(true);
});
