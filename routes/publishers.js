var express = require('express');
var router = express.Router();
let cors = require('cors');

const Publisher = require('../models/Publisher');

/**
 * @swagger
 * /publishers:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Publishers
 *      description: Create new publisher
 * 
*/
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

/**
 * @swagger
 * /publishers:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Publishers
 *      description: This should return all publishers
 * 
*/

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
