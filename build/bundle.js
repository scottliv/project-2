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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n* {\n  box-sizing: border-box; }\n\na {\n  text-decoration: none;\n  color: #fff; }\n\nbody {\n  background-color: #000;\n  font-family: 'Open Sans', sans-serif; }\n\n.capitalize {\n  text-transform: uppercase; }\n\n.selection-header {\n  color: #fff; }\n\n.active {\n  transition: all 1s ease-in .5s;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center; }\n  @media (min-width: 600px) {\n    .active {\n      justify-content: center;\n      align-items: center;\n      flex-direction: row;\n      height: auto;\n      margin-bottom: 10px; } }\n  @media (min-width: 1240px) {\n    .active {\n      justify-content: flex-start; } }\n\n.active-logo {\n  transition: all 0.5s ease-in-out 0.05s; }\n  @media (min-width: 600px) {\n    .active-logo {\n      height: 75px;\n      margin: 20px; } }\n\n.selection-container {\n  margin: 10px; }\n  @media (min-width: 600px) {\n    .selection-container {\n      margin: 0 8%; } }\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0; }\n\n.no-selection {\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n  @media (min-width: 600px) {\n    .no-selection {\n      flex-direction: row; } }\n  @media (min-width: 1240px) {\n    .no-selection {\n      justify-content: flex-start; } }\n\n.gallery {\n  display: flex;\n  flex-direction: column;\n  color: #fff; }\n  @media (min-width: 600px) {\n    .gallery {\n      margin: 0 auto;\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      justify-content: space-between; } }\n  @media (min-width: 1240px) {\n    .gallery {\n      max-width: 1500px; } }\n\ndiv.image-container {\n  display: flex;\n  align-items: flex-end; }\n\n.gallery-item {\n  transition: all 0.05s ease 0.05s;\n  width: 100%;\n  height: 50vw; }\n  @media (min-width: 600px) {\n    .gallery-item {\n      width: 50%;\n      height: 40vw;\n      max-height: 450px; } }\n  @media (min-width: 1240px) {\n    .gallery-item {\n      width: 25%;\n      height: 35vw; } }\n\n.loader {\n  margin: 0 auto;\n  max-height: 100px; }\n\n.abstract, .pullup {\n  width: 100%;\n  background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n  line-height: 1.5rem;\n  padding: 0 10px;\n  min-height: 40%; }\n  @media (min-width: 600px) {\n    .abstract, .pullup {\n      overflow-y: hidden;\n      max-height: 0px;\n      visibility: hidden; } }\n\n@media (min-width: 600px) {\n  .gallery-item:hover .pullUp {\n    animation-name: pullUp;\n    animation-duration: 0.3s;\n    animation-timing-function: ease-out;\n    transform-origin: 30% 100%;\n    max-height: 35%;\n    transform: translateY(0);\n    visibility: visible; } }\n\n/*\n==============================================\npullUp\n==============================================\n*/\n@keyframes pullUp {\n  0% {\n    transform: scaleY(0.1); }\n  40% {\n    transform: scaleY(0.7); }\n  60% {\n    transform: scaleY(0.8); }\n  80% {\n    transform: scaleY(0.9); }\n  100% {\n    transform: scaleY(1); } }\n\nfooter {\n  color: #c2c2c2;\n  text-align: center;\n  margin: 0 auto;\n  width: 100%;\n  padding: 30px 0; }\n  @media (min-width: 1240px) {\n    footer {\n      text-align: left;\n      margin-left: 20px; } }\n", "", {"version":3,"sources":["/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_reset.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_fonts.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_globals.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_header.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_mixins.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_content.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_footer.scss"],"names":[],"mappings":"AAAA;;;EAGE;AAEF;;;;;;;;;;;;;EAaC,UAAS;EACT,WAAU;EACV,UAAS;EACT,gBAAe;EACf,cAAa;EACb,yBAAwB,EACxB;;AACD,iDAAiD;AACjD;;EAEC,eAAc,EACd;;AACD;EACC,eAAc,EACd;;AACD;EACC,iBAAgB,EAChB;;AACD;EACC,aAAY,EACZ;;AACD;;EAEC,YAAW;EACX,cAAa,EACb;;AACD;EACC,0BAAyB;EACzB,kBAAiB,EACjB;;AC/CD,0FAA0F;ACA1F;EACI,uBAAsB,EACzB;;AAED;EACI,sBAAqB;EACrB,YAAW,EACd;;AAED;EACI,uBAAsB;EACtB,qCAAoC,EACvC;;AAED;EACI,0BAAyB,EAC5B;;AChBD;EACI,YAAW,EACd;;AAED;EACI,+BAA8B;EAC9B,cAAa;EACb,uBAAsB;EACtB,wBAAuB;EACvB,mBAAkB,EAWrB;ECnBC;IDGF;MAOI,wBAAuB;MACvB,oBAAmB;MACnB,oBAAmB;MACnB,aAAY;MACZ,oBAAmB,EAKtB,EAAA;ECbC;IDHF;MAcI,4BAA2B,EAE9B,EAAA;;AAED;EACE,uCAAsC,EAKvC;EC3BC;IDqBF;MAGI,aAAY;MACZ,aAAY,EAEf,EAAA;;AAED;EACE,aAAY,EAIb;EClCC;ID6BF;MAGI,aAAY,EAEf,EAAA;;AAED;EACE,uCAAsC;EACtC,gBAAe,EAChB;;AAED;EACI,aAAY;EACZ,cAAa;EACb,uBAAsB;EACtB,wBAAuB;EACvB,oBAAmB,EAOtB;ECrDC;IDyCF;MAOM,oBAAmB,EAKxB,EAAA;EC/CC;IDmCF;MAUM,4BAA2B,EAEhC,EAAA;;AErDD;EACI,cAAa;EACb,uBAAsB;EACtB,YAAW,EAWd;EDdC;ICAF;MAKQ,eAAc;MACd,cAAa;MACb,oBAAmB;MACnB,gBAAe;MACf,+BAA8B,EAKrC,EAAA;EDRC;ICNF;MAYQ,kBAAiB,EAExB,EAAA;;AACD;EACK,cAAa;EACb,sBAAqB,EACzB;;AACD;EACI,iCAAgC;EAChC,YAAW;EACX,aAAY,EAUf;EDhCC;ICmBF;MAKQ,WAAU;MACV,aAAY;MACZ,kBAAiB,EAMxB,EAAA;ED1BC;ICaF;MAUQ,WAAU;MACV,aAAY,EAEnB,EAAA;;AAED;EACI,eAAc;EACd,kBAAiB,EACpB;;AAED;EACI,YAAW;EACX,uFAAsF;EACtF,oBAAmB;EACnB,gBAAe;EACf,gBAAe,EAMlB;EDlDC;ICuCF;MAOQ,mBAAkB;MAClB,gBAAe;MACf,mBAAkB,EAEzB,EAAA;;ADlDC;ECoDF;IAEQ,uBAAsB;IAEzB,yBAAwB;IAExB,oCAAmC;IAEnC,2BAA0B;IAEvB,gBAAe;IACf,yBAAwB;IACxB,oBAAmB,EAE1B,EAAA;;AAED;;;;EAIE;AAEF;EACC;IACC,uBAAsB,EAAA;EAEvB;IACC,uBAAsB,EAAA;EAEvB;IACC,uBAAsB,EAAA;EAEvB;IACC,uBAAsB,EAAA;EAEvB;IACC,qBAAsB,EAAA,EAAA;;ACxFxB;EACI,eAAc;EACd,mBAAkB;EAClB,eAAc;EACd,YAAW;EACX,gBAAe,EAKlB;EFJC;IENF;MAOQ,iBAAgB;MAChB,kBAAiB,EAExB,EAAA","file":"style.scss","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}","/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n\n\n\n// @font-face {\n//     font-family: 'Open Sans';\n//     src: url('/public/fonts/opensans-bold-webfont.eot');\n//     src: url('/public/fonts/opensans-bold-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('/public/fonts/opensans-bold-webfont.woff2') format('woff2'),\n//          url('/public/fonts/opensans-bold-webfont.ttf') format('truetype'),\n//          url('/public/fonts/opensans-bold-webfont.svg#open_sansbold') format('svg');\n//     font-weight: bold;\n//     font-style: normal;\n\n// }\n\n\n\n\n// @font-face {\n//     font-family: 'Open Sans';\n//     src: url('/public/fonts/opensans-bolditalic-webfont.eot');\n//     src: url('/public/fonts/opensans-bolditalic-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('/public/fonts/opensans-bolditalic-webfont.woff2') format('woff2'),\n//          url('/public/fonts/opensans-bolditalic-webfont.ttf') format('truetype'),\n//          url('/public/fonts/opensans-bolditalic-webfont.svg#open_sansbold_italic') format('svg');\n//     font-weight: bold;\n//     font-style: italic;\n\n// }\n\n\n\n\n// @font-face {\n//     font-family: 'Open Sans';\n//     src: url('/public/fonts/opensans-light-webfont.eot');\n//     src: url('/public/fonts/opensans-light-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('/public/fonts/opensans-light-webfont.woff2') format('woff2'),\n//          url('/public/fonts/opensans-light-webfont.ttf') format('truetype'),\n//          url('/public/fonts/opensans-light-webfont.svg#open_sanslight') format('svg');\n//     font-weight: normal;\n//     font-style: normal;\n\n// }\n\n\n\n\n// @font-face {\n//     font-family: 'Open Sans';\n//     src: url('/public/fonts/opensans-lightitalic-webfont.eot');\n//     src: url('/public/fonts/opensans-lightitalic-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('/public/fonts/opensans-lightitalic-webfont.woff2') format('woff2'),\n//          url('/public/fonts/opensans-lightitalic-webfont.ttf') format('truetype'),\n//          url('/public/fonts/opensans-lightitalic-webfont.svg#open_sanslight_italic') format('svg');\n//     font-weight: normal;\n//     font-style: italic;\n\n// }","*{\n    box-sizing: border-box;\n}\n\na {\n    text-decoration: none;\n    color: #fff;\n}\n\nbody {\n    background-color: #000;\n    font-family: 'Open Sans', sans-serif;\n}\n\n.capitalize{\n    text-transform: uppercase;\n}",".selection-header {\n    color: #fff;\n}\n\n.active{\n    transition: all 1s ease-in .5s;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n  @include tablet{\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    height: auto;\n    margin-bottom: 10px;\n  }\n  @include desktop {\n    justify-content: flex-start;\n  }\n}\n\n.active-logo{\n  transition: all 0.5s ease-in-out 0.05s;\n  @include tablet{\n    height: 75px;\n    margin: 20px;\n  }\n}\n\n.selection-container {\n  margin: 10px;\n  @include tablet{\n    margin: 0 8%;\n  }\n}\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0;\n}\n\n.no-selection{\n    height: 80vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    @include tablet{\n      flex-direction: row;\n    }\n    @include desktop {\n      justify-content: flex-start;\n    }\n}\n","@mixin tablet {\n  @media (min-width: $tablet-width) {\n    @content;\n  }\n}\n\n@mixin desktop {\n  @media (min-width: $desktop-width) {\n    @content;\n  }\n}","\n.gallery {\n    display: flex;\n    flex-direction: column;\n    color: #fff;\n    @include tablet {\n        margin: 0 auto;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n        justify-content: space-between;\n    }\n    @include desktop {\n        max-width: 1500px;  \n    }\n}\ndiv.image-container {\n     display: flex;\n     align-items: flex-end;\n}\n.gallery-item{\n    transition: all 0.05s ease 0.05s;\n    width: 100%;\n    height: 50vw;\n    @include tablet {\n        width: 50%;\n        height: 40vw;\n        max-height: 450px;\n    }\n    @include desktop {\n        width: 25%;\n        height: 35vw;\n    }\n}\n\n.loader{\n    margin: 0 auto;\n    max-height: 100px;\n}\n\n.abstract, .pullup {\n    width: 100%;\n    background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n    line-height: 1.5rem;\n    padding: 0 10px;\n    min-height: 40%;\n    @include tablet {\n        overflow-y: hidden;\n        max-height: 0px;\n        visibility: hidden;\n    }\n}\n\n.gallery-item:hover .pullUp {\n    @include tablet {\n        animation-name: pullUp;\n        \n\t    animation-duration: 0.3s;\t\n        \n\t    animation-timing-function: ease-out;\t\n        \n\t    transform-origin: 30% 100%;\n        \n        max-height: 35%;\n        transform: translateY(0);\n        visibility: visible;\n    }\n}\n\n/*\n==============================================\npullUp\n==============================================\n*/\n\n@keyframes pullUp {\n\t0% {\n\t\ttransform: scaleY(0.1);\n\t}\n\t40% {\n\t\ttransform: scaleY(0.7);\n\t}\n\t60% {\n\t\ttransform: scaleY(0.8);\n\t}\n\t80% {\n\t\ttransform: scaleY(0.9);\n\t}\n\t100% {\n\t\ttransform: scaleY(1.0);\n\t}\t\t\t\t\t\t\t\n}\n\n","\nfooter{\n    color: #c2c2c2;\n    text-align: center;\n    margin: 0 auto;\n    width: 100%;\n    padding: 30px 0;\n    @include desktop{\n        text-align: left;\n        margin-left: 20px;\n    }\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 3 */
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
/* 4 */
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

var	fixUrls = __webpack_require__(5);

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
/* 5 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjJmYzg4NDg4Y2Y5Mjg3YWJmY2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9zdHlsZS5zY3NzPzJhMDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsiJCIsInJ1bkFqYXgiLCJzZWN0aW9uIiwidmFsIiwidXJsIiwiJGdhbGxlcnkiLCJwYXJhbSIsImNoaWxkcmVuIiwicmVtb3ZlIiwiYXBwZW5kIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFqYXgiLCJtZXRob2QiLCJkb25lIiwiZGF0YSIsImFydGljbGVDb3VudGVyIiwiZWFjaCIsInJlc3VsdHMiLCJpIiwidmFsdWUiLCJtdWx0aW1lZGlhIiwibGVuZ3RoIiwiYmVzdFF1YWxpdHkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZU51bWJlciIsIm91dHB1dCIsImFic3RyYWN0IiwiY3NzIiwiZmFpbCIsIm9uIiwic2VsZWN0cmljIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEy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QUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjJmYzg4NDg4Y2Y5Mjg3YWJmY2EiLCJpbXBvcnQgXCIuLi9zYXNzL3N0eWxlLnNjc3NcIjtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgY29uc3QgcnVuQWpheCA9ICgpID0+IHtcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIHVybCBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvblxuICAgIGxldCBzZWN0aW9uID0gJCgnI3NlbGVjdC1zZWN0aW9uJykudmFsKCk7XG4gICAgbGV0IHVybCA9IGBodHRwczovL2FwaS5ueXRpbWVzLmNvbS9zdmMvdG9wc3Rvcmllcy92Mi8ke3NlY3Rpb259Lmpzb25gO1xuICAgIGxldCAkZ2FsbGVyeSA9ICQoJy5nYWxsZXJ5Jyk7XG4gICAgdXJsICs9IGA/JHskLnBhcmFtKHtcbiAgICAgICdhcGkta2V5JzogJ2U1YThmNDNmNDY0ZDQ0MTU4NzQzNDExMTI1ZmFlOTFiJ1xuICAgIH0pfWA7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lciBhbmQgYWRkIGEgbG9hZGluZyAuZ2lmXG4gICAgJGdhbGxlcnkuY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICAkZ2FsbGVyeS5hcHBlbmQoJzxpbWcgY2xhc3M9XCJsb2FkZXJcIiBzcmM9XCJpbWFnZXMvYWpheC1sb2FkZXIuZ2lmXCIvPicpO1xuXG4gICAgLy8gUmVtb3ZlIGRlZmF1bGx0IHN0eWxpbmcgb25jZSBhIHNlY3Rpb24gaXMgc2VsZWN0ZWRcbiAgICBpZiAoc2VjdGlvbiAhPT0gJ3NlY3Rpb24nKSB7XG4gICAgICAkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnbm8tc2VsZWN0aW9uJyk7XG4gICAgICAkKCdoZWFkZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcubG9nbycpLmFkZENsYXNzKCdhY3RpdmUtbG9nbycpO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IHN0eWxpbmcgd2hlbiBzZWN0aW9uIGlzIHNlbGVjdGVkXG4gICAgaWYgKHNlY3Rpb24gPT09ICdzZWN0aW9uJykge1xuICAgICAgJCgnLmxvYWRlcicpLnJlbW92ZSgpO1xuICAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ25vLXNlbGVjdGlvbicpO1xuICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnLmxvZ28nKS5yZW1vdmVDbGFzcygnYWN0aXZlLWxvZ28nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFJldHJpZXZlIGRhdGEgZnJvbSBOWVQgQVBJXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgIC8vUmVtb3ZlIExvYWRpbmcgZ2lmXG4gICAgICAkZ2FsbGVyeS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgLy8gU2V0IGFydGljbGUgY291bnRlciB0byBrZWVwIHRyYWNrIG9mIGFydGljbGVzIGJlaW5nIGFwcGVuZGVkXG4gICAgICBsZXQgYXJ0aWNsZUNvdW50ZXIgPSAwO1xuICAgICAgJC5lYWNoKGRhdGEucmVzdWx0cywgKGksIHZhbHVlKSA9PiB7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGltYWdlIGZpbGUgZXhpc3RzLCBpZiB0aGVyZSBpcyBubyBpbWFnZSwgcmV0dXJuaW5nIHRydWUgY29udGludWVzIHRvIHRoZSBuZXh0IGl0ZW0gaW4gdGhlIGxvb3BcbiAgICAgICAgaWYgKHZhbHVlLm11bHRpbWVkaWEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb29rIGZvciB0aGUgaGlnaGVzdCBxdWFsaXR5IGltYWdlIHRvIGRpc3BsYXlcbiAgICAgICAgbGV0IGJlc3RRdWFsaXR5ID0gdmFsdWUubXVsdGltZWRpYS5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgYmFja2dyb3VuZEltYWdlID0gdmFsdWUubXVsdGltZWRpYVtiZXN0UXVhbGl0eV0udXJsO1xuXG4gICAgICAgIC8vIHNldCBhIHVuaXF1ZSBjbGFzcyBvbiBlYWNoIGl0ZW0gZm9yIHRoZSBiYWNrZ3JvdW5kIGltYWdlICsgY29uc3RydWN0IEhUTUwgXG4gICAgICAgIGxldCBpbWFnZU51bWJlciA9IGBpbWFnZS1jb250YWluZXItJHtpfWA7XG4gICAgICAgIGxldCBvdXRwdXQgPSAnPGxpIGNsYXNzPVwiZ2FsbGVyeS1pdGVtXCI+PGEgaHJlZj1cIic7XG4gICAgICAgIG91dHB1dCArPSB2YWx1ZS51cmw7XG4gICAgICAgIG91dHB1dCArPSBgXCI+PGRpdiBjbGFzcz1cImltYWdlLWNvbnRhaW5lciAke2ltYWdlTnVtYmVyfVwiPmA7XG4gICAgICAgIG91dHB1dCArPSBgPHAgY2xhc3M9XCJhYnN0cmFjdCBwdWxsVXBcIj4ke3ZhbHVlLmFic3RyYWN0fTwvcD5gO1xuICAgICAgICBvdXRwdXQgKz0gJzwvZGl2PjwvYT48L2xpPic7XG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byB0aGUgRE9NXG4gICAgICAgICRnYWxsZXJ5LmFwcGVuZChvdXRwdXQpO1xuXG4gICAgICAgIC8vU2VsZWN0cyBpbWFnZSBjbGFzcyBhbmQgYWRkcyBiYWNrZ3JvdW5kIGltYWdlXG4gICAgICAgICQoYC4ke2ltYWdlTnVtYmVyfWApLmNzcyh7XG4gICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiBgdXJsKFwiJHtiYWNrZ3JvdW5kSW1hZ2V9XCIpYCxcbiAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogJ2NvdmVyJyxcbiAgICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6ICdjZW50ZXInLFxuICAgICAgICAgICdoZWlnaHQnOiAnMTAwJSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5jcmVtZW50IHRvIGFydGljbGUgY291bnRlciBhZnRlciBhbiBpdGVtIGhhcyBiZWVuIGFwcGVuZGVkXG4gICAgICAgIGFydGljbGVDb3VudGVyKys7XG5cbiAgICAgICAgLy8gVGhlIGxvb3Agd2lsbCBjb250aW51ZSBzbyBsb25nIGFzIHRoZSBhcnRpY2xlIGNvdW50ZXIgZG9lcyBub3QgZXF1YWwgMTJcbiAgICAgICAgLy8gb25jZSAxMiBoYXMgYmVlbiByZWFjaGVkIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UgYW5kIGVuZCB0aGUgLmVhY2ggbG9vcFxuICAgICAgICByZXR1cm4gYXJ0aWNsZUNvdW50ZXIgIT09IDEyO1xuICAgICAgfSk7XG4gICAgfSkuZmFpbCgoKSA9PiB7XG4gICAgICAkZ2FsbGVyeS5hcHBlbmQoJzxsaT5DYW5ub3QgcmV0cmlldmUgYXJ0aWNsZXM8L2xpPicpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIENhbGxzIHRoZSBmdW5jdGlvbiBvbiBwYWdlIGxvYWQsIHdpbGwgbWFpbnRhaW4gcHJldmlvdXMgc2VsZWN0aW9uIGlmIGNvbWluZyBiYWNrIGZyb20gYW4gYXJ0aWNsZVxuICBydW5BamF4KCk7XG5cbiAgJCgnI3NlbGVjdC1zZWN0aW9uJykub24oJ2NoYW5nZScsKCkgPT4ge1xuICAgIHJ1bkFqYXgoKTtcbiAgfSk7XG5cbiAgLy8gU2VsZWN0cmljIEZvcm0gU3R5bGluZ1xuICAkKCdzZWxlY3QnKS5zZWxlY3RyaWMoKTtcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2NyaXB0LmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTItMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0yLTIhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0yLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMi0yIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMi0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTItMiEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Nhc3Mvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblxcbi8qISBGb250cyBHZW5lcmF0ZWQgYnkgRm9udCBTcXVpcnJlbCAoaHR0cHM6Ly93d3cuZm9udHNxdWlycmVsLmNvbSkgb24gT2N0b2JlciAxNiwgMjAxNyAqL1xcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICNmZmY7IH1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7IH1cXG5cXG4uY2FwaXRhbGl6ZSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9XFxuXFxuLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgY29sb3I6ICNmZmY7IH1cXG5cXG4uYWN0aXZlIHtcXG4gIHRyYW5zaXRpb246IGFsbCAxcyBlYXNlLWluIC41cztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgICAuYWN0aXZlIHtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgaGVpZ2h0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgICAuYWN0aXZlIHtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7IH0gfVxcblxcbi5hY3RpdmUtbG9nbyB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dCAwLjA1czsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAgIC5hY3RpdmUtbG9nbyB7XFxuICAgICAgaGVpZ2h0OiA3NXB4O1xcbiAgICAgIG1hcmdpbjogMjBweDsgfSB9XFxuXFxuLnNlbGVjdGlvbi1jb250YWluZXIge1xcbiAgbWFyZ2luOiAxMHB4OyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gICAgLnNlbGVjdGlvbi1jb250YWluZXIge1xcbiAgICAgIG1hcmdpbjogMCA4JTsgfSB9XFxuXFxuLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQgMC4wNXM7XFxuICBwYWRkaW5nOiAxMHB4IDA7IH1cXG5cXG4ubm8tc2VsZWN0aW9uIHtcXG4gIGhlaWdodDogODB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gICAgLm5vLXNlbGVjdGlvbiB7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdzsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAgIC5uby1zZWxlY3Rpb24ge1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDsgfSB9XFxuXFxuLmdhbGxlcnkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBjb2xvcjogI2ZmZjsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAgIC5nYWxsZXJ5IHtcXG4gICAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAgIC5nYWxsZXJ5IHtcXG4gICAgICBtYXgtd2lkdGg6IDE1MDBweDsgfSB9XFxuXFxuZGl2LmltYWdlLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kOyB9XFxuXFxuLmdhbGxlcnktaXRlbSB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4wNXMgZWFzZSAwLjA1cztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA1MHZ3OyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gICAgLmdhbGxlcnktaXRlbSB7XFxuICAgICAgd2lkdGg6IDUwJTtcXG4gICAgICBoZWlnaHQ6IDQwdnc7XFxuICAgICAgbWF4LWhlaWdodDogNDUwcHg7IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEyNDBweCkge1xcbiAgICAuZ2FsbGVyeS1pdGVtIHtcXG4gICAgICB3aWR0aDogMjUlO1xcbiAgICAgIGhlaWdodDogMzV2dzsgfSB9XFxuXFxuLmxvYWRlciB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIG1heC1oZWlnaHQ6IDEwMHB4OyB9XFxuXFxuLmFic3RyYWN0LCAucHVsbHVwIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDMwZGVnLCByZ2JhKDM5LCAzOSwgMzksIDAuNSksIHJnYmEoMzksIDM5LCAzOSwgMC41KSk7XFxuICBsaW5lLWhlaWdodDogMS41cmVtO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbiAgbWluLWhlaWdodDogNDAlOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gICAgLmFic3RyYWN0LCAucHVsbHVwIHtcXG4gICAgICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICAgICAgbWF4LWhlaWdodDogMHB4O1xcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjsgfSB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuZ2FsbGVyeS1pdGVtOmhvdmVyIC5wdWxsVXAge1xcbiAgICBhbmltYXRpb24tbmFtZTogcHVsbFVwO1xcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuM3M7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAzMCUgMTAwJTtcXG4gICAgbWF4LWhlaWdodDogMzUlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH0gfVxcblxcbi8qXFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbnB1bGxVcFxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG4qL1xcbkBrZXlmcmFtZXMgcHVsbFVwIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC4xKTsgfVxcbiAgNDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC43KTsgfVxcbiAgNjAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC44KTsgfVxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC45KTsgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpOyB9IH1cXG5cXG5mb290ZXIge1xcbiAgY29sb3I6ICNjMmMyYzI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMzBweCAwOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAgIGZvb3RlciB7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBtYXJnaW4tbGVmdDogMjBweDsgfSB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9zY290dGxpdmluZ3N0b25lL3JlZC1hY2FkZW15L3Byb2plY3RzL3Byb2plY3QtMi9zcmMvc2Fzcy9zcmMvc2Fzcy9fcmVzZXQuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19mb250cy5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3JjL3Nhc3MvX2dsb2JhbHMuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19oZWFkZXIuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19taXhpbnMuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19jb250ZW50LnNjc3NcIixcIi9Vc2Vycy9zY290dGxpdmluZ3N0b25lL3JlZC1hY2FkZW15L3Byb2plY3RzL3Byb2plY3QtMi9zcmMvc2Fzcy9zcmMvc2Fzcy9fZm9vdGVyLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztFQUdFO0FBRUY7Ozs7Ozs7Ozs7Ozs7RUFhQyxVQUFTO0VBQ1QsV0FBVTtFQUNWLFVBQVM7RUFDVCxnQkFBZTtFQUNmLGNBQWE7RUFDYix5QkFBd0IsRUFDeEI7O0FBQ0QsaURBQWlEO0FBQ2pEOztFQUVDLGVBQWMsRUFDZDs7QUFDRDtFQUNDLGVBQWMsRUFDZDs7QUFDRDtFQUNDLGlCQUFnQixFQUNoQjs7QUFDRDtFQUNDLGFBQVksRUFDWjs7QUFDRDs7RUFFQyxZQUFXO0VBQ1gsY0FBYSxFQUNiOztBQUNEO0VBQ0MsMEJBQXlCO0VBQ3pCLGtCQUFpQixFQUNqQjs7QUMvQ0QsMEZBQTBGO0FDQTFGO0VBQ0ksdUJBQXNCLEVBQ3pCOztBQUVEO0VBQ0ksc0JBQXFCO0VBQ3JCLFlBQVcsRUFDZDs7QUFFRDtFQUNJLHVCQUFzQjtFQUN0QixxQ0FBb0MsRUFDdkM7O0FBRUQ7RUFDSSwwQkFBeUIsRUFDNUI7O0FDaEJEO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksK0JBQThCO0VBQzlCLGNBQWE7RUFDYix1QkFBc0I7RUFDdEIsd0JBQXVCO0VBQ3ZCLG1CQUFrQixFQVdyQjtFQ25CQztJREdGO01BT0ksd0JBQXVCO01BQ3ZCLG9CQUFtQjtNQUNuQixvQkFBbUI7TUFDbkIsYUFBWTtNQUNaLG9CQUFtQixFQUt0QixFQUFBO0VDYkM7SURIRjtNQWNJLDRCQUEyQixFQUU5QixFQUFBOztBQUVEO0VBQ0UsdUNBQXNDLEVBS3ZDO0VDM0JDO0lEcUJGO01BR0ksYUFBWTtNQUNaLGFBQVksRUFFZixFQUFBOztBQUVEO0VBQ0UsYUFBWSxFQUliO0VDbENDO0lENkJGO01BR0ksYUFBWSxFQUVmLEVBQUE7O0FBRUQ7RUFDRSx1Q0FBc0M7RUFDdEMsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDSSxhQUFZO0VBQ1osY0FBYTtFQUNiLHVCQUFzQjtFQUN0Qix3QkFBdUI7RUFDdkIsb0JBQW1CLEVBT3RCO0VDckRDO0lEeUNGO01BT00sb0JBQW1CLEVBS3hCLEVBQUE7RUMvQ0M7SURtQ0Y7TUFVTSw0QkFBMkIsRUFFaEMsRUFBQTs7QUVyREQ7RUFDSSxjQUFhO0VBQ2IsdUJBQXNCO0VBQ3RCLFlBQVcsRUFXZDtFRGRDO0lDQUY7TUFLUSxlQUFjO01BQ2QsY0FBYTtNQUNiLG9CQUFtQjtNQUNuQixnQkFBZTtNQUNmLCtCQUE4QixFQUtyQyxFQUFBO0VEUkM7SUNORjtNQVlRLGtCQUFpQixFQUV4QixFQUFBOztBQUNEO0VBQ0ssY0FBYTtFQUNiLHNCQUFxQixFQUN6Qjs7QUFDRDtFQUNJLGlDQUFnQztFQUNoQyxZQUFXO0VBQ1gsYUFBWSxFQVVmO0VEaENDO0lDbUJGO01BS1EsV0FBVTtNQUNWLGFBQVk7TUFDWixrQkFBaUIsRUFNeEIsRUFBQTtFRDFCQztJQ2FGO01BVVEsV0FBVTtNQUNWLGFBQVksRUFFbkIsRUFBQTs7QUFFRDtFQUNJLGVBQWM7RUFDZCxrQkFBaUIsRUFDcEI7O0FBRUQ7RUFDSSxZQUFXO0VBQ1gsdUZBQXNGO0VBQ3RGLG9CQUFtQjtFQUNuQixnQkFBZTtFQUNmLGdCQUFlLEVBTWxCO0VEbERDO0lDdUNGO01BT1EsbUJBQWtCO01BQ2xCLGdCQUFlO01BQ2YsbUJBQWtCLEVBRXpCLEVBQUE7O0FEbERDO0VDb0RGO0lBRVEsdUJBQXNCO0lBRXpCLHlCQUF3QjtJQUV4QixvQ0FBbUM7SUFFbkMsMkJBQTBCO0lBRXZCLGdCQUFlO0lBQ2YseUJBQXdCO0lBQ3hCLG9CQUFtQixFQUUxQixFQUFBOztBQUVEOzs7O0VBSUU7QUFFRjtFQUNDO0lBQ0MsdUJBQXNCLEVBQUE7RUFFdkI7SUFDQyx1QkFBc0IsRUFBQTtFQUV2QjtJQUNDLHVCQUFzQixFQUFBO0VBRXZCO0lBQ0MsdUJBQXNCLEVBQUE7RUFFdkI7SUFDQyxxQkFBc0IsRUFBQSxFQUFBOztBQ3hGeEI7RUFDSSxlQUFjO0VBQ2QsbUJBQWtCO0VBQ2xCLGVBQWM7RUFDZCxZQUFXO0VBQ1gsZ0JBQWUsRUFLbEI7RUZKQztJRU5GO01BT1EsaUJBQWdCO01BQ2hCLGtCQUFpQixFQUV4QixFQUFBXCIsXCJmaWxlXCI6XCJzdHlsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsXCIvKiEgRm9udHMgR2VuZXJhdGVkIGJ5IEZvbnQgU3F1aXJyZWwgKGh0dHBzOi8vd3d3LmZvbnRzcXVpcnJlbC5jb20pIG9uIE9jdG9iZXIgMTYsIDIwMTcgKi9cXG5cXG5cXG5cXG4vLyBAZm9udC1mYWNlIHtcXG4vLyAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xcbi8vICAgICBzcmM6IHVybCgnL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuZW90Jyk7XFxuLy8gICAgIHNyYzogdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5lb3Q/I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxcbi8vICAgICAgICAgIHVybCgnL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuLy8gICAgICAgICAgdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyksXFxuLy8gICAgICAgICAgdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5zdmcjb3Blbl9zYW5zYm9sZCcpIGZvcm1hdCgnc3ZnJyk7XFxuLy8gICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbi8vICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuXFxuLy8gfVxcblxcblxcblxcblxcbi8vIEBmb250LWZhY2Uge1xcbi8vICAgICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XFxuLy8gICAgIHNyYzogdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5lb3QnKTtcXG4vLyAgICAgc3JjOiB1cmwoJy9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuLy8gICAgICAgICAgdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4vLyAgICAgICAgICB1cmwoJy9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcXG4vLyAgICAgICAgICB1cmwoJy9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LnN2ZyNvcGVuX3NhbnNib2xkX2l0YWxpYycpIGZvcm1hdCgnc3ZnJyk7XFxuLy8gICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbi8vICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuXFxuLy8gfVxcblxcblxcblxcblxcbi8vIEBmb250LWZhY2Uge1xcbi8vICAgICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XFxuLy8gICAgIHNyYzogdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQuZW90Jyk7XFxuLy8gICAgIHNyYzogdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXG4vLyAgICAgICAgICB1cmwoJy9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4vLyAgICAgICAgICB1cmwoJy9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyksXFxuLy8gICAgICAgICAgdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0LXdlYmZvbnQuc3ZnI29wZW5fc2Fuc2xpZ2h0JykgZm9ybWF0KCdzdmcnKTtcXG4vLyAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4vLyAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcblxcbi8vIH1cXG5cXG5cXG5cXG5cXG4vLyBAZm9udC1mYWNlIHtcXG4vLyAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xcbi8vICAgICBzcmM6IHVybCgnL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LmVvdCcpO1xcbi8vICAgICBzcmM6IHVybCgnL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuLy8gICAgICAgICAgdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuLy8gICAgICAgICAgdXJsKCcvcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpLFxcbi8vICAgICAgICAgIHVybCgnL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LnN2ZyNvcGVuX3NhbnNsaWdodF9pdGFsaWMnKSBmb3JtYXQoJ3N2ZycpO1xcbi8vICAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbi8vICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuXFxuLy8gfVwiLFwiKntcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5jYXBpdGFsaXple1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cIixcIi5zZWxlY3Rpb24taGVhZGVyIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5hY3RpdmV7XFxuICAgIHRyYW5zaXRpb246IGFsbCAxcyBlYXNlLWluIC41cztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIEBpbmNsdWRlIHRhYmxldHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIH1cXG4gIEBpbmNsdWRlIGRlc2t0b3Age1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICB9XFxufVxcblxcbi5hY3RpdmUtbG9nb3tcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0IDAuMDVzO1xcbiAgQGluY2x1ZGUgdGFibGV0e1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxuICAgIG1hcmdpbjogMjBweDtcXG4gIH1cXG59XFxuXFxuLnNlbGVjdGlvbi1jb250YWluZXIge1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgQGluY2x1ZGUgdGFibGV0e1xcbiAgICBtYXJnaW46IDAgOCU7XFxuICB9XFxufVxcblxcbi5zZWxlY3Rpb24taGVhZGVyIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0IDAuMDVzO1xcbiAgcGFkZGluZzogMTBweCAwO1xcbn1cXG5cXG4ubm8tc2VsZWN0aW9ue1xcbiAgICBoZWlnaHQ6IDgwdmg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBAaW5jbHVkZSB0YWJsZXR7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgfVxcbiAgICBAaW5jbHVkZSBkZXNrdG9wIHtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIH1cXG59XFxuXCIsXCJAbWl4aW4gdGFibGV0IHtcXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkdGFibGV0LXdpZHRoKSB7XFxuICAgIEBjb250ZW50O1xcbiAgfVxcbn1cXG5cXG5AbWl4aW4gZGVza3RvcCB7XFxuICBAbWVkaWEgKG1pbi13aWR0aDogJGRlc2t0b3Atd2lkdGgpIHtcXG4gICAgQGNvbnRlbnQ7XFxuICB9XFxufVwiLFwiXFxuLmdhbGxlcnkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgQGluY2x1ZGUgdGFibGV0IHtcXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIH1cXG4gICAgQGluY2x1ZGUgZGVza3RvcCB7XFxuICAgICAgICBtYXgtd2lkdGg6IDE1MDBweDsgIFxcbiAgICB9XFxufVxcbmRpdi5pbWFnZS1jb250YWluZXIge1xcbiAgICAgZGlzcGxheTogZmxleDtcXG4gICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG59XFxuLmdhbGxlcnktaXRlbXtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMDVzIGVhc2UgMC4wNXM7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDUwdnc7XFxuICAgIEBpbmNsdWRlIHRhYmxldCB7XFxuICAgICAgICB3aWR0aDogNTAlO1xcbiAgICAgICAgaGVpZ2h0OiA0MHZ3O1xcbiAgICAgICAgbWF4LWhlaWdodDogNDUwcHg7XFxuICAgIH1cXG4gICAgQGluY2x1ZGUgZGVza3RvcCB7XFxuICAgICAgICB3aWR0aDogMjUlO1xcbiAgICAgICAgaGVpZ2h0OiAzNXZ3O1xcbiAgICB9XFxufVxcblxcbi5sb2FkZXJ7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBtYXgtaGVpZ2h0OiAxMDBweDtcXG59XFxuXFxuLmFic3RyYWN0LCAucHVsbHVwIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgzMGRlZywgcmdiYSgzOSwgMzksIDM5LCAwLjUpLCByZ2JhKDM5LCAzOSwgMzksIDAuNSkpO1xcbiAgICBsaW5lLWhlaWdodDogMS41cmVtO1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIG1pbi1oZWlnaHQ6IDQwJTtcXG4gICAgQGluY2x1ZGUgdGFibGV0IHtcXG4gICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gICAgICAgIG1heC1oZWlnaHQ6IDBweDtcXG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgfVxcbn1cXG5cXG4uZ2FsbGVyeS1pdGVtOmhvdmVyIC5wdWxsVXAge1xcbiAgICBAaW5jbHVkZSB0YWJsZXQge1xcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHB1bGxVcDtcXG4gICAgICAgIFxcblxcdCAgICBhbmltYXRpb24tZHVyYXRpb246IDAuM3M7XFx0XFxuICAgICAgICBcXG5cXHQgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XFx0XFxuICAgICAgICBcXG5cXHQgICAgdHJhbnNmb3JtLW9yaWdpbjogMzAlIDEwMCU7XFxuICAgICAgICBcXG4gICAgICAgIG1heC1oZWlnaHQ6IDM1JTtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIH1cXG59XFxuXFxuLypcXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxucHVsbFVwXFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbiovXFxuXFxuQGtleWZyYW1lcyBwdWxsVXAge1xcblxcdDAlIHtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlWSgwLjEpO1xcblxcdH1cXG5cXHQ0MCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDAuNyk7XFxuXFx0fVxcblxcdDYwJSB7XFxuXFx0XFx0dHJhbnNmb3JtOiBzY2FsZVkoMC44KTtcXG5cXHR9XFxuXFx0ODAlIHtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlWSgwLjkpO1xcblxcdH1cXG5cXHQxMDAlIHtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlWSgxLjApO1xcblxcdH1cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXG59XFxuXFxuXCIsXCJcXG5mb290ZXJ7XFxuICAgIGNvbG9yOiAjYzJjMmMyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogMzBweCAwO1xcbiAgICBAaW5jbHVkZSBkZXNrdG9we1xcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcInNvdXJjZU1hcFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9zcmMvc2Fzcy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9