"use strict";

const apiKey = "76aa6444-b8ee-45a6-b85d-503041fc2baf";

const collectionLogo = document.querySelector("#collection-logo");
const collectionName = document.querySelector("#collection-name");
const collectionSearch = document.querySelector(".collection-search");
const mainCard1 = document.querySelector("#main-card-1");
const mainCard2 = document.querySelector("#main-card-2");
const cardContainer = document.querySelector("#card-container");
const loadBtn = document.querySelector("#load");
const filterBtn = document.getElementById("filterButton");
const searchField = document.getElementById("search");

let maxCardNum = 1;
let counter = 1;

const collectionTag = "dp3";

filterBtn.addEventListener("click", addFilterOptions);
loadBtn.addEventListener("click", displayCards);

function filterCard() {
  const selectRarity = document.querySelector("#rarity");
  const selectType = document.querySelector("#type");
  const hpMin = document.querySelector("#hp_min");
  const hpMax = document.querySelector("#hp_max");
  if (
    selectRarity.value === "default" &&
    selectType.value === "default" &&
    hpMin.value == 0 &&
    hpMax.value == 0
  ) {
    return;
  }
  counter = 1;
  cardContainer.innerHTML = "";
  displayCards(selectType.value, selectRarity.value, hpMin.value, hpMax.value);
}

function addFilterOptions() {
  filterBtn.style.borderRadius = "0 10px 0 0 ";
  searchField.style.borderRadius = "10px 0 0 0 ";
  const filterContent = `
  <div class="filter-options">
  <div class="filter-section">
    <label for="rarity">Rarity:</label>
    <select name="rarity" id="rarity"">
      <option selected="selected" value="default"></option>
      <option value="ACE SPEC Rare">ACE SPEC Rare</option>
      <option value="Amazing Rare">Amazing Rare</option>
      <option value="Classic Collection">Classic Collection</option>
      <option value="Common">Common</option>
      <option value="Double Rare">Double Rare</option>
      <option value="Hyper Rare">Hyper Rare</option>
      <option value="Illustration Rare">Illustration Rare</option>
      <option value="LEGEND">LEGEND</option>
      <option value="Promo">Promo</option>
      <option value="Radiant Rare">Radiant Rare</option>
      <option value="Rare">Rare</option>
      <option value="Rare ACE">Rare ACE</option>
      <option value="Rare BREAK">Rare BREAK</option>
      <option value="Rare Holo">Rare Holo</option>
      <option value="Rare Holo EX">Rare Holo EX</option>
      <option value="Rare Holo GX">Rare Holo GX</option>
      <option value="Rare Holo LV.X">Rare Holo LV.X</option>
      <option value="Rare Holo Star">Rare Holo Star</option>
      <option value="Rare Holo V">Rare Holo V</option>
      <option value="Rare Holo VMAX">Rare Holo VMAX</option>
      <option value="Rare Holo VSTAR">Rare Holo VSTAR</option>
      <option value="Rare Prime">Rare Prime</option>
      <option value="Rare Prism Star">Rare Prism Star</option>
      <option value="Rare Rainbow">Rare Rainbow</option>
      <option value="Rare Secret">Rare Secret</option>
      <option value="Rare Shining">Rare Shining</option>
      <option value="Rare Shiny">Rare Shiny</option>
      <option value="Rare Shiny GX">Rare Shiny GX</option>
      <option value="Rare Ultra">Rare Ultra</option>
      <option value="Shiny Rare">Shiny Rare</option>
      <option value="Shiny Ultra Rare">Shiny Ultra Rare</option>
      <option value="Special Illustration Rare">Special Illustration Rare</option>
      <option value="Trainer Gallery Rare Holo">Trainer Gallery Rare Holo</option>
      <option value="Ultra Rare">Ultra Rare</option>
      <option value="Uncommon">Uncommon</option>
    </select>
  </div>
  <div class="filter-section">
    <label for="type">Type:</label>
    <select name="type" id="type">
      <option selected="selected" value="default"></option>
      <option value="Colorless">Colorless</option>
      <option value="Darkness">Darkness</option>
      <option value="Dragon">Dragon</option>
      <option value="Fairy">Fairy</option>
      <option value="Fighting">Fighting</option>
      <option value="Fire">Fire</option>
      <option value="Grass">Grass</option>
      <option value="Lightning">Lightning</option>
      <option value="Metal">Metal</option>
      <option value="Psychic">Psychic</option>
      <option value="Water">Water</option>
    </select>
  </div>
  <div class="filter-section">
    <label>HP:</label>
    <label for="hp_min">Min:</label>
    <input type="number" id="hp_min" name="hp" />
    <label for="hp_max">Max:</label>
    <input type="number" id="hp_max" name="hp" />
  </div>
  <button class="btn" id="filter" onclick="filterCard()">Filter</button>
</div>
  `;
  collectionSearch.innerHTML += filterContent;
}

const fillMain = (cardNum, tag) => {
  fetch(`https://api.pokemontcg.io/v2/cards/${collectionTag}-${cardNum}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const cardInfo = data.data;
      tag.src = cardInfo.images.small;
    })
    .catch((error) => {
      console.error("Error fetching card:", error);
    });
};

async function loadCard(i) {
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards/${collectionTag}-${i}`,
    {
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );
  const card = await response.json();
  return card;
}

async function displayCards(type, rarity, hp_min, hp_max) {
  for (let i = 0; i < 8; i++) {
    if (counter > maxCardNum) {
      loadBtn.classList.add("hidden");
      break;
    }
    const data = await loadCard(counter);
    const cardInfo = data.data;
    counter++;

    const cardType = cardInfo.types;
    const cardRarity = cardInfo.rarity;
    const cardHp = cardInfo.hp;

    if (
      type === undefined &&
      rarity === undefined &&
      hp_max == undefined &&
      hp_min === undefined
    ) {
      createCard(cardInfo);
      continue;
    }
    console.log(type);
    console.log(hp_min);
    console.log(hp_max);
    if (type != "default") {
      if (cardType == type) {
        if (rarity != "default") {
          if (rarity == cardRarity) {
            if (hp_min != "" && hp_max != "") {
              if (cardHp >= hp_min && cardHp <= hp_max) {
                createCard(cardInfo);
              } else {
                i--;
                continue;
              }
            } else {
              createCard(cardInfo);
            }
          } else {
            i--;
            continue;
          }
        } else {
          createCard(cardInfo);
        }
      } else {
        i--;
        continue;
      }
    } else {
      if (rarity != "default") {
        if (rarity === cardRarity) {
          if (hp_min != "" && hp_max != "") {
            if (cardHp >= hp_min && cardHp <= hp_max) {
              createCard(cardInfo);
            } else {
              i--;
              continue;
            }
          } else {
            console.log("ajk.bf..kasjbd.kjasbd");
            createCard(cardInfo);
          }
        } else {
          i--;
          continue;
        }
      }
      if (hp_min != "" && hp_max != "") {
        if (cardHp >= hp_min && cardHp <= hp_max) {
          if (type != "default") {
            if (cardType == type) {
              createCard(cardInfo);
            } else {
              i--;
              continue;
            }
          } else {
            createCard(cardInfo);
          }
        } else {
          i--;
          continue;
        }
      }
    }
  }
}

function createCard(cardInfo) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("card");

  const img = document.createElement("img");
  img.src = cardInfo.images.small;

  divContainer.append(img);
  cardContainer.append(divContainer);
}

fetch(`https://api.pokemontcg.io/v2/sets/${collectionTag}`, {
  headers: {
    "X-Api-Key": apiKey,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const collectionInfo = data.data;
    collectionLogo.src = collectionInfo.images.logo;
    collectionName.innerText = collectionInfo.name;
    maxCardNum = collectionInfo.total;
    fillMain(Math.floor(Math.random() * (maxCardNum - 1 + 1) + 1), mainCard1);
    fillMain(Math.floor(Math.random() * (maxCardNum - 1 + 1) + 1), mainCard2);
  })
  .catch((error) => {
    console.error("Error fetching card:", error);
  });

displayCards();
