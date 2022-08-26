export const createHTML = async (obj, arr) => {
    const block = document.querySelector(arr[0]),
        elem = document.querySelector(arr[1][0]),
        err = document.querySelector('.error__block');

    const __Error = () => {
        if (document.querySelector('.error')) {

            err.innerHTML = "";
        }
        if (obj.status === "fail") {

            return err.innerHTML = `<div class="error">${obj.result}</div>`;
        }
    }

    if (arr[1][0] === 'tbody') {
        if (elem.childNodes.length !== 0) {

            elem.innerHTML = "";
        }

        __Error();

        for (let i in obj.result) {

            if (
                obj.result[i].PRODUCT === "MORTGAGE" ||
                obj.result[i].PRODUCT === "CARLOAN"
            ) {

                // err.innerHTML = '';

                elem.innerHTML += `
                    <tr class="table-tr">
                        <td class="table-td">${obj.result[i].NAME_CLIENT}</td>
                        <td class="table-td">${obj.result[i].PRODUCT}</td>
                        <td class="table-td">${obj.result[i].REF}</td>
                        <td class="table-td"><button class="table-btn btn">Далі</button></td>
                    </tr>
                `;
            }
        };
    }

    if (arr[1][0] === '.detail-list') {

        document.querySelector('.search').classList.add('hidden');

        if (obj.status === "fail") {

            document.querySelector('.detail-sheme').classList.add('hidden');

            __Error();
        } else {
            let objects = obj.r[0].RestructCredHolidays[0];

            if (document.querySelector(".detail-list__info")) {

                document.querySelector(arr[1][0]).innerHTML = "";
                document.querySelector(arr[1][1]).innerHTML = "";
            }

            document.querySelector(arr[1][0]).insertAdjacentHTML('afterbegin',
                `
                    <li class="detail-list__item">ПІБ клієнта:
                        <span class="detail-list__info">${arr[3]}</span>
                    </li>
                    <li class="detail-list__item">ID:
                        <span class="detail-list__info">${objects.clientid}</span>
                    </li>
                    <li class="detail-list__item">Тип:
                        <span class="detail-list__info">${arr[2]}</span>
                    </li>
                    <li class="detail-list__item">Реферес угоди:
                        <span class="detail-list__info ref">${objects.ref}</span>
                    </li>
                `
            );
            if (objects.status !== 'fail') {
                document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
                    `
            <div class="block-input main-block">
                <div class="custom-radio">
                    <label>
                        <input type="radio" name="radio">
                        <div class="custom-radio__label">
                        для України / ВПО (за замовчуванням) - схема<span class="number-sheme">1</span>
                        </div>
                    </label>
                </div>
                <div class="custom-radio">
                <label>
                    <input type="radio" name="radio">
                    <div class="custom-radio__label">
                    окупація / за кордоном (за замовчуванням) - схема<span class="number-sheme">4</span>
                    </div>
                </label>
            </div>
            </div>
        `
                );
            } else {
                document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
                    `
        <div class="block-input main-block">
            <div class="custom-radio">
                    <div class="custom-radio__label">Реструктуризація недоступна &#128532</div>
            </div>
    
        </div>
        </div>
    `
                );
            }
            if (objects.ua >= "5") {
                document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
                    `
                        <div class="block-input">
                            <div class="custom-radio">
                                <label>
                                    <input type="radio" name="radio">
                                    <div class="custom-radio__label">
                                        для України - схема<span class="number-sheme">2</span>
                                    </div>
                                </label>
                            </div>
                            <div class="custom-radio">
                                <label>
                                    <input type="radio" name="radio">
                                    <div class="custom-radio__label">
                                    для України - схема<span class="number-sheme">3</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        </div>
                    `
                );
            }


            if (objects.ua < "5") {
                document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
                    `
                        <div class="block-input">
                            <div class="custom-radio">
                                <label>
                                    <input type="radio" name="radio">
                                    <div class="custom-radio__label">
                                        для України - схема<span class="number-sheme">${objects.ua}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        </div>
                    `
                );

            }

            if (objects.idp >= "5") {
                document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
                    `
                       <div class="block-input">
                           <div class="custom-radio">
                               <label>
                                   <input type="radio" name="radio">
                                   <div class="custom-radio__label">
                                       для ВПО - схема<span class="number-sheme">2</span>
                                   </div>
                               </label>
                           </div>
                           <div class="custom-radio">
                               <label>
                                   <input type="radio" name="radio">
                                   <div class="custom-radio__label">
                                   для ВПО - схема<span class="number-sheme">4</span>
                                   </div>
                               </label>
                           </div>
                       </div>
                       </div>
                   `
                );
            }


            if (objects.idp < "5") {
                document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
                    `
                        <div class="block-input">
                            <div class="custom-radio">
                                <label>
                                    <input type="radio" name="radio">
                                    <div class="custom-radio__label">
                                        для ВПО - схема<span class="number-sheme">${objects.idp}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        </div>
                    `
                );

            }

        }
    }

    if (arr[1][0] === '.finish-tickets__block') {

        document.querySelector('.detail').classList.add('hidden');

        __Error();

        document.querySelector(arr[1][0]).insertAdjacentHTML('beforeend',
            `
                <div class="finish-ticket">Тікет <span class="ticket">${obj.result}</span></div>
            `
        );
    }

    block.classList.remove('hidden');
};