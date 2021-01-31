export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButton = form.querySelector(this._config.submitButtonSelector);
    }

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    }

    hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputInvalidClass);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this.hideError(input);
        } else {
            this._showError(input);
        }
    }

    _setButtonState(isValid) {
        if (isValid) {
            this._submitButton.classList.remove(this._config.buttonInvalidClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.buttonInvalidClass);
            this._submitButton.disabled = true;
        }
    }

    _setEventListener() {
        const inputList = this._form.querySelectorAll(this._config.inputSelector);
    
        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(this._form.checkValidity());
            })
        });
    }

    enableValidation() {
    this._setEventListener();

    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    this._setButtonState(this._form.checkValidity());
    }
}