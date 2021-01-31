import {openPopup} from './script.js';

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.card-template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__img').src = this._link;
        this._element.querySelector('.element__img').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt); 
        });

        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });

        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._handlePhotoClick(this._element.src, this._element.alt);
        });
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like')
            .classList.toggle('element__like_active');
    }

    _handleTrashClick() {
        this._element.closest('.element').remove();
    }

    _handlePhotoClick() {
        const popupPhoto = document.querySelector('.popup-photo');
        const popupTitle = popupPhoto.querySelector('.popup__caption');
        const popupImage = popupPhoto.querySelector('.popup__image');

        popupImage.src = this._link;
        popupTitle.textContent = this._name;
        popupImage.alt = this._name;
        openPopup(popupPhoto);
    }

}