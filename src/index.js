#! /usr/bin/env node

 var blessed = require('blessed');
 var commander = require('commander');
 var chalk = require('chalk');
 var _ = require('lodash');
 var getLineFromPos = require('get-line-from-pos');
 var Wiki2Text = require('./wiki2text.js');
 var pjson = require('../package.json');

//Some common regexes
 var HEADER_REGEX = /(?:^)[A-Z\d\s\'\_\.\n]{4,}(?:$)/gm;
 var LIST_REGEX = /\s\s\*/gmi;
 var LINK_REGEX = /\[\.\/[\w\d\s\_\'\-\:\.\/\\\(\)\#\%]+\]/gmi;

     commander
      .version(pjson.version)
      .option('-w, --wiki [url]', 'Wiki url or alias', '')
      .option('-p, --path [path]', 'API Path', '')
      .option('-d, --dump', 'Dump to console')
      //.option('-f, --format [text]', 'Text format (wikitext,html,text)', 'text')
      .option('-a, --article [text]', 'article name', 'Main Page')
      //.option('-A, --add <alias> <wikiurl> [path] [default page]', 'Add wiki alias')
      //.option('-v', 'View wiki alias\'')
      .parse(process.argv);

    var w2t = new Wiki2Text(commander.wiki, commander.path, 100);

    if(commander.dump){
          w2t.convert(commander.article).then(function(text){
             //headers
            text = text.replace(HEADER_REGEX, function(match){
              return '\n' + chalk.green(match) + '\n';
            });

            //list
            text = text.replace(LIST_REGEX, function(match){
              return chalk.magenta(match);
            });

            //links
              text = text.replace(LINK_REGEX, function(match){
                return chalk.cyan(match);
              });
            console.log(text);
          }, function(err){
            console.log(err);
          });
    } else {
      var screen = blessed.screen({
          smartCSR: true,
        dockBorders: true
      });
      var inputDisabled = false;
      var content = '';
      var headers = [];
      var links = [];
      var currentLinkIndex = -1;
      var currentHeaderIndex = -1;
      var pages = [];
      var currentPageIndex = 0;
      
      var form = blessed.form({
        parent: screen,
        top:0,
        height: 2,
        keys: true,
        mouse: true,
        style: { border: { fg: 'black'} }
      });

      var input = blessed.textarea({
        parent: form,
        mouse: true,
        height: '95%',
        width: '100%',
        name: 'submit',
        content: 'input',
        bg: '#222222',
        style: {bg: '#222222',focus: {bg: '#666666'},hover: {bg: '#666666'}}
      });
      
      var box =  blessed.box({
        parent: screen,
        top: 2,
        left: 0,
        mouse: true,
        keys: true,
        bg: 'black',
        scrollable: true,
        padding: 1,
        style: {bg: '222222',focus: {bg: 'black'},hover: {bg: 'black'},border: {fg: 'black'}}
      });

      form.on('submit', function(data) {
        
        inputDisabled = true;
        if(pages.indexOf(input.value.replace('\n','')) < 0){
          pages.push(input.value.replace('\n',''));
          currentPageIndex = pages.length - 1;
        }
        
        var article = input.value.replace('\n','').replace(/\s/, '_').trim();
        input.value = 'retrieving article...';
        box.focus();
        screen.render();
        try{
          w2t.convert(article).then(function(text){
            
            //reinit stuff
              links = [];
              headers = [];
              currentLinkIndex = -1;
              currentHeaderIndex = -1;
              
              //headers
              text = text.replace(HEADER_REGEX, function(match){
                headers.push(match);
                return '\n' + chalk.green(match) + '\n';
              });

              //list
              text = text.replace(LIST_REGEX, function(match){
                return chalk.magenta(match);
              });

              //links
              var count = 0,
              text = text.replace(LINK_REGEX, function(match){
                match = match.substring(0,3) + count + ' ' + match.substring(3);
                count++;
                links.push(match);
                return chalk.cyan(match);
              });
             
              content = text;
              input.value = article;
              inputDisabled = false;
              screen.rerenderContent(content);
          });
        } catch(err){
          inputDisabled = false;
          screen.rerenderContent('Error, please search again');
        }
      });

      input.key(['enter'], function() {
        if(!inputDisabled){
          form.submit();
        }
      });

      box.key(['enter'], function() {
        if(!inputDisabled && currentLinkIndex >= 0){
            var query = links[currentLinkIndex].replace(/\[\.\/[0-9]+\s/, '');
            input.value = query.substring(0, query.length - 1);
            input.focus();
            form.submit();
        }
      });
      
      screen.key(['up'], function() {
          if(currentPageIndex >= 1){
            currentPageIndex--;
            input.value = pages[currentPageIndex];
            input.focus();
            screen.render();
          }
      });
      
      screen.key(['down'], function() {
        if(currentPageIndex < pages.length-1){
              currentPageIndex++;
              input.value = pages[currentPageIndex];
              input.focus();
              screen.render();
          }
      });

      screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
      });

      screen.key(['C-s','space'], function(ch, key) {
        if(!inputDisabled){
          input.value = '';
          input.readInput(); 
        }
      });

      screen.key(['C-b'], function(ch, key) {
        box.focus();
      });

      screen.key(['d'], function(ch, key) {
        if(currentLinkIndex === links.length - 1){
          return;
        }

        content = content.replace(links[currentLinkIndex], function(match){
            return chalk.cyan.bgBlack(match);
        });

        currentLinkIndex++;
        content = content.replace(links[currentLinkIndex], function(match){
            return chalk.white.bgBlue(match);
        });

        box.scrollTo(getLineFromPos(content, content.indexOf(links[currentLinkIndex])) + 5);
        screen.rerenderContent(content);
      });

      screen.key(['a'], function(ch, key) {
        if(currentLinkIndex === 0){
          return;
        }

        content = content.replace(links[currentLinkIndex],function(match){
            return chalk.cyan.bgBlack(match);
        });

        currentLinkIndex--;
        content = content.replace(links[currentLinkIndex],function(match){
            return chalk.white.bgBlue(match);
        });

        box.scrollTo(getLineFromPos(content, content.indexOf(links[currentLinkIndex])) - 5);
        screen.rerenderContent(content);
      });

      screen.key(['s'], function(ch, key) {
        if(currentHeaderIndex >= headers.length - 1){
            return;
        }

        content = content.replace(headers[currentHeaderIndex], function(match){
            return chalk.green.bgBlack(match);
        });

        currentHeaderIndex++;
        content = content.replace(headers[currentHeaderIndex], function(match){
            return chalk.black.bgYellow(match);
        });

        content = content.replace(links[currentLinkIndex], function(match){
            return chalk.cyan.bgBlack(match);
        });
        
        currentLinkIndex = -1;
        while(content.indexOf(links[currentLinkIndex]) <= content.indexOf(headers[currentHeaderIndex])){
            currentLinkIndex++;
        }
        currentLinkIndex--;

        box.scrollTo(getLineFromPos(content, content.indexOf(headers[currentHeaderIndex])) + 10);
        screen.rerenderContent(content);
      });

      screen.key(['w'], function(ch, key) {

        if(currentHeaderIndex <= -1){
          return;
        }

        content = content.replace(headers[currentHeaderIndex], function(match){
            return chalk.green.bgBlack(match);
        });

        currentHeaderIndex--;
        content = content.replace(headers[currentHeaderIndex], function(match){
            return chalk.black.bgYellow(match);
        });

        content = content.replace(links[currentLinkIndex], function(match){
            return chalk.cyan.bgBlack(match);
        });

        currentLinkIndex = -1;
        while(content.indexOf(links[currentLinkIndex]) <= content.indexOf(headers[currentHeaderIndex])) {
              currentLinkIndex++;
        }
        currentLinkIndex--;
        if(currentHeaderIndex !== -1){
            box.scrollTo(getLineFromPos(content, content.indexOf(headers[currentHeaderIndex])) - 10);
        } else {
            box.scrollTo(0);
        }
        screen.rerenderContent(content);
      });
      
      //set box content, focus, and render screen
      screen.rerenderContent = function(content){
        box.setContent(content);
        box.focus();
        screen.render();
      };
      
      //render first page
      input.value = commander.article;
      form.submit();
      screen.render();
    }
