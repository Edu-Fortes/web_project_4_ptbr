//Function to open modals
const openProfileModal = () => {
  profileModal.classList.add(popup.opened);
  inputName.value = perfilName.textContent;
  inputAbout.value = perfilAbout.textContent;
  addKeydownListener();
};
const openPlaceModal = () => {
  placeModal.classList.add(popup.opened);
  addKeydownListener();
};
//Functions to close modals
const closeProfileModal = () => {
  profileModal.classList.remove(popup.opened);
  removeKeydownListener();
};
const closePlaceModal = () => {
  placeModal.classList.remove(popup.opened);
  removeKeydownListener();
};
const closePhotoModal = () => {
  photoModal.classList.remove(popup.opened);
  removeKeydownListener();
};
