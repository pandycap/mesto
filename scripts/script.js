const popupEdit = document.querySelector('.popup-edit');
const popupPlace = document.querySelector('.popup-place');
const popupPhoto = document.querySelector('.popup-photo');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const closeButton = document.querySelector('.popup__close-btn');
const closeButtonPlace = document.querySelector('.popup__close-btn_place');
const closeButtonEdit = document.querySelector('.popup__close-btn_edit');
const closeButtonImage = document.querySelector('.popup__close-btn_image');

const formElement = document.querySelector('.popup__form');

const formProfile = document.querySelector('.popup__form_profile');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_job');

const formCard = document.querySelector('.popup__form_card');
const placeInput = formCard.querySelector('.popup__input_type_place');
const urlInput = formCard.querySelector('.popup__input_type_url');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupTitle = popupPhoto.querySelector('.popup__caption');
const popupImage = popupPhoto.querySelector('.popup__image');

const cardsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('.card-template');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closingWithOverlay);
    document.addEventListener('keydown', closingWithEsc);
};

function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
};

const openImagePopup = (name, link) => {
    popupImage.src = link;
    popupTitle.textContent = name;
    popupImage.alt = name;
    openPopup(popupPhoto);
};

function closingWithOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) { 
        const popupIsActive = document.querySelector('.popup_opened'); 
        closePopup(popupIsActive); 
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

//формирование карточки
function composeCard(item) {
    const newItem = templateCard.content.cloneNode(true);
    const imageCard = newItem.querySelector('.element__img');
    const titleCard = newItem.querySelector('.element__title');
    const likeButton = newItem.querySelector('.element__like');
    const trashButton = newItem.querySelector('.element__trash');
    imageCard.src = item.link;
    imageCard.alt = item.name;
    titleCard.textContent = item.name;
    likeButton.addEventListener('click', (evt) => { //"включение/выключение" лайка
        const eventTarget = evt.target.closest('.element__like');
        eventTarget.classList.toggle('element__like_active');
    });
    trashButton.addEventListener('click', (evt) => { //удаление карточки
        evt.target.closest('.element').remove();
    });
    imageCard.addEventListener('click', () => {
        openImagePopup(titleCard.textContent, imageCard.src);
    });
    return newItem;
};

//создание списка массивов из начального, добавление в контейнер по отдельности
function renderList() {
    const listItems = initialCards.map(composeCard);
    cardsContainer.append(...listItems);
};

//добавление новой карточки
function addNewCard() {
    const newCardName = placeInput.value;
    const newCardImage = urlInput.value;
    const newCard = composeCard({
        name: newCardName,
        link: newCardImage
    });
    cardsContainer.prepend(newCard);
};

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
    const submitButton = formProfile.querySelector('.popup__submit-btn');
    setButtonState(submitButton, formProfile.checkValidity(), validationConfig);
    hideError(formProfile, nameInput, validationConfig);
    hideError(formProfile, jobInput, validationConfig);
});
addButton.addEventListener('click', () => {
    openPopup(popupPlace);
    const submitButton = formCard.querySelector('.popup__submit-btn');
    setButtonState(submitButton, formCard.checkValidity(), validationConfig);
});
closeButtonEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});
closeButtonPlace.addEventListener('click', () => {
    closePopup(popupPlace);
});
closeButtonImage.addEventListener('click', () => {
    closePopup(popupPhoto);
});
formProfile.addEventListener('submit', formSubmitProfile);
formCard.addEventListener('submit', formSubmitCard);
renderList();