const express = require('express')
const app = express()
const port = 3000
const {graphqlHTTP} = require('express-graphql');
const { default: mongoose } = require('mongoose');
const bookSchema = require('./models/graphQL/book');

app.use('/graphql',graphqlHTTP({
  schema:bookSchema,
  graphiql:true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


mongoose.connect(`mongodb+srv://userRoot1:root1234@cluster0.puse2rv.mongodb.net/test`)

mongoose.connection.once('open',()=>{
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
})
