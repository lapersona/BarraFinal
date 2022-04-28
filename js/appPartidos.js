import {filterBarra, cargarPrincipal} from "./functions.js";
const barraNoticias = document.querySelector('#barraNoticias');
const notaPrincipal = document.querySelector('#notaPrincipal');
const partidos = document.querySelector('#partidos');

document.addEventListener('DOMContentLoaded', () => {

    $.ajax({
        url: './json/noticias.json',
        success: function(noticias, textStatus, xhr) {
          
          filterBarra(noticias,"P");
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    })
    
    
});


//Jquery


$('#barraNoticias').click(function(e){
  e.preventDefault();
  let id = e.target.id
  cargarPrincipal(id);
    
})

//FOOTER

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_yxiqg5q';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'SUSCRIBIR';
      alert('Gracias por suscribirte a LA BARRA');
          
    }, (err) => {
      btn.value = 'SUSCRIBIR';
      alert(JSON.stringify(err));
    });
});