var app = new Vue({
    el: '#app',
    data: {
        name: '',
        lastname: ''
    },
})

const inputName = document.getElementById('nameInp');
const inputSurname = document.getElementById('lastnameInp');
const fullNameStr = document.getElementById('fullNameStr');
let stringFullName = 'Full name: ';
inputName.addEventListener('input', function(e) {
    //todo возвращение к прежнему инпуту
    // const regFullStr = /Full\sname:\s/i;
    fullNameStr.innerText = stringFullName + this.value;
});
inputName.addEventListener('change', function(e) {
    stringFullName = stringFullName + this.value + ' ';
    fullNameStr.innerText = stringFullName;
});
inputSurname.addEventListener('input', function (e) {
    fullNameStr.innerText = stringFullName + this.value;
});

