$(document).ready(function(){

  $(':button').click(function(e){
    console.log(this.id);
    $('#' + this.id + '_details').toggle();

    $.get("/api/"+this.id, function(data) {
      console.log(data);
    });

  });

});
