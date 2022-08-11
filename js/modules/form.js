import { Fetch } from './fetch.js';

export const Form = async (option) => {
    let btn;
    
    if ( option.num === undefined ) {

        btn = document.querySelector(option.butEl);
    } else {

        btn = document.querySelectorAll(option.butEl)[option.num];
    }
    
    if ( !btn ) return;
 
    if ( btn.classList[0] === 'search-form__button' ) {
        btn.addEventListener('click' , (e) => {
            let inp = document.querySelector('.search-form__input');
    
            e.preventDefault();
    
            if ( inp.value === "" ) return;
    
            //Юра сюда ставишь это option.url + inp.value
            console.log(option.url + inp.value);
            Fetch(option.url + inp.value, option.type, [option.blockEl, option.content]);
            
            inp.value = "";
        });
    };

    if ( btn.classList[0] === 'table-btn' ) {
       
        //Юра сюда ставишь это option.url + btn.parentElement.previousElementSibling.innerText
        console.log(option.url + btn.parentElement.previousElementSibling.innerText);
        Fetch(option.url + btn.parentElement.previousElementSibling.innerText, option.type, [option.blockEl, option.content, btn.parentElement.previousElementSibling.previousElementSibling.innerText, btn.parentElement.parentElement.firstElementChild.innerText]);    
    }
 
    if ( btn.classList[0] === 'detail-form_btn' ) {

        const __numScheme = () => {
            const el = document.querySelectorAll('[type="radio"]');

            for ( let i of el ) {
                if ( !i.checked ) continue; 
            
                return i.nextElementSibling.lastElementChild.innerText;
            };
        };

        btn.addEventListener('click' , (e) => {
            
            e.preventDefault();

            const header = {
                clientId: document.querySelectorAll('.detail-list__info')[1].innerText,
                ref: document.querySelectorAll('.detail-list__info')[3].innerText,
                numshem: __numScheme()
            };

            //Юра сюда ставишь это option.url
            console.log(option.url, header);
            Fetch(option.url, option.type, [option.blockEl, option.content], header);    
        });
    }

    if ( btn.classList[0] === 'finish-btn' ) {
        
        btn.addEventListener('click' , (e) => {

            option.content[0].classList.remove('hidden');
            option.content[0].querySelector('.result').classList.add('hidden');
            option.content[0].querySelector('tbody').innerHTML = "";
            option.content[1].querySelector('.detail-list').innerHTML = "";
            option.content[1].querySelector('.detail-form>div').innerHTML = "";
            option.content[2].classList.add('hidden');
            option.content[2].querySelector('.finish-ticket').remove();

        });
    }
};

