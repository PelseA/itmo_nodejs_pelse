import './style.css'
import InvoicePositionVO from "./src/model/vos/InvoicePositionVO.js";
import InvoicePositionView from "./src/view/InvoicePositionView.js";
import InputValidator from "./src/utils/InputValidator.js";

const domInputInvoiceNumber = document.getElementById('inputInvoiceNumber');
const domInputServicesList = document.getElementById('inputServicesList');
const domInputServiceCost = document.getElementById('inputServiceCost');
const domInputServiceQty = document.getElementById('inputServiceQty');
const domBtnAddItem = document.getElementById('addItem');
const domListOfTodos = document.getElementById('listOfTodos');
const domServicesList = document.getElementById('inputServicesList');

domBtnAddItem.addEventListener('click', onBtnAddItem);
domInputInvoiceNumber.addEventListener('change', onInvoiceNumberEnter);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const localListOfTodos = localStorage.getItem(LOCAL_LIST_OF_TODOS);
const listOfTodos = localListOfTodos != null ? JSON.parse(localListOfTodos) : [];

console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);

function onInvoiceNumberEnter() {
    let val = this.value;
    if (!InputValidator.isNumberUpAndIncluding9999(val)) {
        this.value = '';
        const validateMessage = 'номер счета от 1 до 9999';
        //функциб можно переиспользовать!
        //toggleValidateMessageNearInput() {}
        //обработка текущего инпута
        //this.style.border="1px solid #FF0000";
        //передача сообщения-валидации
        //отрисовка html элемента над или под инпутом
        //эта же функция должна отключать подсказки при новом фокусе на инпуте
        //TODO добавить текст-подсказку "номер платежного документа от 1 до 9999"
    }
}

function onBtnCreateTodoClick(event) {
    // console.log('> domBtnCreateTodo -> handle(click)', event);
    const todoTitleValueFromDomInput = domInpTodoTitle.value;
    // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);
    if (validateTodoInputTitleValue(todoTitleValueFromDomInput)) {
        listOfTodos.push(createTodoVO(todoTitleValueFromDomInput));
        localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
        renderTodoListInContainer(listOfTodos, domListOfTodos);
    }
}
function onBtnAddItem(event) {
    let nextDataOrderNumber = getLastDataOrderNum();
    const oneItem = InvoicePositionView.getNewItemHTML(nextDataOrderNumber);
    let div = document.createElement('div');
    div.innerHTML = oneItem;
    return domServicesList.appendChild(div);
}

function getLastDataOrderNum() {
    let dataOrderNumbersArr = document.querySelectorAll("input[data-order-number]");
    return dataOrderNumbersArr.length + 1;
}

function renderItemRow(list, container) {
    let output = '';
    let item;
    for (let index in list) {
        item = list[index];
        output += `<li>${item.title}</li>`;
    }
    container.innerHTML = output;
}

function validateTodoInputTitleValue(value) {
    const isInputValueString = typeof value === 'string';
    const isInputValeNotNumber = isNaN(parseInt(value));

    const result = isInputValueString && isInputValeNotNumber && value.length > 0;

    console.log('> validateTodoInputTitleValue -> result', {
        result,
        isInputValueString,
        isInputValeNotNumber,
    });
    return result;
}

function createTodoVO(title) {
    const todoId = Date.now().toString();
    return new TodoVO(todoId, title);
}

function renderTodoListInContainer(list, container) {
    let output = '';
    let item;
    for (let index in list) {
        item = list[index];
        output += `<li>${item.title}</li>`;
    }
    container.innerHTML = output;
}


/*
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
*/

