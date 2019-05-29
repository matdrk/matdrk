// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs') 

    , User    = require('../database/models/User')

module.exports = (req, res, next) => {

    User.create (
        req.body, (error, user) => {
            if (error) {
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                req.flash('registerError', registerError)
                req.flash('data', req.body)
                return res.redirect('/login')
                console.log("register FAIL")
            }
            res.redirect('/')
            console.log("register OK");
            
        }
    )  

}