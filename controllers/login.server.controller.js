import mongoose from 'mongoose';
//import models
import User from '../models/user.server.model';

const newUser = new User({
    username: 'admin',
    password: 'welcome',
    token: 'adminToken'
});

newUser.save((err,user) => {
    if(err){
        console.log("User already registered")
    }
    console.log("Admin user registered")
})

export const authenticateUser = (req,res) => {
    User.find({username:req.body.username, password:req.body.password}).exec((err,user) => {        
        if(err){
            return res.json({'success':false,'message':'Error logging in'});
        }
        if(user.length){
            return res.json({'success':true,'message':'Authenticated successfully',user});
        }
        else{
            return res.json({'success':false,'message':'Invalid username and password'});
        }
    })
}