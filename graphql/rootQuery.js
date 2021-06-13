const { GraphQLObjectType, GraphQLList, GraphQLInt } = require("graphql");

const { BookType, AuthorType } = require("./types");

const BookService = require("../services/books");
const AuthorService = require("../services/author");

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
      resolve: async (parent, args) => {
        const book = await BookService.fetchBookById(args.id);
        
        return book;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "A list of books",
      resolve: async () => {
        const books = await BookService.fetchAllBooks();

        return books;
      },
    },
    author: {
      type: AuthorType,
      description: "A information about author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const author = await AuthorService.fetchAuthorById(args.id);
        
        return author;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "A list of authors",
      resolve: async () => {
        const authors = await AuthorService.fetchAllAuthors();

        return authors;
      },
    },
  }),
});

module.exports = RootQueryType;
