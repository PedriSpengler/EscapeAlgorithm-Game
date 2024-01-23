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
        case "pirate.moveRight();":
            newX = parseFloat(campo.style.left || 2.2) + 1.7;
            break;
        case "pirate.moveLeft();":
            newX = parseFloat(campo.style.left || 2.2) - 1.7;
            break;
        case "pirate.moveUp();":
            newY = parseFloat(campo.style.top || 0.3) - 1.6;
            break;
        case "pirate.moveDown();":
            newY = parseFloat(campo.style.top || 0.3) + 1.6;
            break;
        default:
            break;
    }

    // Check for collision with walls

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