
var buttons = document.querySelectorAll(".drum");

for (let i = 0; i < buttons.length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var letra = this.innerHTML;
        elegirAudio(letra);
        animarBoton(letra);
    });
}

document.addEventListener("keydown", function (event) {
    var letra = event.key;
    elegirAudio(letra);
    animarBoton(letra);
})

function elegirAudio(letra) {

    switch (letra) {
        case "w":
            const audioElement1 = new Audio("./sounds/crash.mp3");
            audioElement1.play();
            break;
        case "a":
            const audioElement2 = new Audio("./sounds/kick-bass.mp3");
            audioElement2.play();
            break;
        case "s":
            const audioElement3 = new Audio("./sounds/snare.mp3");
            audioElement3.play();
            break;
        case "d":
            const audioElement4 = new Audio("./sounds/tom-1.mp3");
            audioElement4.play();
            break;
        case "j":
            const audioElement5 = new Audio("./sounds/tom-2.mp3");
            audioElement5.play();
            break;
        case "k":
            const audioElement6 = new Audio("./sounds/tom-3.mp3");
            audioElement6.play();
            break;
        case "l":
            const audioElement7 = new Audio("./sounds/tom-4.mp3");
            audioElement7.play();
            break;
        case "z":
            const audioElement8 = new Audio("./sounds/christmas-bell.mp3");
            audioElement8.play();
            break;
        case "x":
            const audioElement9 = new Audio("./sounds/triangle.mp3");
            audioElement9.play();
            break;
        default:
            console.log("No existe este input");
    }
}

function animarBoton(letra) {
    var btnSelect = document.querySelector("." + letra);
    btnSelect.classList.add("pressed");
    setTimeout(function () {
        btnSelect.classList.remove("pressed")
    }, "100");
}


//---
// Variables
//---
let reproduciendo = false;
let PPM = 100;
let intervalo = undefined;
const textoReproduciendose = "Start";
const textoParado = "Pause";
const tituloPPM = document.querySelector('#ppm');
const botonDecrecer5PPM = document.querySelector('#boton-decrecer-5-ppm');
const botonDecrecer1PPM = document.querySelector('#boton-decrecer-1-ppm');
const botonCrecer1PPM = document.querySelector('#boton-crecer-1-ppm');
const botonCrecer5PPM = document.querySelector('#boton-crecer-5-ppm');
const botonReproducir = document.querySelector('#boton-reproducir');
const audioMetronomo = document.querySelector('#audio-metronomo');





//---
// Funciones
//---


/**
 * Dibuja los cambios
 *
 * @param {number} ppm Pulsaciones por Minuto
 * @param {boolean} isPlay ¿Esta reproduciendose?
 * @return {boolean} Se ha renderizado
 */
function renderizarCambios(ppm, isPlay) {
    // Texto PPM
    tituloPPM.textContent = ppm;
    // Texto boton reproducir
    botonReproducir.textContent = reproduciendo ? textoParado : textoReproduciendose;

    return true;
}

/**
 * Dibuja los cambios
 *
 * @param {number} ppm Pulsaciones por Minuto
 * @param {HTMLAudioElement} audio
 * @param {boolean} isPlay ¿Esta reproduciendose?
 * @param {intervalID} intervaloActual Intervalo
 * @return {intervalID} Intervalo nuevo
 */
function reproducirOPausar(ppm, audio, isPlay, intervaloActual) {
    let miIntervalo;
    // Para intervalo
    clearInterval(intervaloActual);
    // Empieza intervalo nuevo
    if (isPlay) {
        miIntervalo = setInterval(function() {
            // Reproduce audio
            audio.play();
        }, PPMToMiliseconds(ppm));
    }
    return miIntervalo;
}

/**
 * Transforma los PPM a milesimas
 *
 * @param {number} ppm
 * @return {number} Milesimas
 */
function PPMToMiliseconds(ppm) {
    return (60 / ppm) * 1000;
}

/**
 * Decrecer PPM
 *
 * @param {number} actualPPM
 * @param {number} cantidad
 * @return {number} Resultado
 */
function decrecerPPM(actualPPM, cantidad=1) {
    const resultado = actualPPM - cantidad;
    return resultado < 0 ? 0 : resultado;
}

/**
 * Aumentar PPM
 *
 * @param {number} actualPPM
 * @param {number} cantidad
 * @return {number} Resultado
 */
function crecerPPM(actualPPM, cantidad=1) {
    return actualPPM + cantidad;
}

/**
 * Evento reproduce audio
 *
 * @param {event}
 */
function eventoReproducir(event) {
    // Inicia o pausa
    reproduciendo = !reproduciendo;
    // Reproduce
    intervalo = reproducirOPausar(PPM, audioMetronomo, reproduciendo, intervalo);
    renderizarCambios(PPM, reproduciendo);
}

/**
 * Evento decrecer 5 PPPM
 *
 * @param {event}
 */
function eventoDecrecer5PPM(event) {
    PPM = decrecerPPM(PPM, 5);
    intervalo = reproducirOPausar(PPM, audioMetronomo, reproduciendo, intervalo);
    renderizarCambios(PPM, reproduciendo);
}

/**
 * Evento decrecer 1 PPPM
 *
 * @param {event}
 */
function eventoDecrecer1PPM(event) {
    PPM = decrecerPPM(PPM);
    intervalo = reproducirOPausar(PPM, audioMetronomo, reproduciendo, intervalo);
    renderizarCambios(PPM, reproduciendo);
}

/**
 * Evento crecer 1 PPPM
 *
 * @param {event}
 */
function eventoCrecer1PPM(event) {
    PPM = crecerPPM(PPM);
    intervalo = reproducirOPausar(PPM, audioMetronomo, reproduciendo, intervalo);
    renderizarCambios(PPM, reproduciendo);
}

/**
 * Evento crecer 5 PPPM
 *
 * @param {event}
 */
function eventoCrecer5PPM(event) {
    PPM = crecerPPM(PPM, 5);
    intervalo = reproducirOPausar(PPM, audioMetronomo, reproduciendo, intervalo);
    renderizarCambios(PPM, reproduciendo);
}

//---
// Eventos
//---
botonDecrecer5PPM.addEventListener('click', eventoDecrecer5PPM);
botonDecrecer1PPM.addEventListener('click', eventoDecrecer1PPM);
botonCrecer1PPM.addEventListener('click', eventoCrecer1PPM);
botonCrecer5PPM.addEventListener('click', eventoCrecer5PPM);
botonReproducir.addEventListener('click', eventoReproducir);

//---
// Inicio
//---
renderizarCambios(PPM, reproduciendo);



