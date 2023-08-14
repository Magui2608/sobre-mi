/* Ventana energente que da la bienvenida cuando la página es cargada, llamando a la 
función saludo. */

document.addEventListener('DOMContentLoaded', saludo);

function saludo() {
    alert("¡Bienvenido a mi calculadora simple! Ingresa los números a calcular, la operación deseada y luego haga click en 'Calcular' para ver el resultado.");
}

// Función para calcular de acuerdo a la operación elegida.
function calcular() {

    // Valida si falta ingresar algún operando. 
    if (document.getElementById('operando1').value.trim() === '' ||
        document.getElementById('operando2').value.trim() === '') {
        alert("Error! Por favor, complete todos los campos requeridos.");
    }

    /* Declaramos variables, enlazándolas al elemento HTML del que hacen referencia. 
    Toma el valor de los operandos y los convierte a números. */
    let operando1 = Number(document.getElementById('operando1').value);
    let operador = document.getElementById('opciones').value;
    let operando2 = Number(document.getElementById('operando2').value);

    // Valida si el valor ingresado es un número. 
    if (isNaN(operando1) || isNaN(operando2)) {
        alert("Error! Debe ingresar solamente valores numéricos");
    }

    // Valida si se ha seleccionado una operación.
    let opciones = document.getElementById("opciones").selectedIndex;
    if (opciones == '') {
        alert("Error! Falta seleccionar la operación a realizar.");
        return false;
    }

    // Defino las operaciones a realizar según se elija.
    resultado = 0;
    switch (operador) {
        case '+':
            resultado = operando1 + operando2;
            break;
        case '-':
            resultado = operando1 - operando2;
            break;
        case '*':
            resultado = operando1 * operando2;
            break;
        case '/':

            // Valida que no se pueda dividir por cero.
            if (operando2 === 0) {
                alert("Error! No se puede dividir por cero. Por favor, ingrese otro número válido.");
            }
            resultado = operando1 / operando2;
            break;
        case 'promedio':
            resultado = (operando1 + operando2) / 2;
            break;

    }

    /* Manejo de los cálculos con decimales usando `toFixed()` para reducir la cantidad de decimales 
    y luego convertido a `Number`, para evitar errores en los cálculos con decimales.*/
    resultado = Number(resultado.toFixed(3));

    //Valida que si el resultado no es un número, no salga "NaN" impreso como resultado.
    if (isNaN(resultado)) {
        document.getElementById('resultado').innerHTML = '';
    } else {

        // Inserta el resultado de la operación en el párrafo con id 'resultado' del html.
        document.getElementById('resultado').innerHTML = resultado;
    }

    //Soluciona el tema de si un valor entero es muy largo para ser mostrado.
    if (resultado > 999999999 || resultado < -999999999) {
        alert('El número es muy largo para mostrarse.');
        document.getElementById('resultado').innerHTML = '';
    }
}

//Limpia los campos de la pantalla utilizando el método reset de formularios.
function limpiarPantalla() {
    document.getElementById('calculadora').reset();
}
