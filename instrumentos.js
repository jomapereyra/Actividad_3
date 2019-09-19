function mostrar_error(elemento, mensaje) {
    elemento.innerHTML = mensaje;
    elemento.style.display = "inline-block";
}

function ocultar_error(elemento) {
    elemento.innerHTML = "";
    elemento.style.display = "none";
}

function validar_id() {
    var id = document.getElementById("id_instrumento");
    var mensaje_id = document.getElementById("error_id");
    var regex = new RegExp("^[0-9]*$");
    var paso = false;

    if (id.value === "") {
        mostrar_error(mensaje_id, "El campo ID no debe estar vacio");
    }
    else {
        if (!regex.test(id.value)) {
            mostrar_error(mensaje_id, "El dato ingresado no es un número");
        }
        else {
            //Recorro la tabla para ver que no se repita mi ID
            var lista = new Array();
            var tabla = document.getElementById("tabla_instrumentos");
            for (let index = 0; index < tabla.rows.length; index++) {
                lista[index] = tabla.rows[index].cells[0].innerHTML;
            }
            if (lista.includes(id.value)) {
                mostrar_error(mensaje_id, "Este id ya existe");
            }
            else {
                ocultar_error(mensaje_id);
                paso = true;
            }
        }

    }

    return paso;
}

function validar_tipo() {
    var tipos = ["Piano", "Violín", "Violonchelo", "Flauta", "Trombón", "Oboe"];
    var tipo = document.getElementById("tipo_instrumento");
    var mensaje_tipo = document.getElementById("error_tipo");
    var paso = false;
    if (tipo.value === "" || !tipos.includes(tipo.value)) {
        mostrar_error(mensaje_tipo, "El instrumento seleccionado no es válido");
    }
    else {
        ocultar_error(mensaje_tipo);
        paso = true;
    }
    return paso;

}

function validar_observaciones() {
    var obs = document.getElementById("observaciones_instrumento");
    var mensaje_obs = document.getElementById("error_observaciones");
    var paso = true;
    if (obs.value != undefined) {
        var cant = obs.value.length;
        var restantes = 250 - cant;
        var contador = document.getElementById("contador");
        contador.innerHTML = "Caracteres restantes: " + restantes;
        if (cant > 250) {
            mostrar_error(mensaje_obs, "La observación no debe superar los 250 caracteres");
            paso = false;
        }
        else {
            ocultar_error(mensaje_obs);
        }
    }
    else {
        contador.innerHTML = "Caracteres restantes: 250";
    }
    return paso;

}

function limpiar() {
    var error_id = document.getElementById("error_id");
    var error_tipo = document.getElementById("error_tipo");
    var error_observaciones = document.getElementById("error_observaciones");
    var error_formulario = document.getElementById("mensaje_error");
    var contador = document.getElementById("contador");
    contador.innerHTML = "Caracteres restantes: 250";
    document.getElementById("formulario_instrumento").reset();
    ocultar_error(error_id);
    ocultar_error(error_tipo);
    ocultar_error(error_observaciones);
    ocultar_error(error_formulario);
}

function validar_formulario() {
    var paso = [false, false, false];
    var mensaje_formulario = document.getElementById("mensaje_error");
    paso[0] = validar_id();
    paso[1] = validar_tipo();
    paso[2] = validar_observaciones();
    if (!paso.includes(false)) {

        ocultar_error(mensaje_formulario);
        var tabla = document.getElementById("tabla_instrumentos");
        var elementos = new Array();
        elementos[0] = document.getElementById("id_instrumento").value;
        elementos[1] = document.getElementById("tipo_instrumento").value;
        elementos[2] = document.getElementById("observaciones_instrumento").value;
        var ejemplo = document.getElementById("ejemplo");

        //Elimina el ejemplo si es que existe
        if (ejemplo != null) {
            tabla.removeChild(ejemplo);
        }

        //Crea la nueva fila
        var fila = document.createElement("tr");

        var celda;

        var contenido_celda;

        for (let index = 0; index < 3; index++) {
            celda = document.createElement("td");
            contenido_celda = document.createTextNode(elementos[index]);
            celda.appendChild(contenido_celda);
            fila.appendChild(celda);
        }

        //Creo mi boton de opcion
        celda = document.createElement("td");
        var boton = document.createElement('button');
        boton.type = "button";
        boton.name = "delete_button";
        boton.onclick = eliminar_fila;
        boton.innerText = "Opcion";

        celda.appendChild(boton);
        fila.appendChild(celda);

        //Agrega la fila a la tabla
        tabla.appendChild(fila);

        limpiar();

    }
    else {
        mostrar_error(mensaje_formulario, "<p>Existen algunos errores que deben corregirse</p>");
    }

    return false;
}

function eliminar_fila() {
    console.log(this);
    var fila = this.parentNode.parentNode.rowIndex;
    console.log(fila);
    document.getElementById("tabla_instrumentos").deleteRow(fila);
}

//Eventos

var id_input = document.getElementById("id_instrumento");
id_input.addEventListener("input", validar_id, true);

var tipo_select = document.getElementById("tipo_instrumento");
tipo_select.addEventListener("change", validar_tipo, true);

var obs_area = document.getElementById("observaciones_instrumento");
obs_area.addEventListener("keyup", validar_observaciones, true);

var cancel = document.getElementById("cancel_button");
cancel.addEventListener("click", limpiar, true);
