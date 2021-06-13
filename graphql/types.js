const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const BookService = require("../services/books");
const AuthorService = require("../services/author");

// Types
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents the author of the Book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (author) => {
        const books = await BookService.fetchBookByAuthorId(author.id);
        
        return books;
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
    originalLanguage: { type: GraphQLString },
    firstPublished: { type: GraphQLString },
    approximateSales: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: async (book) => {
        const author = await AuthorService.fetchAuthorById(book.authorId);

        return author;
      },
    },
  }),
});

module.exports = {
  BookType,
  AuthorType,
};
