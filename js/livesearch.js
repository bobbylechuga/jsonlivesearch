$(document).ready(function(){
  //php_vars.home Es una vairable de wordpress invocada en el function - wp_localize_script -


  $("#live-search").on("submit", function(e){
      e.preventDefault();
  });
  $.getJSON("candidatos.json", function( data ) {
    $.each( data, function( clave, valor ) {
      if (clave <= 10) {
        listaDeCandidatos(valor);
      }
    });
    $('#filter').keyup(function(){
      var inputCandidato = $('#filter').val();

      if (inputCandidato.length > 3) {
        var inputCandidatoPartes = inputCandidato.split(' ');
        $('.lista-candidaatos li').remove();
        $.each(data, function(key, val){
          var contcandidato = 0;
          for(var k=0; k < inputCandidatoPartes.length; k++) {
            var regex = new RegExp(inputCandidatoPartes[k], "i");
            //console.log(inputCandidatoPartes[k]);
            if ((val.value.search(regex) != -1)) {
              //listaDeCandidatos(val);
              //console.log(val.value);
              contcandidato++;
            }
          }
          if (contcandidato == inputCandidatoPartes.length) {
            listaDeCandidatos(val);
          }
        });
        if ( $('.lista-candidaatos li').length == 0 ) {
          $('.lista-candidaatos').html('<li class="empty-message">No se encontraron resultados para la busqueda...</li>');
        }
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
    $('.lista-candidaatos').append('<li><a href="'+valor.url+'"><strong>'+valor.value+'</strong> - '+valor.cargo+' - <span class"busqueda-comuna">'+valor.comuna+'</span></a></li>');
  }
});
