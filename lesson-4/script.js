const text =document.querySelector('p').innerText;
console.log(text);

const  regexp = text.replace(/\B'/g, '"');

console.log(regexp);

document.querySelector('p').innerText = regexp;


class Form {
    form = null;

    constructor(selector) {
        this.form = document.querySelector(selector);
        this._init();
    }

    filterName(value){
        const block = document.querySelector('#name');
        const error = document.querySelector('.err-name');
        const regexp = /^[a-zа-яёЁ]+$/i;
        this._viewError(!regexp.test(value), block, error);
    }

    filterPhone (value){
        const block = document.querySelector('#phone');
        const error = document.querySelector('.err-phone');
        const regexp = /[+7(]\d{3}[)]\d{3}-\d{4}/;
        this._viewError(!regexp.test(value), block, error);
    }

    filterMail(value){
        const block = document.querySelector('#mail');
        const error = document.querySelector('.err-mail');
        const regexp = /^(.+)@([a-z]+\.[a-z]{2,3})$/i;
        this._viewError(!regexp.test(value), block, error)
    }

    _init(){
        document.querySelector('form').addEventListener('submit', e => {
            e.preventDefault();
            this.filterName(document.querySelector('#name').value);
            this.filterPhone(document.querySelector('#phone').value);
            this.filterMail(document.querySelector('#mail').value);
        })
    }

    _viewError(test, block, error){
        if (test){
            block.classList.add('red');
            error.classList.remove('hidden');
        } else {
            block.classList.remove('red');
            error.classList.add('hidden');
        }
    }

}

const form = new Form('form');