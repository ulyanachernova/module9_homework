const pageNumber = document.querySelector('.input-number-first')
const limit = document.querySelector('.input-number-second')
const requestButton = document.querySelector('.button-picture')
const resultNode = document.querySelector('.result')

// отображаем последний успешный результат с картинками из localStorage
resultNode.innerHTML = localStorage.getItem('pictures')

// функция запроса  данных:
function useRequest(url, cb) {
    fetch(url)
        .then((response) => {
            const result = response.json();
            console.log('result', result);
            return result;
        })
        .then((data) => {
            console.log(data);
            if (cb) {
                cb(data);
            }
        })
        .catch(error => {
            console.log('error')
        })
}
 // Функция обработки полученного результата
function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
      <div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
      </div>
    `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
    localStorage.setItem('pictures', cards)
}

requestButton.addEventListener('click', letResult);

// функция вывода результата при нажатии:
function letResult() {
    if (pageNumber.value >= 1 && pageNumber.value <= 10) {
        if (limit.value >= 1 && limit.value <= 10) {
            useRequest(`https://picsum.photos/v2/list?page=${pageNumber.value}&limit=${limit.value}`, displayResult)
        } else resultNode.innerHTML = `<p>Лимит вне диапазона от 1 до 10</p>`
    } else if (limit.value >= 1 && limit.value <= 10) {
        resultNode.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10</p>`
    } else resultNode.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`
}




