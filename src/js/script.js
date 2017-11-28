import "../sass/style.scss";
'use strict';

(function ($) {

  const runAjax = () => {
    // Construct the url based on user selection
    let section = $('#select-section').val();
    let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json`;
    let $gallery = $('.gallery');
    url += `?${$.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    })}`;
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
    }).done((data) => {
      //Remove Loading gif
      $gallery.children().remove();
      // Set article counter to keep track of articles being appended
      let articleCounter = 0;
      $.each(data.results, (i, value) => {

        // Check to see if image file exists, if there is no image, returning true continues to the next item in the loop
        if (value.multimedia.length === 0) {
          return true;
        }

        // Look for the highest quality image to display
        let bestQuality = value.multimedia.length - 1;
        let backgroundImage = value.multimedia[bestQuality].url;

        // set a unique class on each item for the background image + construct HTML 
        let imageNumber = `image-container-${i}`;
        let output = '<li class="gallery-item"><a href="';
        output += value.url;
        output += `"><div class="image-container ${imageNumber}">`;
        output += `<p class="abstract pullUp">${value.abstract}</p>`;
        output += '</div></a></li>';
        // Add elements to the DOM
        $gallery.append(output);

        //Selects image class and adds background image
        $(`.${imageNumber}`).css({
          'background-image': `url("${backgroundImage}")`,
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
    }).fail(() => {
      $gallery.append('<li>Cannot retrieve articles</li>');
      return false;
    });
  };

  // Calls the function on page load, will maintain previous selection if coming back from an article
  runAjax();

  $('#select-section').on('change',() => {
    runAjax();
  });

  // Selectric Form Styling
  $('select').selectric();
})(jQuery);
