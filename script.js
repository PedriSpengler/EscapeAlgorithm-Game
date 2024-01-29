/*              ÁUDIO               */

function toggleSound() {
    var audio = document.querySelector('audio');
    audio.muted = !audio.muted;
    toggleImage();
}

const unmutedSound = document.getElementById('unmuted').addEventListener('click', function() {
    document.querySelector('audio').muted = false;
});

function toggleImage() {
        var mutedImage = document.getElementById('muted');
        var unmutedImage = document.getElementById('unmuted');

        if (mutedImage.style.display !== 'none') {
            mutedImage.style.display = 'none';
            unmutedImage.style.display = 'inline';
        } else {
            mutedImage.style.display = 'inline';
            unmutedImage.style.display = 'none';
        }
    }


/*               MENU               */

function open_page(id) {
    var element = document.getElementById(id);

    if (element) {
        element.classList.add("open");

        if (id === "menuScreen") {
            element.style.top = "0";
            element.classList.remove("hidden");
        }
    }
}

function close_page(id) {
    var element = document.getElementById(id);

    if (element) {
        element.classList.add("hidden");
        element.style.top = "-110vh"; 
    }
}

/*            TRANSIÇÃO MENU -> GAME           */

function open_game(id){
    var element = document.getElementById(id);

    if(element){
        element.classList.add("open");

        if(id === "game"){
            element.style.top = "0";
            element.classList.remove('hidden');
        }
    }
}

/*                GAME               */

let nivel_atual = 1;
let resp_user;

function getText(){
    let respElem = document.getElementById(`resp_nivel${nivel_atual}`);
    resp_user = respElem.value.replace(/\s/g, '');
}

function atualizaCSS(texto, nivel) {
    const campo = document.getElementById(`campo_nivel${nivel}`);
    const detector = campo.querySelector(".detector");
    const walls = document.querySelectorAll(".parede");

    let newX, newY;
   

    switch (texto) {
        case "pirata.moverDireita(1);":
            newX = parseFloat(campo.style.left || 2.2) + 1.7;
            break;
        case "pirata.moverEsquerda(1);":
            newX = parseFloat(campo.style.left || 2.2) - 1.7;
            break;
        case "pirata.moverCima(1);":
            newY = parseFloat(campo.style.top || 0.3) - 1.6;
            break;
        case "pirata.moverBaixo(1);":
            newY = parseFloat(campo.style.top || 0.3) + 1.6;
            break;
        case "pirata.moverDireita(2);":
            newX = parseFloat(campo.style.left || 2.2) + 1.7 * 2;
            break;
        case "pirata.moverEsquerda(2);":
            newX = parseFloat(campo.style.left || 2.2) - 1.7 * 2;
            break;
        case "pirata.moverCima(2);":
            newY = parseFloat(campo.style.top || 0.3) - 1.6 * 2;
            break;
        case "pirata.moverBaixo(2);":
            newY = parseFloat(campo.style.top || 0.3) + 1.6 * 2;
            break;
        case "pirata.moverDireita(3);":
            newX = parseFloat(campo.style.left || 2.2) + 1.7 * 3;
            break;
        case "pirata.moverEsquerda(3);":
            newX = parseFloat(campo.style.left || 2.2) - 1.7 * 3;
            break;
        case "pirata.moverCima(3);":
            newY = parseFloat(campo.style.top || 0.3) - 1.6 * 3;
            break;
        case "pirata.moverBaixo(3);":
            newY = parseFloat(campo.style.top || 0.3) + 1.6 * 3;
            break;
        case "pirata.moverDireita(4);":
            newX = parseFloat(campo.style.left || 2.2) + 1.7 * 4;
            break;
        case "pirata.moverEsquerda(4);":
            newX = parseFloat(campo.style.left || 2.2) - 1.7 * 4;
            break;
        case "pirata.moverCima(4);":
            newY = parseFloat(campo.style.top || 0.3) - 1.6 * 4;
            break;
        case "pirata.moverBaixo(4);":
            newY = parseFloat(campo.style.top || 0.3) + 1.6 * 4;
            break;
        case "pirata.moverDireita(5);":
            newX = parseFloat(campo.style.left || 2.2) + 1.7 * 5;
            break;
        case "pirata.moverEsquerda(5);":
            newX = parseFloat(campo.style.left || 2.2) - 1.7 * 5;
            break;
        case "pirata.moverCima(5);":
            newY = parseFloat(campo.style.top || 0.3) - 1.6 * 5;
            break;
        case "pirata.moverBaixo(5);":
            newY = parseFloat(campo.style.top || 0.3) + 1.6 * 5;
            break;
        default:
            break;
    }

    if (newX !== undefined) {
        campo.style.left = newX + "rem";
    }
    if (newY !== undefined) {
        campo.style.top = newY + "rem";
    }
    let collisionDetected = false;
    for (const wall of walls) {
        const rect1 = detector.getBoundingClientRect();
        const rect2 = wall.getBoundingClientRect();

        if (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        ) {
            collisionDetected = true;
            break;
        }
    }

    if (collisionDetected) {
        campo.style.left = "2.1rem"; 
        campo.style.top = "0"; 
    }
}


function clearInput() {
    let respElem = document.getElementById(`resp_nivel${nivel_atual}`);
    respElem.value = ''; 
}

document.getElementById(`resp_nivel${nivel_atual}`).addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        runAction('run');
    }
})

function runAction(action) {
    switch (action) {
        case 'run':
            getText(); 
            atualizaCSS(resp_user, nivel_atual);
            clearInput();
            break;
        default:
            break;
    }
}

// Adicionando um ouvinte de evento para o botão "Start"
document.getElementById("run").addEventListener("click", function() {
    runAction('run');
});


function verificaChave() {
    var chave = document.getElementById('chaveImg');
    var invisivel = false; // Variável para controlar a visibilidade da chave

    function verificaColisao() {
        // Se a chave já estiver invisível, não fazer nada
        if (invisivel) {
            return;
        }

        var detector = document.querySelector('.detector');
        var detectorRect = detector.getBoundingClientRect();
        var chaveRect = chave.getBoundingClientRect();

        if (
            detectorRect.top < chaveRect.bottom &&
            detectorRect.bottom > chaveRect.top &&
            detectorRect.left < chaveRect.right &&
            detectorRect.right > chaveRect.left
        ) {
            chave.style.opacity = 0; // Chave fica invisível ao detectar colisão
            invisivel = true; // Marca a chave como invisível
        }
    }

    document.addEventListener("mousemove", verificaColisao);
}

// Chame a função para iniciar a detecção de colisão ao carregar a página
document.addEventListener("DOMContentLoaded", verificaChave);

/*               PRÓXIMO NÍVEL           */

function open_modal(id){
    document.getElementById(id).className="visible";
    isTimerPaused = true; // Pausa o temporizador quando o modal é aberto
}

function close_modal(id){
    document.getElementById(id).className="invisible";
    isTimerPaused = false; // Retoma o temporizador quando o modal é fechado
}


/*              Verifica Baú                */
function verificaBau() {
    var bau = document.getElementById('bauSelect');
    var chave = document.getElementById('chaveImg');

    // Verificar se a chave está invisível antes de abrir o baú
    if (chave.style.opacity === "0") {
        var detector = document.querySelector('.detector');
        var detectorRect = detector.getBoundingClientRect();
        var bauRect = bau.getBoundingClientRect();

        if (
            detectorRect.top < bauRect.bottom &&
            detectorRect.bottom > bauRect.top &&
            detectorRect.left < bauRect.right &&
            detectorRect.right > bauRect.left
        ) {
            bau.style.width = "calc(60 / 3)";
            bau.style.backgroundPosition = "455% 50%";
            document.getElementById("titulo_sucess").textContent = `Parabéns, você concluiu o nível ${nivel_atual}!`;

            isTimerPaused = true;

            open_modal('sucess');
        }
    } else {
        console.log("Chave não foi encontrada ou ainda não está invisível.");
    }
}

document.addEventListener("click", verificaBau);



/*              Relógio                */

const milisecondsEl = document.getElementById('miliseconds');
const secondsEl = document.getElementById('seconds');
const minutesEl = document.getElementById('minutes');
const respNivel1 = document.getElementById('resp_nivel1');

let interval;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let isPaused = false;

respNivel1.addEventListener("keydown", function(event){
    if(event.key == 'p'){
        startTimer();
    }
})



let isTimerPaused = false; // Adicione essa variável global

function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            if (!isTimerPaused) {
                miliseconds += 10;

                if (miliseconds === 1000) {
                    seconds++;
                    miliseconds = 0;
                }

                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }

                minutesEl.textContent = formatTime(minutes);
                secondsEl.textContent = formatTime(seconds);
                milisecondsEl.textContent = formatMiliseconds(miliseconds);
            }
        }, 10);
    }
}


function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

function formatMiliseconds(time) {
    const formattedMiliseconds = time < 100 ? time.toString().padStart(3, "0") : time;
    return formattedMiliseconds;
}


function abreInstrucoes(id) {
    var element = document.getElementById(id);

    element.style.display = 'flex';
}