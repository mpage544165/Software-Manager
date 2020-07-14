const router = require('express').Router();

router.route('/').post( (req, res) => {
    req.session.destroy();
    console.log('logout');
    
});

module.exports = router;