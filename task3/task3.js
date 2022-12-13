
/* Функция, которая будет осуществлять запрос с помощью инструмента XHR: */
function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

const container = document.querySelector('.container');
/* Input, в который вводим число: */
const inputNumber = document.querySelector('.input-number');
/* Кнопка при нажатии на которую будет результат: */
const btnNumber = document.querySelector('.button-picture');
/* Сюда будет выводиться результат: */
const resultNode = document.querySelector('.result');
// console.log(inputNumber)
// console.log(btnNumber)

/* Функция получения результата: */
function displayResult(apiData) {
    let card = '';

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
        `;
        card = card + cardBlock;
        });
    resultNode.innerHTML = card;
}

/* Обработчик на кнопку запроса: */
btnNumber.addEventListener('click', letResult);

function letResult() {
    if (inputNumber.value > 0 && inputNumber.value <= 10) {
        useRequest(`https://picsum.photos/v2/list?limit=${inputNumber.value}`, displayResult)
    } else {
        resultNode.innerHTML = `<p>Число вне диапазона от 1 до 10!</p>`
    }
}








