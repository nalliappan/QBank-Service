const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
let cors = require('cors');

const User = require('../models/User');
const School = require('../models/School');
const Publisher = require('../models/Publisher');
const UserResponse = require('../response/users');

/**
 * @swagger
 * /users/login:
 *    post:
 *      tags:
 *        - Users
 *      description: login and generate access token using email and password.
 * 
*/
router.post('/login',  async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password);
    const userInfo = user.toJSON();
    let profile;
    
    if(userInfo.role === 'school'){
         profile = await School.findOne({ "users": { "$in": [mongoose.Types.ObjectId(userInfo._id)] } });
    }else if(userInfo.role === 'publisher'){
         profile = await Publisher.findOne({ "users": { "$in": [mongoose.Types.ObjectId(userInfo._id)] } });
    }
        
    if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken();
    
    const response = new UserResponse(user, profile).getLoginResponse();

    res.send({ ...response, token });
} catch (error) {
    console.log(error)
    res.status(400).send(error)
}
});

/**
 * @swagger
 * /users:
 *    post:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *        - Users
 *      description: Create new user
 * 
*/
router.post('/', async (req, res) => {
  // Create a new user
  try {
      const user = new User(req.body)
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
  } catch (error) {
      res.status(400).send(error)
  }
})

router.options('/', cors());

module.exports = router;
