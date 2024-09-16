// Function for responsive menu
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");

// Launch modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "block";
  setTimeout(() => {
    document.addEventListener("click", outsideClickListener);
  }, 800); // Délai pour éviter la fermeture immédiate
}

// Close modal
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  const content = modalbg.querySelector(".content");
  content.classList.add("modal-close");

  content.setAttribute("disabled", "disabled");

  setTimeout(() => {
    modalbg.style.display = "none";
    content.classList.remove("modal-close");
    content.removeAttribute("disabled");
    document.removeEventListener("click", outsideClickListener);
  }, 800);
}

// Fermeture de la modale en cliquant à l'extérieur
function outsideClickListener(event) {
  if (!modalbg.querySelector(".content").contains(event.target)) {
    closeModal();
  }
}

// Empêcher la propagation de l'événement à l'intérieur de la modale
modalbg.querySelector(".content").addEventListener("click", function(event) {
  event.stopPropagation();
});