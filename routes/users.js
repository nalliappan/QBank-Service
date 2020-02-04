var express = require('express');
var router = express.Router();
let cors = require('cors');

const User = require('../models/User')

/**
 * @swagger
 * /users/generate-token:
 *    post:
 *      tags:
 *        - Users
 *      description: Generate access token using email and password.
 * 
*/
router.post('/generate-token',  async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
} catch (error) {
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
