// adres API
const url = "https://api.scryfall.com/cards/random";

// podpinamy pod guzik nasłuchiwanie na kliknięcie tak aby każdorazowo po kliknięciu pobierała nam się losowa karta (funkcja getCard) + loader
const button = document.getElementById("get-card");
button.addEventListener("click", function() {
  document.getElementById("loader").style.visibility = "visible";
  window.location.href = "#loader";
  getCard();
});

// wywołanie funkcji getCard po załadowaniu strony + loader
document.body.onload = function() {
  document.getElementById("loader").style.visibility = "visible";
  getCard();
};

// implementacja funkcji getCard() - połączenie z API, odebranie danych JSON, parsowanie i wyświetlenie
function getCard() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.addEventListener("load", function() {

    const response = JSON.parse(xhr.response);
    const nazwa = document.getElementById("card");
    const artist = document.getElementById("artist");
    const art = document.getElementById("pic");
    const type = document.getElementById("type");
    const price = document.getElementById("price");
    const rarity = document.getElementById("rarity");
    const set = document.getElementById("set");
    const shop = document.getElementById("shopping");
    const oracle = document.getElementById("oracle");
   
    nazwa.innerHTML = response.name;
    artist.innerHTML = "<span class='card-name'>autor ilustracji: </span>" + response.artist;
    type.innerHTML = "<span class='card-name'>typ: </span>" + response.type_line;
    price.innerHTML = "<span class='card-name'>średnia cena to: </span>" + response.eur + " €";
    rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + response.rarity;
    set.innerHTML = "<span class='card-name'>dodatek: </span>" + response.set_name + " [" + response.set + "]";
    art.src = response.image_uris.normal;
    oracle.innerHTML = "<span class='card-name'>tekst: </span>" + response.oracle_text;
    
    // sprawdzamy czy jest dostępna cena dla wylosowanej larty
    if (response.eur === undefined) {
      price.innerHTML = "brak ceny";
    }
    
    // sprawdzamy rzadkość karty i kolorujemy
    if (response.rarity === "rare") {
      rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + "<span class='rare'>rare </span>";
    } else if (response.rarity === "uncommon") {
      rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + "<span class='uncommon'>uncommon </span>";
    } else if (response.rarity === "mythic") {
      rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + "<span class='mythic'>mythic </span>";
    }

    // poniżej generujemy linka do zakupów w magic card market
    const shopLink = response.purchase_uris.magiccardmarket;
    const shopping = "kup tą kartę w magic card market";
    shop.innerHTML = shopping.link(shopLink);

    console.log(response);
    // ukrycie loadera
    document.getElementById("loader").style.visibility = "hidden";
  });
  xhr.send();
}
