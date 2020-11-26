let popup = document.querySelector('.popup');

let editButton = document.querySelector('.profile__edit-btn');

let closeButton = document.querySelector('.popup__close-btn');

let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
    
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
//Открытие popup

function openedPopup () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

//Закрытие popup
function closedPopup() {
    popup.classList.remove('popup_opened');
}

//Сохранение значения popup
function formSubmitHandler (evt) {
    evt.preventDefault(); //Отмена стандартной отправки формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closedPopup();
}

editButton.addEventListener('click', openedPopup);
closeButton.addEventListener('click', closedPopup);
// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler); 