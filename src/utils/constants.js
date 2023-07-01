//class selector to be used with UserInfo class
const selectors = {
  nameSelector: ".profile__title",
  workSelector: ".profile__subtitle",
  imgAvatar: ".img_avatar",
  skeleton: "skeleton",
  skeletonAvatar: "skeleton_avatar",
  skeletonTitle: "skeleton_title",
  skeletonSubtitle: "skeleton_subtitle",
};
//Forms Configuration Object contening CSS clases and selectors
const formsConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: `.button[type="submit"]`,
  inputErrorClass: "input_type_error",
  errorClass: "popup__error_visible",
  disableClass: "button_disabled",
};

const urlPaths = {
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_04",
  authorization: "f76476c9-9b53-4968-99fe-a8b4cbde5202",
  user: "users/me",
  cards: "cards",
};

export { selectors, formsConfig, urlPaths };
