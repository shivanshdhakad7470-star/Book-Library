const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const upload = require("../middleware/upload");

/* GET ALL BOOKS */

router.get("/", async (req, res) => {
 try {

  const books = await Book.find();

  res.json(books);

 } catch (error) {

  res.status(500).json({ message: error.message });

 }
});


/* UPLOAD BOOK */

router.post("/",

 upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 }
 ]),

 async (req, res) => {

  try {

   const { title, author, category } = req.body;

   const book = new Book({

    title,
    author,
    category,

    coverImage: req.files.coverImage
     ? req.files.coverImage[0].filename
     : "",

    pdfFile: req.files.pdfFile
     ? req.files.pdfFile[0].filename
     : ""

   });

   await book.save();

   res.json({
    message: "Book uploaded successfully",
    book
   });

  } catch (error) {

   res.status(500).json({ message: error.message });

  }

 });

module.exports = router;