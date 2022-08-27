export const reporter = {
  info: (msg: string) => console.log(`\x1b[36minfo \x1b[30m${msg}`),
  warn: (msg: string) => console.log(`\x1b[33mwarn \x1b[30m${msg}`),
  fail: (msg: string) => console.log(`\x1b[31mfail \x1b[30m${msg}`),
  done: (msg: string) => console.log(`\x1b[32mdone \x1b[30m${msg}`),
  blue: (msg: string) => `\x1b[36m${msg}\x1b[30m`,
  yellow: (msg: string) => `\x1b[33m${msg}\x1b[30m`,
  red: (msg: string) => `\x1b[31m${msg}\x1b[30m`,
  green: (msg: string) => `\x1b[32m${msg}\x1b[30m`,
}
