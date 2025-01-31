let numeroSecreto = 0;
let intentos = 0;
let listaDeNumerosSecretos = [];
let maximoAleatorio = 10;

function asignarTextoAetiqueta(etiqueta, texto) {
    //las variables q se crean aqui se ponen en la cabecera por defecto
    let etiquetaHtml = document.querySelector(etiqueta);
    etiquetaHtml.innerHTML = texto;
    return; // esto se pone siempre como buena practica
}

function generadorDeNumeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random()*maximoAleatorio+1);
    //console.log(numeroGenerado);
    //console.log(listaDeNumerosSecretos);

    if (listaDeNumerosSecretos.length == maximoAleatorio) {
        asignarTextoAetiqueta('p', 'Ya salieron todos los número posibles, reiniciar el juego');
        document.getElementById('intentar').setAttribute('disabled', true);
    } else {
        //!Si el numero generado esta en la lista, generar otro con recursividad
        if (listaDeNumerosSecretos.includes(numeroGenerado)) {
            return generadorDeNumeroAleatorio();
        } else {
            listaDeNumerosSecretos.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//console.log(numeroSecreto);

function botonIntentoDeUsuario() {
    //El valor del numero q inrgesa el usuario en INPUT de html y solo coge el valor(value)
    let numeroDeUsuario = document.getElementById('valorIngresadoDeUsuario').value;

    if (numeroDeUsuario > maximoAleatorio || numeroDeUsuario < 1) {
        asignarTextoAetiqueta('p', `Recuerda que el número es del 1-${maximoAleatorio}`);
    } else {
        if (numeroDeUsuario == numeroSecreto) {
            asignarTextoAetiqueta('p', `Lo Lograste en ${intentos} ${intentos == 1? 'vez':'veces'}`);
            document.getElementById('intentar').setAttribute('disabled', true);
            //para activar l boton NUEVO JUEGO al remover el atributo DISABLED q tenia
            //! document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('#reiniciar').removeAttribute('disabled');
        } else {        
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoAetiqueta('p', 'El número secreto es menor');
            } else {
                asignarTextoAetiqueta('p', 'El número secreto es mayor');
            }
        }
        intentos++;
    }    
    limpiarInput();
    //console.log(numeroDeUsuario);
}

function limpiarInput() {
    document.querySelector('#valorIngresadoDeUsuario').value ='';
}

function botonReiniciarJuego() {
    //limpiar input
    limpiarInput();
    //indicar mensaje de intervalo de  numeros
    //generar numero aleatorio
    //reiniciar contador de intentos
    condicionesIniciales();
    //desahbilitar el boton de nuevo juego
    //document.getElementById('reiniciar').setAttribute('disabled', true);
    //!otra forma con el true
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

function condicionesIniciales() {
    //! para no repetir, lo ponemos en una funcion q inicialice y luego lo invocamos fuera
    asignarTextoAetiqueta('h1', 'Juego del número secreto');
    asignarTextoAetiqueta('p', `Introduzca un número del 1-${maximoAleatorio}`);
    numeroSecreto = generadorDeNumeroAleatorio();
    intentos = 1;
    //activacion de boton inentar
    document.getElementById('intentar').removeAttribute('disabled');
}
//!aqui estamos invocando condiciones iniciales
condicionesIniciales();