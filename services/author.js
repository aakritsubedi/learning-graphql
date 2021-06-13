const axios = require("axios");

const url =
  "https://sheets2api.aakritsubedi9.com.np/sheets2api?key=10xseiIW17E_kZoZrur21r8cLFUBV0_AXgLF3ZqsABik&gid=1018869661";

class AuthorService {
  static async fetchAllAuthors() {
    const authors = await axios.get(url);

    return authors.data.data;
  }

  static async fetchAuthorById(id) {
    let authors = await axios.get(url);
    authors = authors.data.data;
    const author = authors.find(author => author.id == id);

    return author;
  }

  static async addAuthor(data) {
    const authors = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return authors.data.data;
  }
}

module.exports = AuthorService;
