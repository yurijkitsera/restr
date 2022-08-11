import { createHTML } from './HTML.js';

export const Fetch = async (URL, type, arr, header = false ) => {
    const block = document.querySelector('.search');
    
    if ( !document.querySelector('.spinner') ) {

        block.insertAdjacentHTML(
            'beforeend',
            `<svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>`
        );
    }

    const __Fetch = async (param) => {

        fetch(URL, param)
        .then(res => {

            return res.json();
        })
        .then(json => {
            
            if ( document.querySelector('.spinner') ) {

                document.querySelector('.spinner').remove();
            }
                
            createHTML( json, arr );
        });
    };

    if ( type === "GET" ) {

        await __Fetch({
            method: type
        });
    }

    if ( 
        type === "POST" &&
        header !== false
     ) {
        
        await __Fetch({
            method: type,
            body: JSON.stringify(header),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*', 
                'Access-Control-Allow-Credentials' : true 
            }
        });
    }
};
