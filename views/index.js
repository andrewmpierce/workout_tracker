$(document).ready(function(){

  $(':button').click(function(e){
    console.log(this.id);
    $('#' + this.id + '_details').toggle();

    $.get("/api/"+this.id, function(data) {
      console.log(data);
      $('#chest_press' ).text("Chest Press - " + data.chest_press + " lbs :");
      $('#chest_press_weight' ).val(data.chest_press);
    });

  });

});
