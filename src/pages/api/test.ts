import { NextApiHandler } from 'next'
import fs from 'fs'
import path from 'path'

const api: NextApiHandler = (req, res) => {
  const files = fs.readdirSync(path.join(process.cwd()))

  return res.send(files)
}
