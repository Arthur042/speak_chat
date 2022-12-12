/**
 * Cette fonction permet de scroll en bas de la liste de message
 * 
 * @param {HTMLElement} listOfMessage 
 */
function scrollToLast(listOfMessage = document.querySelector('.chat__list')) {
    let test = document.querySelector('.chat__list--container');
    test.scrollBy(0,listOfMessage.scrollHeight);
}

/**
 * lance la requête fetch avec la valeur de l'input, le code et le type du salon en paramètre d'url
 * retourne le message envoyé et le met en forme pour l'afficher dans le chat
 */
function sendMessage() {
    const button = document.querySelector('.chat__message--send');
    
    if (button) {
        button.addEventListener('click', (event) => {
            let salonCode = document.querySelector('.chat__list[data-salon-code]');
            let salonType = document.querySelector('.chat__list[data-salon-type]');
            let textarea = document.querySelector('.chat__message--textarea');
            let message = textarea.value;
            
            message = message.replace(/^\s+/g, '');     // supprime les espace avant et après la chaine de caractère, empeche l'envoie de message vide

            let options = [
                message,
                salonCode.getAttribute('data-salon-code'),
                salonType.getAttribute('data-salon-type')
            ];

            if (message.length > 0) {   // Vérifie qu'il y ai bien un message d'écrit
                fetch('./traitement/send-message.php?options=' + encodeURIComponent(JSON.stringify(options)))
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    // construit le message a afficher dans le caht
                    let listOfMessage = document.querySelector('.chat__list');
                    let div = document.createElement('div');
                    let date = document.createElement('p');
                    let message = document.createElement('p');

                    div.classList.add('chat__list--message');
                    date.classList.add('chat__list--message-date');
                    div.setAttribute('data-time', data['data-time']);

                    date.innerHTML = data['hour'];
                    message.innerHTML = data['message'];

                    div.append(date, message);
                    listOfMessage.append(div);

                    textarea.value = '';    // réinitialise l'input
                    scrollToLast(listOfMessage);    // scroll en bas de la liste de messages
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        });
    }
}

window.addEventListener('load', () => {
    sendMessage();
    scrollToLast();
})
