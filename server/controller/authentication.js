const jwt = require('jsonwebtoken');

let IsValidToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                err: {
                    name : err.name,
                    message : err.message
                }
            });
        }

        req.user = decoded.user;
        next();

    });
};

let isAdmin = (req, res, next) => {

    let user = req.user;
    if (user.role === 'ADMIN_ROLE') 
        next();
    else
        return res.json({
            err: {
                message: 'current user is not ADMIN'
            }
        });
};



module.exports = {
    IsValidToken,
    isAdmin
}