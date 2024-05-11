"use strict";

const apiKey = "76aa6444-b8ee-45a6-b85d-503041fc2baf";

const collectionLogo = document.querySelector("#collection-logo");
const collectionName = document.querySelector("#collection-name");
const mainCard1 = document.querySelector("#main-card-1");
const mainCard2 = document.querySelector("#main-card-2");
const cardContainer = document.querySelector("#card-container");
const loadBtn = document.querySelector("#load");

let maxCardNum = 1;
let counter = 1;

const collectionTag = "dp3";

loadBtn.addEventListener("click", displayCards);

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

async function displayCards(i) {
  for (let i = 0; i < 100; i++) {
    if (counter > maxCardNum) {
      loadBtn.classList.add("hidden");
      break;
    }
    const data = await loadCard(counter);
    counter++;
    const cardInfo = data.data;

    const divContainer = document.createElement("div");
    divContainer.classList.add("card");

    const img = document.createElement("img");
    img.src = cardInfo.images.small;

    divContainer.append(img);
    cardContainer.append(divContainer);
  }
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
