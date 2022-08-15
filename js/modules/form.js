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
        const inp = document.querySelector('.search-form__input');

        inp.addEventListener('input', (e) => {
            const values = inp.value;

            if ( 
                values.length >= 4 &&
                !/\W|[a-zA-Z_]/.test(values)
            ) {

                if ( btn.hasAttribute('disabled') ) {

                    btn.removeAttribute('disabled');
                }
            } else {
                if ( !btn.hasAttribute('disabled') ) {

                    btn.setAttribute('disabled', false);
                }
            }
        });

        btn.addEventListener('click' , (e) => {

            e.preventDefault();
    
            //Юра сюда ставишь это option.url + inp.value
            // console.log(option.url + inp.value);
            Fetch(option.url + inp.value, option.type, [option.blockEl, option.content]);
            
            inp.value = '';
            btn.setAttribute('disabled', false);
        });
    };

    if ( btn.classList[0] === 'table-btn' ) {
       
        //Юра сюда ставишь это option.url + btn.parentElement.previousElementSibling.innerText
        // console.log(option.url + btn.parentElement.previousElementSibling.innerText);
        Fetch(option.url + btn.parentElement.previousElementSibling.innerText, option.type, [option.blockEl, option.content, btn.parentElement.previousElementSibling.previousElementSibling.innerText, btn.parentElement.parentElement.firstElementChild.innerText]);    
    }
 
    if ( btn.classList[0] === 'detail-form_btn' ) {
        const __numScheme = ( returns = false ) => {
            const el = document.querySelectorAll('[type="radio"]');

            for ( let i of el ) {
                if ( !i.checked ) continue;

                if ( btn.hasAttribute('disabled') ) {

                    btn.removeAttribute('disabled');
                }

                if ( returns ) {

                    return i.nextElementSibling.lastElementChild.innerText;
                }
            };
        };

        const __funClick = (e) => {
            const header = {
                clientId: document.querySelectorAll('.detail-list__info')[1].innerText,
                ref: document.querySelectorAll('.detail-list__info')[3].innerText,
                numshem: __numScheme( true )
            };
            
            e.preventDefault();

            //Юра сюда ставишь это option.url
            // console.log(option.url, header);
            Fetch(option.url, option.type, [option.blockEl, option.content], header);   

            btn.setAttribute('disabled', false);
        };
    
        __numScheme();

        btn.addEventListener('click' , (e) => __funClick(e), {once: true});
    }

    if ( btn.classList[0] === 'finish-btn' ) {
        
        btn.addEventListener('click' , (e) => {

            option.content[0].classList.remove('hidden');
            option.content[0].querySelector('.result').classList.add('hidden');
            option.content[0].querySelector('tbody').innerHTML = "";
            option.content[1].querySelector('.detail-list').innerHTML = "";
            option.content[1].querySelector('.detail-form>div').innerHTML = "";
            option.content[2].classList.add('hidden');
            option.content[2].querySelector('.finish-tickets__block').innerHTML = "";

        });
    }
};

