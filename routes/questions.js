var express = require('express');
var router = express.Router();
let cors = require('cors');

const Book = require('../models/Book');
const Chapter = require('../models/Chapter');
const Class = require('../models/Class');
const QuestionType = require('../models/QuestionType');
const Question = require('../models/Question');

/**
 * @swagger
 * /questions:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Questions
 *      description: Create new question with answers and class, subject, book and chapter information
 * 
*/
router.post('/', async (req, res) => {
  // Create a new Question & Answers
  try {
      const questionReq = {...req.body};
      const question = new Question(questionReq);
      await question.save();
      res.status(201).send({ msg: "Question & answer(s) created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});


/**
 * @swagger
 * /questions:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Questions 
 *      description: Get all questions with answers
 * 
*/
router.get('/', async (req, res) => {
  try{
    const questions = await Question.find({}).populate({ path: 'questionTypeId', model: QuestionType });
    res.status(200).send(questions);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
