const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema ({
    title       : String ,
    content     : String ,
    img         : String , 
    author      : String ,
    imageAuthor : String ,
    serie       : String ,
    createDate : {
        type    : Date ,
        default : new Date()
    }

})
 
const AddArticle = mongoose.model('AddArticle', ArticleSchema)

module.exports = AddArticle