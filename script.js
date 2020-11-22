let popup = document.querySelector('.popup');

//Открытие popup
let editButton = document.querySelector('.profile__edit-btn');

function popupOpened () {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpened);

//Закрытие popup
let closeButton = document.querySelector('.popup__close-btn');

function popupClosed() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClosed);

//Сохранение значения popup
let submitButton = document.querySelector('.popup__submit-btn');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let inputName = document.querySelector('.input__name');
let inputJob = document.querySelector('.input__job');


function popupSubmit() {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupClosed();
}

submitButton.addEventListener('click', popupSubmit);