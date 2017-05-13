$(document).ready(function(){

  $(':button').click(function(e){
    console.log(this.id);
    $('#' + this.id + '_details').toggle();

    $.get("/api/"+this.id, function(data) {
      console.log(data);
      for (var key in data) {
        var movement = key.slice(0, -7);
        var movement_spaces = movement.replace(/_/g," ");
        $('#' + movement ).text(movement_spaces + " - " + data[key] + " lbs ");
        $('#' + key ).val(data[key]);

      }
    });

  });

});
