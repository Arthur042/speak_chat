/**
 * Cette fonction ajoute des évènements a chaque département
 */
var onEachFeature = function (feature, layer) {
    layer.bindPopup(feature.properties.nom); // ajoute un popup avec le nom du département
    layer.on({
        mouseover: highlightFeature, // au hover change la couleur
        mouseout: resetHighlight, // quand la souris sort du département annule le hover
        click: changeSalon // au click, change le salon du chat avec la fonction changeSalon() du fichier ajax-salon.js
    });
}

/**
 * Cette fonction change la découpe de la carte de manière a afficher les plus petites zone 
 * exemple : clique sur région -> affiche les départements
 */
function switchToNextType(code) {
    let map = window.map;
    window.type = Number(window.type) + 1;

    let url = '';
    let buttons = document.querySelectorAll('[data-url]');
    // définit l'url a requeter pour le fetch
    if (window.type == 3) { // 3 = communes
        if (code == 59) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/59-nord/communes-59-nord.geojson';
        } else if (code == 62) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/62-pas-de-calais/communes-62-pas-de-calais.geojson';
        } else if (code == 80) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/80-somme/communes-80-somme.geojson';
        } else if (code == 02) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/02-aisne/departement-02-aisne.geojson';
        } else if (code == 60) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/60-oise/communes-60-oise.geojson';
        } else if (code == 76) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/76-seine-maritime/communes-76-seine-maritime.geojson';
        } else if (code == 27) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/27-eure/communes-27-eure.geojson';
        } else if (code == 61) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/61-orne/communes-61-orne.geojson';
        } else if (code == 14) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/14-calvados/communes-14-calvados.geojson';
        } else if (code == 50) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/50-manche/communes-50-manche.geojson';
        } else if (code == 95) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/95-val-d-oise/communes-95-val-d-oise.geojson';
        } else if (code == 78) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/78-yvelines/communes-78-yvelines.geojson';
        } else if (code == 91) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/91-essonne/communes-91-essonne.geojson';
        } else if (code == 77) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/77-seine-et-marne/communes-77-seine-et-marne.geojson';
        } else if (code == 93) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/93-seine-saint-denis/communes-93-seine-saint-denis.geojson';
        } else if (code == 92) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/92-hauts-de-seine/communes-92-hauts-de-seine.geojson';
        } else if (code == 94) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/94-val-de-marne/communes-94-val-de-marne.geojson';
        } else if (code == 75) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/75-paris/communes-75-paris.geojson';
        } else if (code == 08) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/08-ardennes/communes-08-ardennes.geojson';
        } else if (code == 55) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/55-meuse/communes-55-meuse.geojson';
        } else if (code == 54) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/communes-54-meurthe-et-moselle.geojson';
        } else if (code == 57) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/57-moselle/communes-57-moselle.geojson';
        } else if (code == 67) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/67-bas-rhin/communes-67-bas-rhin.geojson';
        } else if (code == 51) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/51-marne/communes-51-marne.geojson';
        } else if (code == 10) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/10-aube/communes-10-aube.geojson';
        } else if (code == 52) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/52-haute-marne/communes-52-haute-marne.geojson';
        } else if (code == 88) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/88-vosges/communes-88-vosges.geojson';
        } else if (code == 68) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/68-haut-rhin/communes-68-haut-rhin.geojson';
        } else if (code == 35) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/35-ille-et-vilaine/communes-35-ille-et-vilaine.geojson';
        } else if (code == 56) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/56-morbihan/communes-56-morbihan.geojson';
        } else if (code == 22) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/22-cotes-d-armor/communes-22-cotes-d-armor.geojson';
        } else if (code == 29) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/29-finistere/communes-29-finistere.geojson';
        } else if (code == 53) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/53-mayenne/communes-53-mayenne.geojson';
        } else if (code == 72) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/72-sarthe/communes-72-sarthe.geojson';
        } else if (code == 49) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/49-maine-et-loire/communes-49-maine-et-loire.geojson';
        } else if (code == 44) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/44-loire-atlantique/communes-44-loire-atlantique.geojson';
        } else if (code == 85) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/85-vendee/communes-85-vendee.geojson';
        } else if (code == 28) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/28-eure-et-loir/communes-28-eure-et-loir.geojson';
        } else if (code == 45) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/45-loiret/communes-45-loiret.geojson';
        } else if (code == 41) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/41-loir-et-cher/communes-41-loir-et-cher.geojson';
        } else if (code == 37) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/37-indre-et-loire/communes-37-indre-et-loire.geojson';
        } else if (code == 36) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/36-indre/communes-36-indre.geojson';
        } else if (code == 18) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/18-cher/communes-18-cher.geojson';
        } else if (code == 89) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/89-yonne/communes-89-yonne.geojson';
        } else if (code == 58) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/58-nievre/communes-58-nievre.geojson';
        } else if (code == 21) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/21-cote-d-or/communes-21-cote-d-or.geojson';
        } else if (code == 71) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/71-saone-et-loire/communes-71-saone-et-loire.geojson';
        } else if (code == 39) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/39-jura/communes-39-jura.geojson';
        } else if (code == 70) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/70-haute-saone/communes-70-haute-saone.geojson';
        } else if (code == 25) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/25-doubs/communes-25-doubs.geojson';
        } else if (code == 90) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/90-territoire-de-belfort/communes-90-territoire-de-belfort.geojson';
        } else if (code == 86) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/86-vienne/communes-86-vienne.geojson';
        } else if (code == 79) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/79-deux-sevres/communes-79-deux-sevres.geojson';
        } else if (code == 87) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/87-haute-vienne/communes-87-haute-vienne.geojson';
        } else if (code == 23) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/23-creuse/communes-23-creuse.geojson';
        } else if (code == 19) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/19-correze/communes-19-correze.geojson';
        } else if (code == 16) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/16-charente/communes-16-charente.geojson';
        } else if (code == 24) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/24-dordogne/communes-24-dordogne.geojson';
        } else if (code == 17) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/17-charente-maritime/communes-17-charente-maritime.geojson';
        } else if (code == 33) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/33-gironde/communes-33-gironde.geojson';
        } else if (code == 47) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/47-lot-et-garonne/communes-47-lot-et-garonne.geojson';
        } else if (code == 40) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/40-landes/communes-40-landes.geojson';
        } else if (code == 64) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/64-pyrenees-atlantiques/communes-64-pyrenees-atlantiques.geojson';
        } else if (code == 03) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/03-allier/communes-03-allier.geojson';
        } else if (code == 63) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/63-puy-de-dome/communes-63-puy-de-dome.geojson';
        } else if (code == 15) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/15-cantal/communes-15-cantal.geojson';
        } else if (code == 42) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/42-loire/communes-42-loire.geojson';
        } else if (code == 43) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/43-haute-loire/communes-43-haute-loire.geojson';
        } else if (code == 69) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/69-rhone/communes-69-rhone.geojson';
        } else if (code == 07) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/07-ardeche/communes-07-ardeche.geojson';
        } else if (code == 26) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/26-drome/communes-26-drome.geojson';
        } else if (code == 38) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/38-isere/communes-38-isere.geojson';
        } else if (code == 01) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/01-ain/communes-01-ain.geojson';
        } else if (code == 73) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/73-savoie/communes-73-savoie.geojson';
        } else if (code == 74) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/74-haute-savoie/communes-74-haute-savoie.geojson';
        } else if (code == 65) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/65-hautes-pyrenees/communes-65-hautes-pyrenees.geojson';
        } else if (code == 32) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/32-gers/communes-32-gers.geojson';
        } else if (code == 31) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/31-haute-garonne/communes-31-haute-garonne.geojson';
        } else if (code == 09) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/09-ariege/communes-09-ariege.geojson';
        } else if (code == 66) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/66-pyrenees-orientales/communes-66-pyrenees-orientales.geojson';
        } else if (code == 11) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/11-aude/communes-11-aude.geojson';
        } else if (code == 82) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/82-tarn-et-garonne/communes-82-tarn-et-garonne.geojson';
        } else if (code == 81) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/81-tarn/communes-81-tarn.geojson';
        } else if (code == 34) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/34-herault/communes-34-herault.geojson';
        } else if (code == 46) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/46-lot/communes-46-lot.geojson';
        } else if (code == 12) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/12-aveyron/communes-12-aveyron.geojson';
        } else if (code == 48) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/48-lozere/communes-48-lozere.geojson';
        } else if (code == 30) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/30-gard/communes-30-gard.geojson';
        } else if (code == 13) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/13-bouches-du-rhone/communes-13-bouches-du-rhone.geojson';
        } else if (code == 84) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/84-vaucluse/communes-84-vaucluse.geojson';
        } else if (code == 83) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/83-var/communes-83-var.geojson';
        } else if (code == 04) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/04-alpes-de-haute-provence/communes-04-alpes-de-haute-provence.geojson';
        } else if (code == 05) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/05-hautes-alpes/communes-05-hautes-alpes.geojson';
        } else if (code == 06) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/06-alpes-maritimes/communes-06-alpes-maritimes.geojson';
        } else if (code == '2A') {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/2A-corse-du-sud/communes-2A-corse-du-sud.geojson';
        } else if (code == '2B') {
            url = 'https://france-geojson.gregoiredavid.fr/repo/departements/2B-haute-corse/communes-2B-haute-corse.geojson';
        }
    } else if (window.type == 2) { // 2 = départements
        if (code == 75) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/nouvelle-aquitaine/departements-nouvelle-aquitaine.geojson';
        } else if (code == 76) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/occitanie/departements-occitanie.geojson';
        } else if (code == 93) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/provence-alpes-cote-d-azur/departements-provence-alpes-cote-d-azur.geojson';
        } else if (code == 84) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/auvergne-rhone-alpes/departements-auvergne-rhone-alpes.geojson';
        } else if (code == 53) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/bretagne/departements-bretagne.geojson';
        } else if (code == 52) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/pays-de-la-loire/departements-pays-de-la-loire.geojson';
        } else if (code == 24) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/centre-val-de-loire/departements-centre-val-de-loire.geojson';
        } else if (code == 27) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/bourgogne-franche-comte/departements-bourgogne-franche-comte.geojson';
        } else if (code == 28) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/normandie/departements-normandie.geojson';
        } else if (code == 11) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/ile-de-france/departements-ile-de-france.geojson';
        } else if (code == 44) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/grand-est/departements-grand-est.geojson';
        } else if (code == 32) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/hauts-de-france/departements-hauts-de-france.geojson';
        } else if (code == 94) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions/corse/departements-corse.geojson';
        } else if (code == 01 || code == 02 || code == 03 || code == 04 || code == 06) {
            url = 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson';
        } 
    } else if (window.type == 1) { // 3 = régions
        url = 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson';
    }

    // modifie le boutton de choix de région/département en fonciton de ce qui est affiché
    buttons.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
        if (element.getAttribute('data-type') == window.type) element.classList.add('active');
    })

    map.removeLayer(statesLayer);   // supprime la découpe en cours
    fetchgeoJsonBorder(map, url);   // créé la nouvelle découpe
}

/**
 * Cette fonction zoom sur la partie de la carte cliqué
 */
function zoomToClickedLayer(evt, code) {
    let map = window.map;
    map.fitBounds(evt.target.getBounds());
    if (window.type < 3)  {
        if (window.code === 'FRA') switchToNextType(code);
    }
}

/**
 * Change de salon lance la fonction de zoom sur la carte
 */
function changeSalon(evt) {
    let code = evt.sourceTarget.feature.properties.code;
    let type = window.type;
    let options = [code, type];
    let activatedSalon = document.querySelector('.salon__list--item.active');   // récupère l'élément li du salon actif
    let newSalon = document.querySelector('[data-salon-code="' + code + '"][data-salon-type="' + type + '"]');   // récupère l'élément li du salon à activer

    if (type == 0) {    // si on est sur l'affichage d'unpays et qu'on clique dessus, stock lecode iso du pays en variable global
        window.code = code;
    }

    fetUrlToChangeSalon(options);   // change de salon

    // Ajoute la classe active sur le l'élément li du salon a activer et le supprime de l'ancien salon
    if (activatedSalon) {
        activatedSalon.classList.remove('active');
    }
    if (newSalon) {
        newSalon.classList.add('active');
    }

    zoomToClickedLayer(evt, code);  // zoom sur la carte sur l'élément sélectionné
}

/**
 * Cette fonction modifie la couleur du département survolé
 */
function highlightFeature(evt) {
    var feature = evt.target;
    var highlightStyle = {
        weight: 3,
        color: '#3B555C',
        dashArray: '',
        fillOpacity: 0.6
    }
    feature.setStyle(highlightStyle);
    if (!L.Browser.ie && !L.Browser.opera) {
        feature.bringToFront();
    }
}

/**
 * cette fonction enleve le hover du département
 */
function resetHighlight(evt) {
    statesLayer.resetStyle(evt.target);
}

function fetchgeoJsonBorder(map, url) {
    window.map = map;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            // ajoute les départements a la carte
            statesLayer = L.geoJson(data, {
                onEachFeature: onEachFeature, // fonction onEachFeature()
            }).addTo(map); // affiche les bordures
        })
        .catch((e) => {
            console.log(e);
        });
}

/**
 * cette fonction utilise l'api de leaflet pour créer une map affichant les départements de france afin de changer de salon en cliquant dessus
 */
function init() {

    window.type = 0; // met en variable global le type de code

    let map = L.map('map'); // initialise la map
    map.setView([46.227638, 2.213749], 2); // centre la map sur la france

    // permet l'affichage des tuiles sur la carte
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map); // affiche les tuiles

    // requete fetch pour récupérer un geojson contenant la liste des bordures de tous les départements
    addEventListenerOnButton(map);
    fetchgeoJsonBorder(map, './json/countries.geojson');
}

function addEventListenerOnButton(map) {
    let buttons = document.querySelectorAll('[data-url]');

    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                window.type = button.getAttribute('data-type'); // met en variable global le type de code
                buttons.forEach(element => {
                    if (element.classList.contains('active')) {
                        element.classList.remove('active');
                    }
                })
                button.classList.add('active');
                map.removeLayer(statesLayer);
                fetchgeoJsonBorder(map, button.getAttribute('data-url'));
            })
        })
    }
}

window.addEventListener('load', () => {
    init()
})