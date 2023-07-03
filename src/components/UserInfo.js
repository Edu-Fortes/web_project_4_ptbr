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
  setUserInfo({ nameInputClass, workInputClass }) {
    this.userInfo = this.getUserInfo();

    this.userInfo.name = document.querySelector(nameInputClass).value;
    this.userInfo.work = document.querySelector(workInputClass).value;

    this.nameSelector.textContent = this.userInfo.name;
    this.aboutSelector.textContent = this.userInfo.work;
  }
}
