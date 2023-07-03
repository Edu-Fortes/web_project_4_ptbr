export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this.nameSelector = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
  }
  //returns an object with user data
  getUserInfo() {
    const userData = {};
    userData.name = this.nameSelector.textContent;
    userData.about = this.aboutSelector.textContent;
    return userData;
  }
  //get new user data and insert on page
  setUserInfo({ nameInputClass, aboutInputClass }) {
    const newUser = {};

    newUser.name = document.querySelector(nameInputClass).value;
    newUser.about = document.querySelector(aboutInputClass).value;

    this.nameSelector.textContent = newUser.name;
    this.aboutSelector.textContent = newUser.about;
    return newUser;
  }
}
