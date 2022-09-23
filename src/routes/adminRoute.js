const  express = require('express')
const router = express.Router()
const AdminController = require('../controller/adminController.js')

router.get('/', (req, res) => {
    res.send("Admin Homepage")
})

router.get('/user/:id', AdminController.getUser)

router.get('/users', AdminController.allUsers)


module.exports = router