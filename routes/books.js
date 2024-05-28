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

//GET /api/books
/**
 * @swagger
 * /api/books:
 *  get:
 *      summary: Retrieves the list of books
 *      description: Retrieves a comprehensive list of all books
 *      responses:
 *          200:
 *              description: Successful retrieval of books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  title:
 *                                      type: string
 *                                  author:
 *                                      type: string
 *                                  publishedDate:
 *                                      type: string
 *                                      format: date
 *                                  summary:
 *                                      type: string
 *
 */

router.get("/", (req, res) => {
  res.json(books);
});

//GET /api/books/:id
/**
 * @swagger
 * /api/books/{id}:
 *  get:
 *      summary: Retrieves a single book
 *      description: Retrieves a single book by a specific ID
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *      responses:
 *          200:
 *              description: A single book
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                              title:
 *                                  type: string
 *                              author:
 *                                  type: string
 *                              publishedDate:
 *                                  type: string
 *                                  format: date
 *                              summary:
 *                                  type: string

 *          404:
 *              description: Book not found
 *
 */

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

//POST /api/books
/**
 * @swagger
 * /api/books:
 *  post:
 *      summary: Adds a new book
 *      description: Adds a new book to the lists of books
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          author:
 *                              type: string
 *                          publishedDate:
 *                              type: string
 *                              format: date
 *                          summary:
 *                              type: string
 *      responses:
 *          201:
 *              description: The newly created book
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                              title:
 *                                  type: string
 *                              author:
 *                                  type: string
 *                              publishedDate:
 *                                  type: string
 *                                  format: date
 *                              summary:
 *                                  type: string
 */

router.post("/", (req, res) => {
  const { title, author, publishedDate, summary } = req.body;
  const book = { id: books.length + 1, title, author, publishedDate, summary };
  books.push(book);
  res.status(201).json(book);
});

// PUT /api/books/:id
/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               summary:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       404:
 *         description: Book not found
 */

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

// DELETE /api/books/:id
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The deleted book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       404:
 *         description: Book not found
 */

router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Book not found.");

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

module.exports = router;
