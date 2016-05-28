# Terminal Wiki Browser
Turkey is a terminal application for browsing Mediawiki websites, such as `<wikipedia.org>`. See
example_wikis.txt for some example wikis to browse.
## Installation
```
npm install -g turkey
```
make sure it works
```
tky --version
```
## Usage Example
```
tky -w en.wikipedia.org -p /w -a elephants
```
## Command Line
command | description | example | required
--- | --- | --- | ---
-w --wiki `<url>`| wiki URL | en.wikipedia.org | yes
-p --path `<path>`| wiki path | /w | depends on wiki
-a --article `<article_name>`| article name to read | elephant | no, will load Main_page by default
-d --dump | dump to console | NA | no

## Terminal UI Keyboard Shortcuts
shortcut | description
--- | ---
esc, q, C-c | quit 
spacebar, C-s | focus search bar
C-b | focus article box
left arrow | back, hit enter when you find the article you would like to reload
right arrow | forward, hit enter when you find the article you would like to reload
d | hightlight and scroll to next link and hit enter to load
a | hightlight and scroll to previous link and hit enter to load
s | highlight and scroll to next header (from current link)
w | highlight and scroll to previous header (from current link)

## Tested OS

* OSX

## TODO

* It's really raw right now and needs a lot of refactoring (don't judge, please!).
* Needs some unit testing
* Add wiki alias file
* Feel free to submit any issues



