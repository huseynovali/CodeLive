const  { validationResult } = require("express-validator") 

 const userMid = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            errors: error.array()
        })
    } else {
        next()
    }


}


module.exports = userMid