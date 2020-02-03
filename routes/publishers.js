var express = require('express');
var router = express.Router();
let cors = require('cors');

const Publisher = require('../models/Publisher');

router.post('/', async (req, res) => {
  // Create a new publisher
  try {
      const publisher = new Publisher(req.body)
      await publisher.save()
      res.status(201).send({ msg: "Publisher created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});

router.get('/', async (req, res) => {
  try{
    const publishers = await Publisher.find({});
    res.status(200).send(publishers);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
});

router.options('/', cors());

module.exports = router;
