
function modificarEstiloLocalStorage(){
    if (typeof (localStorage) !== "undefined") {
        var estilo = document.getElementById("linkEstilo").href;
        localStorage.setItem('estilo',estilo); 
    }
}

$(document).ready(function () {
    if (typeof (localStorage) !== "undefined") {
        if(localStorage.getItem('estilo') !== null){
            document.getElementById("linkEstilo").href = localStorage.getItem('estilo'); 
        }
    } 
    $('body').show();
}); 

