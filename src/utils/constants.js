//class selector to be used with UserInfo class
const selectors = {
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  imgAvatar: ".img_avatar",
  nameInputClass: ".popup__input_type_name",
  aboutInputClass: ".popup__input_type_about",
  editBtn: ".button_edit",
  addBtn: ".button_add",
  pencilIcon: ".img_button_edit",
  plusIcon: ".img_button_add",
  btnSave: ".button_save",
  btnHidde: "button_hidde",
  imgHide: "img_hide",
  skeleton: "skeleton",
  skeletonAvatar: "skeleton_avatar",
  skeletonTitle: "skeleton_title",
  skeletonSubtitle: "skeleton_subtitle",
  loading: "loading",
  spinnerModal: "#modal-loading",
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
  likes: "cards/likes",
  changeAvatar: "users/me/avatar",
};

export { selectors, formsConfig, urlPaths };
