(function($){
  
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  url += '?' + $.param({
    'api-key': "e5a8f43f464d44158743411125fae91b"
  });
  $("#select-section").on('change', function(){
    var section = $("#select-section").val();
    $.ajax({
      url: url,
      method: "GET",
    })
    .done(function(data) {
      console.log(data);
      
    })
    .fail(function(){
      throw error;
    });
  });
  
}(jQuery));