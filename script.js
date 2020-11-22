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
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault(); //Отмена стандартной отправки формы

    let nameInput = formElement.querySelector('.input__type_name');
    let jobInput = formElement.querySelector('.input__type_job');
    
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClosed();
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler); 