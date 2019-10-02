var jwt = require('jsonwebtoken'); //web token 

module.exports = {
    verifyToken: function verifyToken(req, res, next) {
        let token = req.params.token
         console.log("token//////" + token)
        jwt.verify(token, 'userSecret-key', function (err, tokendata) {
            if (err) {
                return res.status(400).json({
                    message: ' Unauthorized request'
                });
            }
            if (tokendata) {
                decodedToken = tokendata;
                next();
            }
        })
    }
}