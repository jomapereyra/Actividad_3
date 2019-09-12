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
    var regex = new RegExp("^[0-9]{1,5}$");
    var paso=false;
    
    if (id.value === "") {
        mostrar_error(mensaje_id,"El campo ID no debe estar vacio");
    }
    else {
		if(!regex.test(id.value)){
			mostrar_error(mensaje_id,"El dato ingresado no es un numero o es demasiado largo");
		}
		else{
            ocultar_error(mensaje_id);
            paso=true;
		}
    }

    return paso;
}

function validar_tipo() {
    var tipo = document.getElementById("tipo_instrumento");
    var mensaje_tipo = document.getElementById("error_tipo");
    var paso=false; 
    if (tipo.value === "" || tipo.value < "1" || tipo.value > "6") {
        mostrar_error(mensaje_tipo,"El instrumento seleccionado no el válido");
    }
    else {
        ocultar_error(mensaje_tipo);
        paso=true;
    }
    return paso;

}

function validar_observaciones(){
    var obs = document.getElementById("observaciones_instrumento");
    var mensaje_obs = document.getElementById("error_observaciones");
    var paso=true;
    if(obs.value != undefined){
        var cant=obs.value.length;
        var restantes= 250 - cant;
        var contador=document.getElementById("contador");
        contador.innerHTML = "Caracteres restantes: "+restantes;
        if(cant > 250){
            mostrar_error(mensaje_obs,"La observación no debe superar los 250 caracteres");
            paso=false;
        }
        else{
            ocultar_error(mensaje_obs);
        }
    }
    else{
        contador.innerHTML = "Caracteres restantes: 250";
    }
    return paso;

}

function limpiar(){
    var error_id= document.getElementById("error_id");
    var error_tipo= document.getElementById("error_tipo");
    var error_observaciones=document.getElementById("error_observaciones");
    document.getElementById("formulario_instrumento").reset(); 
    ocultar_error(error_id);
    ocultar_error(error_tipo);
    ocultar_error(error_observaciones);
}

function validar_formulario(){
    var paso=[false,false,false];
    paso[0]=validar_id();
    paso[1]=validar_tipo();
    paso[2]=validar_observaciones();
    if(paso[0] && paso[1] && paso[2]){
        console.log("paso todo");
    }
}

var id_input = document.getElementById("id_instrumento");
id_input.addEventListener("keyup", validar_id, true);
var tipo_select = document.getElementById("tipo_instrumento");
tipo_select.addEventListener("change", validar_tipo, true);
var obs_area=document.getElementById("observaciones_instrumento");
obs_area.addEventListener("keyup",validar_observaciones,true);
var send=document.getElementById("submit_button");
send.addEventListener("click",validar_formulario,true);
var cancel=document.getElementById("cancel_button");
cancel.addEventListener("click",limpiar,true);
