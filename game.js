// Select the game container element
const gameContainer = document.querySelector(".game-container");
const timerContainer = document.querySelector(".time");
const moveContainer = document.querySelector(".moves");

// State For Our App
let moves = 0;

// we are tracking  logo count on rendering game
let logoCounts = {};

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

// an array to temp store a card that is flipped
let tempFlippedCard = [];

//function taking 2 argument (card id) and adding disabled class to it which means its matched
function markeAsChecked(id) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    if (card.id === id) {
      card.classList = ["card disabled"];
    }
  });
}

// function to check card is matched or not
function checkIsMatchCard(card) {
  // // If user clicked  a matched card
  if (card.classList.contains("disabled") || card.classList.contains("click"))
    return;

  // the card clicked was first one
  if (tempFlippedCard.length === 0) {
    tempFlippedCard.push(card.id);
    return;
  }

  // if second card that was click is not equal to first card
  if (tempFlippedCard.length > 0 && !tempFlippedCard.includes(card.id)) {
    tempFlippedCard = [];

    setTimeout(() => {
      unflippingCard();
    }, 500);

    return;
  }

  // if second card is same as first card
  if (tempFlippedCard.length > 0 && tempFlippedCard.includes(card.id)) {
    setTimeout(() => {
      markeAsChecked(card.id);
    }, 500);
    return;
  }
}

// update ui function for all possible state update up ahead
function updateUI() {
  // update moves
  moveContainer.textContent = ` Moves: ${String(moves).padStart(2, "0")}`;
}

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
    checkIsMatchCard(card);
    card.classList.add("click");
  });

  return card;
}

// Function to add image into card
function addImageToCard(card) {
  const backCard = card.querySelector(".card-back");

  // Getting index to pick logo
  let logoIndex;

  do {
    logoIndex = Math.floor(Math.random() * logos.length);
  } while (logoCounts[logoIndex] >= 2);

  logoCounts[logoIndex] = (logoCounts[logoIndex] || 0) + 1;

  // adding logo index to card for furthur use
  card.setAttribute("id", logoIndex);

  // creating image
  const image = document.createElement("img");
  image.src = logos[logoIndex];

  backCard.append(image);

  return card;
}

// Start Timer Function for our app
function startTimer() {
  let seconds = 1;

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  setInterval(() => {
    timerContainer.textContent = ` Time: ${formatTime(seconds)}`;
    seconds++;
  }, 1000);
}

// Unflipping all the card but not those who are already matched
function unflippingCard() {
  const cards = document.querySelectorAll(".card");

  // we will loop through each card and check if it is disabled means already matched
  cards.forEach((card) => {
    if (!card.classList.contains("disabled")) {
      card.classList = ["card"];
    }
  });
}

// Function to render the game grid
function renderGame() {
  for (let i = 0; i < 24; i++) {
    const card = createCard(); // Create a card

    // Adding images to card
    const cardWithImage = addImageToCard(card);
    gameContainer.appendChild(cardWithImage); // Append card to the game container
  }

  // Start Timer
  startTimer();
}

// Wait for the DOM to be fully loaded before rendering the game
document.addEventListener("DOMContentLoaded", renderGame);
