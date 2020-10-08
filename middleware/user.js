const userDb = require('../users/userDb')

function validateUserId() {
    return (req, res, next) => {
        userDb.getById(req.params.id)
        .then((user) => {
            if (user) {
                req.user = user
                next()
            } else {
                res.status(404).json({
                    message: "User not found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the user"
            })
        })
    }
}

function validateUser() {
    return (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({
                message: "Missing user name or email",
            })
        }
        next()
    }
}

function validatePost() {
    return (req, res, next) => {
        if (!req.body.text) {
            return res.status(400).json({
                message: "Need a value for text",
            })
        }
        next()
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}