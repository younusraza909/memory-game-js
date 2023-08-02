// Select the game container element
const gameContainer = document.querySelector(".game-container");

// This array contain path to logo use in this game
let logos = [
  "./assets/angular.svg",
  "./assets/backbone.svg",
  "./assets/ember.svg",
  "./assets/bootstrap.svg",
  "./assets/css.svg",
  "./assets/django.svg",
  "./assets/js.svg",
  "./assets/mui.png",
  "./assets/python.png",
  "./assets/react.svg",
  "./assets/tailwind.svg",
  "./assets/vue.svg",
];

// Function to create a card element
function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");

  const innerCard = document.createElement("div");
  innerCard.classList.add("card-inner");

  const frontCard = document.createElement("div");
  frontCard.classList.add("card-front");

  const backCard = document.createElement("div");
  backCard.classList.add("card-back");

  innerCard.appendChild(frontCard);
  innerCard.appendChild(backCard);
  card.appendChild(innerCard);

  // Toggle the 'click' class on card click
  card.addEventListener("click", () => {
    card.classList.toggle("click");
  });

  return card;
}

// Function to render the game grid
function renderGame() {
  for (let i = 0; i < 24; i++) {
    const card = createCard(); // Create a card

    // adding logo to card
    const backCard = card.querySelector(".card-back");

    // Getting index to pick logo
    const logoIndex = Math.floor(i / 2) % logos.length;

    // creating image
    const image = document.createElement("img");
    image.src = logos[logoIndex];

    backCard.append(image);

    gameContainer.appendChild(card); // Append card to the game container
  }
}

// Wait for the DOM to be fully loaded before rendering the game
document.addEventListener("DOMContentLoaded", renderGame);
