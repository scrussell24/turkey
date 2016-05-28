# Terminal Wiki Browser
Turkey is currently in beta. It's an terminal application 
for browsing wikimedia data. Feel free to submit a pull request.
## Installation
TODO: add to npm
```
git clone
npm install
npm link
```
## Usage
```
tky -w en.wikipedia.org -p /w -a elephants
```
## Command Line
command | description | example | required
--- | --- | --- | ---
-w --wiki | wiki URL | en.wikipedia.org | yes
-p --path | wiki path | /w | depends on wiki
-a --article | article name to read | elephant | no, will load Main_page by default
-d --dump | dump to console | NA | no

## Terminal UI Keyboard Shortcuts
shortcut | description
--- | ---
esc q C-c | quit 
spacebar C-s | focus search bar
C-b | focus article box
left arrow | back, hit enter when you find the article you would like to reload
right arrow | forward, hit enter when you find the article you would like to reload
d | hightlight and scroll next link and hit enter to load
a | hightlight and scroll previous link and hit enter to load
s | highlight and scroll to next header (from current link)
w | highlight and scroll to previous header (from current link)

## TODO

* It's really raw right now and needs a lot of refactoring (don't judge!).
* Needs some unit testing
* Needs some CI love
* Add wiki alias file
* Feel free to submit any issue



