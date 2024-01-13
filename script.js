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


function runAction(id) {
    var originalButton = document.getElementById(id);
    var stopButton = document.getElementById('stop');

    if (originalButton && stopButton) {
        originalButton.style.display = 'none';
        stopButton.style.display = 'flex';
    }
}

function stopAction(id) {
    var stopButton = document.getElementById(id);
    var originalButton = document.getElementById('run');

    if (originalButton && stopButton) {
        stopButton.style.display = 'none';
        originalButton.style.display = 'flex';
    }
}
