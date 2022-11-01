var app = new Vue({
  el: '#app',
  data: {
    name: '',
    lastname: ''
  },
})

// 1) пример отображения текста на странице, введенного в инпут, на Vue.js
// реализовано с помощью директивы v-model , добавленной в разметку html
// 2) пример отображения текста на странице, введенного в инпут, на нативном JS
/** чтобы передать метод экземпляра класса как callback при добавлении addEventListener,
нужно использовать привязку контекста. Иначе this будет ссылаться на событие, а не на свойства класса **/
class displayTextInput {
  constructor(elementInputId, elementForDisplayTextId) {
    this.elementInput = document.getElementById(elementInputId);
    this.elementForDisplayText = document.getElementById(elementForDisplayTextId);
  }

  passTextFromInputToElement() {
    this.elementForDisplayText.innerText = this.elementInput.value;
  }

  passTextFromInputToElementBindContext = this.passTextFromInputToElement.bind(this);

  addListenerInput() {
    this.elementInput.addEventListener('input', this.passTextFromInputToElementBindContext);
  }
  addListenerInputBindContext = this.addListenerInput.bind(this);
}

const displayName = new displayTextInput('nameInp', 'nameStr');
const displayLastname = new displayTextInput('lastnameInp', 'lastnameStr');
displayName.addListenerInputBindContext();
displayLastname.addListenerInputBindContext();