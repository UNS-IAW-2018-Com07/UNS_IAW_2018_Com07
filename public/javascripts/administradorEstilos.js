function cambiarEstilo(value){
    document.getElementById("linkEstilo").setAttribute('data-color',value); 
    document.getElementById("linkEstilo").href="/stylesheets/estilo"+value+".css";
    document.getElementById("imagenLogo").src = 'images/llave'+value+'.png'; 
}

function sliderPrecio(idSlide, idTxt){
    var slider = document.getElementById(idSlide);
    var output = document.getElementById(idTxt);
    output.innerHTML = slider.value;
}