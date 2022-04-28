//RINCON LA BARRA
const videosYouTube = document.querySelector('#lastYouTube');

let nextPageToken = "";
// Resultados por pagina
let resPorPagina = 3;
// Paginas a mostrar
let paginas = 1;
let key = "AIzaSyAJH1qX2e9WoON2bzSce6r5CuoHRqHjOPc";
let idCanal = "UCM__gLkFtp77IjA-9mY1DMA";
let url=  "https://www.googleapis.com/youtube/v3/search?key=" + key + "&channelId=" + idCanal + "&part=snippet,id&order=date&maxResults=" + resPorPagina;

document.addEventListener('DOMContentLoaded', () => {
  
    $.getJSON(url, function (data) {

        for (let i in data.items) {
            let tituloVideo=data.items[i]["snippet"].title;
            let urlVideo="https://www.youtube.com/watch?v=" + data.items[i]["id"].videoId;
            let desc =data.items[i]["snippet"].description;
            let img = data.items[i]["snippet"]["thumbnails"]["medium"].url;
            
            const html = `
            <div class="col-xl-4">
                <div class="episodioUno">
                    <img src="${img}">
                    <h5>${tituloVideo}</h5>
                    <h6><a href="${urlVideo}">Ver mas</a></h6>
                </div>
            </div>
            `
            videosYouTube.innerHTML += html;
           
        }
    
    });
});


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