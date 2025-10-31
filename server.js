const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory database (array)
let books = [];

// ✅ Add a new book
app.post('/api/book', (req, res) => {
    const { bookNo, title, price } = req.body;

    // Validation
    if (!bookNo || !title || !price) {
        return res.status(400).json({ message: "All fields (bookNo, title, price) are required." });
    }

    // Check for duplicate bookNo
    const existingBook = books.find(b => b.bookNo === bookNo);
    if (existingBook) {
        return res.status(409).json({ message: `Book with number ${bookNo} already exists.` });
    }

    const newBook = { bookNo, title, price };
    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});

// ✅ Get all books
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// ✅ Get a single book by bookNo
app.get('/api/books/:bookNo', (req, res) => {
    const { bookNo } = req.params;
    const book = books.find(b => b.bookNo == bookNo);

    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
});

// ✅ Delete a book by bookNo
app.delete('/api/books/:bookNo', (req, res) => {
    const { bookNo } = req.params;
    const index = books.findIndex(b => b.bookNo == bookNo);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found." });
    }

    const deletedBook = books.splice(index, 1);
    res.status(200).json({ message: "Book deleted successfully", deletedBook });
});

// ✅ Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
