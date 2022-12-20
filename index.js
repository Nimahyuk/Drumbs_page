
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
    }
}

function animarBoton(letra) {
    var btnSelect = document.querySelector("." + letra);
    btnSelect.classList.add("pressed");
    setTimeout(function () {
        btnSelect.classList.remove("pressed")
    }, "100");
}



