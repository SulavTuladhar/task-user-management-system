const router = require('express').Router();
const userModel = require('./../models/user.model');

function MAP_USER_REQ(user,userData){
    if(userData.name)
        user.name = userData.name;
    if(userData.email)
        user.email = userData.email;
    if(userData.phoneNumber)
        user.phoneNumber = userData.phoneNumber;
    if(userData.address)
        user.address = userData.address;

    return user;
}

router.route('/')
    .get(function(req,res,next){
        var condition = {};
        userModel.find(condition)
            .sort({
                _id: -1
            })
            .exec(function(err,users){
                if(err){
                    return next(err)
                }
                res.json(users)
            })
    })
    .post(function(req,res,next){
        var newUser = new userModel({});
        var mappedUser = MAP_USER_REQ(newUser,req.body);
        mappedUser.save(function(err,done){
            if(err){
                return next(err)
            }
            res.json(done);
        })
    })

router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            res.json(user)
        })
    })
    .put(function(req,res,next){
        const data = req.body;
        userModel.findById(req.params.id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'user not found',
                    status: 404
                })
            }
            console.log('before updating >>', user)
            var mappedUser = MAP_USER_REQ(user,data);
            console.log('after mapping >>', mappedUser);
            mappedUser.save(function(err,updated){
                if(err){
                    return next(err)
                }
                res.json(updated)
            })
        })
    })
    .delete(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            user.remove(function(err,removed){
                if(err){
                    return next(err)
                }
                res.json(removed)
            })
        })
    })

module.exports = router;