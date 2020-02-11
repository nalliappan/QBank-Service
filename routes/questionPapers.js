const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
let cors = require('cors');

const Header = require('../models/Header');
const Footer = require('../models/Footer');
const QuestionPaper = require('../models/QuestionPaper');
const QuestionSetting = require('../models/QuestionSetting');
const Section = require('../models/Section');
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
      const header = new Header(req.body.header);
      const newHeader = await header.save();
      const footer = new Footer(req.body.footer);
      const newFooter = await footer.save();
      questionReq.header = newHeader._id;
      questionReq.footer = newFooter._id;
      questionReq.sections = [];
      
      const questionPaper = new QuestionPaper(questionReq);
      const  newQuestionPaper = await questionPaper.save();

      if(req.body.sections && req.body.sections.length > 0){
        req.body.sections.map((sec) => {

          const settings = sec.settings;
          settings.map( async data => {
            let questionSetting = new QuestionSetting(data);
            let settingIds = [];
            settingIds = await questionSetting.save().then((sAdded) => {
              return sAdded._id;
            });
            const chaptersId = sec.chapters.map(key => mongoose.Types.ObjectId(key));
            sec.settings = settingIds;
            console.log(sec.settings)
            let section = new Section(sec);
            section.save().then((secAdded) => {
              QuestionPaper.findByIdAndUpdate(newQuestionPaper._id, 
                { $push: {sections : secAdded._id}},
                {new : true}, (err, qSec) => {
                  console.log(err);
              });
            });
          });
        });
      }
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
    const questions = await QuestionPaper.find({})
    .populate('user', ['name', 'email'])
    .populate('header', ['title', 'subTitle', 'description', 'image'])
    .populate('footer', ['title'])
    .populate('school', ['name', 'city', 'state', 'country'])
    .populate('class', ['name'])
    .populate('subject', ['name'])
    ;
    res.status(200).send(questions);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
