function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  setTimeout(() => {
    document.addEventListener("click", outsideClickListener);
  }, 800); // Léger délai pour éviter la fermeture immédiate
}

// close modal
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  const content = modalbg.querySelector(".content");
  content.classList.add("modal-close");
  console.log(content);

  content.setAttribute("disabled", "disabled");

  setTimeout(() => {
    modalbg.style.display = "none";
    content.classList.remove("modal-close");
    content.removeAttribute("disabled");
    document.removeEventListener("click", outsideClickListener);
  }, 800);
}

// Close modal if click outside of it
function outsideClickListener(event) {
  if (!modalbg.querySelector(".content").contains(event.target)) {
    closeModal();
  }
}

// Prevent event propagation inside modal
modalbg.querySelector(".content").addEventListener("click", function(event) {
  event.stopPropagation();
});