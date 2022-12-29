const graphql = require("graphql");
const Author = require("../mongo/author");
const Book = require("../mongo/book");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const author_data = [
//   {
//     name: "Author5",
//     age: 1,
//     id: "1",
//   },
//   {
//     name: "Author9",
//     age: 2,
//     id: "2",
//   },
//   {
//     name: "Author10",
//     age: 3,
//     id: "3",
//   },
// ];

// const book_data = [
//   {
//     name: "Book1",
//     authorID: "1",
//     id: "1",
//   },
//   {
//     name: "Book2",
//     authorID: "1",
//     id: "2",
//   },
//   {
//     name: "Book3",
//     authorID: "3",
//     id: "3",
//   },
// ];

const author = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
        type:new GraphQLList(book),
        resolve(parent,args){
            return Book.find({id:parent.id}); 
        }
    }
  }),
});

const book = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    authorID:{type:GraphQLString},
    author: {
      type: author,
      resolve(parent, args) {
        const author = Author.findById(parent.authorID);
        return author || {};
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    book: {
      type: book,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const bookData = Book.findById(args.id);
        return bookData || {};
        // const bookData = book_data.find((book) => book.id === args.id);
        // return bookData || {};
      },
    },
    author: {
      type: author,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const author = Author.findById(args.id);
        return author || {};
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name:'mutation',
  fields:{
    addBook:{
      type:book,
      args:{
        name:{type:GraphQLString},
        authorID:{type:GraphQLID}
      },
      resolve(parent,args){
        const book = new Book({
          name:args.name,
          authorID:args.authorID,
        })
        return book.save();
      }
    },
    addAuthor:{
      type:author,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
      },
      resolve(parent,args){
        const author = new Author({
          name:args.name,
          age:args.age,
        })
        return author.save();
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation,
});
