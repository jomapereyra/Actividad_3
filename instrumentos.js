function mostrar_error(elemento, mensaje) {
    var mensaje_formulario = document.getElementById("mensaje_error");
    elemento.innerHTML = mensaje;
    mensaje_formulario.innerHTML = "<p>Existen algunos errores que deben corregirse</p>";
    elemento.style.display = "inline-block";
    mensaje_formulario.style.display = "inline-block";
}

function ocultar_error(elemento) {
    var mensaje_formulario = document.getElementById("mensaje_error");
    elemento.innerHTML = "";
    mensaje_formulario.innerHTML = "";
    elemento.style.display = "none";
    mensaje_formulario.style.display = "none";
}

function validar_id() {
    var id = document.getElementById("id_instrumento");
    var mensaje_id = document.getElementById("error_id");
    if (id.value === "") {
        mostrar_error(mensaje_id,"El campo ID no debe estar vacio");
    }
    else {
        ocultar_error(mensaje_id);
    }

}

function validar_tipo() {
    var tipo = document.getElementById("tipo_instrumento");
    var mensaje_tipo = document.getElementById("error_tipo"); 
    if (tipo.value === "" || tipo.value < "1" || tipo.value > "6") {
        mostrar_error(mensaje_tipo,"El instrumento seleccionado no el válido");
    }
    else {
        ocultar_error(mensaje_tipo);
    }

}

function validar_observaciones(){
    var obs = document.getElementById("observaciones_instrumento");
    var mensaje_obs = document.getElementById("error_observaciones");
    if(obs.value != undefined){
        var cant=obs.value.length;
        var restantes= 250 - cant;
        var contador=document.getElementById("contador");
        contador.innerHTML = "Caracteres restantes: "+restantes;
        if(cant > 250){
            mostrar_error(mensaje_obs,"La observación no debe superar los 250 caracteres");
        }
        else{
            ocultar_error(mensaje_obs);
        }
    }
    else{
        contador.innerHTML = "Caracteres restantes: 250";
    }


}

var id_input = document.getElementById("id_instrumento");
id_input.addEventListener("keyup", validar_id, true);
var tipo_select = document.getElementById("tipo_instrumento");
tipo_select.addEventListener("change", validar_tipo, true);
var obs_area=document.getElementById("observaciones_instrumento");
obs_area.addEventListener("keyup",validar_observaciones,true);