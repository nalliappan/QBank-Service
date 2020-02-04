var express = require('express');
var router = express.Router();
let cors = require('cors');

const Book = require('../models/Book');
const Chapter = require('../models/Chapter');
const Class = require('../models/Class');


/**
 * @swagger
 * /books:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Books
 *      description: Create new books with chapters and class information
 * 
*/
router.post('/', async (req, res) => {
  // Create a new book
  try {
      const bookRequest = {...req.body};
      bookRequest.chapters = [];
      bookRequest.class = [];
      const book = new Book(bookRequest);
      const newBook = await book.save()

      if(req.body.chapters && req.body.chapters.length > 0){
        req.body.chapters.map((chapter) => {
          let cModel =  new Chapter(chapter);
          cModel.save().then((cAdded) => {
            Book.findByIdAndUpdate(newBook._id, 
              { $push: {chapters : cAdded._id} },
              {new : true}, (err, book) => {
                console.log(err);
            });
          });
        });
      }

      if(req.body.class && req.body.class.length > 0){
        req.body.class.map((data) => {
          let classModel =  new Class(data);
          classModel.save().then((classAdded) => {
            Book.findByIdAndUpdate(newBook._id, 
              { $push: {class : classAdded._id} },
              {new : true}, (err, book) => {
                console.log(err);
            });
          });
        });
      }

      res.status(201).send({ msg: "Book information created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});


/**
 * @swagger
 * /books:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Books
 *      description: Get all books
 * 
*/
router.get('/', async (req, res) => {
  try{
    const books = await Book.find({}).populate({ path: 'chapters', model: Chapter })
    .populate({ path: 'class', model: Class });
    res.status(200).send(books);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
