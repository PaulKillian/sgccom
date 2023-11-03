const express = require('express')
const cors = require('cors')
const StreamChat = require('stream-chat').StreamChat

const app = express()
const PORT = 3001

const serverClient = StreamChat.getInstance(
  'hcajpug29jz2',
  'cq32bmtyxqwg5wasvpye6sds78kbu5c9g5xdnfz9payeuwmrwa7a3s3gkv735yry',
)

app.use(cors());

app.get('/generate-token/:id', (req, res) => {
  const { id } = req.params
  const token = serverClient.createToken(id)
  res.json({ token: token  });
})

const Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = Server
