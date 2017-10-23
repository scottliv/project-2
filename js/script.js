(function($){

  $('#select-section').on('change', function(){
    // Construct the url based on user selection
    var section = $('#select-section').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    // Clear the container and add a loading .gif
    $('.gallery').children().remove();
    $('.gallery').append('<img class="loader" src="images/ajax-loader.gif"/>')
   
    // Remove defaullt styling once a section is selected
    if (section !== 'section'){
      $('header').removeClass('no-selection');
      $('header').addClass('active');
      $('.logo').addClass('active-logo');
    }

    // Reset styling when section is selected
    if (section === 'section'){
      $('.loader').remove();
      $('header').addClass('no-selection');
      $('header').removeClass('active');
      $('.logo').removeClass('active-logo')
      
    } 
    
    // Retrieve data from NYT API

    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {
      //Remove Loading gif
      $('.gallery').children().remove();
      // Set article counter to keep track of articles being appended
      var articleCounter = 0;
      $.each(data.results, function(i, value){

          // Check to see if image file exists, if there is no image, returning true continues to the next item in the loop
          if(value.multimedia.length === 0){
            return true;
          }

          // Look for the highest quality image to display
          var bestQuality = value.multimedia.length - 1;
          var backgroundImage = value.multimedia[bestQuality].url;

          // set a unique class on each item for the background image + construct HTML 
          var imageNumber = 'image-conatiner-'+i;
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
          articleCounter ++;
      
          // The loop will continue so long as the article counter does not equal 12
          // once 12 has been reached this will return false and end the .each loop
          return (articleCounter !== 12);
      });
    })
    .fail(function(){
      var error = 0;
      $('.gallery').append('<li>Cannot retrieve articles</li>');
      return error;
    });
  });

  // Selectric Form Styling
  $('select').selectric();
}(jQuery));