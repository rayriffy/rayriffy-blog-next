import { NextApiHandler } from 'next'
import fs from 'fs'
import path from 'path'

const api: NextApiHandler = (req, res) => {
  return res.send({
    next: fs.readdirSync(path.join(process.cwd(), '.next')),
    src: fs.readdirSync(path.join(process.cwd(), 'src')),
    cache: fs.readdirSync(path.join(process.cwd(), '.next', 'cache')),
    static: fs.readdirSync(path.join(process.cwd(), '.next', 'static')),
  })
}

export default api
