const  express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth.js')

router.get('/', (req, res) => {
    res.send("Homepage")
})

router.post('/register', AuthController.saveUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)

module.exports = router