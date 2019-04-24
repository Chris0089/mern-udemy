const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// @route GET api/users/test
router.get('/test', (req, res) => res.json({
        msg: 'Users stuff is working duuuuuuuuude!!'
    })
);

// @route POST api/users/register
router.post( '/register', (req,res) => {
        User.findOne({email: req.body.email})
            .then(user => {
            if(user){
                return res.status(400).json({email: 'Existing email'});
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(
                        newUser.password,
                        salt,
                        (err,hash) =>{
                            if(err)throw(err)
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err=>console.log(err))
                        }
                    )
                })
            }
        })
    }
);
module.exports = router;