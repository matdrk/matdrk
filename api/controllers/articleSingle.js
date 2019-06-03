const post = require("../database/models/Article");

module.exports = async (req, res) => {

    const dbArticles = await post.find({})

        console.log( {dbArticles} );
        
    res.render('articles', { dbArticles })

}