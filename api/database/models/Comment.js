const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema ({
    ref         : String ,
    content     : String ,
    author      : String ,
    imageAuthor : String ,
    createDate : {
        type    : Date ,
        default : new Date()
    }

})
 
const AddComment = mongoose.model('AddComment', CommentSchema)

module.exports = AddComment