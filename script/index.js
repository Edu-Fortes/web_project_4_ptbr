let modal = document.querySelector(".popup");
let openModalBtn = document.querySelector(".button_edit");
let closeModalBtn = modal.querySelector(".button_close");

let closedModal = modal.classList.remove("popup_opened");

let openModal = function () {
  modal.classList.add("popup_opened");
};

let closeModal = function () {
  modal.classList.remove("popup_opened");
};

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

function editProfile() {
  let nameProfile = document.querySelector(".profile__title");
  let aboutProfile = document.querySelector(".profile__subtitle");
}
