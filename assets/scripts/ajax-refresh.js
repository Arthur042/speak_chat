/**
 * cette fonction rafraichi la liste dde message
 */
function refreshChat() {
    let div = document.querySelector('[data-time]:last-child'); // récupère le dernier message du chat
    let salon = [
        document.querySelector('[data-salon-code]').getAttribute('data-salon-code'),
        document.querySelector('[data-salon-type]').getAttribute('data-salon-type')
    ]

    if (salon) {
        // créé le tableau d'option pour rafraichir le chat
        let options ;
        if (!div) {
            options = [
                'empty',
                salon[0],
                salon[1]
            ]
        } else {
            options = [
                div.getAttribute('data-time'),
                salon[0],
                salon[1]
            ]
        }
        fetch('./traitement/refresh-chat.php?options=' + encodeURIComponent(JSON.stringify(options)))
        .then((response) => {
            return response.json();
        })
        .then(data => {
            // si le traitement a retourné des messages
            if (data) {
                let listOfMessage = document.querySelector('.chat__list');  // récupère la liste de messages

                // créé les messages manquants et les ajoutent dans le chat
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
                    listOfMessage.append(div);
                });

                scrollToLast(listOfMessage); // scroll en bas de la liste de message
            }
        })
        .catch((e) => {
            console.log(e);
        });
    }
}

window.addEventListener('load', () => {
    setInterval(refreshChat, 5000);  // lance la fonction qui rafraichi la liste de message
})
