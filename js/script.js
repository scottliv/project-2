(function($){

  $('#select-section').on('change', function(){
    var section = $('#select-section').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
      'api-key': 'e5a8f43f464d44158743411125fae91b'
    });
    $('#gallery').empty();
    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {
      console.log(data);
      var articleCounter = 0;
      $.each(data.results, function(i, value){
          if (articleCounter === 12){
            return false;
          }
          if(value.multimedia.length === 0){
            return true;
          }
          var output = "<ol>";
          output += '<li>' + value.title + '</li>';
          output += "</ol>";
          // output += '<p>' + value.abstract + '</p>';
          $('#gallery').append(output);
          articleCounter ++;
      });
    })
    .fail(function(){
      var error = undefined;
      throw error;
    });
  });
  
}(jQuery));