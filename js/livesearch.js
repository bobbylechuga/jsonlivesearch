$(document).ready(function(){
  $.getJSON( "candidatos.json", function( data ) {
    $.each( data, function( clave, valor ) {
      if (clave <= 10) {
        listaDeCandidatos(valor);
      }
    });
    $('#filter').keyup(function(){

      var inputCandidato = $('#filter').val();
      var regex = new RegExp(inputCandidato, "i");

      if (inputCandidato.length > 4) {
        $('.lista-candidaatos li').remove();
        $.each(data, function(key, val){
          if ((val.value.search(regex) != -1)) {
            listaDeCandidatos(val);
            //console.log(val.value);
          }
        });
      }else if (inputCandidato.length <=0) {
        $('.lista-candidaatos li').remove();
        $.each( data, function( clave, valor ) {
          if (clave <= 10) {
            listaDeCandidatos(valor);
          }
        });
      }
    });
  });

  function listaDeCandidatos(valor) {
    $('.lista-candidaatos').append('<li><a href="'+valor.url+'">'+valor.value+' - '+valor.cargo+'</a></li>');
  }
});
