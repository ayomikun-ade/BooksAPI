const express = require("express");
const router = express.Router();

const books = [
  {
    id: 1,
    title: "1984",
    author: "Ally Carter",
    publishedDate: "1990-05-06",
    summary: "A look into the life in 1984",
  },
];

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

router.post("/", (req, res) => {
  const { title, author, publishedDate, summary } = req.body;
  const book = { id: books.length + 1, title, author, publishedDate, summary };
  books.push(book);
  res.status(201).json(book);
});

router.put("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");

  const { title, author, publishedDate, summary } = req.body;
  book.title = title;
  book.author = author;
  book.publishedDate = publishedDate;
  book.summary = summary;

  res.json(book);
});

router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Book not found.");

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

module.exports = router;
