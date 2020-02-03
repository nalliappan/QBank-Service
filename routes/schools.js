var express = require('express');
var router = express.Router();
let cors = require('cors');

const School = require('../models/School');

router.post('/', async (req, res) => {
  // Create a new school
  try {
      const school = new School(req.body)
      await school.save()
      res.status(201).send({ msg: "School information created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});

router.get('/', async (req, res) => {
  try{
    const schools = await School.find({});
    res.status(200).send(schools);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
