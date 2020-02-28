const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
let cors = require('cors');

const School = require('../models/School');
const User = require('../models/User');
/**
 * @swagger
 * /schools:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Schools
 *      description: Create new school account
 * 
*/
router.post('/', async (req, res) => {
  // Create a new school
  try {

    const schoolRequest = {...req.body, users: [], pubId: []}

    if(req.body.pubId && req.body.pubId.length > 0){
      req.body.pubId.map((pid) => schoolRequest.pubId.push(mongoose.Types.ObjectId(pid)));
    }

    const school = new School(schoolRequest);
    const newSchool = await school.save();
    
    if(req.body.users && req.body.users.length > 0){
      req.body.users.map((user) => {
        let userModel =  new User({...user, role: 'school'});
        userModel.save().then((uAdded) => {
          School.findByIdAndUpdate(newSchool._id, 
            { $push: {users : uAdded._id} },
            {new : true}, (err, user) => {
              console.log(err);
          });
        });
      });
    }
      res.status(201).send({ msg: "School account created successfully." });
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
});

/**
 * @swagger
 * /schools:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Schools
 *      description: Get all school list.
 * 
*/
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
