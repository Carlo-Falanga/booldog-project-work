const connection = require("../data/db")

const index = (req, res) => {
  res.send('Hello i am index!')
}

const show = (req, res) => {
  res.send('Hello i am show!')
}

module.exports = {index , show}