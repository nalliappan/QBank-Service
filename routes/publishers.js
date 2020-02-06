var express = require('express');
var router = express.Router();
let cors = require('cors');

const Publisher = require('../models/Publisher');
const User = require('../models/User');

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
      const publisherRequest = {...req.body, users: []}
      const publisher = new Publisher(publisherRequest);
      const newPublisher = await publisher.save();
      
      if(req.body.users && req.body.users.length > 0){
        req.body.users.map((user) => {
          let userModel =  new User({...user, role: 'publisher'});
          userModel.save().then((uAdded) => {
            Publisher.findByIdAndUpdate(newPublisher._id, 
              { $push: {users : uAdded._id} },
              {new : true}, (err, user) => {
                console.log(err);
            });
          });
        });
      }

      res.status(201).send({ msg: "Publisher account created successfully." });
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
