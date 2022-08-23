import { createHTML } from './HTML.js';

export const Fetch = async (URL, type, arr, header = false ) => {
    const block = document.querySelector('.search'),
        controller = new AbortController();
    
    if ( !document.querySelector('.spinner') ) {

        block.insertAdjacentHTML(
            'beforeend',
            `<svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>`
        );
    }

    setTimeout(() => controller.abort(), 30000);

    const __spinnerStop = () => {
        if ( document.querySelector('.spinner') ) {
    
            document.querySelector('.spinner').remove();
        }
    };
    
    const __Fetch = async (param) => {
        try {
            await fetch(URL, param)
            .then(res => {
    
                return res.json();
            })
            .then(json => {
                
                __spinnerStop();  
                return createHTML( json, arr );
            });
        } catch(err) {
            if (err.name == 'AbortError') { // обработать ошибку от вызова abort()

                __spinnerStop();  

                return createHTML( { status: "fail", result: 'Час очікування минув, повторіть спробу' }, arr );
            } else {
                throw err;
            }
        }
    };

    if ( type === "GET" ) {
        
        await __Fetch({
            method: type,
            signal: controller.signal
        });

        header = false;
    }

    if ( 
        type === "POST" &&
        header !== false
     ) {
        
        await __Fetch({
            method: type,
            body: JSON.stringify(header),
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*', 
                'Access-Control-Allow-Credentials' : true 
            }
        });
    }
};
