const post = require("../database/models/Article");

module.exports = async (req, res) => {

    const dbArticles = await post.findById(req.params.id)

        // console.log( {dbArticles} );
        // console.log( req.params );
        
    res.render('articles', { dbArticles })

}