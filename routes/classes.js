var express = require('express');
var router = express.Router();
let cors = require('cors');

const Class = require('../models/Class');

/**
 * @swagger
 * /classes:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Classes
 *      description: Create new class
 * 
*/
router.post('/', async (req, res) => {
  // Create a new school
  try {
      const _class = new Class(req.body);
      await _class.save()
      res.status(201).send({ msg: "Class information created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});

/**
 * @swagger
 * /classes:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Classes
 *      description: Get all class list.
 * 
*/
router.get('/', async (req, res) => {
  try{
    const classes = await Class.find({});
    res.status(200).send(classes);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
