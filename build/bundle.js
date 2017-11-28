/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bold-webfont.eot";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bolditalic-webfont.eot";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-light-webfont.eot";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-lightitalic-webfont.eot";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

'use strict';

(function ($) {

  var runAjax = function runAjax() {
    // Construct the url based on user selection
    var section = $('#select-section').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    var $gallery = $('.gallery');
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    // Clear the container and add a loading .gif
    $gallery.children().remove();
    $gallery.append('<img class="loader" src="images/ajax-loader.gif"/>');

    // Remove defaullt styling once a section is selected
    if (section !== 'section') {
      $('header').removeClass('no-selection');
      $('header').addClass('active');
      $('.logo').addClass('active-logo');
    }

    // Reset styling when section is selected
    if (section === 'section') {
      $('.loader').remove();
      $('header').addClass('no-selection');
      $('header').removeClass('active');
      $('.logo').removeClass('active-logo');
      return true;
    }

    // Retrieve data from NYT API
    $.ajax({
      url: url,
      method: 'GET'
    }).done(function (data) {
      //Remove Loading gif
      $gallery.children().remove();
      // Set article counter to keep track of articles being appended
      var articleCounter = 0;
      $.each(data.results, function (i, value) {

        // Check to see if image file exists, if there is no image, returning true continues to the next item in the loop
        if (value.multimedia.length === 0) {
          return true;
        }

        // Look for the highest quality image to display
        var bestQuality = value.multimedia.length - 1;
        var backgroundImage = value.multimedia[bestQuality].url;

        // set a unique class on each item for the background image + construct HTML 
        var imageNumber = 'image-container-' + i;
        var output = '<li class="gallery-item"><a href="';
        output += value.url;
        output += '"><div class="image-container ' + imageNumber + '">';
        output += '<p class="abstract pullUp">' + value.abstract + '</p>';
        output += '</div></a></li>';
        // Add elements to the DOM
        $gallery.append(output);

        //Selects image class and adds background image
        $('.' + imageNumber).css({
          'background-image': 'url("' + backgroundImage + '")',
          'background-size': 'cover',
          'background-position': 'center',
          'height': '100%'
        });

        // Increment to article counter after an item has been appended
        articleCounter++;

        // The loop will continue so long as the article counter does not equal 12
        // once 12 has been reached this will return false and end the .each loop
        return articleCounter !== 12;
      });
    }).fail(function () {
      $gallery.append('<li>Cannot retrieve articles</li>');
      return false;
    });
  };

  // Calls the function on page load, will maintain previous selection if coming back from an article
  runAjax();

  $('#select-section').on('change', function () {
    runAjax();
  });

  // Selectric Form Styling
  $('select').selectric();
})(jQuery);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(20)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/lib/loader.js??ref--2-3!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/lib/loader.js??ref--2-3!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(true);
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(" + __webpack_require__(0) + ");\n  src: url(" + __webpack_require__(0) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(8) + ") format(\"woff2\"), url(" + __webpack_require__(9) + ") format(\"truetype\"), url(" + __webpack_require__(10) + ") format(\"svg\");\n  font-weight: bold;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(" + __webpack_require__(1) + ");\n  src: url(" + __webpack_require__(1) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(11) + ") format(\"woff2\"), url(" + __webpack_require__(12) + ") format(\"truetype\"), url(" + __webpack_require__(13) + ") format(\"svg\");\n  font-weight: bold;\n  font-style: italic;\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(" + __webpack_require__(2) + ");\n  src: url(" + __webpack_require__(2) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(14) + ") format(\"woff2\"), url(" + __webpack_require__(15) + ") format(\"truetype\"), url(" + __webpack_require__(16) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(" + __webpack_require__(3) + ");\n  src: url(" + __webpack_require__(3) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(17) + ") format(\"woff2\"), url(" + __webpack_require__(18) + ") format(\"truetype\"), url(" + __webpack_require__(19) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: italic;\n}\n\n* {\n  box-sizing: border-box;\n}\n\na {\n  text-decoration: none;\n  color: #fff;\n}\n\nbody {\n  background-color: #000;\n  font-family: 'Open Sans', sans-serif;\n}\n\n.capitalize {\n  text-transform: uppercase;\n}\n\n.selection-header {\n  color: #fff;\n}\n\n.active {\n  transition: all 1s ease-in .5s;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n}\n\n@media (min-width: 600px) {\n  .active {\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    height: auto;\n    margin-bottom: 10px;\n  }\n}\n\n@media (min-width: 1240px) {\n  .active {\n    justify-content: flex-start;\n  }\n}\n\n.active-logo {\n  transition: all 0.5s ease-in-out 0.05s;\n}\n\n@media (min-width: 600px) {\n  .active-logo {\n    height: 75px;\n    margin: 20px;\n  }\n}\n\n.selection-container {\n  margin: 10px;\n}\n\n@media (min-width: 600px) {\n  .selection-container {\n    margin: 0 8%;\n  }\n}\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0;\n}\n\n.no-selection {\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n@media (min-width: 600px) {\n  .no-selection {\n    flex-direction: row;\n  }\n}\n\n@media (min-width: 1240px) {\n  .no-selection {\n    justify-content: flex-start;\n  }\n}\n\n.gallery {\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n}\n\n@media (min-width: 600px) {\n  .gallery {\n    margin: 0 auto;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: space-between;\n  }\n}\n\n@media (min-width: 1240px) {\n  .gallery {\n    max-width: 1500px;\n  }\n}\n\ndiv.image-container {\n  display: flex;\n  align-items: flex-end;\n}\n\n.gallery-item {\n  transition: all 0.05s ease 0.05s;\n  width: 100%;\n  height: 50vw;\n}\n\n@media (min-width: 600px) {\n  .gallery-item {\n    width: 50%;\n    height: 40vw;\n    max-height: 450px;\n  }\n}\n\n@media (min-width: 1240px) {\n  .gallery-item {\n    width: 25%;\n    height: 35vw;\n  }\n}\n\n.loader {\n  margin: 0 auto;\n  max-height: 100px;\n}\n\n.abstract,\n.pullup {\n  width: 100%;\n  background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n  line-height: 1.5rem;\n  padding: 0 10px;\n  min-height: 40%;\n}\n\n@media (min-width: 600px) {\n  .abstract,\n  .pullup {\n    overflow-y: hidden;\n    max-height: 0px;\n    visibility: hidden;\n  }\n}\n\n@media (min-width: 600px) {\n  .gallery-item:hover .pullUp {\n    animation-name: pullUp;\n    animation-duration: 0.3s;\n    animation-timing-function: ease-out;\n    transform-origin: 30% 100%;\n    max-height: 35%;\n    transform: translateY(0);\n    visibility: visible;\n  }\n}\n\n/*\n==============================================\npullUp\n==============================================\n*/\n\n@keyframes pullUp {\n  0% {\n    transform: scaleY(0.1);\n  }\n\n  40% {\n    transform: scaleY(0.7);\n  }\n\n  60% {\n    transform: scaleY(0.8);\n  }\n\n  80% {\n    transform: scaleY(0.9);\n  }\n\n  100% {\n    transform: scaleY(1);\n  }\n}\n\nfooter {\n  color: #c2c2c2;\n  text-align: center;\n  margin: 0 auto;\n  width: 100%;\n  padding: 30px 0;\n}\n\n@media (min-width: 1240px) {\n  footer {\n    text-align: left;\n    margin-left: 20px;\n  }\n}\n\n", "", {"version":3,"sources":["/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_reset.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/style.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_fonts.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_globals.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_header.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_mixins.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_content.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_footer.scss"],"names":[],"mappings":"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","file":"style.scss","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(\"../../public/fonts/opensans-bold-webfont.eot\");\n  src: url(\"../../public/fonts/opensans-bold-webfont.eot\") format(\"embedded-opentype\"), url(\"../../public/fonts/opensans-bold-webfont.woff2\") format(\"woff2\"), url(\"../../public/fonts/opensans-bold-webfont.ttf\") format(\"truetype\"), url(\"../../public/fonts/opensans-bold-webfont.svg\") format(\"svg\");\n  font-weight: bold;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(\"../../public/fonts/opensans-bolditalic-webfont.eot\");\n  src: url(\"../../public/fonts/opensans-bolditalic-webfont.eot\") format(\"embedded-opentype\"), url(\"../../public/fonts/opensans-bolditalic-webfont.woff2\") format(\"woff2\"), url(\"../../public/fonts/opensans-bolditalic-webfont.ttf\") format(\"truetype\"), url(\"../../public/fonts/opensans-bolditalic-webfont.svg\") format(\"svg\");\n  font-weight: bold;\n  font-style: italic;\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(\"../../public/fonts/opensans-light-webfont.eot\");\n  src: url(\"../../public/fonts/opensans-light-webfont.eot\") format(\"embedded-opentype\"), url(\"../../public/fonts/opensans-light-webfont.woff2\") format(\"woff2\"), url(\"../../public/fonts/opensans-light-webfont.ttf\") format(\"truetype\"), url(\"../../public/fonts/opensans-light-webfont.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  src: url(\"../../public/fonts/opensans-lightitalic-webfont.eot\");\n  src: url(\"../../public/fonts/opensans-lightitalic-webfont.eot\") format(\"embedded-opentype\"), url(\"../../public/fonts/opensans-lightitalic-webfont.woff2\") format(\"woff2\"), url(\"../../public/fonts/opensans-lightitalic-webfont.ttf\") format(\"truetype\"), url(\"../../public/fonts/opensans-lightitalic-webfont.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: italic;\n}\n\n* {\n  box-sizing: border-box;\n}\n\na {\n  text-decoration: none;\n  color: #fff;\n}\n\nbody {\n  background-color: #000;\n  font-family: 'Open Sans', sans-serif;\n}\n\n.capitalize {\n  text-transform: uppercase;\n}\n\n.selection-header {\n  color: #fff;\n}\n\n.active {\n  transition: all 1s ease-in .5s;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n}\n\n@media (min-width: 600px) {\n  .active {\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    height: auto;\n    margin-bottom: 10px;\n  }\n}\n\n@media (min-width: 1240px) {\n  .active {\n    justify-content: flex-start;\n  }\n}\n\n.active-logo {\n  transition: all 0.5s ease-in-out 0.05s;\n}\n\n@media (min-width: 600px) {\n  .active-logo {\n    height: 75px;\n    margin: 20px;\n  }\n}\n\n.selection-container {\n  margin: 10px;\n}\n\n@media (min-width: 600px) {\n  .selection-container {\n    margin: 0 8%;\n  }\n}\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0;\n}\n\n.no-selection {\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n@media (min-width: 600px) {\n  .no-selection {\n    flex-direction: row;\n  }\n}\n\n@media (min-width: 1240px) {\n  .no-selection {\n    justify-content: flex-start;\n  }\n}\n\n.gallery {\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n}\n\n@media (min-width: 600px) {\n  .gallery {\n    margin: 0 auto;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: space-between;\n  }\n}\n\n@media (min-width: 1240px) {\n  .gallery {\n    max-width: 1500px;\n  }\n}\n\ndiv.image-container {\n  display: flex;\n  align-items: flex-end;\n}\n\n.gallery-item {\n  transition: all 0.05s ease 0.05s;\n  width: 100%;\n  height: 50vw;\n}\n\n@media (min-width: 600px) {\n  .gallery-item {\n    width: 50%;\n    height: 40vw;\n    max-height: 450px;\n  }\n}\n\n@media (min-width: 1240px) {\n  .gallery-item {\n    width: 25%;\n    height: 35vw;\n  }\n}\n\n.loader {\n  margin: 0 auto;\n  max-height: 100px;\n}\n\n.abstract,\n.pullup {\n  width: 100%;\n  background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n  line-height: 1.5rem;\n  padding: 0 10px;\n  min-height: 40%;\n}\n\n@media (min-width: 600px) {\n  .abstract,\n  .pullup {\n    overflow-y: hidden;\n    max-height: 0px;\n    visibility: hidden;\n  }\n}\n\n@media (min-width: 600px) {\n  .gallery-item:hover .pullUp {\n    animation-name: pullUp;\n    animation-duration: 0.3s;\n    animation-timing-function: ease-out;\n    transform-origin: 30% 100%;\n    max-height: 35%;\n    transform: translateY(0);\n    visibility: visible;\n  }\n}\n\n/*\n==============================================\npullUp\n==============================================\n*/\n\n@keyframes pullUp {\n  0% {\n    transform: scaleY(0.1);\n  }\n\n  40% {\n    transform: scaleY(0.7);\n  }\n\n  60% {\n    transform: scaleY(0.8);\n  }\n\n  80% {\n    transform: scaleY(0.9);\n  }\n\n  100% {\n    transform: scaleY(1);\n  }\n}\n\nfooter {\n  color: #c2c2c2;\n  text-align: center;\n  margin: 0 auto;\n  width: 100%;\n  padding: 30px 0;\n}\n\n@media (min-width: 1240px) {\n  footer {\n    text-align: left;\n    margin-left: 20px;\n  }\n}\n\n","/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n\n\n\n@font-face {\n    font-family: 'Open Sans';\n    src: url('../../public/fonts/opensans-bold-webfont.eot');\n    src: url('../../public/fonts/opensans-bold-webfont.eot?#iefix') format('embedded-opentype'),\n         url('../../public/fonts/opensans-bold-webfont.woff2') format('woff2'),\n         url('../../public/fonts/opensans-bold-webfont.ttf') format('truetype'),\n         url('../../public/fonts/opensans-bold-webfont.svg#open_sansbold') format('svg');\n    font-weight: bold;\n    font-style: normal;\n\n}\n\n\n\n\n@font-face {\n    font-family: 'Open Sans';\n    src: url('../../public/fonts/opensans-bolditalic-webfont.eot');\n    src: url('../../public/fonts/opensans-bolditalic-webfont.eot?#iefix') format('embedded-opentype'),\n         url('../../public/fonts/opensans-bolditalic-webfont.woff2') format('woff2'),\n         url('../../public/fonts/opensans-bolditalic-webfont.ttf') format('truetype'),\n         url('../../public/fonts/opensans-bolditalic-webfont.svg#open_sansbold_italic') format('svg');\n    font-weight: bold;\n    font-style: italic;\n\n}\n\n\n\n\n@font-face {\n    font-family: 'Open Sans';\n    src: url('../../public/fonts/opensans-light-webfont.eot');\n    src: url('../../public/fonts/opensans-light-webfont.eot?#iefix') format('embedded-opentype'),\n         url('../../public/fonts/opensans-light-webfont.woff2') format('woff2'),\n         url('../../public/fonts/opensans-light-webfont.ttf') format('truetype'),\n         url('../../public/fonts/opensans-light-webfont.svg#open_sanslight') format('svg');\n    font-weight: normal;\n    font-style: normal;\n\n}\n\n\n\n\n@font-face {\n    font-family: 'Open Sans';\n    src: url('../../public/fonts/opensans-lightitalic-webfont.eot');\n    src: url('../../public/fonts/opensans-lightitalic-webfont.eot?#iefix') format('embedded-opentype'),\n         url('../../public/fonts/opensans-lightitalic-webfont.woff2') format('woff2'),\n         url('../../public/fonts/opensans-lightitalic-webfont.ttf') format('truetype'),\n         url('../../public/fonts/opensans-lightitalic-webfont.svg#open_sanslight_italic') format('svg');\n    font-weight: normal;\n    font-style: italic;\n\n}","*{\n    box-sizing: border-box;\n}\n\na {\n    text-decoration: none;\n    color: #fff;\n}\n\nbody {\n    background-color: #000;\n    font-family: 'Open Sans', sans-serif;\n}\n\n.capitalize{\n    text-transform: uppercase;\n}",".selection-header {\n    color: #fff;\n}\n\n.active{\n    transition: all 1s ease-in .5s;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n  @include tablet{\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    height: auto;\n    margin-bottom: 10px;\n  }\n  @include desktop {\n    justify-content: flex-start;\n  }\n}\n\n.active-logo{\n  transition: all 0.5s ease-in-out 0.05s;\n  @include tablet{\n    height: 75px;\n    margin: 20px;\n  }\n}\n\n.selection-container {\n  margin: 10px;\n  @include tablet{\n    margin: 0 8%;\n  }\n}\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0;\n}\n\n.no-selection{\n    height: 80vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    @include tablet{\n      flex-direction: row;\n    }\n    @include desktop {\n      justify-content: flex-start;\n    }\n}\n","@mixin tablet {\n  @media (min-width: $tablet-width) {\n    @content;\n  }\n}\n\n@mixin desktop {\n  @media (min-width: $desktop-width) {\n    @content;\n  }\n}","\n.gallery {\n    display: flex;\n    flex-direction: column;\n    color: #fff;\n    @include tablet {\n        margin: 0 auto;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n        justify-content: space-between;\n    }\n    @include desktop {\n        max-width: 1500px;  \n    }\n}\ndiv.image-container {\n     display: flex;\n     align-items: flex-end;\n}\n.gallery-item{\n    transition: all 0.05s ease 0.05s;\n    width: 100%;\n    height: 50vw;\n    @include tablet {\n        width: 50%;\n        height: 40vw;\n        max-height: 450px;\n    }\n    @include desktop {\n        width: 25%;\n        height: 35vw;\n    }\n}\n\n.loader{\n    margin: 0 auto;\n    max-height: 100px;\n}\n\n.abstract, .pullup {\n    width: 100%;\n    background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n    line-height: 1.5rem;\n    padding: 0 10px;\n    min-height: 40%;\n    @include tablet {\n        overflow-y: hidden;\n        max-height: 0px;\n        visibility: hidden;\n    }\n}\n\n.gallery-item:hover .pullUp {\n    @include tablet {\n        animation-name: pullUp;\n        \n\t    animation-duration: 0.3s;\t\n        \n\t    animation-timing-function: ease-out;\t\n        \n\t    transform-origin: 30% 100%;\n        \n        max-height: 35%;\n        transform: translateY(0);\n        visibility: visible;\n    }\n}\n\n/*\n==============================================\npullUp\n==============================================\n*/\n\n@keyframes pullUp {\n\t0% {\n\t\ttransform: scaleY(0.1);\n\t}\n\t40% {\n\t\ttransform: scaleY(0.7);\n\t}\n\t60% {\n\t\ttransform: scaleY(0.8);\n\t}\n\t80% {\n\t\ttransform: scaleY(0.9);\n\t}\n\t100% {\n\t\ttransform: scaleY(1.0);\n\t}\t\t\t\t\t\t\t\n}\n\n","\nfooter{\n    color: #c2c2c2;\n    text-align: center;\n    margin: 0 auto;\n    width: 100%;\n    padding: 30px 0;\n    @include desktop{\n        text-align: left;\n        margin-left: 20px;\n    }\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bold-webfont.woff2";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bold-webfont.ttf";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bold-webfont.svg";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bolditalic-webfont.woff2";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bolditalic-webfont.ttf";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-bolditalic-webfont.svg";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-light-webfont.woff2";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-light-webfont.ttf";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-light-webfont.svg";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-lightitalic-webfont.woff2";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-lightitalic-webfont.ttf";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/opensans-lightitalic-webfont.svg";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQxYzE4ZGFlNGQwNGEyMWY2MWEiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5lb3QiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5lb3QiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQuZW90Iiwid2VicGFjazovLy8uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LmVvdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2NyaXB0LmpzIiwid2VicGFjazovLy8uL3NyYy9zYXNzL3N0eWxlLnNjc3M/ODdjMyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9zdHlsZS5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LndvZmYyIiwid2VicGFjazovLy8uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQudHRmIiwid2VicGFjazovLy8uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuc3ZnIiwid2VicGFjazovLy8uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQud29mZjIiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC50dGYiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5zdmciLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQud29mZjIiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQudHRmIiwid2VicGFjazovLy8uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnN2ZyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC50dGYiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQuc3ZnIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbIiQiLCJydW5BamF4Iiwic2VjdGlvbiIsInZhbCIsInVybCIsIiRnYWxsZXJ5IiwicGFyYW0iLCJjaGlsZHJlbiIsInJlbW92ZSIsImFwcGVuZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJhamF4IiwibWV0aG9kIiwiZG9uZSIsImRhdGEiLCJhcnRpY2xlQ291bnRlciIsImVhY2giLCJyZXN1bHRzIiwiaSIsInZhbHVlIiwibXVsdGltZWRpYSIsImxlbmd0aCIsImJlc3RRdWFsaXR5IiwiYmFja2dyb3VuZEltYWdlIiwiaW1hZ2VOdW1iZXIiLCJvdXRwdXQiLCJhYnN0cmFjdCIsImNzcyIsImZhaWwiLCJvbiIsInNlbGVjdHJpYyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFD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QVcsT0FBTyxhQUFhLGVBQWUsVUFBVSxPQUFPLE1BQU0sVUFBVSxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sVUFBVSxPQUFPLFNBQVMsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxhQUFhLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLE9BQU8sTUFBTSxLQUFLLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sTUFBTSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxPQUFPLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1B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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGQxYzE4ZGFlNGQwNGEyMWY2MWEiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LmVvdFwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5lb3Rcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5lb3RcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQuZW90XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LmVvdFwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQuZW90XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LmVvdFwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQuZW90XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBcIi4uL3Nhc3Mvc3R5bGUuc2Nzc1wiO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCQpIHtcblxuICBjb25zdCBydW5BamF4ID0gKCkgPT4ge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgdXJsIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uXG4gICAgbGV0IHNlY3Rpb24gPSAkKCcjc2VsZWN0LXNlY3Rpb24nKS52YWwoKTtcbiAgICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm55dGltZXMuY29tL3N2Yy90b3BzdG9yaWVzL3YyLyR7c2VjdGlvbn0uanNvbmA7XG4gICAgbGV0ICRnYWxsZXJ5ID0gJCgnLmdhbGxlcnknKTtcbiAgICB1cmwgKz0gYD8keyQucGFyYW0oe1xuICAgICAgJ2FwaS1rZXknOiAnZTVhOGY0M2Y0NjRkNDQxNTg3NDM0MTExMjVmYWU5MWInXG4gICAgfSl9YDtcbiAgICAvLyBDbGVhciB0aGUgY29udGFpbmVyIGFuZCBhZGQgYSBsb2FkaW5nIC5naWZcbiAgICAkZ2FsbGVyeS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICRnYWxsZXJ5LmFwcGVuZCgnPGltZyBjbGFzcz1cImxvYWRlclwiIHNyYz1cImltYWdlcy9hamF4LWxvYWRlci5naWZcIi8+Jyk7XG5cbiAgICAvLyBSZW1vdmUgZGVmYXVsbHQgc3R5bGluZyBvbmNlIGEgc2VjdGlvbiBpcyBzZWxlY3RlZFxuICAgIGlmIChzZWN0aW9uICE9PSAnc2VjdGlvbicpIHtcbiAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCduby1zZWxlY3Rpb24nKTtcbiAgICAgICQoJ2hlYWRlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJy5sb2dvJykuYWRkQ2xhc3MoJ2FjdGl2ZS1sb2dvJyk7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgc3R5bGluZyB3aGVuIHNlY3Rpb24gaXMgc2VsZWN0ZWRcbiAgICBpZiAoc2VjdGlvbiA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICAkKCcubG9hZGVyJykucmVtb3ZlKCk7XG4gICAgICAkKCdoZWFkZXInKS5hZGRDbGFzcygnbm8tc2VsZWN0aW9uJyk7XG4gICAgICAkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcubG9nbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUtbG9nbycpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gUmV0cmlldmUgZGF0YSBmcm9tIE5ZVCBBUElcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkuZG9uZSgoZGF0YSkgPT4ge1xuICAgICAgLy9SZW1vdmUgTG9hZGluZyBnaWZcbiAgICAgICRnYWxsZXJ5LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAvLyBTZXQgYXJ0aWNsZSBjb3VudGVyIHRvIGtlZXAgdHJhY2sgb2YgYXJ0aWNsZXMgYmVpbmcgYXBwZW5kZWRcbiAgICAgIGxldCBhcnRpY2xlQ291bnRlciA9IDA7XG4gICAgICAkLmVhY2goZGF0YS5yZXN1bHRzLCAoaSwgdmFsdWUpID0+IHtcblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgaW1hZ2UgZmlsZSBleGlzdHMsIGlmIHRoZXJlIGlzIG5vIGltYWdlLCByZXR1cm5pbmcgdHJ1ZSBjb250aW51ZXMgdG8gdGhlIG5leHQgaXRlbSBpbiB0aGUgbG9vcFxuICAgICAgICBpZiAodmFsdWUubXVsdGltZWRpYS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvb2sgZm9yIHRoZSBoaWdoZXN0IHF1YWxpdHkgaW1hZ2UgdG8gZGlzcGxheVxuICAgICAgICBsZXQgYmVzdFF1YWxpdHkgPSB2YWx1ZS5tdWx0aW1lZGlhLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSB2YWx1ZS5tdWx0aW1lZGlhW2Jlc3RRdWFsaXR5XS51cmw7XG5cbiAgICAgICAgLy8gc2V0IGEgdW5pcXVlIGNsYXNzIG9uIGVhY2ggaXRlbSBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UgKyBjb25zdHJ1Y3QgSFRNTCBcbiAgICAgICAgbGV0IGltYWdlTnVtYmVyID0gYGltYWdlLWNvbnRhaW5lci0ke2l9YDtcbiAgICAgICAgbGV0IG91dHB1dCA9ICc8bGkgY2xhc3M9XCJnYWxsZXJ5LWl0ZW1cIj48YSBocmVmPVwiJztcbiAgICAgICAgb3V0cHV0ICs9IHZhbHVlLnVybDtcbiAgICAgICAgb3V0cHV0ICs9IGBcIj48ZGl2IGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyICR7aW1hZ2VOdW1iZXJ9XCI+YDtcbiAgICAgICAgb3V0cHV0ICs9IGA8cCBjbGFzcz1cImFic3RyYWN0IHB1bGxVcFwiPiR7dmFsdWUuYWJzdHJhY3R9PC9wPmA7XG4gICAgICAgIG91dHB1dCArPSAnPC9kaXY+PC9hPjwvbGk+JztcbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIHRoZSBET01cbiAgICAgICAgJGdhbGxlcnkuYXBwZW5kKG91dHB1dCk7XG5cbiAgICAgICAgLy9TZWxlY3RzIGltYWdlIGNsYXNzIGFuZCBhZGRzIGJhY2tncm91bmQgaW1hZ2VcbiAgICAgICAgJChgLiR7aW1hZ2VOdW1iZXJ9YCkuY3NzKHtcbiAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6IGB1cmwoXCIke2JhY2tncm91bmRJbWFnZX1cIilgLFxuICAgICAgICAgICdiYWNrZ3JvdW5kLXNpemUnOiAnY292ZXInLFxuICAgICAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogJ2NlbnRlcicsXG4gICAgICAgICAgJ2hlaWdodCc6ICcxMDAlJ1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbmNyZW1lbnQgdG8gYXJ0aWNsZSBjb3VudGVyIGFmdGVyIGFuIGl0ZW0gaGFzIGJlZW4gYXBwZW5kZWRcbiAgICAgICAgYXJ0aWNsZUNvdW50ZXIrKztcblxuICAgICAgICAvLyBUaGUgbG9vcCB3aWxsIGNvbnRpbnVlIHNvIGxvbmcgYXMgdGhlIGFydGljbGUgY291bnRlciBkb2VzIG5vdCBlcXVhbCAxMlxuICAgICAgICAvLyBvbmNlIDEyIGhhcyBiZWVuIHJlYWNoZWQgdGhpcyB3aWxsIHJldHVybiBmYWxzZSBhbmQgZW5kIHRoZSAuZWFjaCBsb29wXG4gICAgICAgIHJldHVybiBhcnRpY2xlQ291bnRlciAhPT0gMTI7XG4gICAgICB9KTtcbiAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICRnYWxsZXJ5LmFwcGVuZCgnPGxpPkNhbm5vdCByZXRyaWV2ZSBhcnRpY2xlczwvbGk+Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ2FsbHMgdGhlIGZ1bmN0aW9uIG9uIHBhZ2UgbG9hZCwgd2lsbCBtYWludGFpbiBwcmV2aW91cyBzZWxlY3Rpb24gaWYgY29taW5nIGJhY2sgZnJvbSBhbiBhcnRpY2xlXG4gIHJ1bkFqYXgoKTtcblxuICAkKCcjc2VsZWN0LXNlY3Rpb24nKS5vbignY2hhbmdlJywoKSA9PiB7XG4gICAgcnVuQWpheCgpO1xuICB9KTtcblxuICAvLyBTZWxlY3RyaWMgRm9ybSBTdHlsaW5nXG4gICQoJ3NlbGVjdCcpLnNlbGVjdHJpYygpO1xufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zY3JpcHQuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMi0xIS4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMi0zIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMi0xIS4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMi0zIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMi0xIS4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMi0zIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Fzcy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCxcXG5ib2R5LFxcbmRpdixcXG5zcGFuLFxcbmFwcGxldCxcXG5vYmplY3QsXFxuaWZyYW1lLFxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LFxcbnAsXFxuYmxvY2txdW90ZSxcXG5wcmUsXFxuYSxcXG5hYmJyLFxcbmFjcm9ueW0sXFxuYWRkcmVzcyxcXG5iaWcsXFxuY2l0ZSxcXG5jb2RlLFxcbmRlbCxcXG5kZm4sXFxuZW0sXFxuaW1nLFxcbmlucyxcXG5rYmQsXFxucSxcXG5zLFxcbnNhbXAsXFxuc21hbGwsXFxuc3RyaWtlLFxcbnN0cm9uZyxcXG5zdWIsXFxuc3VwLFxcbnR0LFxcbnZhcixcXG5iLFxcbnUsXFxuaSxcXG5jZW50ZXIsXFxuZGwsXFxuZHQsXFxuZGQsXFxub2wsXFxudWwsXFxubGksXFxuZmllbGRzZXQsXFxuZm9ybSxcXG5sYWJlbCxcXG5sZWdlbmQsXFxudGFibGUsXFxuY2FwdGlvbixcXG50Ym9keSxcXG50Zm9vdCxcXG50aGVhZCxcXG50cixcXG50aCxcXG50ZCxcXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmNhbnZhcyxcXG5kZXRhaWxzLFxcbmVtYmVkLFxcbmZpZ3VyZSxcXG5maWdjYXB0aW9uLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1lbnUsXFxubmF2LFxcbm91dHB1dCxcXG5ydWJ5LFxcbnNlY3Rpb24sXFxuc3VtbWFyeSxcXG50aW1lLFxcbm1hcmssXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmRldGFpbHMsXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxuXFxub2wsXFxudWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSxcXG5xIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsXFxuYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSxcXG5xOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKiEgRm9udHMgR2VuZXJhdGVkIGJ5IEZvbnQgU3F1aXJyZWwgKGh0dHBzOi8vd3d3LmZvbnRzcXVpcnJlbC5jb20pIG9uIE9jdG9iZXIgMTYsIDIwMTcgKi9cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcXG4gIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuZW90XCIpICsgXCIpO1xcbiAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5lb3RcIikgKyBcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC53b2ZmMlwiKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnR0ZlwiKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIiksIHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnN2Z1wiKSArIFwiKSBmb3JtYXQoXFxcInN2Z1xcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xcbiAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5lb3RcIikgKyBcIik7XFxuICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LmVvdFwiKSArIFwiKSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksIHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LndvZmYyXCIpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQudHRmXCIpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQuc3ZnXCIpICsgXCIpIGZvcm1hdChcXFwic3ZnXFxcIik7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XFxuICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC5lb3RcIikgKyBcIik7XFxuICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC5lb3RcIikgKyBcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQud29mZjJcIikgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQudHRmXCIpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnN2Z1wiKSArIFwiKSBmb3JtYXQoXFxcInN2Z1xcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XFxuICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC5lb3RcIikgKyBcIik7XFxuICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC5lb3RcIikgKyBcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQud29mZjJcIikgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQudHRmXCIpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LnN2Z1wiKSArIFwiKSBmb3JtYXQoXFxcInN2Z1xcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5jYXBpdGFsaXplIHtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5zZWxlY3Rpb24taGVhZGVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4uYWN0aXZlIHtcXG4gIHRyYW5zaXRpb246IGFsbCAxcyBlYXNlLWluIC41cztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgLmFjdGl2ZSB7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjQwcHgpIHtcXG4gIC5hY3RpdmUge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICB9XFxufVxcblxcbi5hY3RpdmUtbG9nbyB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dCAwLjA1cztcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuYWN0aXZlLWxvZ28ge1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxuICAgIG1hcmdpbjogMjBweDtcXG4gIH1cXG59XFxuXFxuLnNlbGVjdGlvbi1jb250YWluZXIge1xcbiAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gIC5zZWxlY3Rpb24tY29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAwIDglO1xcbiAgfVxcbn1cXG5cXG4uc2VsZWN0aW9uLWhlYWRlciB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dCAwLjA1cztcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG59XFxuXFxuLm5vLXNlbGVjdGlvbiB7XFxuICBoZWlnaHQ6IDgwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAubm8tc2VsZWN0aW9uIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgLm5vLXNlbGVjdGlvbiB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIH1cXG59XFxuXFxuLmdhbGxlcnkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuZ2FsbGVyeSB7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgLmdhbGxlcnkge1xcbiAgICBtYXgtd2lkdGg6IDE1MDBweDtcXG4gIH1cXG59XFxuXFxuZGl2LmltYWdlLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbn1cXG5cXG4uZ2FsbGVyeS1pdGVtIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjA1cyBlYXNlIDAuMDVzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDUwdnc7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgLmdhbGxlcnktaXRlbSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogNDB2dztcXG4gICAgbWF4LWhlaWdodDogNDUwcHg7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjQwcHgpIHtcXG4gIC5nYWxsZXJ5LWl0ZW0ge1xcbiAgICB3aWR0aDogMjUlO1xcbiAgICBoZWlnaHQ6IDM1dnc7XFxuICB9XFxufVxcblxcbi5sb2FkZXIge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBtYXgtaGVpZ2h0OiAxMDBweDtcXG59XFxuXFxuLmFic3RyYWN0LFxcbi5wdWxsdXAge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMzBkZWcsIHJnYmEoMzksIDM5LCAzOSwgMC41KSwgcmdiYSgzOSwgMzksIDM5LCAwLjUpKTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBtaW4taGVpZ2h0OiA0MCU7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgLmFic3RyYWN0LFxcbiAgLnB1bGx1cCB7XFxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gICAgbWF4LWhlaWdodDogMHB4O1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgLmdhbGxlcnktaXRlbTpob3ZlciAucHVsbFVwIHtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHB1bGxVcDtcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogMzAlIDEwMCU7XFxuICAgIG1heC1oZWlnaHQ6IDM1JTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgfVxcbn1cXG5cXG4vKlxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG5wdWxsVXBcXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuKi9cXG5cXG5Aa2V5ZnJhbWVzIHB1bGxVcCB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDAuMSk7XFxuICB9XFxuXFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjcpO1xcbiAgfVxcblxcbiAgNjAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC44KTtcXG4gIH1cXG5cXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDAuOSk7XFxuICB9XFxuXFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMSk7XFxuICB9XFxufVxcblxcbmZvb3RlciB7XFxuICBjb2xvcjogI2MyYzJjMjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAzMHB4IDA7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjQwcHgpIHtcXG4gIGZvb3RlciB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgfVxcbn1cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19yZXNldC5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3R5bGUuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19mb250cy5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3JjL3Nhc3MvX2dsb2JhbHMuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19oZWFkZXIuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19taXhpbnMuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19jb250ZW50LnNjc3NcIixcIi9Vc2Vycy9zY290dGxpdmluZ3N0b25lL3JlZC1hY2FkZW15L3Byb2plY3RzL3Byb2plY3QtMi9zcmMvc2Fzcy9zcmMvc2Fzcy9fZm9vdGVyLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztFQ0dFOztBREVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFhQyxVQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtDQ3FFQTs7QURuRUQsaURBQUE7O0FBQ0E7Ozs7Ozs7Ozs7O0VBRUMsZUFBQTtDQ2dGQTs7QUQ5RUQ7RUFDQyxlQUFBO0NDaUZBOztBRC9FRDs7RUFDQyxpQkFBQTtDQ21GQTs7QURqRkQ7O0VBQ0MsYUFBQTtDQ3FGQTs7QURuRkQ7Ozs7RUFFQyxZQUFBO0VBQ0EsY0FBQTtDQ3dGQTs7QUR0RkQ7RUFDQywwQkFBQTtFQUNBLGtCQUFBO0NDeUZBOztBQ3ZJRCwwRkFBQTs7QUFJQTtFQUNJLHlCQUFBO0VBQ0EsbUNBQUE7RUFDQSw2TUFBQTtFQUlBLGtCQUFBO0VBQ0EsbUJBQUE7Q0RxSUg7O0FDOUhEO0VBQ0kseUJBQUE7RUFDQSxtQ0FBQTtFQUNBLDZNQUFBO0VBSUEsa0JBQUE7RUFDQSxtQkFBQTtDRDhISDs7QUN2SEQ7RUFDSSx5QkFBQTtFQUNBLG9DQUFBO0VBQ0EsaU5BQUE7RUFJQSxvQkFBQTtFQUNBLG1CQUFBO0NEdUhIOztBQ2hIRDtFQUNJLHlCQUFBO0VBQ0Esb0NBQUE7RUFDQSxpTkFBQTtFQUlBLG9CQUFBO0VBQ0EsbUJBQUE7Q0RnSEg7O0FFektEO0VBQ0ksdUJBQUE7Q0Y0S0g7O0FFektEO0VBQ0ksc0JBQUE7RUFDQSxZQUFBO0NGNEtIOztBRXpLRDtFQUNJLHVCQUFBO0VBQ0EscUNBQUE7Q0Y0S0g7O0FFektEO0VBQ0ksMEJBQUE7Q0Y0S0g7O0FHM0xEO0VBQ0ksWUFBQTtDSDhMSDs7QUczTEQ7RUFDSSwrQkFBQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7Q0g4TEg7O0FJdE1DO0VER0Y7SUFPSSx3QkFBQTtJQUNBLG9CQUFBO0lBQ0Esb0JBQUE7SUFDQSxhQUFBO0lBQ0Esb0JBQUE7R0hpTUQ7Q0FDRjs7QUkxTUM7RURIRjtJQWNJLDRCQUFBO0dIb01EO0NBQ0Y7O0FHak1EO0VBQ0UsdUNBQUE7Q0hvTUQ7O0FJMU5DO0VEcUJGO0lBR0ksYUFBQTtJQUNBLGFBQUE7R0h1TUQ7Q0FDRjs7QUdwTUQ7RUFDRSxhQUFBO0NIdU1EOztBSXJPQztFRDZCRjtJQUdJLGFBQUE7R0gwTUQ7Q0FDRjs7QUd2TUQ7RUFDRSx1Q0FBQTtFQUNBLGdCQUFBO0NIME1EOztBR3ZNRDtFQUNJLGFBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLG9CQUFBO0NIME1IOztBSXhQQztFRHlDRjtJQU9NLG9CQUFBO0dINk1IO0NBQ0Y7O0FJeFBDO0VEbUNGO0lBVU0sNEJBQUE7R0hnTkg7Q0FDRjs7QUtwUUQ7RUFDSSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0NMdVFIOztBSTFRQztFQ0FGO0lBS1EsZUFBQTtJQUNBLGNBQUE7SUFDQSxvQkFBQTtJQUNBLGdCQUFBO0lBQ0EsK0JBQUE7R0wwUUw7Q0FDRjs7QUk5UUM7RUNORjtJQVlRLGtCQUFBO0dMNlFMO0NBQ0Y7O0FLM1FEO0VBQ0ssY0FBQTtFQUNBLHNCQUFBO0NMOFFKOztBSzVRRDtFQUNJLGlDQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7Q0wrUUg7O0FJclNDO0VDbUJGO0lBS1EsV0FBQTtJQUNBLGFBQUE7SUFDQSxrQkFBQTtHTGtSTDtDQUNGOztBSXZTQztFQ2FGO0lBVVEsV0FBQTtJQUNBLGFBQUE7R0xxUkw7Q0FDRjs7QUtsUkQ7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7Q0xxUkg7O0FLbFJEOztFQUNJLFlBQUE7RUFDQSx1RkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtDTHNSSDs7QUlsVUM7RUN1Q0Y7O0lBT1EsbUJBQUE7SUFDQSxnQkFBQTtJQUNBLG1CQUFBO0dMMFJMO0NBQ0Y7O0FJM1VDO0VDb0RGO0lBRVEsdUJBQUE7SUFFSCx5QkFBQTtJQUVBLG9DQUFBO0lBRUEsMkJBQUE7SUFFRyxnQkFBQTtJQUNBLHlCQUFBO0lBQ0Esb0JBQUE7R0xzUkw7Q0FDRjs7QUtuUkQ7Ozs7RUx5UkU7O0FLblJGO0VBQ0M7SUFDQyx1QkFBQTtHTHNSQzs7RUtwUkY7SUFDQyx1QkFBQTtHTHVSQzs7RUtyUkY7SUFDQyx1QkFBQTtHTHdSQzs7RUt0UkY7SUFDQyx1QkFBQTtHTHlSQzs7RUt2UkY7SUFDQyxxQkFBQTtHTDBSQztDQUNGOztBTW5YRDtFQUNJLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7Q05zWEg7O0FJclhDO0VFTkY7SUFPUSxpQkFBQTtJQUNBLGtCQUFBO0dOeVhMO0NBQ0ZcIixcImZpbGVcIjpcInN0eWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIixcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLFxcbmJvZHksXFxuZGl2LFxcbnNwYW4sXFxuYXBwbGV0LFxcbm9iamVjdCxcXG5pZnJhbWUsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsXFxucCxcXG5ibG9ja3F1b3RlLFxcbnByZSxcXG5hLFxcbmFiYnIsXFxuYWNyb255bSxcXG5hZGRyZXNzLFxcbmJpZyxcXG5jaXRlLFxcbmNvZGUsXFxuZGVsLFxcbmRmbixcXG5lbSxcXG5pbWcsXFxuaW5zLFxcbmtiZCxcXG5xLFxcbnMsXFxuc2FtcCxcXG5zbWFsbCxcXG5zdHJpa2UsXFxuc3Ryb25nLFxcbnN1YixcXG5zdXAsXFxudHQsXFxudmFyLFxcbmIsXFxudSxcXG5pLFxcbmNlbnRlcixcXG5kbCxcXG5kdCxcXG5kZCxcXG5vbCxcXG51bCxcXG5saSxcXG5maWVsZHNldCxcXG5mb3JtLFxcbmxhYmVsLFxcbmxlZ2VuZCxcXG50YWJsZSxcXG5jYXB0aW9uLFxcbnRib2R5LFxcbnRmb290LFxcbnRoZWFkLFxcbnRyLFxcbnRoLFxcbnRkLFxcbmFydGljbGUsXFxuYXNpZGUsXFxuY2FudmFzLFxcbmRldGFpbHMsXFxuZW1iZWQsXFxuZmlndXJlLFxcbmZpZ2NhcHRpb24sXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxub3V0cHV0LFxcbnJ1YnksXFxuc2VjdGlvbixcXG5zdW1tYXJ5LFxcbnRpbWUsXFxubWFyayxcXG5hdWRpbyxcXG52aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcblxcbmFydGljbGUsXFxuYXNpZGUsXFxuZGV0YWlscyxcXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5mb290ZXIsXFxuaGVhZGVyLFxcbmhncm91cCxcXG5tZW51LFxcbm5hdixcXG5zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5cXG5vbCxcXG51bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlLFxcbnEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSxcXG5ibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLFxcbnE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbi8qISBGb250cyBHZW5lcmF0ZWQgYnkgRm9udCBTcXVpcnJlbCAoaHR0cHM6Ly93d3cuZm9udHNxdWlycmVsLmNvbSkgb24gT2N0b2JlciAxNiwgMjAxNyAqL1xcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xcbiAgc3JjOiB1cmwoXFxcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuZW90XFxcIik7XFxuICBzcmM6IHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5lb3RcXFwiKSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksIHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnR0ZlxcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnN2Z1xcXCIpIGZvcm1hdChcXFwic3ZnXFxcIik7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XFxuICBzcmM6IHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5lb3RcXFwiKTtcXG4gIHNyYzogdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LmVvdFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLCB1cmwoXFxcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQuc3ZnXFxcIikgZm9ybWF0KFxcXCJzdmdcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcXG4gIHNyYzogdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC5lb3RcXFwiKTtcXG4gIHNyYzogdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC5lb3RcXFwiKSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksIHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLCB1cmwoXFxcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnN2Z1xcXCIpIGZvcm1hdChcXFwic3ZnXFxcIik7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcXG4gIHNyYzogdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC5lb3RcXFwiKTtcXG4gIHNyYzogdXJsKFxcXCIuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC5lb3RcXFwiKSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksIHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLCB1cmwoXFxcIi4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LnN2Z1xcXCIpIGZvcm1hdChcXFwic3ZnXFxcIik7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmNhcGl0YWxpemUge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5hY3RpdmUge1xcbiAgdHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW4gLjVzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuYWN0aXZlIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgLmFjdGl2ZSB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIH1cXG59XFxuXFxuLmFjdGl2ZS1sb2dvIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0IDAuMDVzO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gIC5hY3RpdmUtbG9nbyB7XFxuICAgIGhlaWdodDogNzVweDtcXG4gICAgbWFyZ2luOiAyMHB4O1xcbiAgfVxcbn1cXG5cXG4uc2VsZWN0aW9uLWNvbnRhaW5lciB7XFxuICBtYXJnaW46IDEwcHg7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgLnNlbGVjdGlvbi1jb250YWluZXIge1xcbiAgICBtYXJnaW46IDAgOCU7XFxuICB9XFxufVxcblxcbi5zZWxlY3Rpb24taGVhZGVyIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0IDAuMDVzO1xcbiAgcGFkZGluZzogMTBweCAwO1xcbn1cXG5cXG4ubm8tc2VsZWN0aW9uIHtcXG4gIGhlaWdodDogODB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gIC5uby1zZWxlY3Rpb24ge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAubm8tc2VsZWN0aW9uIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgfVxcbn1cXG5cXG4uZ2FsbGVyeSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gIC5nYWxsZXJ5IHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAuZ2FsbGVyeSB7XFxuICAgIG1heC13aWR0aDogMTUwMHB4O1xcbiAgfVxcbn1cXG5cXG5kaXYuaW1hZ2UtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxufVxcblxcbi5nYWxsZXJ5LWl0ZW0ge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMDVzIGVhc2UgMC4wNXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNTB2dztcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuZ2FsbGVyeS1pdGVtIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgaGVpZ2h0OiA0MHZ3O1xcbiAgICBtYXgtaGVpZ2h0OiA0NTBweDtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgLmdhbGxlcnktaXRlbSB7XFxuICAgIHdpZHRoOiAyNSU7XFxuICAgIGhlaWdodDogMzV2dztcXG4gIH1cXG59XFxuXFxuLmxvYWRlciB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xcbn1cXG5cXG4uYWJzdHJhY3QsXFxuLnB1bGx1cCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgzMGRlZywgcmdiYSgzOSwgMzksIDM5LCAwLjUpLCByZ2JhKDM5LCAzOSwgMzksIDAuNSkpO1xcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG4gIG1pbi1oZWlnaHQ6IDQwJTtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuYWJzdHJhY3QsXFxuICAucHVsbHVwIHtcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgICBtYXgtaGVpZ2h0OiAwcHg7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuZ2FsbGVyeS1pdGVtOmhvdmVyIC5wdWxsVXAge1xcbiAgICBhbmltYXRpb24tbmFtZTogcHVsbFVwO1xcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuM3M7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAzMCUgMTAwJTtcXG4gICAgbWF4LWhlaWdodDogMzUlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICB9XFxufVxcblxcbi8qXFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbnB1bGxVcFxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG4qL1xcblxcbkBrZXlmcmFtZXMgcHVsbFVwIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC4xKTtcXG4gIH1cXG5cXG4gIDQwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDAuNyk7XFxuICB9XFxuXFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjgpO1xcbiAgfVxcblxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC45KTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcXG4gIH1cXG59XFxuXFxuZm9vdGVyIHtcXG4gIGNvbG9yOiAjYzJjMmMyO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDMwcHggMDtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgZm9vdGVyIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICB9XFxufVxcblxcblwiLFwiLyohIEZvbnRzIEdlbmVyYXRlZCBieSBGb250IFNxdWlycmVsIChodHRwczovL3d3dy5mb250c3F1aXJyZWwuY29tKSBvbiBPY3RvYmVyIDE2LCAyMDE3ICovXFxuXFxuXFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcXG4gICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuZW90Jyk7XFxuICAgIHNyYzogdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyksXFxuICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnN2ZyNvcGVuX3NhbnNib2xkJykgZm9ybWF0KCdzdmcnKTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG5cXG59XFxuXFxuXFxuXFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcXG4gICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQuZW90Jyk7XFxuICAgIHNyYzogdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyksXFxuICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LnN2ZyNvcGVuX3NhbnNib2xkX2l0YWxpYycpIGZvcm1hdCgnc3ZnJyk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuXFxufVxcblxcblxcblxcblxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XFxuICAgIHNyYzogdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC5lb3QnKTtcXG4gICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcXG4gICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnN2ZyNvcGVuX3NhbnNsaWdodCcpIGZvcm1hdCgnc3ZnJyk7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG5cXG59XFxuXFxuXFxuXFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcXG4gICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LmVvdCcpO1xcbiAgICBzcmM6IHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXG4gICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpLFxcbiAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQuc3ZnI29wZW5fc2Fuc2xpZ2h0X2l0YWxpYycpIGZvcm1hdCgnc3ZnJyk7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG5cXG59XCIsXCIqe1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5hIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmNhcGl0YWxpemV7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVwiLFwiLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuLmFjdGl2ZXtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW4gLjVzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgQGluY2x1ZGUgdGFibGV0e1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgfVxcbiAgQGluY2x1ZGUgZGVza3RvcCB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIH1cXG59XFxuXFxuLmFjdGl2ZS1sb2dve1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQgMC4wNXM7XFxuICBAaW5jbHVkZSB0YWJsZXR7XFxuICAgIGhlaWdodDogNzVweDtcXG4gICAgbWFyZ2luOiAyMHB4O1xcbiAgfVxcbn1cXG5cXG4uc2VsZWN0aW9uLWNvbnRhaW5lciB7XFxuICBtYXJnaW46IDEwcHg7XFxuICBAaW5jbHVkZSB0YWJsZXR7XFxuICAgIG1hcmdpbjogMCA4JTtcXG4gIH1cXG59XFxuXFxuLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQgMC4wNXM7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxufVxcblxcbi5uby1zZWxlY3Rpb257XFxuICAgIGhlaWdodDogODB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIEBpbmNsdWRlIHRhYmxldHtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICB9XFxuICAgIEBpbmNsdWRlIGRlc2t0b3Age1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgfVxcbn1cXG5cIixcIkBtaXhpbiB0YWJsZXQge1xcbiAgQG1lZGlhIChtaW4td2lkdGg6ICR0YWJsZXQtd2lkdGgpIHtcXG4gICAgQGNvbnRlbnQ7XFxuICB9XFxufVxcblxcbkBtaXhpbiBkZXNrdG9wIHtcXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkZGVza3RvcC13aWR0aCkge1xcbiAgICBAY29udGVudDtcXG4gIH1cXG59XCIsXCJcXG4uZ2FsbGVyeSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBAaW5jbHVkZSB0YWJsZXQge1xcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgfVxcbiAgICBAaW5jbHVkZSBkZXNrdG9wIHtcXG4gICAgICAgIG1heC13aWR0aDogMTUwMHB4OyAgXFxuICAgIH1cXG59XFxuZGl2LmltYWdlLWNvbnRhaW5lciB7XFxuICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbn1cXG4uZ2FsbGVyeS1pdGVte1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4wNXMgZWFzZSAwLjA1cztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogNTB2dztcXG4gICAgQGluY2x1ZGUgdGFibGV0IHtcXG4gICAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgICBoZWlnaHQ6IDQwdnc7XFxuICAgICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcXG4gICAgfVxcbiAgICBAaW5jbHVkZSBkZXNrdG9wIHtcXG4gICAgICAgIHdpZHRoOiAyNSU7XFxuICAgICAgICBoZWlnaHQ6IDM1dnc7XFxuICAgIH1cXG59XFxuXFxuLmxvYWRlcntcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG1heC1oZWlnaHQ6IDEwMHB4O1xcbn1cXG5cXG4uYWJzdHJhY3QsIC5wdWxsdXAge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDMwZGVnLCByZ2JhKDM5LCAzOSwgMzksIDAuNSksIHJnYmEoMzksIDM5LCAzOSwgMC41KSk7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgbWluLWhlaWdodDogNDAlO1xcbiAgICBAaW5jbHVkZSB0YWJsZXQge1xcbiAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgICAgICAgbWF4LWhlaWdodDogMHB4O1xcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICB9XFxufVxcblxcbi5nYWxsZXJ5LWl0ZW06aG92ZXIgLnB1bGxVcCB7XFxuICAgIEBpbmNsdWRlIHRhYmxldCB7XFxuICAgICAgICBhbmltYXRpb24tbmFtZTogcHVsbFVwO1xcbiAgICAgICAgXFxuXFx0ICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4zcztcXHRcXG4gICAgICAgIFxcblxcdCAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXHRcXG4gICAgICAgIFxcblxcdCAgICB0cmFuc2Zvcm0tb3JpZ2luOiAzMCUgMTAwJTtcXG4gICAgICAgIFxcbiAgICAgICAgbWF4LWhlaWdodDogMzUlO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgfVxcbn1cXG5cXG4vKlxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG5wdWxsVXBcXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuKi9cXG5cXG5Aa2V5ZnJhbWVzIHB1bGxVcCB7XFxuXFx0MCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDAuMSk7XFxuXFx0fVxcblxcdDQwJSB7XFxuXFx0XFx0dHJhbnNmb3JtOiBzY2FsZVkoMC43KTtcXG5cXHR9XFxuXFx0NjAlIHtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlWSgwLjgpO1xcblxcdH1cXG5cXHQ4MCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDAuOSk7XFxuXFx0fVxcblxcdDEwMCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XFxuXFx0fVxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcbn1cXG5cXG5cIixcIlxcbmZvb3RlcntcXG4gICAgY29sb3I6ICNjMmMyYzI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAzMHB4IDA7XFxuICAgIEBpbmNsdWRlIGRlc2t0b3B7XFxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9zcmMvc2Fzcy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQud29mZjJcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQud29mZjJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC50dGZcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQudHRmXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuc3ZnXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnN2Z1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC53b2ZmMlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC53b2ZmMlxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC50dGZcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQudHRmXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LnN2Z1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5zdmdcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LndvZmYyXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC53b2ZmMlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQudHRmXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC50dGZcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnN2Z1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQuc3ZnXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC53b2ZmMlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQud29mZjJcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LnR0ZlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQudHRmXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHRpdGFsaWMtd2ViZm9udC5zdmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LnN2Z1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==