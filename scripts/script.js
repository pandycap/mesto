const popupEdit = document.querySelector('.popup-edit');
const popupPlace = document.querySelector('.popup-place');
const popupImage = document.querySelector('.popup-photo');

const imageElement = document.querySelector('.element__img');
const titleElement = document.querySelector('.element__title');

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

const popupFullsizeImage = document.querySelector('.popup__image');
const popupFullsizeTitle = document.querySelector('.popup__caption');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('.card-template');

const openedImage = (name, link) => {
    openedPopupImage();
    const popupTitle = popupImage.querySelector('.popup__caption');
    const popupPhoto = popupImage.querySelector('.popup__image');
    popupTitle.textContent = name;
    popupPhoto.src = link;
    popupPhoto.alt = name;
};
//создание списка массивов из начального, добавление в контейнер по отдельности
function renderList() {
    const listItems = initialCards.map(composeCard);
    cardsContainer.append(...listItems);
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
        const EventTarget = evt.target.closest('.element__like');
        EventTarget.classList.toggle('element__like_active');
    });
    trashButton.addEventListener('click', (evt) => { //удаление карточки
        evt.target.closest('.element').remove(); 
    });
    imageCard.addEventListener('click', () => {
        popupFullsizeTitle.textContent = titleCard.textContent;
        popupFullsizeImage.src = imageCard.src;
        popupImage.classList.add('popup_opened');
    });
    return newItem;
};

//добавление новой карточки
function addNewCard() {
    const newCardName = placeInput.value;
    const newCardImage = urlInput.value;
    const newCard = composeCard({name: newCardName, link: newCardImage});
    cardsContainer.prepend(newCard);
};

function openedPopupEdit () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupEdit.classList.add('popup_opened');
};

function openedPopupPlace () {
    popupPlace.classList.add('popup_opened');
};

function closedPopup(popup) {
    popup.classList.remove('popup_opened');
};

//Сохранение значения popup профиля
function formSubmitProfile (evt) {
    evt.preventDefault(); //Отмена стандартной отправки формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closedPopup(popupEdit);
};

//Сохранение новой карточки
function formSubmitCard (evt) {
    evt.preventDefault(); //Отмена стандартной отправки формы
    addNewCard();
    placeInput.value = '';
    urlInput.value = '';
    closedPopup(popupPlace);
};

editButton.addEventListener('click', openedPopupEdit);
addButton.addEventListener('click', openedPopupPlace);
closeButtonEdit.addEventListener('click', () => {
    closedPopup(popupEdit);
});
closeButtonPlace.addEventListener('click', () => {
    closedPopup(popupPlace);
});
closeButtonImage.addEventListener('click', () => {
    closedPopup(popupImage);
});
formProfile.addEventListener('submit', formSubmitProfile);
formCard.addEventListener('submit', formSubmitCard);
renderList();