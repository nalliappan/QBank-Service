var express = require('express');
var router = express.Router();
let cors = require('cors');

const Subject = require('../models/Subject');

/**
 * @swagger
 * /subjects:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Subjects
 *      description: Create new subject
 * 
*/
router.post('/', async (req, res) => {
  // Create a new school
  try {
      const subject = new Subject(req.body)
      await subject.save()
      res.status(201).send({ msg: "Subject information created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});

/**
 * @swagger
 * /subjects:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Subjects
 *      description: Get all subjects list.
 * 
*/
router.get('/', async (req, res) => {
  try{
    const subjects = await Subject.find({});
    res.status(200).send(subjects);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
