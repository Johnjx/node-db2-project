const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('heelo from cars')
})

module.exports = router;
