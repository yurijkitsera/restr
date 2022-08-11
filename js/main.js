import { Form } from './modules/form.js';


//Юра сюда ставишь это `https://0-1066-0.nodered-t.it.loc/wresrta?id=${+inp.value}`
const obj = {
    tableBlock: document.querySelector('.table'),
    backBtn: document.querySelector('.back-result'),
    searchBlock: document.querySelector('.search'),
    detailBlock: document.querySelector('.detail'),
    finishBlock: document.querySelector('.finish'),
    removeBlock: document.querySelectorAll(['.detail-list', '.detail-form>div'])
};

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

        Form({
            butEl: `.${e.target.className}`,
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

await Form({
    butEl: '.detail-form_btn',
    url: 'https://0-1066-0.app.nr.it.loc/addprotocol',
    type: 'POST',
    blockEl: '.finish',
    content: ['.finish-list']
});

await Form({
    butEl: '.finish-btn',
    blockEl: '.search',
    content: [obj.searchBlock, obj.detailBlock, obj.finishBlock]
});
