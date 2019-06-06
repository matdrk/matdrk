const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema ({
    ref         : String ,
    content     : String ,
    author      : String ,
    authorId    : String ,
    imgAuthor   : String ,
    createDate  : {
        type    : Date ,
        default : new Date()
    },
    formatDate: {
        type: String,
    }

})
 
const AddComment = mongoose.model('AddComment', CommentSchema)

module.exports = AddComment