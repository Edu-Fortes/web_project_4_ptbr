/* Constants to set each modal returned by NodeList.
 * - One for profile modal - inputs to change profile info
 * - One for place modal - inputs to add new card/post
 * - One for photo modal - show bigger clicked card photo */
const modals = document.querySelectorAll(".popup"); //returns a NodeList with 3 popup results
const profileModal = modals[0];
const placeModal = modals[1];
const photoModal = modals[2];
//query constants
const profileSection = document.querySelector(".profile");
const placesSection = document.querySelector(".places");
const inputName = profileModal.querySelector(".popup__input_type_name");
const inputAbout = profileModal.querySelector(".popup__input_type_about");
const perfilName = profileSection.querySelector(".profile__title");
const perfilAbout = profileSection.querySelector(".profile__subtitle");
const photoElement = photoModal.querySelector(".popup_img");
const photoCaption = photoModal.querySelector(".popup__figcaption");

modals.forEach((modal) => {
  //Close all modals on page loading
  modal.classList.remove("popup_opened");
  //Look for event to close photo modal
  modal.addEventListener("click", handleCloseModal);
});

function openModal() {
  profileSection.addEventListener("click", handleOpenModal);
  placesSection.addEventListener("click", handleOpenModal);
}

openModal();

function handleOpenModal(event) {
  //checks if clicked button is the pencil button (edit profile)
  if (
    event.target.classList.contains("img_button_edit") ||
    event.target.classList.contains("button_edit")
  ) {
    //open modal to change profile info
    inputName.value = perfilName.textContent;
    inputAbout.value = perfilAbout.textContent;
    profileModal.classList.add("popup_opened");
    handleKeydownListener("addListener");
    return;
  }
  //check if clicked button is the plus button (add new card)
  if (
    event.target.classList.contains("img_button_add") ||
    event.target.classList.contains("button_add")
  ) {
    //open modal to add new place
    placeModal.classList.add("popup_opened");
    handleKeydownListener("addListener");
    return;
  }
  // check if clicked element is a photo (photo modal)
  if (event.target.classList.contains("img_card")) {
    //open modal to show big image
    getModalImage(event);
    photoModal.classList.add("popup_opened");
    handleKeydownListener("addListener");
    return;
  }
}

function getModalImage(event) {
  const modalImage = photoModal.querySelector(".popup__img");
  const imgCaption = photoModal.querySelector(".popup__figcaption");
  imgCaption.textContent = event.target.alt.slice(27);
  modalImage.src = event.target.src;
  modalImage.alt = `Imagem ampliada da postagem ${imgCaption.textContent}`;
}

function handleKeydownListener(action) {
  if (action === "addListener") {
    document.addEventListener("keydown", handleCloseModal);
    return;
  }
  if (action === "removeListener") {
    document.removeEventListener("keydown", handleCloseModal);
    return;
  }
}

function handleCloseModal(event) {
  if (
    event.target.classList.contains("img_button_close") ||
    event.target.classList.contains("popup")
  ) {
    //this target gets the button who opened the modal. Closes Profile and Add Card Modal
    event.target.closest(".popup").classList.remove("popup_opened");
    handleKeydownListener("removeListener");
    return;
  }
  if (event.key === "Escape") {
    //this target gets the hole document. Closes modals on "ESC" keypress
    document.querySelector(".popup_opened").classList.remove("popup_opened");
    handleKeydownListener("removeListener");
    return;
  }
}
