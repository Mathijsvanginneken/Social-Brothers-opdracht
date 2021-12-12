// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const axios = require('axios');


let webApiUrl = 'https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=5';
axios.get(webApiUrl, { headers: {
  'Content-Type': 'application/json',
    'token' : 'pj11daaQRz7zUIH56B9Z'} })
.then((response) => {
  console.log('response.data', response)})
.catch((error) => {
  console.log(error)
})

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
