// Select the game container element
const gameContainer = document.querySelector(".game-container");

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
  for (let i = 0; i < 6; i++) {
    for (let y = 0; y < 4; y++) {
      const card = createCard(); // Create a card
      gameContainer.appendChild(card); // Append card to the game container
    }
  }
}

// Wait for the DOM to be fully loaded before rendering the game
document.addEventListener("DOMContentLoaded", renderGame);
