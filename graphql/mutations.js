const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const { BookType, AuthorType } = require('./types');

const books = require("../data/books");
const authors = require("../data/author");

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
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const bookIndex = books.findIndex((book) => book.id === args.id);
        if (bookIndex === -1) {
          throw new Error(`Couldn't find book with id ${args.id}`);
        }

        books.splice(bookIndex, 1);

        return `Book with id ${args.id} has been deleted.`;
      },
    },
    deleteAuthor: {
      type: GraphQLString,
      description: "Detele the author",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const authorIndex = authors.findIndex(
          (author) => author.id === args.id
        );
        if (authorIndex === -1) {
          throw new Error(`Couldn't find author with id ${args.id}`);
        }

        authors.splice(authorIndex, 1);

        return `Author with id ${args.id} has been deleted`;
      },
    },
  }),
});

module.exports = RootMutationType;
