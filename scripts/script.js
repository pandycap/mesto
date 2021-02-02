import {initialCards} from './initial-cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inputInvalidClass: 'popup__input_state_invalid',
    buttonInvalidClass: 'popup__submit-btn_invalid', 
};

const popupEdit = document.querySelector('.popup-edit');
const popupPlace = document.querySelector('.popup-place');
const popupPhoto = document.querySelector('.popup-photo');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const formProfile = document.querySelector('.popup__form_profile');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_job');

const formCard = document.querySelector('.popup__form_card');
const placeInput = formCard.querySelector('.popup__input_type_place');
const urlInput = formCard.querySelector('.popup__input_type_url');

const popupImage = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const cardsContainer = document.querySelector('.elements');

const profileEditValidate = new FormValidator(validationConfig, formProfile);
profileEditValidate.enableValidation();

const addNewCardValidate = new FormValidator(validationConfig, formCard);
addNewCardValidate.enableValidation();

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closingWithOverlay);
    document.addEventListener('keydown', closingWithEsc);
};

function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
};

function handleCardClick (name, link) {
    popupImage.src = link;
    popupCaption.textContent = name;
    openPopup(popupPhoto);
};

function closingWithOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    } 

    if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(evt.target.closest('.popup'));
    }
};

function closingWithEsc(evt) {
    if (evt.key === 'Escape') {
        const popupIsActive = document.querySelector('.popup_opened');
        closePopup(popupIsActive);
    }
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', closingWithOverlay);
    document.removeEventListener('keydown', closingWithEsc);
};

//создание карточки
function createCard(data) {
    const card = new Card(data.name, data.link, '.card-template', handleCardClick);
    return card.generateCard();
}

//добавление карточки из массива
initialCards.forEach((data) => {
    const cardElement = createCard(data);
    cardsContainer.append(cardElement);
});

//добавление новой карточки
function addNewCard() {
    const cardElement = createCard({name: placeInput.value, link: urlInput.value});
    cardsContainer.prepend(cardElement);
}

//Сохранение значения popup профиля
function formSubmitProfile(evt) {
    evt.preventDefault(); //Отмена стандартной отправки формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
};

//Сохранение новой карточки
function formSubmitCard(evt) {
    evt.preventDefault(); //Отмена стандартной отправки формы
    addNewCard();
    formCard.reset();
    closePopup(popupPlace);
};

editButton.addEventListener('click', () => {
    openEditPopup();
    profileEditValidate.resetValidation();
});
addButton.addEventListener('click', () => {
    openPopup(popupPlace);
    addNewCardValidate.resetValidation();
});

formProfile.addEventListener('submit', formSubmitProfile);
formCard.addEventListener('submit', formSubmitCard);
