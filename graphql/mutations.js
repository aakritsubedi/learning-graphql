const { v4: uuidv4 } = require("uuid");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const { BookType, AuthorType } = require("./types");

const BookService = require("../services/books");
const AuthorService = require("../services/author");

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
        originalLanguage: { type: GraphQLString },
        firstPublished: { type: GraphQLString },
        approximateSales: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const book = {
          id: uuidv4(),
          name: args.name,
          originalLanguage: args.originalLanguage,
          firstPublished: args.firstPublished,
          approximateSales: args.approximateSales,
          genre: args.genre,
          authorId: args.authorId,
        };

        await BookService.addBook(book);

        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add a Author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const author = {
          id: uuidv4(),
          name: args.name,
        };

        await AuthorService.addAuthor(author);

        return author;
      },
    },
  }),
});

module.exports = RootMutationType;
