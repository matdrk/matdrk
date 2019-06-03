// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs')
    , pdfobject = require('pdfobject')

    module.exports = async (req, res, next) => {

    res.render('cv')

}
