import {cargarPrincipalMLS, renderNoticias} from "./functions.js";
const barraNoticias = document.querySelector('#barraNoticias');
const notaPrincipal = document.querySelector('#notaPrincipal');

document.addEventListener('DOMContentLoaded', () => {
    
    $.ajax({
        url: './json/mls.json',
        success: function(mls, textStatus, xhr) {
          
           renderNoticias(mls,10); //el numero representa las notas que mostrara en la barra lateral
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    })
    
});

$('#barraNoticias').click(function(e){
    e.preventDefault();
    let id = e.target.id
    cargarPrincipalMLS(id);
      
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