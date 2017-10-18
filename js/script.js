(function($){

  $('#select-section').on('change', function(){

    // construct the url based on user selection
    var section = $('#select-section').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    $('#gallery').empty();
    
    // remove defaullt styling once a section is selected
    if (section !== 'Section'){
      $('header').removeClass('no-selection');
    }

    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {
      console.log(data);
      var articleCounter = 0;
      $.each(data.results, function(i, value){
          if (i === 12){
            return false;
          }
          if(value.multimedia.length === 0){
            return true;
          }
          var backgroundImage = value.multimedia[4].url;
          // set a unique class on each item
          var imageNumber = 'image-conatiner-'+i;
          var output = '<li class="gallery-item"><a href="';
          output += value.url;
          output += '"><div class=' + imageNumber + '>';
          output += value.abstract;
          output += '</div></a></li>';
          $('#gallery').append(output);
          $('.' + imageNumber).css({
            'background-image': 'url("' + backgroundImage + '")',
            'background-size': 'cover',
            'background-position': 'center',
            'height': '50vw'
          });
          // articleCounter ++;
      });
    })
    .fail(function(){
      var error = undefined;
      throw error;
    });
  });
  
}(jQuery));