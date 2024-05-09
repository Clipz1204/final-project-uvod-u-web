const apiKey = '0eb06bfe-223f-43e6-92a3-4d0775b8df29';

// Pikachu
const cardId = 'base1-58'; // ID of the card you want to fetch

fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
  headers: {
    'X-Api-Key': apiKey,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    const card = data.data;

    // Create card elements
    const cardImage = document.createElement('img');
    cardImage.src = card.images.small;
    cardImage.alt = card.name;

    // Append card elements to container
    const cardContainer = document.querySelector('.pikachu');
    cardContainer.appendChild(cardImage);
  })
  .catch((error) => {
    console.error('Error fetching card:', error);
  });

// Charazard
const cardId2 = 'base1-4'; // ID of the card you want to fetch

fetch(`https://api.pokemontcg.io/v2/cards/${cardId2}`, {
  headers: {
    'X-Api-Key': apiKey,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    const card = data.data;

    // Create card elements
    const cardImage = document.createElement('img');
    cardImage.src = card.images.small;
    cardImage.alt = card.name;

    // Append card elements to container
    const cardContainer = document.querySelector('.charazard');
    cardContainer.appendChild(cardImage);
  })
  .catch((error) => {
    console.error('Error fetching card:', error);
  });

// Slider
///////////////////////////////////////////
const slider = document.querySelectorAll('.slide');
