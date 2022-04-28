//HOME
const fixture = document.querySelector('#boxFixture');
const table = document.querySelector('#table');
const slide = document.querySelector('#carouselRender');
const ultimasLateral = document.querySelector('#ultimasLateral');
const entrevistasYT = document.querySelector('#entrevistasYT');
const partidosLink = document.querySelector('#partidosLink');
const jugadorSemana = document.querySelector('#jugadorSemana');


//PARA ENTREVISTAS
const videosYouTube = document.querySelector('#lastYouTube');

let nextPageToken = "";
// Resultados por pagina
let resPorPagina = 1;
// Paginas a mostrar
let paginas = 1;
let key = "AIzaSyAJH1qX2e9WoON2bzSce6r5CuoHRqHjOPc";
let idCanal = "UCM__gLkFtp77IjA-9mY1DMA";
let url=  "https://www.googleapis.com/youtube/v3/search?key=" + key + "&channelId=" + idCanal + "&part=snippet,id&order=date&maxResults=" + resPorPagina;


document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: './json/fixture.json',
        success: function(fxt, textStatus, xhr) {
            renderFixture(fxt);
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    }),
    $.ajax({
        url: './json/table.json',
        success: function(tbl, textStatus, xhr) {
            let tabla = orderPor(tbl, ['pts', 'dg'], ['DESCENDENTE', 'DESCENDENTE']);
            renderTable(tabla);
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    }),
    $.ajax({
        url: './json/noticias.json',
        success: function(noticias, textStatus, xhr) {
          
           renderSlide(noticias,3); //el numero representa las notas que mostrara en la barra lateral
           renderUltima(noticias,partidosLink);
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    }),
    $.ajax({
        url: './json/jugadorSemana.json',
        success: function(jugador, textStatus, xhr) {
          
           renderJugadorSemana(jugador);
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    }),
    $.getJSON(url, function (data) {

        for (let i in data.items) {
            let tituloVideo=data.items[i]["snippet"].title;
            let desc =data.items[i]["snippet"].description;
            let img = data.items[i]["snippet"]["thumbnails"]["medium"].url;
            
            const html = `
            <img src="${img}">
            <h5>${tituloVideo}</h5>
            <h6><a href="./rinconbarra.html">Ver mas</a></h6>
            <hr>
            `
            entrevistasYT.innerHTML = html;
           
        }
    })


    
});
function renderJugadorSemana(jugadorJson){
console.log(jugadorJson);
    jugadorJson.innerHTML = ''

    const html = `
    <div class="titleContainer" ><h6>Jugador de la semana</h6></div>
    <img src="${jugadorJson[0].img}">
    <h5>${jugadorJson[0].nombre}</h5>
    <h6>${jugadorJson[0].posicion}</h6>
    <p>${jugadorJson[0].texto}</p>
    `

    jugadorSemana.innerHTML = html;
}

function renderFixture(f){
    f.innerHTML = ''

    f.forEach(fix => {
        const html = `
        <div class="col-xl-2 fixture">
        <h4>${fix.date}</h4>
        <h4>${fix.hour}</h4>
        <img class="logoFixture" src="${fix.local}">
         <span>${fix.result}</span>
        <img class="logoFixture" src="${fix.visit}">
      </div>
		`
        
        fixture.innerHTML += html;
    });
}
function renderTable(t){
    let cont = 1;
    t.innerHTML = ''
    
    t.forEach(tab => {
        
        const html = `        
        <tr>
            <th scope="row">${cont}.</th>
            <td>${tab.club}</td>
            <td><img class="tableLogo" src="${tab.logo}"></td>
            <td>${tab.pj}</td>
            <td>${tab.ganados}</td>
            <td>${tab.empatados}</td>
            <td>${tab.perdidos}</td>
            <td>${tab.gf}</td>
            <td>${tab.gc}</td>
            <td>${tab.dg}</td>
            <td>${tab.pts}</td>
        </tr>   
		`
        
        table.innerHTML += html;
        cont++;
    });
}
function goalD(equipo){
    return equipo.gf -equipo.gc;
}
function calculatePts(equipo){
    return (equipo.ganados *3 + equipo.empatados);
}

//ordeno la tabla por puntos y por goles a favor
function orderPor(objetos, propiedades, modosOrden) {
    return [...objetos].sort((a, b) => propiedades.reduce((acumulador, p, i) => {
        if (acumulador === 0) {
            let [m, n] = modosOrden && modosOrden[i] == 'DESCENDENTE' ? [b[p], a[p]] : [a[p], b[p]];

            acumulador = m > n ? 1 : m < n ? - 1 : 0;
        }

        return acumulador;
    }, 0))
}




// NOTICIAS

function renderSlide(n,cant){
    n.innerHTML = ''
   let i=0;
   
    let notas = n.slice(0 , cant);
     notas.forEach(nota => {
        let html =``;

        const htmlLateral = `
        <div class="bg-white">
        <a style="text-decoration: none;" href="./noticias.html">
            <img src="${nota.img}" class="card-img-top" alt="...">
            <div class="card-body d-block">
                <p class="card-text cardText"><b style="font-size: x-large;">${i+1}      </b>${nota.titulo}</p>
            </div>
        </a>    
            </div>
        `
         if(i==0){
        
         html = `
        <div class="carousel-item active">
        <a style="text-decoration: none;" href="./noticias.html">
        <div class="titleContainer"><h6>Ultimas noticias</h6></div>
        <img src="${nota.img}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block carouselText">
          <h5>${nota.titulo}</h5>
          <p>${nota.descripcion}</p>
        </div>
        </a>
      </div>
            `
        }else{
             html = `
            <div class="carousel-item">
            <a style="text-decoration: none;" href="./noticias.html">
            <div class="titleContainer"><h6>Ultimas noticias</h6></div>
            <img src="${nota.img}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block carouselText">
              <h5>${nota.titulo}</h5>
              <p>${nota.descripcion}</p>
            </div>
            </a>
          </div>
                `
        }
        console.log(i)
        console.log(nota)
            i++;
        slide.innerHTML += html;
        ultimasLateral.innerHTML += htmlLateral;
        
    });

}
function renderUltima(n,div){
    
    n.innerHTML = ''
    let mayor = filtrarMayor(n);
    const nP = n.find(nota => nota.id == mayor);
    
    const html = `
    <img src="${nP.img}">
    <h5>${nP.titulo}</h5>
    <h6><a href="./partidos.html">Ver mas</a></h6>
    `   
    div.innerHTML = html;
     
}
function filtrarMayor(array){
    let mayor = 0;
    array.forEach(n=>{
        if(n.id>0 && (n.id > mayor) ){
            mayor = n.id;
        }
    })
    return mayor;
}

function filterBarra(n,tipo){
    
    let filtradas = n.filter(nota => nota.tipo == tipo);
  
    console.log(filtradas)
    
    renderNoticias(filtradas,10);
}


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