const observationContainer = document.getElementById("load-observation");
const loadingButton = document.getElementById("loading-button");

function applySidebarLayout(){
    const $sidebar = $("#sidebar");
    
    $(".observation-card").parent().each(function(){
        const $col = $(this);
        if($sidebar.hasClass("d-none")){
            $col.removeClass("col-lg-6").addClass("col-lg-4");
        }else{
            $col.removeClass("col-lg-4").addClass("col-lg-6");
        }
    });
    $("#card-bar").each(function(){
        const $col = $(this);
        if($sidebar.hasClass("d-none")){
            $col.removeClass("col-12 col-lg-8").addClass("col-12");
        }else{
            $col.removeClass("col-12").addClass("col-12 col-lg-8");
        }
    });
}

//jQuery sidebar
$(document).ready(function(){
    const $sidebarToogle = $("#toggle-sidebar");
    const $sidebar = $("#sidebar");

    applySidebarLayout();

    $sidebarToogle.on("click", function(){
        wasHidden = $sidebar.hasClass("d-none");

        $sidebar.toggleClass("d-none");

        applySidebarLayout();

        if(wasHidden === true){
        initMap();
        updateMarker();
        }

    });
});




const mapContainer = document.getElementById("mapid");
let mapInstance;
let markerLayer

function updateMarker(){
    if(!markerLayer) {
        return;
    }
    markerLayer.clearLayers();

    const cards = document.querySelectorAll(".observation-card");
    cards.forEach(card => {
        const lat = parseFloat(card.dataset.lat);
        const lon = parseFloat(card.dataset.lon);
        const marker = L.marker([lat, lon]).addTo(markerLayer);
        marker.on("click", function(){
            const highlight = document.querySelectorAll(".highlight, .show-details");
            highlight.forEach(el => {
                el.classList.remove("highlight");
                el.classList.remove("show-details");
            })
            card.classList.add("highlight", "show-details");
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        })
    })
}

function initMap(){
    if(!mapInstance){
        mapInstance = L.map(mapContainer);
        mapInstance.setView([52.526, 13.432], 14);
    }

    if(!markerLayer){
        markerLayer = L.layerGroup().addTo(mapInstance);
    }
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors' 
    }).addTo(mapInstance);
}

let currentPage = 1;
const perPage = 100;
let count = 0;

console.log("JS geladen");
function getData(){
    const url = "https://api.inaturalist.org/v1/observations?"
          + "nelat=52.54&nelng=13.45&swlat=52.50&swlng=13.39"
          + "&page=" + currentPage
          + "&per_page=" + perPage
          + "&order=desc&order_by=created_at";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("API Daten erhalten:", data.results.length, "Beobachtungen");
            data.results.forEach(observation =>{

                if (count >= 6) return;

                if (!observation.geojson) return;
                if (!observation.species_guess) return;
                if(observation.taxon.name.toLowerCase().includes("noctua pronuba")) return;
                if (!observation.photos || observation.photos.length === 0) return;
                if (!observation.taxon || !observation.taxon.name) {
                    console.log("Kein taxon.name vorhanden");
                    return;
                }

                //if(observation.taxon.name == observation.species_guess) return;

                const lon = observation.geojson.coordinates[0];
                const lat = observation.geojson.coordinates[1];

                if (lon < 13.42 || lon > 13.44 || lat < 52.52 || lat > 52.54) return;
                console.log("Art:", observation.species_guess, "Lon:", lon, "Lat:", lat);

                //create Observations
                const col = document.createElement("div");
                col.classList.add ("col-12", "col-md-6", "col-lg-4");
                const card = document.createElement("div");
                card.classList.add("observation-card");
                card.dataset.category = observation.taxon.iconic_taxon_name.toLowerCase();
                card.id = "obs" + observation.id;
                card.dataset.lat = lat;
                card.dataset.lon = lon;

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

                //marker
                if(markerLayer){
                    const marker = L.marker([lat, lon]).addTo(markerLayer);
                    marker.on("click", function(){
                        document.querySelectorAll(".highlight").forEach(el => {
                            el.classList.remove("highlight");
                        });
                        card.classList.add("highlight");
                    })
                }

                col.appendChild(card);
                observationContainer.appendChild(col);
                
                count++;
                
            });
            applySidebarLayout();
            updateMarker();
        });
    }

getData();

//more observation cards
loadingButton.addEventListener("click", ()=>{
    currentPage++;
    count = 0;
    observationContainer.innerHTML = "";
    getData();
});