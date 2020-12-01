import { RequestHandler } from 'express'

export const intitializeMiddleware = (middleware: RequestHandler) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
