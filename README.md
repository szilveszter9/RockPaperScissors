# Rock Paper Scissors

* Written in pure JavaScript ES6/ES7 tested with Jest (Jasmine underneath)

## Online
* http://szilveszter9.github.io

## Install
```
git clone git@bitbucket.org:szilveszter9/rock-paper-scissors.git
cd rock-paper-scissors
npm install
```

## Bundle
* Run each script in a separate terminal
```
npm run bundle:scripts
npm run bundle:styles
npm run bundle:static
```

## Test
* This script is watching the dist/ folder but includes from the src/ folder

(makes it easier to manage the test coverage do not have to deal with sourcemaps)
```
npm test
```
## Test coverage
* Npm test will generate the report in `coverage/lcov-report/index.html`
* Side note: The current process has some issues with the `branches` column with ES6, other columns are fine

## To be improved
* Players' symbolic images to the sides on the rule's image
* Fix transition on click on next button in the Computer vs Computer game
* New features like collecting badges
* Support Retina display
* Support Safari
* More inspects in functional tests
* Selenium test in real browsers
* Separate bundle for MSIE with es6-shim (other browsers do not need the shim)
* Soak test to reveal memory leaks if any later on
* Fix on MSIE 8

## Architecture
* Please find in the ARCHITECTURE.md file

## Notes

### Why functional tests in Jest / Jasmine?
* Because it is faster and keeps more discipline (no setTimeouts)
* Side note: still need to have tests run in real browsers

### Why nodent instead of babel's await/async transformer plugin?
* Because it works very well for all the edgecases as well and it is fast
* Could be transpiled to callbacks / promises / generators
* Side note: $return is not standard in Async/Await

### Why postCSS instead of Less / Sass?
* Because it's more likely to be the standard in modern browsers in the future

### Images
* Image sources are from the internet, for demo purpose only

## Tested on
* various display sizes
* Chromium 51
* Firefox 46
* Opera 37
* Microsoft Edge 25
* Microsoft Explorer 9, 10, 11
