import { NextApiHandler } from 'next'

const api: NextApiHandler = async (req, res) => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default api
