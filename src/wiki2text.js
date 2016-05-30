var bot = require('nodemw'),
    Parsoid = require('parsoid'),
    html2text = require('html-to-text');//,
    //client;
    
// module.exports = {
//     convert : function(article){
        
//         return new Promise(function(resolve,reject){
//             if(!client){
//                 throw error('Client not initialized. see setWiki.');
//             }
            
//             client.getArticle(article, function(err, data) {
//                 if (err) {
//                     reject(Error(err));
//                 }
//                 Parsoid.parse(data, { document: true }).then(function(res) {
//                     resolve(html2text.fromString(res.out.outerHTML, {
//                         wordwrap: 100
//                     }));
//                 }).done();
//             });
//         });
//     },
//     setWiki: function(url, path){
//         client = new bot({
//             server: url,
//             path: path,
//             debug: false
//         });
//     }
// }

// module.exports = function(url, path){
    
//     this.client =  new bot({
//             server: url,
//             path: path,
//             debug: false
//     });
    
//     return {
//         convert = function(article){ 
//             return new Promise(function(resolve,reject){
                
//                 this.client.getArticle(article, function(err, data) {
//                     if (err) {
//                         reject(Error(err));
//                     }
//                     Parsoid.parse(data, { document: true }).then(function(res) {
//                         resolve(html2text.fromString(res.out.outerHTML, {
//                             wordwrap: 100
//                         }));
//                     }).done();
//                 });
//             });
//         }
//     }
// }


var Wiki2Text = function (url, path) {
    
    this.client =  new bot({
            server: url,
            path: path,
            debug: false
    });
};

Wiki2Text.prototype.convert = function(article){
    
    var client = this.client;
    
    return new Promise(function(resolve,reject){
                
        client.getArticle(article, function(err, data) {
            if (err) {
                reject(Error(err));
            }
            Parsoid.parse(data, { document: true }).then(function(res) {
                resolve(html2text.fromString(res.out.outerHTML, {
                    wordwrap: 100
                }));
            }).done();
        });
    });
}

module.exports = Wiki2Text;
