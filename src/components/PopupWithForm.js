import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._buttonSubmit = this._form.querySelector('.popup__button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
    this.renderLoading = this.renderLoading.bind(this);
  }

  _getInputValues(){
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close(){
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading, loadingText='Сохранение...'){
    if (isLoading){
      this._buttonSubmit.textContent = loadingText;
    }
    else{
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}