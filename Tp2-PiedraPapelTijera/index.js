/* Solicitamos el nombre del jugador que guardamos en una variable usando prompt. Luego, tomamos 
la primer letra de la string con charAt(0), para convertirla en mayúscula usando el toUpperCase() 
y después tomamos los valores restantes con slice(1), y los pasamos a minúsculas con toLowerCase(). */

let jugador = prompt("Bienvenido jugador! Por favor, ingresa tu nombre");
jugador = jugador.charAt(0).toUpperCase() + jugador.slice(1).toLowerCase();

let nombre = document.querySelector(".nombre-jugador");


// Valida que siempre se ingrese un nombre, no algo vacío o números y luego ingresa el nombre del jugador en el marcador.
if (jugador == null || !isNaN(jugador)) {
    alert("No has introducido tu nombre! Por favor, recarga la página e intentalo de nuevo.");
} else {
    nombre.textContent = jugador;
}

// Declaración de variables para capturar elementos del DOM.
let instrucciones = document.getElementById('instrucciones');
let marcadorPuntosJugador = document.getElementById('puntos-jugador');
let marcadorPuntosPc = document.getElementById('puntos-pc');
let mensaje = document.getElementById('mensaje');
let ganaPunto = document.getElementById('gana-punto');

let eleccionJugador = document.getElementById('eleccion-jugador');
let eleccionPc = document.getElementById('eleccion-pc');
let opcionesJuego = document.querySelector('.opciones-juego'); 

let puntosJugador = 0;
let puntosPc = 0;


let opcionElegida = document.querySelectorAll('.opcion');
let opcionJugador;
let opcionComputadora;

/* Captura a través del addEventListener, la elección al cliclear sobre los botones 
de opciones y ejecuta la función de iniciar turno. */
opcionElegida.forEach(btn => {
    btn.addEventListener("click", function (e) {
        opcionJugador = e.currentTarget.id;
        iniciarTurno();
    });
})

// Crea un número aleatorio entre entre 0 y 3.
function numeroAleatorio() {
    let numeroAleatorio = Math.floor(Math.random() * 3);
    return numeroAleatorio;
}

// Determina la jugada de la computadora a partir del número aleatorio.
function jugadaComputadora() {
    opcionComputadora = numeroAleatorio();
    if (opcionComputadora === 0) {
        opcionComputadora = "piedra";
    } else if (opcionComputadora === 1) {
        opcionComputadora = "papel";
    } else {
        opcionComputadora = "tijera";
    }
    return opcionComputadora;
}

// Determina quien gana en cada turno o si hay empate.
function determinarTurnoGanador() {
    if ((opcionComputadora === "piedra" && opcionJugador === "tijera") ||
        (opcionComputadora === "papel" && opcionJugador === "piedra") ||
        (opcionComputadora === "tijera" && opcionJugador === "papel")) {
        ganaPc();
    } else if ((opcionJugador === "piedra" && opcionComputadora === "tijera") ||
        (opcionJugador === "papel" && opcionComputadora === "piedra") ||
        (opcionJugador === "tijera" && opcionComputadora === "papel")) {
        ganaJugador();
    } else {
        empate();
    }
    determinarGanador();
}

/* Determina que por cada intento ganado por el jugador, sume un punto en el tablero a su favor,
y muestre un mensaje indicando que ganó en esa ronda. */
function ganaJugador() {
    puntosJugador++;
    marcadorPuntosJugador.innerHTML = puntosJugador;
    ganaPunto.innerHTML = "Ganaste un punto!😊";
}

/* Determina que por cada intento ganado por la computadora, sume un punto en el tablero a su favor,
y muestre un mensaje indicando que ganó en esa ronda. */
function ganaPc() {
    puntosPc++;
    marcadorPuntosPc.innerHTML = puntosPc;
    ganaPunto.innerHTML = "La computadora ganó un punto!😕";
}

// Muestra un mensaje en caso de empate y no suma puntos para ninguno.
function empate() {
    ganaPunto.innerHTML = "Empate!😮";
}

/* Cuenta las rondas hasta un máximo de 5 intentos y verifica si uno de los jugadores ha 
alcanzado 3 victorias. Luego, muestra el mensaje correspondiente y desactiva las opciones de juego. */
function determinarGanador() {
    let totalRondas = 0;
    let maxRondas = 5; // el mejor de 5 intentos
    while (totalRondas < maxRondas) {

        if (puntosJugador === 3) {
            instrucciones.innerHTML = "FELICIDADES! Ganaste el juego!🥳";
            opcionesJuego.classList.add('disabled');
            break;
        }
        if (puntosPc === 3) {
            instrucciones.innerHTML = "PERDISTE! La computadora ganó el juego.😓";
            opcionesJuego.classList.add('disabled');
            break;
        }
        totalRondas++;
    }
}

/* Resetea los datos del tablero de puntos y los restablece a 0, así como la cantidad de rondas. 
También deshabilita en botón de reinicio  y de mensajes en el inicio del juego y habilita el de las
opciones nuevamente. */
function reiniciarJuego() {
    reiniciar.classList.add('disabled');
    opcionesJuego.classList.remove('disabled');
    mensaje.classList.add('disabled');
    puntosJugador = 0;
    puntosPc = 0;
    totalRondas = 0;
    marcadorPuntosJugador.innerHTML = puntosJugador;
    marcadorPuntosPc.innerHTML = puntosPc;
    instrucciones.innerHTML = "El mejor de <strong>5 intentos</strong> gana.";
}

/* A través de la elección del jugador, llama a la función que determina la jugada de la pc, luego
determina quien ganó ese turno, habilita el apartado de mensaje para que indique la jugada elegida
por cada participante en mayúsculas y habilita el botón para reiniciar la partida en caso que
sea requerido. */
function iniciarTurno() {
    jugadaComputadora();
    determinarTurnoGanador();
    mensaje.classList.remove('disabled');
    eleccionJugador.innerHTML = opcionJugador.toUpperCase();
    eleccionPc.innerHTML = opcionComputadora.toUpperCase();
    reiniciar.classList.remove('disabled');
    reiniciar.addEventListener('click', reiniciarJuego);
}


