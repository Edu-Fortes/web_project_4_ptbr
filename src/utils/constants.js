//class selector to be used with UserInfo class
const selectors = {
  nameSelector: ".profile__title",
  workSelector: ".profile__subtitle",
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
  user: "users/me",
  cards: "cards",
};

export { selectors, formsConfig, urlPaths };
