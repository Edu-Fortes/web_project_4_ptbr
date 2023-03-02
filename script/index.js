const modal = document.querySelector(".popup");
const closedModal = modal.classList.remove("popup_opened");

// ABRE E FECHA O MODAL

const openModalBtn = document.querySelector(".button_edit");
const closeModalBtn = modal.querySelector(".button_close");

const openCloseModal = function () {
  modal.classList.toggle("popup_opened");

  const nameInput = modal.querySelector(".popup__input_type_name");
  const aboutInput = modal.querySelector(".popup__input_type_about");

  const perfilName = document.querySelector(".profile__title");
  const perfilAbout = document.querySelector(".profile__subtitle");

  nameInput.value = perfilName.textContent;
  aboutInput.value = perfilAbout.textContent;
};

openModalBtn.addEventListener("click", openCloseModal);
closeModalBtn.addEventListener("click", openCloseModal);

// ENVIA FORMULARIO

const formElement = modal.querySelector(".popup__form");
const saveBtn = modal.querySelector(".button_save");

function handleProfileFormSubmit(e) {
  e.preventDefault();

  const nameInput = modal.querySelector(".popup__input_type_name");
  const aboutInput = modal.querySelector(".popup__input_type_about");

  const perfilName = document.querySelector(".profile__title");
  const perfilAbout = document.querySelector(".profile__subtitle");

  perfilName.textContent = nameInput.value;
  perfilAbout.textContent = aboutInput.value;

  openCloseModal();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
