const router = require('express').Router();

router.route('/').post( (req, res) => {
    console.log('logging out...');
    req.session.destroy();
    res.send("Logged Out");
});

module.exports = router;