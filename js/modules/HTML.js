export const createHTML = async (obj, arr) => {
    const block = document.querySelector(arr[0]),
        elem = document.querySelector(arr[1][0]);

    if (arr[1][0] === 'tbody') {
        if (elem.childNodes.length !== 0) {

            elem.innerHTML = "";
        }

        if (obj.status === "fail") {

            return block.innerHTML = `
                <div>${obj.result}</div>
            `;
        }

        for (let i in obj.result) {

            if (
                obj.result[i].PRODUCT === "MORTGAGE" ||
                obj.result[i].PRODUCT === "CARLOAN"
            ) {

                elem.innerHTML += `
                    <tr class="table-tr">
                        <td class="table-td">${obj.result[i].NAME_CLIENT}</td>
                        <td class="table-td">${obj.result[i].PRODUCT}</td>
                        <td class="table-td">${obj.result[i].REF}</td>
                        <td class="table-td"><button class="table-btn">Далі</button></td>
                    </tr>
                `;
            }
        };
    }

    if (arr[1][0] === '.detail-list') {
        let objects = obj.r[0].RestructCredHolidays[0];

        document.querySelector('.search').classList.add('hidden');

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
                    <span class="detail-list__info">${objects.ref}</span>
                </li>
            `
        );

        document.querySelector(arr[1][1]).insertAdjacentHTML('afterbegin',
            `
                <div class="block-input">
                    <div class="custom-radio">
                        <label>
                            <input type="radio" name="radio">
                            <div class="custom-radio__label">
                                Для Украины схема<span class="number-sheme">${objects.ua}</span>
                            </div>
                        </label>
                    </div>
                    <div class="custom-radio">
                        <label>
                            <input type="radio" name="radio">
                            <div class="custom-radio__label">
                                Для ВПО схема<span class="number-sheme">${objects.idp}</span>
                            </div>
                        </label>
                    </div>
                    <div class="custom-radio">
                        <label>
                            <input type="radio" name="radio">
                            <div class="custom-radio__label">
                                Окупація/ за кордном<span class="number-sheme">4</span>
                            </div>
                        </label>
                    </div>
                </div>
            `
        );
    }

    if (arr[1][0] === '.finish-list') {

        document.querySelector('.detail').classList.add('hidden');

        if (obj.status === "fail") {

            return block.innerHTML = `
                <div>${obj.result}</div>
            `;
        }

        document.querySelector(arr[1][0]).insertAdjacentHTML('beforeend',
            `
                <div class="finish-ticket">Тікет <span class="ticket">${obj.result}</span></div>
            `
        );
    }

    block.classList.remove('hidden');
};