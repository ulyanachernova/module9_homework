const enterFirstNumber = document.querySelector('.input-number-first')
const enterSecondNumber = document.querySelector('.input-number-second')
const buttonResult = document.querySelector('.button-picture')
const resultNode = document.querySelector('.result')

// функция запроса  данных:
function useRequest(url, cb) {
    fetch(url)
        .then((response) => {
            const result = response.json();
            if (cb) {
                cb(result);
            }
        })
        .catch(error => {
            console.log('error')
        })
}

// функция отображения данных:
function displayResult() {
    let card = '';
    const newImg =
    `<img
        src="https://picsum.photos/${enterFirstNumber.value}/${enterSecondNumber.value}"
        class="card-image"
    />`
    card = card + newImg;
    resultNode.innerHTML = card;
}

buttonResult.addEventListener('click', letResult);

// функция вывода результата при нажатии:
function letResult() {
    if (enterFirstNumber.value >= 100 && enterFirstNumber.value <= 300
        && enterSecondNumber.value >= 100 && enterSecondNumber.value <= 300) {
            useRequest(`https://picsum.photos/${enterFirstNumber.value}/${enterSecondNumber.value}`, displayResult)
        } else resultNode.innerHTML = `<p>одно из чисел вне диапазона от 100 до 300</p>`
}
