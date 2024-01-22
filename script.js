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
    resp_user = respElem.value.toLowerCase().replace(/\s/g, '');
}

function atualizaCSS(texto, nivel) {
    console.log("Entrou na função atualizaCSS. Texto:", texto);

    const campo = document.getElementById(`campo_nivel${nivel}`);

    switch (texto) {
        case "pirate.moveright();":
            campo.style.left = parseInt(campo.style.left || 2.1) + 1 + "rem";
            break;
        case "pirate.moveleft();":
            campo.style.left = parseInt(campo.style.left || 2.1) - 1 + "rem";
            break;
        case "pirate.moveup();":
            campo.style.top = parseInt(campo.style.top || 0) - 1 + "rem";
            break;
        case "pirate.movedown();":
            campo.style.top = parseInt(campo.style.top || 0) + 1 + "rem";
            break;
        default:
            break;
    }
}

function clearInput() {
    let respElem = document.getElementById(`resp_nivel${nivel_atual}`);
    respElem.value = ''; 
}

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