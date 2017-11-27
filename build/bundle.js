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
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    // Clear the container and add a loading .gif
    $('.gallery').children().remove();
    $('.gallery').append('<img class="loader" src="images/ajax-loader.gif"/>');

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
      $('.gallery').children().remove();
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
        var imageNumber = 'image-conatiner-' + i;
        var output = '<li class="gallery-item"><a href="';
        output += value.url;
        output += '"><div class="image-container ' + imageNumber + '">';
        output += '<p class="abstract pullUp">' + value.abstract + '</p>';
        output += '</div></a></li>';
        // Add elements to the DOM
        $('.gallery').append(output);

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
      var error = 0;
      $('.gallery').append('<li>Cannot retrieve articles</li>');
      return error;
    });
  };

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
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n* {\n  box-sizing: border-box; }\n\na {\n  text-decoration: none;\n  color: #fff; }\n\nbody {\n  background-color: #000;\n  font-family: 'Open Sans', sans-serif; }\n\n.capitalize {\n  text-transform: uppercase; }\n\n.selection-header {\n  color: #fff; }\n\n.active {\n  transition: all 1s ease-in .5s;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center; }\n  @media (min-width: 600px) {\n    .active {\n      justify-content: center;\n      align-items: center;\n      flex-direction: row;\n      height: auto;\n      margin-bottom: 10px; } }\n  @media (min-width: 1240px) {\n    .active {\n      justify-content: flex-start; } }\n\n.active-logo {\n  transition: all 0.5s ease-in-out 0.05s; }\n  @media (min-width: 600px) {\n    .active-logo {\n      height: 75px;\n      margin: 20px; } }\n\n.selection-container {\n  margin: 10px; }\n  @media (min-width: 600px) {\n    .selection-container {\n      margin: 0 8%; } }\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0; }\n\n.no-selection {\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n  @media (min-width: 600px) {\n    .no-selection {\n      flex-direction: row; } }\n  @media (min-width: 1240px) {\n    .no-selection {\n      justify-content: flex-start; } }\n\n.gallery {\n  display: flex;\n  flex-direction: column;\n  color: #fff; }\n  @media (min-width: 600px) {\n    .gallery {\n      margin: 0 auto;\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      justify-content: space-between; } }\n  @media (min-width: 1240px) {\n    .gallery {\n      max-width: 1500px; } }\n\ndiv.image-container {\n  display: flex;\n  align-items: flex-end; }\n\n.gallery-item {\n  transition: all 0.05s ease 0.05s;\n  width: 100%;\n  height: 50vw; }\n  @media (min-width: 600px) {\n    .gallery-item {\n      width: 50%;\n      height: 40vw;\n      max-height: 450px; } }\n  @media (min-width: 1240px) {\n    .gallery-item {\n      width: 25%;\n      height: 35vw; } }\n\n.loader {\n  margin: 0 auto;\n  max-height: 100px; }\n\n.abstract, .pullup {\n  width: 100%;\n  background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n  line-height: 1.5rem;\n  padding: 0 10px;\n  min-height: 40%; }\n  @media (min-width: 600px) {\n    .abstract, .pullup {\n      overflow-y: hidden;\n      max-height: 0px;\n      visibility: hidden; } }\n\n@media (min-width: 600px) {\n  .gallery-item:hover .pullUp {\n    animation-name: pullUp;\n    animation-duration: 0.3s;\n    animation-timing-function: ease-out;\n    transform-origin: 30% 100%;\n    max-height: 35%;\n    transform: translateY(0);\n    visibility: visible; } }\n\n/*\n==============================================\npullUp\n==============================================\n*/\n@keyframes pullUp {\n  0% {\n    transform: scaleY(0.1); }\n  40% {\n    transform: scaleY(0.7); }\n  60% {\n    transform: scaleY(0.8); }\n  80% {\n    transform: scaleY(0.9); }\n  100% {\n    transform: scaleY(1); } }\n\nfooter {\n  color: #c2c2c2;\n  text-align: center;\n  margin: 0 auto;\n  width: 100%;\n  padding: 30px 0; }\n  @media (min-width: 1240px) {\n    footer {\n      text-align: left;\n      margin-left: 20px; } }\n", "", {"version":3,"sources":["/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_reset.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_fonts.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_globals.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_header.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_mixins.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_content.scss","/Users/scottlivingstone/red-academy/projects/project-2/src/sass/src/sass/_footer.scss"],"names":[],"mappings":"AAAA;;;EAGE;AAEF;;;;;;;;;;;;;EAaC,UAAS;EACT,WAAU;EACV,UAAS;EACT,gBAAe;EACf,cAAa;EACb,yBAAwB,EACxB;;AACD,iDAAiD;AACjD;;EAEC,eAAc,EACd;;AACD;EACC,eAAc,EACd;;AACD;EACC,iBAAgB,EAChB;;AACD;EACC,aAAY,EACZ;;AACD;;EAEC,YAAW;EACX,cAAa,EACb;;AACD;EACC,0BAAyB;EACzB,kBAAiB,EACjB;;AC/CD,0FAA0F;ACA1F;EACI,uBAAsB,EACzB;;AAED;EACI,sBAAqB;EACrB,YAAW,EACd;;AAED;EACI,uBAAsB;EACtB,qCAAoC,EACvC;;AAED;EACI,0BAAyB,EAC5B;;AChBD;EACI,YAAW,EACd;;AAED;EACI,+BAA8B;EAC9B,cAAa;EACb,uBAAsB;EACtB,wBAAuB;EACvB,mBAAkB,EAWrB;ECnBC;IDGF;MAOI,wBAAuB;MACvB,oBAAmB;MACnB,oBAAmB;MACnB,aAAY;MACZ,oBAAmB,EAKtB,EAAA;ECbC;IDHF;MAcI,4BAA2B,EAE9B,EAAA;;AAED;EACE,uCAAsC,EAKvC;EC3BC;IDqBF;MAGI,aAAY;MACZ,aAAY,EAEf,EAAA;;AAED;EACE,aAAY,EAIb;EClCC;ID6BF;MAGI,aAAY,EAEf,EAAA;;AAED;EACE,uCAAsC;EACtC,gBAAe,EAChB;;AAED;EACI,aAAY;EACZ,cAAa;EACb,uBAAsB;EACtB,wBAAuB;EACvB,oBAAmB,EAQtB;ECtDC;IDyCF;MAOM,oBAAmB,EAMxB,EAAA;EChDC;IDmCF;MAUM,4BAA2B,EAGhC,EAAA;;AEtDD;EACI,cAAa;EACb,uBAAsB;EACtB,YAAW,EAWd;EDdC;ICAF;MAKQ,eAAc;MACd,cAAa;MACb,oBAAmB;MACnB,gBAAe;MACf,+BAA8B,EAKrC,EAAA;EDRC;ICNF;MAYQ,kBAAiB,EAExB,EAAA;;AACD;EACK,cAAa;EACb,sBAAqB,EACzB;;AACD;EACI,iCAAgC;EAChC,YAAW;EACX,aAAY,EAUf;EDhCC;ICmBF;MAKQ,WAAU;MACV,aAAY;MACZ,kBAAiB,EAMxB,EAAA;ED1BC;ICaF;MAUQ,WAAU;MACV,aAAY,EAEnB,EAAA;;AAED;EACI,eAAc;EACd,kBAAiB,EACpB;;AAED;EACI,YAAW;EACX,uFAAsF;EACtF,oBAAmB;EACnB,gBAAe;EACf,gBAAe,EAMlB;EDlDC;ICuCF;MAOQ,mBAAkB;MAClB,gBAAe;MACf,mBAAkB,EAEzB,EAAA;;ADlDC;ECoDF;IAEQ,uBAAsB;IAEzB,yBAAwB;IAExB,oCAAmC;IAEnC,2BAA0B;IAEvB,gBAAe;IACf,yBAAwB;IACxB,oBAAmB,EAE1B,EAAA;;AAED;;;;EAIE;AAEF;EACC;IACC,uBAAsB,EAAA;EAEvB;IACC,uBAAsB,EAAA;EAEvB;IACC,uBAAsB,EAAA;EAEvB;IACC,uBAAsB,EAAA;EAEvB;IACC,qBAAsB,EAAA,EAAA;;ACxFxB;EACI,eAAc;EACd,mBAAkB;EAClB,eAAc;EACd,YAAW;EACX,gBAAe,EAKlB;EFJC;IENF;MAOQ,iBAAgB;MAChB,kBAAiB,EAExB,EAAA","file":"style.scss","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}","/*! Fonts Generated by Font Squirrel (https://www.fontsquirrel.com) on October 16, 2017 */\n\n\n\n// @font-face {\n//     font-family: 'open_sansbold';\n//     src: url('../../public/fonts/opensans-bold-webfont.eot');\n//     src: url('../../public/fonts/opensans-bold-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('../../public/fonts/opensans-bold-webfont.woff2') format('woff2'),\n//          url('../../public/fonts/opensans-bold-webfont.ttf') format('truetype'),\n//          url('../../public/fonts/opensans-bold-webfont.svg#open_sansbold') format('svg');\n//     font-weight: bold;\n//     font-style: normal;\n\n// }\n\n\n\n\n// @font-face {\n//     font-family: 'open_sansbold_italic';\n//     src: url('../../public/fonts/opensans-bolditalic-webfont.eot');\n//     src: url('../../public/fonts/opensans-bolditalic-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('../../public/fonts/opensans-bolditalic-webfont.woff2') format('woff2'),\n//          url('../../public/fonts/opensans-bolditalic-webfont.ttf') format('truetype'),\n//          url('../../public/fonts/opensans-bolditalic-webfont.svg#open_sansbold_italic') format('svg');\n//     font-weight: bold;\n//     font-style: italic;\n\n// }\n\n\n\n\n// @font-face {\n//     font-family: 'open_sanslight';\n//     src: url('../../public/fonts/opensans-light-webfont.eot');\n//     src: url('../../public/fonts/opensans-light-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('../../public/fonts/opensans-light-webfont.woff2') format('woff2'),\n//          url('../../public/fonts/opensans-light-webfont.ttf') format('truetype'),\n//          url('../../public/fonts/opensans-light-webfont.svg#open_sanslight') format('svg');\n//     font-weight: normal;\n//     font-style: normal;\n\n// }\n\n\n\n\n// @font-face {\n//     font-family: 'open_sanslight_italic';\n//     src: url('../../public/fonts/opensans-lightitalic-webfont.eot');\n//     src: url('../../public/fonts/opensans-lightitalic-webfont.eot?#iefix') format('embedded-opentype'),\n//          url('../../public/fonts/opensans-lightitalic-webfont.woff2') format('woff2'),\n//          url('../../public/fonts/opensans-lightitalic-webfont.ttf') format('truetype'),\n//          url('../../public/fonts/opensans-lightitalic-webfont.svg#open_sanslight_italic') format('svg');\n//     font-weight: normal;\n//     font-style: italic;\n\n// }","*{\n    box-sizing: border-box;\n}\n\na {\n    text-decoration: none;\n    color: #fff;\n}\n\nbody {\n    background-color: #000;\n    font-family: 'Open Sans', sans-serif;\n}\n\n.capitalize{\n    text-transform: uppercase;\n}",".selection-header {\n    color: #fff;\n}\n\n.active{\n    transition: all 1s ease-in .5s;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n  @include tablet{\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    height: auto;\n    margin-bottom: 10px;\n  }\n  @include desktop {\n    justify-content: flex-start;\n  }\n}\n\n.active-logo{\n  transition: all 0.5s ease-in-out 0.05s;\n  @include tablet{\n    height: 75px;\n    margin: 20px;\n  }\n}\n\n.selection-container {\n  margin: 10px;\n  @include tablet{\n    margin: 0 8%;\n  }\n}\n\n.selection-header {\n  transition: all 0.5s ease-in-out 0.05s;\n  padding: 10px 0;\n}\n\n.no-selection{\n    height: 80vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    @include tablet{\n      flex-direction: row;\n    }\n    @include desktop {\n      justify-content: flex-start;\n    }\n\n}\n","@mixin tablet {\n  @media (min-width: $tablet-width) {\n    @content;\n  }\n}\n\n@mixin desktop {\n  @media (min-width: $desktop-width) {\n    @content;\n  }\n}","\n.gallery {\n    display: flex;\n    flex-direction: column;\n    color: #fff;\n    @include tablet {\n        margin: 0 auto;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n        justify-content: space-between;\n    }\n    @include desktop {\n        max-width: 1500px;  \n    }\n}\ndiv.image-container {\n     display: flex;\n     align-items: flex-end;\n}\n.gallery-item{\n    transition: all 0.05s ease 0.05s;\n    width: 100%;\n    height: 50vw;\n    @include tablet {\n        width: 50%;\n        height: 40vw;\n        max-height: 450px;\n    }\n    @include desktop {\n        width: 25%;\n        height: 35vw;\n    }\n}\n\n.loader{\n    margin: 0 auto;\n    max-height: 100px;\n}\n\n.abstract, .pullup {\n    width: 100%;\n    background-image: linear-gradient(30deg, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5));\n    line-height: 1.5rem;\n    padding: 0 10px;\n    min-height: 40%;\n    @include tablet {\n        overflow-y: hidden;\n        max-height: 0px;\n        visibility: hidden;\n    }\n}\n\n.gallery-item:hover .pullUp {\n    @include tablet {\n        animation-name: pullUp;\n        \n\t    animation-duration: 0.3s;\t\n        \n\t    animation-timing-function: ease-out;\t\n        \n\t    transform-origin: 30% 100%;\n        \n        max-height: 35%;\n        transform: translateY(0);\n        visibility: visible;\n    }\n}\n\n/*\n==============================================\npullUp\n==============================================\n*/\n\n@keyframes pullUp {\n\t0% {\n\t\ttransform: scaleY(0.1);\n\t}\n\t40% {\n\t\ttransform: scaleY(0.7);\n\t}\n\t60% {\n\t\ttransform: scaleY(0.8);\n\t}\n\t80% {\n\t\ttransform: scaleY(0.9);\n\t}\n\t100% {\n\t\ttransform: scaleY(1.0);\n\t}\t\t\t\t\t\t\t\n}\n\n","\nfooter{\n    color: #c2c2c2;\n    text-align: center;\n    margin: 0 auto;\n    width: 100%;\n    padding: 30px 0;\n    @include desktop{\n        text-align: left;\n        margin-left: 20px;\n    }\n}"],"sourceRoot":""}]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjUzMWQ1MjU2YjRjY2I3YWM1MGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9zdHlsZS5zY3NzPzJhMDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsiJCIsInJ1bkFqYXgiLCJzZWN0aW9uIiwidmFsIiwidXJsIiwicGFyYW0iLCJjaGlsZHJlbiIsInJlbW92ZSIsImFwcGVuZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJhamF4IiwibWV0aG9kIiwiZG9uZSIsImRhdGEiLCJhcnRpY2xlQ291bnRlciIsImVhY2giLCJyZXN1bHRzIiwiaSIsInZhbHVlIiwibXVsdGltZWRpYSIsImxlbmd0aCIsImJlc3RRdWFsaXR5IiwiYmFja2dyb3VuZEltYWdlIiwiaW1hZ2VOdW1iZXIiLCJvdXRwdXQiLCJhYnN0cmFjdCIsImNzcyIsImZhaWwiLCJlcnJvciIsIm9uIiwic2VsZWN0cmljIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0FBQ0E7O0FBRUEsQ0FBQyxVQUFVQSxDQUFWLEVBQWE7O0FBRVosTUFBTUMsVUFBVSxTQUFWQSxPQUFVLEdBQU07QUFDcEI7QUFDQSxRQUFJQyxVQUFVRixFQUFFLGlCQUFGLEVBQXFCRyxHQUFyQixFQUFkO0FBQ0EsUUFBSUMscURBQW1ERixPQUFuRCxVQUFKO0FBQ0FFLGlCQUFXSixFQUFFSyxLQUFGLENBQVE7QUFDakIsaUJBQVc7QUFETSxLQUFSLENBQVg7QUFHQTtBQUNBTCxNQUFFLFVBQUYsRUFBY00sUUFBZCxHQUF5QkMsTUFBekI7QUFDQVAsTUFBRSxVQUFGLEVBQWNRLE1BQWQsQ0FBcUIsb0RBQXJCOztBQUVBO0FBQ0EsUUFBSU4sWUFBWSxTQUFoQixFQUEyQjtBQUN6QkYsUUFBRSxRQUFGLEVBQVlTLFdBQVosQ0FBd0IsY0FBeEI7QUFDQVQsUUFBRSxRQUFGLEVBQVlVLFFBQVosQ0FBcUIsUUFBckI7QUFDQVYsUUFBRSxPQUFGLEVBQVdVLFFBQVgsQ0FBb0IsYUFBcEI7QUFDRDs7QUFFRDtBQUNBLFFBQUlSLFlBQVksU0FBaEIsRUFBMkI7QUFDekJGLFFBQUUsU0FBRixFQUFhTyxNQUFiO0FBQ0FQLFFBQUUsUUFBRixFQUFZVSxRQUFaLENBQXFCLGNBQXJCO0FBQ0FWLFFBQUUsUUFBRixFQUFZUyxXQUFaLENBQXdCLFFBQXhCO0FBQ0FULFFBQUUsT0FBRixFQUFXUyxXQUFYLENBQXVCLGFBQXZCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7O0FBRUFULE1BQUVXLElBQUYsQ0FBTztBQUNMUCxXQUFLQSxHQURBO0FBRUxRLGNBQVE7QUFGSCxLQUFQLEVBR0dDLElBSEgsQ0FHUSxVQUFDQyxJQUFELEVBQVU7QUFDaEI7QUFDQWQsUUFBRSxVQUFGLEVBQWNNLFFBQWQsR0FBeUJDLE1BQXpCO0FBQ0E7QUFDQSxVQUFJUSxpQkFBaUIsQ0FBckI7QUFDQWYsUUFBRWdCLElBQUYsQ0FBT0YsS0FBS0csT0FBWixFQUFxQixVQUFDQyxDQUFELEVBQUlDLEtBQUosRUFBYzs7QUFFakM7QUFDQSxZQUFJQSxNQUFNQyxVQUFOLENBQWlCQyxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxpQkFBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJQyxjQUFjSCxNQUFNQyxVQUFOLENBQWlCQyxNQUFqQixHQUEwQixDQUE1QztBQUNBLFlBQUlFLGtCQUFrQkosTUFBTUMsVUFBTixDQUFpQkUsV0FBakIsRUFBOEJsQixHQUFwRDs7QUFFQTtBQUNBLFlBQUlvQixtQ0FBaUNOLENBQXJDO0FBQ0EsWUFBSU8sU0FBUyxvQ0FBYjtBQUNBQSxrQkFBVU4sTUFBTWYsR0FBaEI7QUFDQXFCLHFEQUEyQ0QsV0FBM0M7QUFDQUMsa0RBQXdDTixNQUFNTyxRQUE5QztBQUNBRCxrQkFBVSxpQkFBVjtBQUNBO0FBQ0F6QixVQUFFLFVBQUYsRUFBY1EsTUFBZCxDQUFxQmlCLE1BQXJCOztBQUVBO0FBQ0F6QixnQkFBTXdCLFdBQU4sRUFBcUJHLEdBQXJCLENBQXlCO0FBQ3ZCLHdDQUE0QkosZUFBNUIsT0FEdUI7QUFFdkIsNkJBQW1CLE9BRkk7QUFHdkIsaUNBQXVCLFFBSEE7QUFJdkIsb0JBQVU7QUFKYSxTQUF6Qjs7QUFPQTtBQUNBUjs7QUFFQTtBQUNBO0FBQ0EsZUFBT0EsbUJBQW1CLEVBQTFCO0FBQ0QsT0FuQ0Q7QUFvQ0QsS0E1Q0QsRUE0Q0dhLElBNUNILENBNENRLFlBQU07QUFDWixVQUFNQyxRQUFRLENBQWQ7QUFDQTdCLFFBQUUsVUFBRixFQUFjUSxNQUFkLENBQXFCLG1DQUFyQjtBQUNBLGFBQU9xQixLQUFQO0FBQ0QsS0FoREQ7QUFpREQsR0E5RUQ7O0FBZ0ZBNUI7O0FBRUFELElBQUUsaUJBQUYsRUFBcUI4QixFQUFyQixDQUF3QixRQUF4QixFQUFpQyxZQUFNO0FBQ3JDN0I7QUFDRCxHQUZEOztBQUlBO0FBQ0FELElBQUUsUUFBRixFQUFZK0IsU0FBWjtBQUNELENBMUZELEVBMEZHQyxNQTFGSCxFOzs7Ozs7QUNIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDekJBO0FBQ0E7OztBQUdBO0FBQ0EsMG5CQUEybkIsY0FBYyxlQUFlLGNBQWMsb0JBQW9CLGtCQUFrQiw2QkFBNkIsRUFBRSxpSkFBaUosbUJBQW1CLEVBQUUsVUFBVSxtQkFBbUIsRUFBRSxZQUFZLHFCQUFxQixFQUFFLG1CQUFtQixpQkFBaUIsRUFBRSw2REFBNkQsZ0JBQWdCLGtCQUFrQixFQUFFLFdBQVcsOEJBQThCLHNCQUFzQixFQUFFLG1HQUFtRywyQkFBMkIsRUFBRSxPQUFPLDBCQUEwQixnQkFBZ0IsRUFBRSxVQUFVLDJCQUEyQix5Q0FBeUMsRUFBRSxpQkFBaUIsOEJBQThCLEVBQUUsdUJBQXVCLGdCQUFnQixFQUFFLGFBQWEsbUNBQW1DLGtCQUFrQiwyQkFBMkIsNEJBQTRCLHVCQUF1QixFQUFFLCtCQUErQixlQUFlLGdDQUFnQyw0QkFBNEIsNEJBQTRCLHFCQUFxQiw0QkFBNEIsRUFBRSxFQUFFLGdDQUFnQyxlQUFlLG9DQUFvQyxFQUFFLEVBQUUsa0JBQWtCLDJDQUEyQyxFQUFFLCtCQUErQixvQkFBb0IscUJBQXFCLHFCQUFxQixFQUFFLEVBQUUsMEJBQTBCLGlCQUFpQixFQUFFLCtCQUErQiw0QkFBNEIscUJBQXFCLEVBQUUsRUFBRSx1QkFBdUIsMkNBQTJDLG9CQUFvQixFQUFFLG1CQUFtQixpQkFBaUIsa0JBQWtCLDJCQUEyQiw0QkFBNEIsd0JBQXdCLEVBQUUsK0JBQStCLHFCQUFxQiw0QkFBNEIsRUFBRSxFQUFFLGdDQUFnQyxxQkFBcUIsb0NBQW9DLEVBQUUsRUFBRSxjQUFjLGtCQUFrQiwyQkFBMkIsZ0JBQWdCLEVBQUUsK0JBQStCLGdCQUFnQix1QkFBdUIsc0JBQXNCLDRCQUE0Qix3QkFBd0IsdUNBQXVDLEVBQUUsRUFBRSxnQ0FBZ0MsZ0JBQWdCLDBCQUEwQixFQUFFLEVBQUUseUJBQXlCLGtCQUFrQiwwQkFBMEIsRUFBRSxtQkFBbUIscUNBQXFDLGdCQUFnQixpQkFBaUIsRUFBRSwrQkFBK0IscUJBQXFCLG1CQUFtQixxQkFBcUIsMEJBQTBCLEVBQUUsRUFBRSxnQ0FBZ0MscUJBQXFCLG1CQUFtQixxQkFBcUIsRUFBRSxFQUFFLGFBQWEsbUJBQW1CLHNCQUFzQixFQUFFLHdCQUF3QixnQkFBZ0IsMkZBQTJGLHdCQUF3QixvQkFBb0Isb0JBQW9CLEVBQUUsK0JBQStCLDBCQUEwQiwyQkFBMkIsd0JBQXdCLDJCQUEyQixFQUFFLEVBQUUsK0JBQStCLGlDQUFpQyw2QkFBNkIsK0JBQStCLDBDQUEwQyxpQ0FBaUMsc0JBQXNCLCtCQUErQiwwQkFBMEIsRUFBRSxFQUFFLHVJQUF1SSxRQUFRLDZCQUE2QixFQUFFLFNBQVMsNkJBQTZCLEVBQUUsU0FBUyw2QkFBNkIsRUFBRSxTQUFTLDZCQUE2QixFQUFFLFVBQVUsMkJBQTJCLEVBQUUsRUFBRSxZQUFZLG1CQUFtQix1QkFBdUIsbUJBQW1CLGdCQUFnQixvQkFBb0IsRUFBRSxnQ0FBZ0MsY0FBYyx5QkFBeUIsMEJBQTBCLEVBQUUsRUFBRSxVQUFVLDhwQkFBOHBCLEtBQUssaUJBQWlCLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxtQkFBbUIsWUFBWSxPQUFPLGdCQUFnQixLQUFLLGdCQUFnQixLQUFLLG1CQUFtQixLQUFLLGdCQUFnQixNQUFNLFVBQVUsZ0JBQWdCLEtBQUssWUFBWSxvQkFBb0IsYUFBYSxNQUFNLG1CQUFtQixLQUFLLFlBQVksaUJBQWlCLEtBQUssWUFBWSxvQkFBb0IsS0FBSyxtQkFBbUIsTUFBTSxnQkFBZ0IsS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLG1CQUFtQixNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyx1QkFBdUIsS0FBSyxLQUFLLHdCQUF3QixLQUFLLGtCQUFrQixNQUFNLE1BQU0sVUFBVSxxQkFBcUIsS0FBSyxlQUFlLE1BQU0sTUFBTSxxQkFBcUIsS0FBSyxZQUFZLG1CQUFtQixLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsbUJBQW1CLE1BQU0sTUFBTSx1QkFBdUIsTUFBTSxNQUFNLHdCQUF3QixNQUFNLFVBQVUsWUFBWSxnQkFBZ0IsS0FBSyxLQUFLLFVBQVUsVUFBVSxZQUFZLFlBQVksdUJBQXVCLEtBQUssS0FBSyx3QkFBd0IsS0FBSyxVQUFVLG1CQUFtQixLQUFLLFlBQVksV0FBVyxlQUFlLE1BQU0sTUFBTSxVQUFVLFVBQVUsdUJBQXVCLE1BQU0sS0FBSyxVQUFVLHNCQUFzQixLQUFLLFVBQVUsbUJBQW1CLEtBQUssVUFBVSxZQUFZLGFBQWEsWUFBWSxpQkFBaUIsTUFBTSxNQUFNLFlBQVksWUFBWSx3QkFBd0IsTUFBTSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsWUFBWSxZQUFZLHlCQUF5QixRQUFRLEtBQUssS0FBSyxLQUFLLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLHVCQUF1QixPQUFPLFVBQVUsWUFBWSxXQUFXLFVBQVUsaUJBQWlCLEtBQUssS0FBSyxZQUFZLHFxQkFBcXFCLGNBQWMsZUFBZSxjQUFjLG9CQUFvQixrQkFBa0IsNkJBQTZCLEdBQUcsZ0pBQWdKLG1CQUFtQixHQUFHLFFBQVEsbUJBQW1CLEdBQUcsVUFBVSxxQkFBcUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsMkRBQTJELGdCQUFnQixrQkFBa0IsR0FBRyxTQUFTLDhCQUE4QixzQkFBc0IsR0FBRyxvSEFBb0gsc0NBQXNDLGtFQUFrRSw0V0FBNFcsMkJBQTJCLDRCQUE0QixRQUFRLHlCQUF5Qiw2Q0FBNkMsd0VBQXdFLDJZQUEyWSwyQkFBMkIsNEJBQTRCLFFBQVEseUJBQXlCLHVDQUF1QyxtRUFBbUUsaVhBQWlYLDZCQUE2Qiw0QkFBNEIsUUFBUSx5QkFBeUIsOENBQThDLHlFQUF5RSxnWkFBZ1osNkJBQTZCLDRCQUE0QixRQUFRLEtBQUssNkJBQTZCLEdBQUcsT0FBTyw0QkFBNEIsa0JBQWtCLEdBQUcsVUFBVSw2QkFBNkIsMkNBQTJDLEdBQUcsZ0JBQWdCLGdDQUFnQyxHQUFHLHNCQUFzQixrQkFBa0IsR0FBRyxZQUFZLHFDQUFxQyxvQkFBb0IsNkJBQTZCLDhCQUE4Qix5QkFBeUIsb0JBQW9CLDhCQUE4QiwwQkFBMEIsMEJBQTBCLG1CQUFtQiwwQkFBMEIsS0FBSyxzQkFBc0Isa0NBQWtDLEtBQUssR0FBRyxpQkFBaUIsMkNBQTJDLG9CQUFvQixtQkFBbUIsbUJBQW1CLEtBQUssR0FBRywwQkFBMEIsaUJBQWlCLG9CQUFvQixtQkFBbUIsS0FBSyxHQUFHLHVCQUF1QiwyQ0FBMkMsb0JBQW9CLEdBQUcsa0JBQWtCLG1CQUFtQixvQkFBb0IsNkJBQTZCLDhCQUE4QiwwQkFBMEIsc0JBQXNCLDRCQUE0QixPQUFPLHdCQUF3QixvQ0FBb0MsT0FBTyxLQUFLLG9CQUFvQix1Q0FBdUMsZUFBZSxLQUFLLEdBQUcsb0JBQW9CLHdDQUF3QyxlQUFlLEtBQUssR0FBRyxlQUFlLG9CQUFvQiw2QkFBNkIsa0JBQWtCLHVCQUF1Qix5QkFBeUIsd0JBQXdCLDhCQUE4QiwwQkFBMEIseUNBQXlDLE9BQU8sd0JBQXdCLDRCQUE0QixTQUFTLEdBQUcsdUJBQXVCLHFCQUFxQiw2QkFBNkIsR0FBRyxnQkFBZ0IsdUNBQXVDLGtCQUFrQixtQkFBbUIsdUJBQXVCLHFCQUFxQix1QkFBdUIsNEJBQTRCLE9BQU8sd0JBQXdCLHFCQUFxQix1QkFBdUIsT0FBTyxHQUFHLFlBQVkscUJBQXFCLHdCQUF3QixHQUFHLHdCQUF3QixrQkFBa0IsNkZBQTZGLDBCQUEwQixzQkFBc0Isc0JBQXNCLHVCQUF1Qiw2QkFBNkIsMEJBQTBCLDZCQUE2QixPQUFPLEdBQUcsaUNBQWlDLHVCQUF1QixpQ0FBaUMsMkNBQTJDLHdEQUF3RCwrQ0FBK0Msb0NBQW9DLG1DQUFtQyw4QkFBOEIsT0FBTyxHQUFHLHlJQUF5SSxRQUFRLDZCQUE2QixLQUFLLFNBQVMsNkJBQTZCLEtBQUssU0FBUyw2QkFBNkIsS0FBSyxTQUFTLDZCQUE2QixLQUFLLFVBQVUsNkJBQTZCLEtBQUssaUJBQWlCLGdCQUFnQixxQkFBcUIseUJBQXlCLHFCQUFxQixrQkFBa0Isc0JBQXNCLHVCQUF1QiwyQkFBMkIsNEJBQTRCLE9BQU8sR0FBRyxtQkFBbUI7O0FBRTNyYjs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25ELElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGNBQWM7O0FBRWxFO0FBQ0E7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBOztBQUVBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9idWlsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTMxZDUyNTZiNGNjYjdhYzUwYiIsImltcG9ydCBcIi4uL3Nhc3Mvc3R5bGUuc2Nzc1wiO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCQpIHtcblxuICBjb25zdCBydW5BamF4ID0gKCkgPT4ge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgdXJsIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uXG4gICAgbGV0IHNlY3Rpb24gPSAkKCcjc2VsZWN0LXNlY3Rpb24nKS52YWwoKTtcbiAgICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm55dGltZXMuY29tL3N2Yy90b3BzdG9yaWVzL3YyLyR7c2VjdGlvbn0uanNvbmA7XG4gICAgdXJsICs9IGA/JHskLnBhcmFtKHtcbiAgICAgICdhcGkta2V5JzogJ2U1YThmNDNmNDY0ZDQ0MTU4NzQzNDExMTI1ZmFlOTFiJ1xuICAgIH0pfWA7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lciBhbmQgYWRkIGEgbG9hZGluZyAuZ2lmXG4gICAgJCgnLmdhbGxlcnknKS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICQoJy5nYWxsZXJ5JykuYXBwZW5kKCc8aW1nIGNsYXNzPVwibG9hZGVyXCIgc3JjPVwiaW1hZ2VzL2FqYXgtbG9hZGVyLmdpZlwiLz4nKTtcblxuICAgIC8vIFJlbW92ZSBkZWZhdWxsdCBzdHlsaW5nIG9uY2UgYSBzZWN0aW9uIGlzIHNlbGVjdGVkXG4gICAgaWYgKHNlY3Rpb24gIT09ICdzZWN0aW9uJykge1xuICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ25vLXNlbGVjdGlvbicpO1xuICAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnLmxvZ28nKS5hZGRDbGFzcygnYWN0aXZlLWxvZ28nKTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBzdHlsaW5nIHdoZW4gc2VjdGlvbiBpcyBzZWxlY3RlZFxuICAgIGlmIChzZWN0aW9uID09PSAnc2VjdGlvbicpIHtcbiAgICAgICQoJy5sb2FkZXInKS5yZW1vdmUoKTtcbiAgICAgICQoJ2hlYWRlcicpLmFkZENsYXNzKCduby1zZWxlY3Rpb24nKTtcbiAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJy5sb2dvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS1sb2dvJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBSZXRyaWV2ZSBkYXRhIGZyb20gTllUIEFQSVxuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgIC8vUmVtb3ZlIExvYWRpbmcgZ2lmXG4gICAgICAkKCcuZ2FsbGVyeScpLmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAvLyBTZXQgYXJ0aWNsZSBjb3VudGVyIHRvIGtlZXAgdHJhY2sgb2YgYXJ0aWNsZXMgYmVpbmcgYXBwZW5kZWRcbiAgICAgIGxldCBhcnRpY2xlQ291bnRlciA9IDA7XG4gICAgICAkLmVhY2goZGF0YS5yZXN1bHRzLCAoaSwgdmFsdWUpID0+IHtcblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgaW1hZ2UgZmlsZSBleGlzdHMsIGlmIHRoZXJlIGlzIG5vIGltYWdlLCByZXR1cm5pbmcgdHJ1ZSBjb250aW51ZXMgdG8gdGhlIG5leHQgaXRlbSBpbiB0aGUgbG9vcFxuICAgICAgICBpZiAodmFsdWUubXVsdGltZWRpYS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvb2sgZm9yIHRoZSBoaWdoZXN0IHF1YWxpdHkgaW1hZ2UgdG8gZGlzcGxheVxuICAgICAgICBsZXQgYmVzdFF1YWxpdHkgPSB2YWx1ZS5tdWx0aW1lZGlhLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSB2YWx1ZS5tdWx0aW1lZGlhW2Jlc3RRdWFsaXR5XS51cmw7XG5cbiAgICAgICAgLy8gc2V0IGEgdW5pcXVlIGNsYXNzIG9uIGVhY2ggaXRlbSBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UgKyBjb25zdHJ1Y3QgSFRNTCBcbiAgICAgICAgbGV0IGltYWdlTnVtYmVyID0gYGltYWdlLWNvbmF0aW5lci0ke2l9YDtcbiAgICAgICAgbGV0IG91dHB1dCA9ICc8bGkgY2xhc3M9XCJnYWxsZXJ5LWl0ZW1cIj48YSBocmVmPVwiJztcbiAgICAgICAgb3V0cHV0ICs9IHZhbHVlLnVybDtcbiAgICAgICAgb3V0cHV0ICs9IGBcIj48ZGl2IGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyICR7aW1hZ2VOdW1iZXJ9XCI+YDtcbiAgICAgICAgb3V0cHV0ICs9IGA8cCBjbGFzcz1cImFic3RyYWN0IHB1bGxVcFwiPiR7dmFsdWUuYWJzdHJhY3R9PC9wPmA7XG4gICAgICAgIG91dHB1dCArPSAnPC9kaXY+PC9hPjwvbGk+JztcbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIHRoZSBET01cbiAgICAgICAgJCgnLmdhbGxlcnknKS5hcHBlbmQob3V0cHV0KTtcblxuICAgICAgICAvL1NlbGVjdHMgaW1hZ2UgY2xhc3MgYW5kIGFkZHMgYmFja2dyb3VuZCBpbWFnZVxuICAgICAgICAkKGAuJHtpbWFnZU51bWJlcn1gKS5jc3Moe1xuICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogYHVybChcIiR7YmFja2dyb3VuZEltYWdlfVwiKWAsXG4gICAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6ICdjb3ZlcicsXG4gICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nOiAnY2VudGVyJyxcbiAgICAgICAgICAnaGVpZ2h0JzogJzEwMCUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluY3JlbWVudCB0byBhcnRpY2xlIGNvdW50ZXIgYWZ0ZXIgYW4gaXRlbSBoYXMgYmVlbiBhcHBlbmRlZFxuICAgICAgICBhcnRpY2xlQ291bnRlcisrO1xuXG4gICAgICAgIC8vIFRoZSBsb29wIHdpbGwgY29udGludWUgc28gbG9uZyBhcyB0aGUgYXJ0aWNsZSBjb3VudGVyIGRvZXMgbm90IGVxdWFsIDEyXG4gICAgICAgIC8vIG9uY2UgMTIgaGFzIGJlZW4gcmVhY2hlZCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlIGFuZCBlbmQgdGhlIC5lYWNoIGxvb3BcbiAgICAgICAgcmV0dXJuIGFydGljbGVDb3VudGVyICE9PSAxMjtcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgY29uc3QgZXJyb3IgPSAwO1xuICAgICAgJCgnLmdhbGxlcnknKS5hcHBlbmQoJzxsaT5DYW5ub3QgcmV0cmlldmUgYXJ0aWNsZXM8L2xpPicpO1xuICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH0pO1xuICB9O1xuXG4gIHJ1bkFqYXgoKTtcblxuICAkKCcjc2VsZWN0LXNlY3Rpb24nKS5vbignY2hhbmdlJywoKSA9PiB7XG4gICAgcnVuQWpheCgpO1xuICB9KTtcblxuICAvLyBTZWxlY3RyaWMgRm9ybSBTdHlsaW5nXG4gICQoJ3NlbGVjdCcpLnNlbGVjdHJpYygpO1xufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zY3JpcHQuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMi0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTItMiEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTItMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0yLTIhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0yLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMi0yIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Fzcy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXFxuLyohIEZvbnRzIEdlbmVyYXRlZCBieSBGb250IFNxdWlycmVsIChodHRwczovL3d3dy5mb250c3F1aXJyZWwuY29tKSBvbiBPY3RvYmVyIDE2LCAyMDE3ICovXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogI2ZmZjsgfVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjsgfVxcblxcbi5jYXBpdGFsaXplIHtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IH1cXG5cXG4uc2VsZWN0aW9uLWhlYWRlciB7XFxuICBjb2xvcjogI2ZmZjsgfVxcblxcbi5hY3RpdmUge1xcbiAgdHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW4gLjVzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAgIC5hY3RpdmUge1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICBoZWlnaHQ6IGF1dG87XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAgIC5hY3RpdmUge1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDsgfSB9XFxuXFxuLmFjdGl2ZS1sb2dvIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0IDAuMDVzOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gICAgLmFjdGl2ZS1sb2dvIHtcXG4gICAgICBoZWlnaHQ6IDc1cHg7XFxuICAgICAgbWFyZ2luOiAyMHB4OyB9IH1cXG5cXG4uc2VsZWN0aW9uLWNvbnRhaW5lciB7XFxuICBtYXJnaW46IDEwcHg7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgICAuc2VsZWN0aW9uLWNvbnRhaW5lciB7XFxuICAgICAgbWFyZ2luOiAwIDglOyB9IH1cXG5cXG4uc2VsZWN0aW9uLWhlYWRlciB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dCAwLjA1cztcXG4gIHBhZGRpbmc6IDEwcHggMDsgfVxcblxcbi5uby1zZWxlY3Rpb24ge1xcbiAgaGVpZ2h0OiA4MHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgICAubm8tc2VsZWN0aW9uIHtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93OyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMjQwcHgpIHtcXG4gICAgLm5vLXNlbGVjdGlvbiB7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9IH1cXG5cXG4uZ2FsbGVyeSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGNvbG9yOiAjZmZmOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gICAgLmdhbGxlcnkge1xcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMjQwcHgpIHtcXG4gICAgLmdhbGxlcnkge1xcbiAgICAgIG1heC13aWR0aDogMTUwMHB4OyB9IH1cXG5cXG5kaXYuaW1hZ2UtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7IH1cXG5cXG4uZ2FsbGVyeS1pdGVtIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjA1cyBlYXNlIDAuMDVzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDUwdnc7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgICAuZ2FsbGVyeS1pdGVtIHtcXG4gICAgICB3aWR0aDogNTAlO1xcbiAgICAgIGhlaWdodDogNDB2dztcXG4gICAgICBtYXgtaGVpZ2h0OiA0NTBweDsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTI0MHB4KSB7XFxuICAgIC5nYWxsZXJ5LWl0ZW0ge1xcbiAgICAgIHdpZHRoOiAyNSU7XFxuICAgICAgaGVpZ2h0OiAzNXZ3OyB9IH1cXG5cXG4ubG9hZGVyIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgbWF4LWhlaWdodDogMTAwcHg7IH1cXG5cXG4uYWJzdHJhY3QsIC5wdWxsdXAge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMzBkZWcsIHJnYmEoMzksIDM5LCAzOSwgMC41KSwgcmdiYSgzOSwgMzksIDM5LCAwLjUpKTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBtaW4taGVpZ2h0OiA0MCU7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgICAuYWJzdHJhY3QsIC5wdWxsdXAge1xcbiAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gICAgICBtYXgtaGVpZ2h0OiAwcHg7XFxuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuOyB9IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gIC5nYWxsZXJ5LWl0ZW06aG92ZXIgLnB1bGxVcCB7XFxuICAgIGFuaW1hdGlvbi1uYW1lOiBwdWxsVXA7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4zcztcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IDMwJSAxMDAlO1xcbiAgICBtYXgtaGVpZ2h0OiAzNSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfSB9XFxuXFxuLypcXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxucHVsbFVwXFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbiovXFxuQGtleWZyYW1lcyBwdWxsVXAge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjEpOyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjcpOyB9XFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjgpOyB9XFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjkpOyB9XFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMSk7IH0gfVxcblxcbmZvb3RlciB7XFxuICBjb2xvcjogI2MyYzJjMjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAzMHB4IDA7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMjQwcHgpIHtcXG4gICAgZm9vdGVyIHtcXG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4OyB9IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19yZXNldC5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3JjL3Nhc3MvX2ZvbnRzLnNjc3NcIixcIi9Vc2Vycy9zY290dGxpdmluZ3N0b25lL3JlZC1hY2FkZW15L3Byb2plY3RzL3Byb2plY3QtMi9zcmMvc2Fzcy9zcmMvc2Fzcy9fZ2xvYmFscy5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3JjL3Nhc3MvX2hlYWRlci5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3JjL3Nhc3MvX21peGlucy5zY3NzXCIsXCIvVXNlcnMvc2NvdHRsaXZpbmdzdG9uZS9yZWQtYWNhZGVteS9wcm9qZWN0cy9wcm9qZWN0LTIvc3JjL3Nhc3Mvc3JjL3Nhc3MvX2NvbnRlbnQuc2Nzc1wiLFwiL1VzZXJzL3Njb3R0bGl2aW5nc3RvbmUvcmVkLWFjYWRlbXkvcHJvamVjdHMvcHJvamVjdC0yL3NyYy9zYXNzL3NyYy9zYXNzL19mb290ZXIuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0VBR0U7QUFFRjs7Ozs7Ozs7Ozs7OztFQWFDLFVBQVM7RUFDVCxXQUFVO0VBQ1YsVUFBUztFQUNULGdCQUFlO0VBQ2YsY0FBYTtFQUNiLHlCQUF3QixFQUN4Qjs7QUFDRCxpREFBaUQ7QUFDakQ7O0VBRUMsZUFBYyxFQUNkOztBQUNEO0VBQ0MsZUFBYyxFQUNkOztBQUNEO0VBQ0MsaUJBQWdCLEVBQ2hCOztBQUNEO0VBQ0MsYUFBWSxFQUNaOztBQUNEOztFQUVDLFlBQVc7RUFDWCxjQUFhLEVBQ2I7O0FBQ0Q7RUFDQywwQkFBeUI7RUFDekIsa0JBQWlCLEVBQ2pCOztBQy9DRCwwRkFBMEY7QUNBMUY7RUFDSSx1QkFBc0IsRUFDekI7O0FBRUQ7RUFDSSxzQkFBcUI7RUFDckIsWUFBVyxFQUNkOztBQUVEO0VBQ0ksdUJBQXNCO0VBQ3RCLHFDQUFvQyxFQUN2Qzs7QUFFRDtFQUNJLDBCQUF5QixFQUM1Qjs7QUNoQkQ7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSwrQkFBOEI7RUFDOUIsY0FBYTtFQUNiLHVCQUFzQjtFQUN0Qix3QkFBdUI7RUFDdkIsbUJBQWtCLEVBV3JCO0VDbkJDO0lER0Y7TUFPSSx3QkFBdUI7TUFDdkIsb0JBQW1CO01BQ25CLG9CQUFtQjtNQUNuQixhQUFZO01BQ1osb0JBQW1CLEVBS3RCLEVBQUE7RUNiQztJREhGO01BY0ksNEJBQTJCLEVBRTlCLEVBQUE7O0FBRUQ7RUFDRSx1Q0FBc0MsRUFLdkM7RUMzQkM7SURxQkY7TUFHSSxhQUFZO01BQ1osYUFBWSxFQUVmLEVBQUE7O0FBRUQ7RUFDRSxhQUFZLEVBSWI7RUNsQ0M7SUQ2QkY7TUFHSSxhQUFZLEVBRWYsRUFBQTs7QUFFRDtFQUNFLHVDQUFzQztFQUN0QyxnQkFBZSxFQUNoQjs7QUFFRDtFQUNJLGFBQVk7RUFDWixjQUFhO0VBQ2IsdUJBQXNCO0VBQ3RCLHdCQUF1QjtFQUN2QixvQkFBbUIsRUFRdEI7RUN0REM7SUR5Q0Y7TUFPTSxvQkFBbUIsRUFNeEIsRUFBQTtFQ2hEQztJRG1DRjtNQVVNLDRCQUEyQixFQUdoQyxFQUFBOztBRXRERDtFQUNJLGNBQWE7RUFDYix1QkFBc0I7RUFDdEIsWUFBVyxFQVdkO0VEZEM7SUNBRjtNQUtRLGVBQWM7TUFDZCxjQUFhO01BQ2Isb0JBQW1CO01BQ25CLGdCQUFlO01BQ2YsK0JBQThCLEVBS3JDLEVBQUE7RURSQztJQ05GO01BWVEsa0JBQWlCLEVBRXhCLEVBQUE7O0FBQ0Q7RUFDSyxjQUFhO0VBQ2Isc0JBQXFCLEVBQ3pCOztBQUNEO0VBQ0ksaUNBQWdDO0VBQ2hDLFlBQVc7RUFDWCxhQUFZLEVBVWY7RURoQ0M7SUNtQkY7TUFLUSxXQUFVO01BQ1YsYUFBWTtNQUNaLGtCQUFpQixFQU14QixFQUFBO0VEMUJDO0lDYUY7TUFVUSxXQUFVO01BQ1YsYUFBWSxFQUVuQixFQUFBOztBQUVEO0VBQ0ksZUFBYztFQUNkLGtCQUFpQixFQUNwQjs7QUFFRDtFQUNJLFlBQVc7RUFDWCx1RkFBc0Y7RUFDdEYsb0JBQW1CO0VBQ25CLGdCQUFlO0VBQ2YsZ0JBQWUsRUFNbEI7RURsREM7SUN1Q0Y7TUFPUSxtQkFBa0I7TUFDbEIsZ0JBQWU7TUFDZixtQkFBa0IsRUFFekIsRUFBQTs7QURsREM7RUNvREY7SUFFUSx1QkFBc0I7SUFFekIseUJBQXdCO0lBRXhCLG9DQUFtQztJQUVuQywyQkFBMEI7SUFFdkIsZ0JBQWU7SUFDZix5QkFBd0I7SUFDeEIsb0JBQW1CLEVBRTFCLEVBQUE7O0FBRUQ7Ozs7RUFJRTtBQUVGO0VBQ0M7SUFDQyx1QkFBc0IsRUFBQTtFQUV2QjtJQUNDLHVCQUFzQixFQUFBO0VBRXZCO0lBQ0MsdUJBQXNCLEVBQUE7RUFFdkI7SUFDQyx1QkFBc0IsRUFBQTtFQUV2QjtJQUNDLHFCQUFzQixFQUFBLEVBQUE7O0FDeEZ4QjtFQUNJLGVBQWM7RUFDZCxtQkFBa0I7RUFDbEIsZUFBYztFQUNkLFlBQVc7RUFDWCxnQkFBZSxFQUtsQjtFRkpDO0lFTkY7TUFPUSxpQkFBZ0I7TUFDaEIsa0JBQWlCLEVBRXhCLEVBQUFcIixcImZpbGVcIjpcInN0eWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIixcIi8qISBGb250cyBHZW5lcmF0ZWQgYnkgRm9udCBTcXVpcnJlbCAoaHR0cHM6Ly93d3cuZm9udHNxdWlycmVsLmNvbSkgb24gT2N0b2JlciAxNiwgMjAxNyAqL1xcblxcblxcblxcbi8vIEBmb250LWZhY2Uge1xcbi8vICAgICBmb250LWZhbWlseTogJ29wZW5fc2Fuc2JvbGQnO1xcbi8vICAgICBzcmM6IHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGQtd2ViZm9udC5lb3QnKTtcXG4vLyAgICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXG4vLyAgICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuLy8gICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZC13ZWJmb250LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcXG4vLyAgICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkLXdlYmZvbnQuc3ZnI29wZW5fc2Fuc2JvbGQnKSBmb3JtYXQoJ3N2ZycpO1xcbi8vICAgICBmb250LXdlaWdodDogYm9sZDtcXG4vLyAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcblxcbi8vIH1cXG5cXG5cXG5cXG5cXG4vLyBAZm9udC1mYWNlIHtcXG4vLyAgICAgZm9udC1mYW1pbHk6ICdvcGVuX3NhbnNib2xkX2l0YWxpYyc7XFxuLy8gICAgIHNyYzogdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtYm9sZGl0YWxpYy13ZWJmb250LmVvdCcpO1xcbi8vICAgICBzcmM6IHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5lb3Q/I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxcbi8vICAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4vLyAgICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1ib2xkaXRhbGljLXdlYmZvbnQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpLFxcbi8vICAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWJvbGRpdGFsaWMtd2ViZm9udC5zdmcjb3Blbl9zYW5zYm9sZF9pdGFsaWMnKSBmb3JtYXQoJ3N2ZycpO1xcbi8vICAgICBmb250LXdlaWdodDogYm9sZDtcXG4vLyAgICAgZm9udC1zdHlsZTogaXRhbGljO1xcblxcbi8vIH1cXG5cXG5cXG5cXG5cXG4vLyBAZm9udC1mYWNlIHtcXG4vLyAgICAgZm9udC1mYW1pbHk6ICdvcGVuX3NhbnNsaWdodCc7XFxuLy8gICAgIHNyYzogdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC5lb3QnKTtcXG4vLyAgICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuLy8gICAgICAgICAgdXJsKCcuLi8uLi9wdWJsaWMvZm9udHMvb3BlbnNhbnMtbGlnaHQtd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4vLyAgICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcXG4vLyAgICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodC13ZWJmb250LnN2ZyNvcGVuX3NhbnNsaWdodCcpIGZvcm1hdCgnc3ZnJyk7XFxuLy8gICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuLy8gICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG5cXG4vLyB9XFxuXFxuXFxuXFxuXFxuLy8gQGZvbnQtZmFjZSB7XFxuLy8gICAgIGZvbnQtZmFtaWx5OiAnb3Blbl9zYW5zbGlnaHRfaXRhbGljJztcXG4vLyAgICAgc3JjOiB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LmVvdCcpO1xcbi8vICAgICBzcmM6IHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXG4vLyAgICAgICAgICB1cmwoJy4uLy4uL3B1YmxpYy9mb250cy9vcGVuc2Fucy1saWdodGl0YWxpYy13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbi8vICAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpLFxcbi8vICAgICAgICAgIHVybCgnLi4vLi4vcHVibGljL2ZvbnRzL29wZW5zYW5zLWxpZ2h0aXRhbGljLXdlYmZvbnQuc3ZnI29wZW5fc2Fuc2xpZ2h0X2l0YWxpYycpIGZvcm1hdCgnc3ZnJyk7XFxuLy8gICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuLy8gICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG5cXG4vLyB9XCIsXCIqe1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5hIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmNhcGl0YWxpemV7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVwiLFwiLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuLmFjdGl2ZXtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW4gLjVzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgQGluY2x1ZGUgdGFibGV0e1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgfVxcbiAgQGluY2x1ZGUgZGVza3RvcCB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIH1cXG59XFxuXFxuLmFjdGl2ZS1sb2dve1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQgMC4wNXM7XFxuICBAaW5jbHVkZSB0YWJsZXR7XFxuICAgIGhlaWdodDogNzVweDtcXG4gICAgbWFyZ2luOiAyMHB4O1xcbiAgfVxcbn1cXG5cXG4uc2VsZWN0aW9uLWNvbnRhaW5lciB7XFxuICBtYXJnaW46IDEwcHg7XFxuICBAaW5jbHVkZSB0YWJsZXR7XFxuICAgIG1hcmdpbjogMCA4JTtcXG4gIH1cXG59XFxuXFxuLnNlbGVjdGlvbi1oZWFkZXIge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQgMC4wNXM7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxufVxcblxcbi5uby1zZWxlY3Rpb257XFxuICAgIGhlaWdodDogODB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIEBpbmNsdWRlIHRhYmxldHtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICB9XFxuICAgIEBpbmNsdWRlIGRlc2t0b3Age1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgfVxcblxcbn1cXG5cIixcIkBtaXhpbiB0YWJsZXQge1xcbiAgQG1lZGlhIChtaW4td2lkdGg6ICR0YWJsZXQtd2lkdGgpIHtcXG4gICAgQGNvbnRlbnQ7XFxuICB9XFxufVxcblxcbkBtaXhpbiBkZXNrdG9wIHtcXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkZGVza3RvcC13aWR0aCkge1xcbiAgICBAY29udGVudDtcXG4gIH1cXG59XCIsXCJcXG4uZ2FsbGVyeSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBAaW5jbHVkZSB0YWJsZXQge1xcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgfVxcbiAgICBAaW5jbHVkZSBkZXNrdG9wIHtcXG4gICAgICAgIG1heC13aWR0aDogMTUwMHB4OyAgXFxuICAgIH1cXG59XFxuZGl2LmltYWdlLWNvbnRhaW5lciB7XFxuICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbn1cXG4uZ2FsbGVyeS1pdGVte1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4wNXMgZWFzZSAwLjA1cztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogNTB2dztcXG4gICAgQGluY2x1ZGUgdGFibGV0IHtcXG4gICAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgICBoZWlnaHQ6IDQwdnc7XFxuICAgICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcXG4gICAgfVxcbiAgICBAaW5jbHVkZSBkZXNrdG9wIHtcXG4gICAgICAgIHdpZHRoOiAyNSU7XFxuICAgICAgICBoZWlnaHQ6IDM1dnc7XFxuICAgIH1cXG59XFxuXFxuLmxvYWRlcntcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG1heC1oZWlnaHQ6IDEwMHB4O1xcbn1cXG5cXG4uYWJzdHJhY3QsIC5wdWxsdXAge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDMwZGVnLCByZ2JhKDM5LCAzOSwgMzksIDAuNSksIHJnYmEoMzksIDM5LCAzOSwgMC41KSk7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgbWluLWhlaWdodDogNDAlO1xcbiAgICBAaW5jbHVkZSB0YWJsZXQge1xcbiAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgICAgICAgbWF4LWhlaWdodDogMHB4O1xcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICB9XFxufVxcblxcbi5nYWxsZXJ5LWl0ZW06aG92ZXIgLnB1bGxVcCB7XFxuICAgIEBpbmNsdWRlIHRhYmxldCB7XFxuICAgICAgICBhbmltYXRpb24tbmFtZTogcHVsbFVwO1xcbiAgICAgICAgXFxuXFx0ICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4zcztcXHRcXG4gICAgICAgIFxcblxcdCAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXHRcXG4gICAgICAgIFxcblxcdCAgICB0cmFuc2Zvcm0tb3JpZ2luOiAzMCUgMTAwJTtcXG4gICAgICAgIFxcbiAgICAgICAgbWF4LWhlaWdodDogMzUlO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgfVxcbn1cXG5cXG4vKlxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG5wdWxsVXBcXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuKi9cXG5cXG5Aa2V5ZnJhbWVzIHB1bGxVcCB7XFxuXFx0MCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDAuMSk7XFxuXFx0fVxcblxcdDQwJSB7XFxuXFx0XFx0dHJhbnNmb3JtOiBzY2FsZVkoMC43KTtcXG5cXHR9XFxuXFx0NjAlIHtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlWSgwLjgpO1xcblxcdH1cXG5cXHQ4MCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDAuOSk7XFxuXFx0fVxcblxcdDEwMCUge1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XFxuXFx0fVxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcbn1cXG5cXG5cIixcIlxcbmZvb3RlcntcXG4gICAgY29sb3I6ICNjMmMyYzI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAzMHB4IDA7XFxuICAgIEBpbmNsdWRlIGRlc2t0b3B7XFxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XCJzb3VyY2VNYXBcIjp0cnVlfSEuL3NyYy9zYXNzL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=