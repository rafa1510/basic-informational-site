import http from 'http'
import fs from 'fs'

http
  .createServer(function (req, res) {
    let q = new URL(req.url, 'https://localhost:8080')
    let filename = './index.html'

    if (q.pathname !== '/') {
      filename = `.${q.pathname}.html`
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile('./404.html', function (err, errorPage) {
          // If 404.html is not found send a basic error
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.write('<h1>404 Not Found</h1>')
            return res.end()
          }
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.write(errorPage)
          return res.end()
        })
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        return res.end()
      }
    })
  })
  .listen(8080)
