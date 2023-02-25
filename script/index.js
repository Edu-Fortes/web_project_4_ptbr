let modal = document.querySelector(".popup");
let openModalBtn = document.querySelector(".button_edit");
let closeModalBtn = document.querySelector(".button_close");

let closedModal = modal.classList.remove("popup_opened");

let openModal = function () {
  modal.classList.add("popup_opened");
};

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closedModal);
