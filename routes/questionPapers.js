var express = require('express');
var router = express.Router();
let cors = require('cors');

const QuestionPaper = require('../models/QuestionPaper');

/**
 * @swagger
 * /question-papers:
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
      const question = new QuestionPaper(questionReq);
      await question.save();
      res.status(201).send({ msg: "Question Paper created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});


/**
 * @swagger
 * /question-papers:
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
    const questions = await QuestionPaper.find({}).populate('userId', {name});
    res.status(200).send(questions);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
