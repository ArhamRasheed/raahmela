import { spawn } from 'node:child_process'

const args = process.argv.slice(2).filter(arg => arg !== '--strictPort')
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', ...args.map(arg => arg === '--host' ? '--hostname' : arg)], { stdio: 'inherit' })
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.kill(signal))
server.on('exit', code => { process.exitCode = code ?? 1 })
