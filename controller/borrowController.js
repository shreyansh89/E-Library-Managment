const Borrow = require('../models/borrow');
const Book = require('../models/book')


module.exports.borrowBook = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const book = await Book.findById(req.params.bookId);
        if (!book || !book.availability) {
            return res.status(400).json({ error: 'Book not available' });
        }

        const borrow = new Borrow({ user: req.user.id, book: book._id });
        book.availability = false;
        await book.save();
        await borrow.save();
        return res.status(200).json({ mes: "Book borrowed successfully", status: 1 });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error borrowing book' });
    }
};


module.exports.returnBook = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const borrow = await Borrow.findOne({ book: req.params.bookId, user: req.user.id });
        if (!borrow || borrow.returnDate) {
            return res.status(400).json({ error: 'Invalid return' });
        }

        borrow.returnDate = Date.now();
        await borrow.save();

        const book = await Book.findById(req.params.bookId);
        book.availability = true;
        await book.save();

        return res.status(200).json({ mes: "Book returned successfully", status: 1 });
    } catch (error) {
        res.status(400).json({ error: 'Error returning book' });
    }
};