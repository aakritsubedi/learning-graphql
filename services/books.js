const axios = require("axios");

const url =
  "https://sheets2api.aakritsubedi9.com.np/sheets2api?key=10xseiIW17E_kZoZrur21r8cLFUBV0_AXgLF3ZqsABik&gid=1008983194";

class BookService {
  static async fetchAllBooks() {
    const books = await axios.get(url);

    return books.data.data;
  }

  static async fetchBookById(id) {
    let books = await axios.get(url);
    books = books.data.data;
    const book = books.find(book => book.id == id);

    return book;
  }

  static async fetchBookByAuthorId(id) {
    let books = await axios.get(url);
    books = books.data.data;

    const authorBooks = books.filter((book) => book.authorId == id);

    return authorBooks;
  }

  static async addBook() {
    const authors = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return authors.data.data;
  }
}

module.exports = BookService;
