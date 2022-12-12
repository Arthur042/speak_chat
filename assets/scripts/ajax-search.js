/**
 * lance la requête fetch avec la valeur de l'input en paramètre d'url
 * une fois la réponse récupéré, construit la liste des salon correspondant au résultat de la recherche
 * et l'ajoute dans le dom
 * 
 * @param {string} salon 
 */
function fetchSerch(salon) {
    fetch('./traitement/search-salon.php?salon=' + encodeURIComponent(JSON.stringify(salon)))
    .then((response) => {
        return response.json();
    })
    .then(data => {
        let list = document.querySelector('.salon__list');
        let salonContainer = document.querySelector('.salon');
        let ul = document.createElement('ul');

        ul.classList.add('salon__list');

        for(let i = 0; i < data.length; i++) {
            let departement = data[i]['departement'];
            let li = document.createElement('li');

            li.classList.add('salon__list--item');
            li.setAttribute('data-salon', data[i]['departement']);
            li.innerHTML = departement;

            ul.appendChild(li);
        }
        if (list) list.remove();
        salonContainer.appendChild(ul);

        addEventOnSalonList();
    })
    .catch((e) => {
        console.log(e);
    });
}

/**
 * fonction pour éffectuer une requête ajax quand l'utilisateur tape dans la barre de recherche
 */
function searchSalon() {
    let input = document.querySelector('[data-search]');
    if (input) {
        // au keyup vérifie si le nombre de caractère de l'input est supérieur à 0 et lance la fonction fetchSearch() avec la valeur le l'input
        input.addEventListener('keyup', (event) => {
            let salon = input.value;

            if (salon.length > 0) {
                fetchSerch(salon);
            } else {
                fetchSerch('empty');
            }
        });
    }
}

window.addEventListener('load', () => {
    searchSalon();
})
