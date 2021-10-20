import { NextApiHandler } from 'next'
import fs from 'fs'
import path from 'path'

const api: NextApiHandler = (req, res) => {
  const files = fs.readdirSync(path.resolve(process.cwd()))
  return res.send(files)
}

export default api
