export default class ToggleClass {
  constructor(element) {
    this.element = document.querySelector(element);
  }

  show() {
    this.element.classList.add('active');
    this.element.classList.remove('inactive');
  }

  hide() {
    this.element.classList.remove('active');
    this.element.classList.add('inactive');
  }
}