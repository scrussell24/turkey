var MediaWikiClient = require('nodemw');
var Parsoid = require('parsoid');
var Html2Text = require('html-to-text');

// Usage example:
// Wiki2Text = require('./Wiki2Text');
// var w2t = new Wiki2Text('en.wikipedia.org', '/w');
// w2t.convert('elephant').then(function(text){
//  console.log(text);
// }
 
var Wiki2Text = function(url, path, wordWrap) {
  
   this.wordWrap = wordWrap ? wordWrap : 100
  
   this.client =  new MediaWikiClient({
           server: url ? url : 'en.wikipedia.org',
           path: path ? path : '/w',
           debug: false
   });
};

Wiki2Text.prototype.convert = function(article, opts){
    
    var client = this.client;
    var wrap = this.wordWrap
    
    return new Promise(function(resolve,reject){
                
        client.getArticle(article, function(error, data) {
            if (error) {
                reject(Error(error));
            }
            Parsoid.parse(data, { document: true }).then(function(res) {
                resolve(Html2Text.fromString(res.out.outerHTML, {
                    wordwrap: wrap
                }));
            }).done();
        });
    });
}

module.exports = Wiki2Text;
