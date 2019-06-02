const mongoose = require('mongoose')

const ArticleBlogSchema = new mongoose.Schema ({
    titleBlog       : String ,
    contentBlog     : String ,
    imgBlog       : String , 
    authorBlog      : String ,
    imageAuthorBlog : String ,
    createDate : {
        type    : Date ,
        default : new Date()
    }

})
 
const AddArticleBlog = mongoose.model('AddArticleBlog', ArticleBlogSchema)

module.exports = AddArticleBlog