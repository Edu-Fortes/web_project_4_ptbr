let modal = document.querySelector(".popup");
let closedModal = modal.classList.remove("popup_opened");

// ABRE E FECHA O MODAL

let openModalBtn = document.querySelector(".button_edit");
let closeModalBtn = modal.querySelector(".button_close");

let openCloseModal = function () {
  modal.classList.toggle("popup_opened");

  let nameInput = modal.querySelector(".popup__input_type_name");
  let aboutInput = modal.querySelector(".popup__input_type_about");

  let perfilName = document.querySelector(".profile__title");
  let perfilAbout = document.querySelector(".profile__subtitle");

  nameInput.value = perfilName.textContent;
  aboutInput.value = perfilAbout.textContent;
};

openModalBtn.addEventListener("click", openCloseModal);
closeModalBtn.addEventListener("click", openCloseModal);

// ENVIA FORMULARIO

let formElement = modal.querySelector(".popup__form");
let saveBtn = modal.querySelector(".button_save");

function handleProfileFormSubmit(e) {
  e.preventDefault();

  let nameInput = modal.querySelector(".popup__input_type_name");
  let aboutInput = modal.querySelector(".popup__input_type_about");

  let perfilName = document.querySelector(".profile__title");
  let perfilAbout = document.querySelector(".profile__subtitle");

  perfilName.textContent = nameInput.value;
  perfilAbout.textContent = aboutInput.value;

  openCloseModal();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
