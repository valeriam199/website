const observationContainer = document.getElementById("load-observation");
const loadingButton = document.getElementById("loading-button");

let currentPage = 1;
const perPage = 100;

console.log("JS geladen");
function getData(){
    const url = "https://api.inaturalist.org/v1/observations?"
          + "nelat=52.54&nelng=13.45&swlat=52.50&swlng=13.39"
          + "&page=" + currentPage
          + "&per_page=" + perPage
          + "&order=desc&order_by=created_at";
    let count = 0;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(observation =>{
                if (count >= 6) return;

                if (!observation.geojson) return;
                if (!observation.species_guess) return;
                if (!observation.photos || observation.photos.length === 0) return;
                //const lon = observation.geojson.coordinates[0];
                //const lat = observation.geojson.coordinates[1];

                //create Observations
                //if (lon >= 10.5 && lon <= 11.5 && lat >= 51.5 && lat <= 51.95) {
                    const card = document.createElement("div");
                    card.classList.add("observation-card");
                    card.dataset.category = observation.taxon.iconic_taxon_name.toLowerCase();
                    card.id = "obs" + observation.id;

                    //image
                    const img = document.createElement("img");
                    img.src = observation.photos[0].url.replace("square", "large");
                    card.appendChild(img);

                    //name
                    const titleName = document.createElement("h4");
                    titleName.textContent = observation.species_guess;
                    card.appendChild(titleName);

                    //detail div
                    const details = document.createElement("div")
                    details.classList.add("details");
                    card.appendChild(details);

                    //latin name
                    const latinName = document.createElement("p");
                    latinName.textContent = "Lateinischer Name: " + observation.taxon.name;
                    details.appendChild(latinName);

                    //date
                    const sawDate = document.createElement("p");
                    sawDate.textContent = "Gesichtet am: " + observation.observed_on;
                    details.appendChild(sawDate);

                    //category
                    const category = document.createElement("p");
                    category.textContent = "Art: " + observation.taxon.iconic_taxon_name;
                    details.appendChild(category);

                    observationContainer.appendChild(card);

                    console.log("Lade Seite:", currentPage);
                    console.log("Beobachtungen erhalten:", data.results.length);
                //}

                count++;
            });
        });
    }

getData();
