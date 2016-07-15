[![Build Status](https://travis-ci.org/scrussell24/turkey.svg?branch=master)](https://travis-ci.org/scrussell24/turkey)
# Turkey - Terminal Wiki Browser
Turkey is a terminal application for browsing Mediawiki websites, such as wikipedia.org. See
example.txt for some example wikis to browse.
Windows is not supported at this time.
## Installation
node.js is required
```
npm install -g turkey
```
make sure it works
```
tky --version
```
## Usage Example
Load English language wikipedia main page
```
tky
```
Equivalent
```
tky -w en.wikipedia.org -p /w
```
Load specific article
```
tky -a elephant
```
Load another wiki
```
tky -w awoiaf.westeros.org -a Essos
```
dump to console
```
tky -a elephant --dump
```
![screenshot](http://i.imgur.com/mBalZZp.png "elephant")

## Command Line - tky
arg | description | example | default
--- | --- | --- | ---
-w --wiki `<url>`| wiki url | en.wikipedia.org | en.wikipedia.org
-p --path `<path>`| wiki path | /w | /w
-a --article `<article_name>`| article name to read | elephant | Main_page
-d --dump | dump to console | NA | NA

## Terminal UI Keyboard Shortcuts
shortcut | description
--- | ---
esc, q, C-c | quit 
spacebar, C-s | focus search bar
C-b | focus article box
left arrow | back, hit enter when you find the article you would like to reload
right arrow | forward, hit enter when you find the article you would like to reload
d | highlight and scroll to next link and hit enter to load
a | highlight and scroll to previous link and hit enter to load
s | highlight and scroll to next header (from current link)
w | highlight and scroll to previous header (from current link)

## Tested OS
* OSX
* Ubuntu

## TODO
* It's really raw right now and needs a lot of refactoring (don't judge ;) )
* Needs some unit testing and CI
* Add wiki alias file, should it default to english wikipedia?
* Feel free to submit any issues/ideas



