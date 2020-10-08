const express = require('express')
// const userDb = require('../users/userDb')
const postDb = require('./postDb')
const { 
  validateUserId,
  validateUser,
  validatePost } = require('../middleware/user');
const router = express.Router();

router.get('/posts', (req, res) => {
  postDb.get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/users/:id/posts', validatePost(), validateUser(), (req, res) => {
  postDb.get(id)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/users/:userid/posts/:id', (req, res) => {
  postDb.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post is gone"
        })
      } else {
        res.status(404).json({
          message: "The post was not found"
        })
      }
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/users/:id/posts/:postid', validatePost(), validateUserId(), (req, res) => {
  postDb.update(req.params.postid, req.body)
    .then((post) => {
      res.status(200).json({
        message: "The post has been updated"
      })
    })
    .catch((error) => {
      next(error)
    })
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
