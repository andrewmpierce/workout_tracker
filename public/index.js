console.log("HELLLOOOO");
$(document).ready(function(){

  $('.workout').click(function(e){
    console.log(this.id);
    $('#' + this.id + '_details').toggle();

  });

});
