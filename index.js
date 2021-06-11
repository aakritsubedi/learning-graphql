const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const books = require("./data/books");
const authors = require("./data/author");

const app = express();

// Types
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents the author of the Book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId == author.id);
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

// Root Query
const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A single book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: "A list of books",
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      description: "A information about author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "A list of authors",
      resolve: () => authors,
    },
  }),
});

// Mutation
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a Book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };

        books.push(book);

        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add a Author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };

        authors.push(author);

        return author;
      },
    },
    updateBook: {
      type: BookType,
      description: "Update the Book",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        authorId: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const book = books.find((book) => book.id === args.id);
        if (!book) {
          throw new Error(`Couldn't find book with id ${args.id}`);
        }

        if (args.name !== undefined) {
          book.name = args.name;
        }
        if (args.authorId !== undefined) {
          book.authorId = args.authorId;
        }

        return book;
      },
    },
    updateAuthor: {
      type: AuthorType,
      description: "Update the Author info",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = authors.find((author) => author.id === args.id);
        if (!author) {
          throw new Error(`Couldn't find author with id ${args.id}`);
        }
        
        author.name = args.name;

        return author;
      },
    },
    deleteBook: {
      type: GraphQLString,
      description: "Delete a book",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const bookIndex = books.findIndex((book) => book.id === args.id);
        if (bookIndex === -1) {
          throw new Error(`Couldn't find book with id ${args.id}`);
        }

        books.splice(bookIndex, 1);

        return `Book with id ${args.id} has been deleted.`;
      }
    },
    deleteAuthor: {
      type: GraphQLString,
      description: "Detele the author",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const authorIndex = authors.findIndex((author) => author.id === args.id);
        if (authorIndex === -1) {
          throw new Error(`Couldn't find author with id ${args.id}`);
        }
        
        authors.splice(authorIndex, 1);

        return `Author with id ${args.id} has been deleted`;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    name: "Learning GraphQL",
    version: "v1.0.0",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = 5000;
app.listen(5000, () => {
  console.log(`The server is running at ${PORT}`);
});
