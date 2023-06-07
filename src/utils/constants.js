const initialCards = [
  {
    name: "Grand Canyon",
    link: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
  {
    name: "Represa Hoover",
    link: "https://images.unsplash.com/photo-1546047090-bfd187e30781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Nova Iorque",
    link: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
  },
  {
    name: "California",
    link: "https://images.unsplash.com/photo-1562748544-21a0bd1a9a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Las Vegas",
    link: "https://images.unsplash.com/photo-1577334928618-2ff2bf09e827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "São Francisco",
    link: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];
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

export { initialCards, selectors, formsConfig };
