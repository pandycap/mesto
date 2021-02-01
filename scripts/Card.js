export class Card {
    constructor(name, link, cardTemplate, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate) 
            .content 
            .querySelector('.element') 
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__img');
        this._cardLike = this._element.querySelector('.element__like');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', (evt) => {
            this._handleLikeClick(evt); 
        });

        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _handleLikeClick() {
        this._cardLike.classList.toggle('element__like_active');
    }

    _handleTrashClick() {
        this._element.closest('.element').remove();
    }

}