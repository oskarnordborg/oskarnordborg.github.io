
'use strict';

class ViewModel {
    constructor() {
        this.questions = ko.observableArray([]);
    }
}
var vm = new ViewModel()
ko.applyBindings(vm);

const login = function(password) {

    return (password === "magisk")
};

const checkphrase = function(phrase) {

    return (phrase === "iskub")
};

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

jQuery(document).ready(function ($) {

    var container = document.getElementById('culmn');
    var fireworksConfig = {
        rocketsPoint: 50,
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
          decay: { min: 0.015, max: 0.03 }
        },
        mouse: {
          click: false,
          move: false,
          max: 3
        },
        boundaries: {
        //   x: 50,
        //   y: 50,
          width: container.clientWidth,
          height: container.clientHeight
        }
    }
    var fireworks = new Fireworks(container, fireworksConfig);

    var unlock_button = $('.fa-lock'),
        close_button  = $('.close'),
        input = $('.input');
    unlock_button.on('click', function(){
        $(this).parent().addClass('open');
        close_button.fadeIn(500);
        input.fadeIn(500);
        input.focus();
    });

    close_button.on('click',function(){
        unlock_button.parent().removeClass('open');
        close_button.fadeOut(500);
        input.fadeOut(500);
    });

    var passinput = document.getElementById("password-input");
    var qinput = document.getElementById("question-input");
    var currentAnswer = '';
    var couldBeCorrect = true;

    passinput.addEventListener("keyup", async function(event) {

        if (event.code === 'Enter') {
            event.preventDefault();
            var correct = await login(passinput.value.toLowerCase());

            if (correct) {
                showMessage('Korrekt! :D ', 'green', 10000);
                document.getElementById('locked-page').classList.add('hidden');
                document.getElementById('opened-page').classList.remove('hidden');
                qinput.focus();
            } else {
                showMessage('"' + passinput.value + '" är fel lösen', 'grey', 5000);
                passinput.value = "";
            }
        }
    });

    qinput.addEventListener("keydown", function(event) {

        if (['KeyB', 'KeyS', 'KeyI', 'KeyU', 'KeyK'].includes(event.code)) {
            event.preventDefault();
            currentAnswer += event.key;
            qinput.value = qinput.value + ' ';
        } else if (event.code != 'Enter') {
            couldBeCorrect = false;
        }
    });

    qinput.addEventListener("keyup", async function(event) {

        if (event.code === 'Enter') {
            event.preventDefault();
            let correct = false;
            if (couldBeCorrect) {
                correct = await checkphrase(currentAnswer.toLowerCase());
            }
            if (correct) {
                showMessage('GRATTIS! ' + currentAnswer.toLowerCase() + ' är rätt, låt det vägleda er mot nästa steg :) ', 'green', 10000);
                fireworks.start();
            } else if (couldBeCorrect && !correct && currentAnswer.length == 5) {
                showMessage('Testa en annan ordning :)', 'grey', 5000);
            } else {
                if (vm.questions().length >= 10) {
                    showMessage('Ibland handlar det inte om vad man ser, utan om vad man inte ser', 'grey', 5000);
                } else {
                    showMessage('"' + qinput.value + '" var en konstig fråga', 'grey', 5000);
                }
                vm.questions.unshift(qinput.value);
            }
            qinput.value = "";
            currentAnswer = '';
            couldBeCorrect = true;
        }
    });
});

const hideMobileKeyboardOnReturn = (keyboardEvent) => {
    element.addEventListener('keyup', (keyboardEvent) => {
        if (keyboardEvent.code === 'Enter') {
            element.blur();
        }
    });
};

document.querySelementectorAll('[type=search]').forEach((element) => {
    hideMobileKeyboardOnReturn(element);
});

function showMessage(msg, color, time) {
    var x = document.getElementById('snackbar');

    if (time < 10000) {
        console.log(msg)
        x.className = 'show';
    } else {
        x.className = 'showlong';
    }
    x.style.backgroundColor = color;
    x.innerHTML = msg;
    setTimeout(function() {
        if (time < 10000) {
            x.className = x.className.replace('show', '');
        } else {
            x.className = x.className.replace('showlong', '');
        }
    }, time);
}
