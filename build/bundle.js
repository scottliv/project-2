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
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function ($) {\n\n  let runAjax = () => {\n    // Construct the url based on user selection\n    let section = $('#select-section').val();\n    let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json`;\n    url += `?${$.param({\n      'api-key': 'e5a8f43f464d44158743411125fae91b'\n    })}`;\n    // Clear the container and add a loading .gif\n    $('.gallery').children().remove();\n    $('.gallery').append('<img class=\"loader\" src=\"images/ajax-loader.gif\"/>');\n\n    // Remove defaullt styling once a section is selected\n    if (section !== 'section') {\n      $('header').removeClass('no-selection');\n      $('header').addClass('active');\n      $('.logo').addClass('active-logo');\n    }\n\n    // Reset styling when section is selected\n    if (section === 'section') {\n      $('.loader').remove();\n      $('header').addClass('no-selection');\n      $('header').removeClass('active');\n      $('.logo').removeClass('active-logo');\n      return true;\n    }\n\n    // Retrieve data from NYT API\n\n    $.ajax({\n      url: url,\n      method: 'GET'\n    }).done((data) => {\n      //Remove Loading gif\n      $('.gallery').children().remove();\n      // Set article counter to keep track of articles being appended\n      let articleCounter = 0;\n      $.each(data.results, (i, value) => {\n\n        // Check to see if image file exists, if there is no image, returning true continues to the next item in the loop\n        if (value.multimedia.length === 0) {\n          return true;\n        }\n\n        // Look for the highest quality image to display\n        let bestQuality = value.multimedia.length - 1;\n        let backgroundImage = value.multimedia[bestQuality].url;\n\n        // set a unique class on each item for the background image + construct HTML \n        let imageNumber = `image-conatiner-${i}`;\n        let output = '<li class=\"gallery-item\"><a href=\"';\n        output += value.url;\n        output += `\"><div class=\"image-container ${imageNumber}\">`;\n        output += `<p class=\"abstract pullUp\">${value.abstract}</p>`;\n        output += '</div></a></li>';\n        // Add elements to the DOM\n        $('.gallery').append(output);\n\n        //Selects image class and adds background image\n        $(`.${imageNumber}`).css({\n          'background-image': `url(\"${backgroundImage}\")`,\n          'background-size': 'cover',\n          'background-position': 'center',\n          'height': '100%'\n        });\n\n        // Increment to article counter after an item has been appended\n        articleCounter++;\n\n        // The loop will continue so long as the article counter does not equal 12\n        // once 12 has been reached this will return false and end the .each loop\n        return articleCounter !== 12;\n      });\n    }).fail(() => {\n      var error = 0;\n      $('.gallery').append('<li>Cannot retrieve articles</li>');\n      return error;\n    });\n  };\n\n  runAjax();\n\n  $('#select-section').on('change',() => {\n    runAjax();\n  });\n\n  // Selectric Form Styling\n  $('select').selectric();\n})(jQuery);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9zY3JpcHQuanM/MTkyNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gIGxldCBydW5BamF4ID0gKCkgPT4ge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgdXJsIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uXG4gICAgbGV0IHNlY3Rpb24gPSAkKCcjc2VsZWN0LXNlY3Rpb24nKS52YWwoKTtcbiAgICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm55dGltZXMuY29tL3N2Yy90b3BzdG9yaWVzL3YyLyR7c2VjdGlvbn0uanNvbmA7XG4gICAgdXJsICs9IGA/JHskLnBhcmFtKHtcbiAgICAgICdhcGkta2V5JzogJ2U1YThmNDNmNDY0ZDQ0MTU4NzQzNDExMTI1ZmFlOTFiJ1xuICAgIH0pfWA7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lciBhbmQgYWRkIGEgbG9hZGluZyAuZ2lmXG4gICAgJCgnLmdhbGxlcnknKS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICQoJy5nYWxsZXJ5JykuYXBwZW5kKCc8aW1nIGNsYXNzPVwibG9hZGVyXCIgc3JjPVwiaW1hZ2VzL2FqYXgtbG9hZGVyLmdpZlwiLz4nKTtcblxuICAgIC8vIFJlbW92ZSBkZWZhdWxsdCBzdHlsaW5nIG9uY2UgYSBzZWN0aW9uIGlzIHNlbGVjdGVkXG4gICAgaWYgKHNlY3Rpb24gIT09ICdzZWN0aW9uJykge1xuICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ25vLXNlbGVjdGlvbicpO1xuICAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnLmxvZ28nKS5hZGRDbGFzcygnYWN0aXZlLWxvZ28nKTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBzdHlsaW5nIHdoZW4gc2VjdGlvbiBpcyBzZWxlY3RlZFxuICAgIGlmIChzZWN0aW9uID09PSAnc2VjdGlvbicpIHtcbiAgICAgICQoJy5sb2FkZXInKS5yZW1vdmUoKTtcbiAgICAgICQoJ2hlYWRlcicpLmFkZENsYXNzKCduby1zZWxlY3Rpb24nKTtcbiAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJy5sb2dvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS1sb2dvJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBSZXRyaWV2ZSBkYXRhIGZyb20gTllUIEFQSVxuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgIC8vUmVtb3ZlIExvYWRpbmcgZ2lmXG4gICAgICAkKCcuZ2FsbGVyeScpLmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAvLyBTZXQgYXJ0aWNsZSBjb3VudGVyIHRvIGtlZXAgdHJhY2sgb2YgYXJ0aWNsZXMgYmVpbmcgYXBwZW5kZWRcbiAgICAgIGxldCBhcnRpY2xlQ291bnRlciA9IDA7XG4gICAgICAkLmVhY2goZGF0YS5yZXN1bHRzLCAoaSwgdmFsdWUpID0+IHtcblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgaW1hZ2UgZmlsZSBleGlzdHMsIGlmIHRoZXJlIGlzIG5vIGltYWdlLCByZXR1cm5pbmcgdHJ1ZSBjb250aW51ZXMgdG8gdGhlIG5leHQgaXRlbSBpbiB0aGUgbG9vcFxuICAgICAgICBpZiAodmFsdWUubXVsdGltZWRpYS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvb2sgZm9yIHRoZSBoaWdoZXN0IHF1YWxpdHkgaW1hZ2UgdG8gZGlzcGxheVxuICAgICAgICBsZXQgYmVzdFF1YWxpdHkgPSB2YWx1ZS5tdWx0aW1lZGlhLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSB2YWx1ZS5tdWx0aW1lZGlhW2Jlc3RRdWFsaXR5XS51cmw7XG5cbiAgICAgICAgLy8gc2V0IGEgdW5pcXVlIGNsYXNzIG9uIGVhY2ggaXRlbSBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UgKyBjb25zdHJ1Y3QgSFRNTCBcbiAgICAgICAgbGV0IGltYWdlTnVtYmVyID0gYGltYWdlLWNvbmF0aW5lci0ke2l9YDtcbiAgICAgICAgbGV0IG91dHB1dCA9ICc8bGkgY2xhc3M9XCJnYWxsZXJ5LWl0ZW1cIj48YSBocmVmPVwiJztcbiAgICAgICAgb3V0cHV0ICs9IHZhbHVlLnVybDtcbiAgICAgICAgb3V0cHV0ICs9IGBcIj48ZGl2IGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyICR7aW1hZ2VOdW1iZXJ9XCI+YDtcbiAgICAgICAgb3V0cHV0ICs9IGA8cCBjbGFzcz1cImFic3RyYWN0IHB1bGxVcFwiPiR7dmFsdWUuYWJzdHJhY3R9PC9wPmA7XG4gICAgICAgIG91dHB1dCArPSAnPC9kaXY+PC9hPjwvbGk+JztcbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIHRoZSBET01cbiAgICAgICAgJCgnLmdhbGxlcnknKS5hcHBlbmQob3V0cHV0KTtcblxuICAgICAgICAvL1NlbGVjdHMgaW1hZ2UgY2xhc3MgYW5kIGFkZHMgYmFja2dyb3VuZCBpbWFnZVxuICAgICAgICAkKGAuJHtpbWFnZU51bWJlcn1gKS5jc3Moe1xuICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogYHVybChcIiR7YmFja2dyb3VuZEltYWdlfVwiKWAsXG4gICAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6ICdjb3ZlcicsXG4gICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nOiAnY2VudGVyJyxcbiAgICAgICAgICAnaGVpZ2h0JzogJzEwMCUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluY3JlbWVudCB0byBhcnRpY2xlIGNvdW50ZXIgYWZ0ZXIgYW4gaXRlbSBoYXMgYmVlbiBhcHBlbmRlZFxuICAgICAgICBhcnRpY2xlQ291bnRlcisrO1xuXG4gICAgICAgIC8vIFRoZSBsb29wIHdpbGwgY29udGludWUgc28gbG9uZyBhcyB0aGUgYXJ0aWNsZSBjb3VudGVyIGRvZXMgbm90IGVxdWFsIDEyXG4gICAgICAgIC8vIG9uY2UgMTIgaGFzIGJlZW4gcmVhY2hlZCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlIGFuZCBlbmQgdGhlIC5lYWNoIGxvb3BcbiAgICAgICAgcmV0dXJuIGFydGljbGVDb3VudGVyICE9PSAxMjtcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgdmFyIGVycm9yID0gMDtcbiAgICAgICQoJy5nYWxsZXJ5JykuYXBwZW5kKCc8bGk+Q2Fubm90IHJldHJpZXZlIGFydGljbGVzPC9saT4nKTtcbiAgICAgIHJldHVybiBlcnJvcjtcbiAgICB9KTtcbiAgfTtcblxuICBydW5BamF4KCk7XG5cbiAgJCgnI3NlbGVjdC1zZWN0aW9uJykub24oJ2NoYW5nZScsKCkgPT4ge1xuICAgIHJ1bkFqYXgoKTtcbiAgfSk7XG5cbiAgLy8gU2VsZWN0cmljIEZvcm0gU3R5bGluZ1xuICAkKCdzZWxlY3QnKS5zZWxlY3RyaWMoKTtcbn0pKGpRdWVyeSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9zY3JpcHQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);