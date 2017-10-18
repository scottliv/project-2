(function($){
  
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  url += '?' + $.param({
    'api-key': "e5a8f43f464d44158743411125fae91b"
  });
  $("#select-section").on('change', function(){
    var section = $("#select-section").val();
    $("#gallery").empty();
    $.ajax({
      url: url,
      method: "GET",
    })
    .done(function(data) {
      console.log(data);
      $.each(data.results, function(i, value){
        if (value.section.toLowerCase() == section){
          var output = "<p>" + value.title + "</p>";
          output += "<p>" + value.abstract + "</p>";
          $("#gallery").append(output);
        } 
      });
    })
    .fail(function(){
      throw error;
    });
  });
  
}(jQuery));