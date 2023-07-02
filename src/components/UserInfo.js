export default class UserInfo {
  constructor({ nameSelector, workSelector }) {
    this.nameSelector = document.querySelector(nameSelector);
    this.workSelector = document.querySelector(workSelector);
  }
  //returns an object with user data
  getUserInfo() {
    const userData = {};
    userData.name = this.nameSelector.textContent;
    userData.work = this.workSelector.textContent;
    return userData;
  }
  //get new user data and insert on page
  setUserInfo({ nameInputClass, workInputClass }) {
    this.userInfo = this.getUserInfo();

    this.userInfo.name = document.querySelector(nameInputClass).value;
    this.userInfo.work = document.querySelector(workInputClass).value;

    this.nameSelector.textContent = this.userInfo.name;
    this.workSelector.textContent = this.userInfo.work;
  }
}
