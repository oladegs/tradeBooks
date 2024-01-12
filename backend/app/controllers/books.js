let Book = require("../models/books");

// Create a new book
exports.create = async (req, res) => {
  try {
 const { isbn, category, title, author, condition, price, description, postedBy, expiryDate, active } =
      req.body;
    const newBook = new Book({
      isbn,
      category,
      title,
      author,
      condition,
      price,
      description,
      postedBy,
      expiryDate,
      active
    });

    await newBook.save();

    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

// Retrieve all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
const { isbn, category, title, author, condition, price, description, expiryDate, active } = req.body;
    const updatedBook = {
      isbn,
      category,
      title,
      author,
      condition,
      price,
      description,
      expiryDate,
      active
    };

    const book = await Book.findOneAndUpdate({ isbn: req.params.isbn }, updatedBook, { new: true });

    if (!book) {
      return res.status(404).json({ message: "No book found for this ISBN" });
    }

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
};


// Find books by user ID
exports.findBookByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find books posted by the user with the given userId
    const books = await Book.find({ postedBy: userId });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found for this user" });
    }

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's books", error: error.message });
  }
};

exports.findBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ isbn }).populate('postedBy');
    console.log(book);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found for isbn: " + isbn });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding book", error: error.message });
  }
};