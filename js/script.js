(function($){

  $('#select-section').on('change', function(){
    // construct the url based on user selection
    var section = $('#select-section').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    $('.gallery').children().remove();
    
    // remove defaullt styling once a section is selected
    if (section !== 'section'){
      $('header').removeClass('no-selection');
      $('header').addClass('active');
      $('.logo').addClass('active-logo');
    }

    // Reset styling when section is selected
    if (section === "section"){
      $('header').addClass('no-selection');
      $('header').removeClass('active');
      $('.logo').removeClass('active-logo')
    } 

    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {
      console.log(data);
      var articleCounter = 0;
      $.each(data.results, function(i, value){
          // if (articleCounter === 12){
          //   return false;
          // }
          if(value.multimedia.length === 0){
            return true;
          }
          var backgroundImage = value.multimedia[4].url;
          // set a unique class on each item
          var imageNumber = 'image-conatiner-'+i;
          var output = '<li class="gallery-item"><a href="';
          output += value.url;
          output += '"><div class="image-container ' + imageNumber + '">';
          output += '<p class="abstract">' + value.abstract + '</p>';
          output += '</div></a></li>';
          $('.gallery').append(output);
          console.log(output);
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
      var error = undefined;
      throw error;
    });
  });
  
}(jQuery));