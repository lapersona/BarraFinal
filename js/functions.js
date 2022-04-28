export function cargarPrincipal(id){
    
    $.ajax({
        url: './json/noticias.json',
        success: function(noticias, textStatus, xhr) {
       
        renderPrincipal(noticias,id);
                             
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    })
   

}
export function cargarPrincipalMLS(id){
    
    $.ajax({
        url: './json/mls.json',
        success: function(noticias, textStatus, xhr) {
       
        renderPrincipal(noticias,id);
                             
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
    })
   

}
export function filterBarra(n,tipo){
    
    let filtradas = n.filter(nota => nota.tipo == tipo);
  
    console.log(filtradas)
    
    renderNoticias(filtradas,10);
}

export function renderNoticias(n,cant){
    n.innerHTML = ''
   
    let notas = n.slice(0 , cant);
     notas.forEach(nota => {
        
            const html = `
            <div>
            <a style="text-decoration: none; color: black;" href="#"  id="${nota.id}">
            <h4 style="text-decoration: none; color: black;" id="${nota.id}">${nota.titulo}</h4>
            <h6 style="text-decoration: none; color: black;">${nota.date}</h6>
            </a>
            </div>
            <hr> 
            `
            
            barraNoticias.innerHTML += html;
        
    });

}

export function renderPrincipal(n,p){
    
    n.innerHTML = ''
    
    let nP = n.find(nota => nota.id == p);
        
    const html = `
    <img src="${nP.img}">
    <div class="newsContainerText">
        <h2>${nP.titulo}</h2>
        <h4>${nP.descripcion}</h4>
        <h5>${nP.autor}</h5>
        <h5>${nP.date}</h5>
        <p>${nP.noticia}</p>
    </div>
    `       
    notaPrincipal.innerHTML = html;
}

