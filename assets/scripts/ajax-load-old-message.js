/**
 * Cette fonction permet de scroll la ou était la liste de messageau chargement des anciens messages
 * 
 */
 function scrollToBeforeLoadedOlfMessage(currentHeight) {
    let container = document.querySelector('.chat__list--container');
    container.scrollBy(0,(currentHeight - container.offsetHeight));
}
function fetchOldMessage(options) {
    fetch('./traitement/load-old-message.php?options=' + encodeURIComponent(JSON.stringify(options)))
    .then((response) => {
        return response.json();
    })
    .then(data => {
        // data = empty si la salon n'a pas encore de message
        // construit les messages
        let container = document.querySelector('.chat__list');
        let currentHeight = container.scrollHeight;

        if (data !== 'empty') { // vérifie si le salon est vide 
            data.forEach(element => {
                let div = document.createElement('div');
                let date = document.createElement('p');
                let message = document.createElement('p');
    
                div.classList.add('chat__list--message');
                date.classList.add('chat__list--message-date');
                div.setAttribute('data-time', element['data-time']);
    
                date.innerHTML = element['hour'];
                message.innerHTML = element['message'];
    
                div.append(date, message);
                container.prepend(div);
            });
            scrollToBeforeLoadedOlfMessage(currentHeight);
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

function addEventListenerOnScrollMessage() {
    let container = document.querySelector('.chat__list--container');
    container.addEventListener('scroll', () => {
        if (container.scrollTop == 0) {
            let code = document.querySelector('[data-salon-code]').getAttribute('data-salon-code');
            let type = document.querySelector('[data-salon-type]').getAttribute('data-salon-type');
            let firstMessage = document.querySelector('[data-time]:first-child').getAttribute('data-time'); // récupère le dernier message du chat
            if (firstMessage) {
                let options = [code, type, firstMessage];
                fetchOldMessage(options);
            }
        }
    })
}

window.addEventListener('load', () => {
    addEventListenerOnScrollMessage()
})


// function scrollToLast(listOfMessage = document.querySelector('.chat__list')) {
//     let test = document.querySelector('.chat__list--container');
//     test.scrollBy(0,listOfMessage.scrollHeight);
// }