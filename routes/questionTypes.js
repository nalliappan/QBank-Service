var express = require('express');
var router = express.Router();
let cors = require('cors');

const QType = require('../models/QuestionType');

/**
 * @swagger
 * /question-types:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - QuestionTypes
 *      description: Create new question type
 * 
*/
router.post('/', async (req, res) => {
  // Create a new school
  try {
      const questionType = new QType(req.body)
      await questionType.save()
      res.status(201).send({ msg: "Question Type information created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});

/**
 * @swagger
 * /question-types:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - QuestionTypes
 *      description: Get all question types.
 * 
*/
router.get('/', async (req, res) => {
  try{
    const questionTypes = await QType.find({});
    res.status(200).send(questionTypes);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
