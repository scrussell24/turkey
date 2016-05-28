var bot = require('nodemw'),
    Parsoid = require('parsoid'),
    html2text = require('html-to-text'),
    client;
    
module.exports = {
    convert : function(article, callback){
        if(!client){
            throw error('Client not initialized. see setWiki.');
        }
            
        client.getArticle(article, function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            Parsoid.parse(data, { document: true }).then(function(res) {
                callback(html2text.fromString(res.out.outerHTML, {
                    wordwrap: 100
                }), article);
            }).done();
        });
    },
    setWiki: function(url, path){
        client = new bot({
            server: url,
            path: path,
            debug: false
        });
    }
}