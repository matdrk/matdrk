const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema ({
    ref         : String ,
    content     : String ,
    author      : String ,
    imageAuthor : String ,
<<<<<<< HEAD
    createDate  : {
=======
    createDate : {
>>>>>>> 1355e3e6313f7cc841c185cb133238f1a9bc8b80
        type    : Date ,
        default : new Date()
    }

})
 
const AddComment = mongoose.model('AddComment', CommentSchema)

module.exports = AddComment