import { Form } from './modules/form.js';



const obj = {
    tableBlock: document.querySelector('.table'),
    backBtn: document.querySelector('.back-result__block'),
    searchBlock: document.querySelector('.search'),
    detailBlock: document.querySelector('.detail'),
    finishBlock: document.querySelector('.finish'),
    removeBlock: document.querySelectorAll(['.detail-list', '.detail-form>div', '.error__block'])
};

// https://0-1066-0.app.nr.it.loc/search?id= ../test__json/json_1.json error json_error.json
await Form({
    butEl: '.search-form__button',
    url: 'https://0-1066-0.app.nr.it.loc/search?id=',
    type: 'GET',
    blockEl: '.result',
    content: ['tbody']
});

obj.tableBlock.addEventListener('click', (e) => {
    if (e.target.matches('.table .table-btn')) {
        let nodes = [].slice.call(document.querySelectorAll('.table .table-btn'));
        
        // https://0-1066-0.app.nr.it.loc/ref?ref= ../test__json/json_2.json error json_error.json
        Form({
            butEl: `.${e.target.classList[0]}`,
            num: nodes.indexOf(e.target),
            url: 'https://0-1066-0.app.nr.it.loc/ref?ref=',
            type: 'GET',
            blockEl: '.detail',
            content: ['.detail-list', '.detail-form>div']
        });
    }
});

obj.backBtn.addEventListener('click', (e) => {

    obj.searchBlock.classList.remove('hidden');
    obj.detailBlock.classList.add('hidden');

    for (let block of obj.removeBlock) {

        block.innerHTML = '';
    }
});

// https://0-1066-0.app.nr.it.loc/addprotocol , type: 'POST' test 'GET' ../test__json/json_3.json
obj.detailBlock.addEventListener('click', (e) => {
    if (e.target.matches('.detail [type="radio"]')) {
        
        Form({
            butEl: '.detail-form_btn',
            url: 'https://0-1066-0.app.nr.it.loc/addprotocol',
            type: 'POST',
            blockEl: '.finish',
            content: ['.finish-tickets__block']
        });
    }
});

await Form({
    butEl: '.finish-btn',
    blockEl: '.search',
    content: [obj.searchBlock, obj.detailBlock, obj.finishBlock]
});
