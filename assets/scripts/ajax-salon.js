/**
 * lance la requête fetch avec les paramètres du salon en paramètre d'url
 * une fois la réponse récupéré, construit la liste des messages a mettre ddans le chat
 * et l'ajoute dans le dom
 * 
 * @param {array} salon 
 */
function fetUrlToChangeSalon(options) {
    fetch('./traitement/change-salon.php?salon=' + encodeURIComponent(JSON.stringify(options)))
    .then((response) => {
        return response.json();
    })
    .then(data => {
        // data = empty si la salon n'a pas encore de message
        // construit les messages
        let chatTitle = document.querySelector('.chat__list--title');
        let container = document.querySelector('.chat__list--container');
        let chatList = document.querySelector('.chat__list');

        let newChatList = document.createElement('div');
        newChatList.classList.add('chat__list');
        newChatList.setAttribute('data-salon-code', data[0][0]);
        newChatList.setAttribute('data-salon-type', data[0][1]);
        
        if (data[2] !== 'empty') { // vérifie si le salon est vide 
            for (let i = 2; i < data.length; i++) {
                let div = document.createElement('div');
                div.classList.add('chat__list--message');
                div.setAttribute('data-time', data[i][1])
                div.innerHTML = data[i][0];
                newChatList.appendChild(div);
            }
        }
        
        chatList.remove(); // supprime l'ancienne liste de messages
        chatTitle.innerHTML = data[1];
        container.appendChild(newChatList); // ajoute dans le dom la nouvelle liste de messages
        scrollToLast(newChatList);  // scroll tout en bas de la liste de messages
    })
    .catch((e) => {
        console.log(e);
    });
}

/**
 * fonction pour éffectuer une requête ajax quand l'utilisateur clique sur un salon
 */
function addEventOnSalonList() {
    let salons = document.querySelectorAll('.salon__list--item');

    if (salons) {
        salons.forEach(salon => {
            salon.addEventListener('click', () => {
                // supprime la classe active présdente dans la liste et l'ajoute celui qui est cliqué
                salons.forEach(element => {
                    if (element.classList.contains('active')) {
                        element.classList.remove('active');
                    }
                })
                salon.classList.add('active');

                // récupère le code et le type du salon cliqué pour le passer en paramètre d'url
                let code = salon.getAttribute('data-salon-code');
                let type = salon.getAttribute('data-salon-type');
                let options = [code, type]

                // requete fetch pour récupérer les message du salon souhaité
                fetUrlToChangeSalon(options);
            })
        })
    }
}

window.addEventListener('load', () => {
    addEventOnSalonList();
})