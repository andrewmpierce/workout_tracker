$(document).ready(function(){

  function capitalize (phrase) {
    var words = phrase.split('_');
    console.log(words);
    var capitalized = [];
    for (var word in words) {
      console.log(words);
      capitalized.push(words[word][0].toUpperCase() + words[word].slice(1));
    }
    return capitalized.join(' ');
  }

  $(':button').click(function(e){
    console.log(this.id);
    $('#' + this.id + '_details').toggle();

    $.get("/api/"+this.id, function(data) {
      console.log(data);
      for (var key in data) {
        var movement = key.slice(0, -7);
        var capitalized_movement = capitalize(movement);
        console.log(capitalized_movement);
        $('#' + movement ).text(capitalized_movement + " - " + data[key] + " lbs ");
        $('[name=' + key + ']' ).val(data[key]);

      }
    });

  });

});
