/* Constants to set each modal returned by NodeList.
 * - One for profile modal - inputs to change profile info
 * - One for place modal - inputs to add new card/post
 * - One for photo modal - show bigger clicked card photo
 * */
const modals = document.querySelectorAll(".popup"); //returns a NodeList with 3 popup results
const profileModal = modals[0];
const placeModal = modals[1];
const photoModal = modals[2];

modals.forEach((modal) => {
  //Close all modals on page loading
  modal.classList.remove("popup_opened");
  //Look for event to close photo modal
  modal.addEventListener("click", handleModalsClick);
});

function handleModalsClick(event) {
  if (
    event.target.classList.contains("img_button_close") ||
    event.target.classList.contains("popup")
  ) {
    event.target.closest(".popup").classList.remove("popup_opened");
  }
}
