(function($){

  $('#select-section').on('change', function(){
    // construct the url based on user selection
    var section = $('#select-section').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    // Clear the container
    $('.gallery').children().remove();
    $('.gallery').append('<img class="loader" src="images/ajax-loader.gif"/>')
   
    // remove defaullt styling once a section is selected
    if (section !== 'section'){
      $('header').removeClass('no-selection');
      $('header').addClass('active');
      $('.logo').addClass('active-logo');
    }

    // Reset styling when section is selected
    if (section === "section"){
      $('.loader').remove();
      $('header').addClass('no-selection');
      $('header').removeClass('active');
      $('.logo').removeClass('active-logo')
      
    } 

    

    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {
      $('.gallery').children().remove();
      console.log(data);
      var articleCounter = 0;
      $.each(data.results, function(i, value){
        
          if(value.multimedia.length === 0){
            return true;
          }
          // Look for the highest quality image to display
          var bestQuality = value.multimedia.length - 1;
          var backgroundImage = value.multimedia[bestQuality].url;

          // set a unique class on each item for the background image
          var imageNumber = 'image-conatiner-'+i;
          var output = '<li class="gallery-item"><a href="';
          output += value.url;
          output += '"><div class="image-container ' + imageNumber + '">';
          output += '<p class="abstract">' + value.abstract + '</p>';
          output += '</div></a></li>';
          $('.gallery').append(output);
          // console.log(output);
          $('.' + imageNumber).css({
            'background-image': 'url("' + backgroundImage + '")',
            'background-size': 'cover',
            'background-position': 'center',
            'height': '100%'
          });
          articleCounter ++;
          console.log(articleCounter);
          return (articleCounter !== 12);
      });
    })
    .fail(function(){
      var error = 0;
      return error;
    });
  });

}(jQuery));