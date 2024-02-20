const button = document.querySelector('.navbar-toggler');
const navbarSupportedContent = document.getElementById('navbarSupportedContent');
const icons = document.querySelectorAll('.icons__link');
const carts = document.getElementsByClassName('icons__link--cart');
const bag = document.querySelector('.bag');
const closeMenu = document.getElementById('close-menu');
const bagClose = document.querySelector('.bag__close');
const background = document.querySelector('.background');
const filterLinks = document.getElementsByClassName('filter__link');
const itesFoxes = document.getElementsByClassName('ites__fox');
const foxLinks = document.getElementsByClassName('fox__link');
const filterInput = document.querySelector('.filter__input');
const bagPurchases = document.querySelector('.bag__purchases');
const purchaseMinuses = document.getElementsByClassName('purchase__minus');
const purchasePluses = document.getElementsByClassName('purchase__plus');
const purchaseRemoves = document.getElementsByClassName('purchase__remove');
const purchases = document.getElementsByClassName('purchase');
const bagPrice = document.querySelector('.bag__price');
const navbarLinkShop = document.querySelector('.navbar__link--shop');
const ites = document.querySelector('.content__ites');
const showFoxes = jsonObj => {
    for (let itemJson of jsonObj) {
        const fox = document.createElement('div');
        const foxImage = document.createElement('img');
        const foxDescription = document.createElement('div');
        const foxName = document.createElement('span');
        const foxPrice = document.createElement('span');
        const foxStars = document.createElement('span');
        const foxTag = document.createElement('span');
        const foxToAdd = document.createElement('div');
        const foxLink = document.createElement('a');
        const foxBackground = document.createElement('div');
        fox.classList.add('ites__fox');
        fox.classList.add('fox');
        fox.id = 'f' + itemJson["id"];
        foxImage.src = itemJson["src"];
        foxImage.alt = '';
        foxImage.classList.add('fox__image');
        foxDescription.classList.add('fox__description');
        foxName.classList.add('fox__name');
        foxName.innerHTML = itemJson["name"];
        foxPrice.classList.add('fox__price');
        foxPrice.innerHTML = '$' + itemJson["price"].toFixed(2);
        foxStars.classList.add('fox__stars');
        foxStars.innerHTML = '<svg width="82" height="15" viewBox="0 0 82 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M9.38749 5.72927L7.59433 0L5.80132 5.72927H0L4.69374 9.26996L2.90074 15L7.59433 11.4578L12.2881 15L10.4951 9.26996L15.1888 5.72927H9.38749Z" fill="#CC5520"/>\n' +
            '<path d="M26.5904 5.72927L24.7974 0L23.0042 5.72927H17.2029L21.8966 9.26996L20.1036 15L24.7974 11.4578L29.4911 15L27.6979 9.26996L32.3917 5.72927H26.5904Z" fill="#CC5520"/>\n' +
            '<path d="M43.793 5.72927L42 0L40.207 5.72927H34.4055L39.0993 9.26996L37.3063 15L42 11.4578L46.6937 15L44.9007 9.26996L49.5943 5.72927H43.793Z" fill="#CC5520"/>\n' +
            '<path d="M59.9957 5.72927L58.2027 0L56.4097 5.72927H50.6084L55.3021 9.26996L53.509 15L58.2027 11.4578L62.8965 15L61.1035 9.26996L65.7972 5.72927H59.9957Z" fill="#CC5520"/>\n' +
            '<path d="M74.4056 0L72.6125 5.72927H66.8112L71.5049 9.26996L69.7119 15L74.4056 11.4578L79.0992 15L77.3062 9.26996L82 5.72927H76.1986L74.4056 0Z" fill="#CC5520"/>\n' +
            '</svg>';
        foxTag.classList.add('fox__tag');
        foxTag.innerHTML = itemJson["tag"];
        foxToAdd.classList.add('fox__toadd');
        foxLink.classList.add('fox__link');
        foxLink.href = '#';
        foxLink.innerHTML = '<span class="fox__plus">+<br></span>Add';
        foxLink.addEventListener('click', event => {
            event.preventDefault();
            event.currentTarget.parentNode.querySelector('.fox__background').style.display = 'block';
            addToCart(jsonObj);
            setTotal();
        });
        foxBackground.classList.add('fox__background');
        ites.appendChild(fox);
        fox.appendChild(foxImage);
        fox.appendChild(foxDescription);
        foxDescription.appendChild(foxName);
        foxDescription.appendChild(foxPrice);
        fox.appendChild(foxToAdd);
        foxToAdd.appendChild(foxLink);
        foxToAdd.appendChild(foxBackground);
        foxDescription.appendChild(foxStars);
        foxDescription.appendChild(foxTag);
    }
    const itesButton = document.createElement('button');
    itesButton.classList.add('ites__button');
    itesButton.innerHTML = 'All foxes';
    ites.appendChild(itesButton);
}
const tosetCookies = () => {
    const into = JSON.parse(localStorage.getItem('purchases'));
    if (into) {
        return into;
    }
    return [];
}
let cookies = tosetCookies();
const tosetPurchases = currentObj => {
    const purchase = document.createElement('div');
    const purchaseCard = document.createElement('div');
    const purchaseImage = document.createElement('img');
    const purchaseDescription = document.createElement('div');
    const purchaseName = document.createElement('span');
    const purchasePrice = document.createElement('span');
    const purchaseControl = document.createElement('div');
    const purchaseSetCount = document.createElement('div');
    const purchaseMinus = document.createElement('a');
    const purchaseCount = document.createElement('span');
    const purchasePlus = document.createElement('a');
    const purchaseRemove = document.createElement('a');
    purchase.className = 'bag__purchase purchase';
    purchase.id = 'p' + currentObj.id;
    purchaseCard.className = 'purchase__card';
    purchaseImage.className = 'purchase__image';
    purchaseImage.src = currentObj.src;
    purchaseImage.alt = '';
    purchaseDescription.className = 'purchase__description';
    purchaseName.className = 'purchase__name';
    purchaseName.innerHTML = currentObj.name;
    purchasePrice.className = 'purchase__price';
    purchasePrice.innerHTML = '$' + currentObj.price.toFixed(2);
    purchaseControl.className = 'purchase__control';
    purchaseSetCount.className = 'purchase__set_count';
    purchaseMinus.className = 'purchase__minus';
    purchaseMinus.href = '#';
    purchaseMinus.innerHTML = '-';
    purchaseMinus.addEventListener('click', foxMinus);
    purchaseCount.className = 'purchase__count';
    purchaseCount.innerHTML = '1';
    purchasePlus.className = 'purchase__plus';
    purchasePlus.href = '#';
    purchasePlus.innerHTML = '+';
    purchasePlus.addEventListener('click', foxPlus);
    purchaseRemove.className = 'purchase__remove';
    purchaseRemove.href = '#';
    purchaseRemove.innerHTML = '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M20 0.5C9.22812 0.5 0.5 9.22812 0.5 20C0.5 30.7719 9.22812 39.5 20 39.5C30.7719 39.5 39.5 30.7719 39.5 20C39.5 9.22812 30.7719 0.5 20 0.5ZM24.9406 27.0594L20 22.1188L15.0594 27.0594C14.4781 27.6406 13.5219 27.6406 12.9406 27.0594C12.65 26.7687 12.5 26.3844 12.5 26C12.5 25.6156 12.65 25.2313 12.9406 24.9406L17.8812 20L12.9406 15.0594C12.65 14.7688 12.5 14.3844 12.5 14C12.5 13.6156 12.65 13.2312 12.9406 12.9406C13.5219 12.3594 14.4781 12.3594 15.0594 12.9406L20 17.8812L24.9406 12.9406C25.5219 12.3594 26.4781 12.3594 27.0594 12.9406C27.6406 13.5219 27.6406 14.4781 27.0594 15.0594L22.1188 20L27.0594 24.9406C27.6406 25.5219 27.6406 26.4781 27.0594 27.0594C26.4781 27.65 25.5219 27.65 24.9406 27.0594Z" fill="#8C8C8C"></path>\n' +
        '</svg><br>Remove';
    purchaseRemove.addEventListener('click', foxRemove);
    bagPurchases.appendChild(purchase);
    purchase.appendChild(purchaseCard);
    purchaseCard.appendChild(purchaseImage);
    purchaseCard.appendChild(purchaseDescription);
    purchaseDescription.appendChild(purchaseName);
    purchaseDescription.appendChild(purchasePrice);
    purchase.appendChild(purchaseControl);
    purchaseControl.appendChild(purchaseSetCount);
    purchaseSetCount.appendChild(purchaseMinus);
    purchaseSetCount.appendChild(purchaseCount);
    purchaseSetCount.appendChild(purchasePlus);
    purchaseControl.appendChild(purchaseRemove);
    cookies.push({data: currentObj, count: 1});
}
const addToCart = jsonObj => {
    let currentObj;
    for (let itemJson of jsonObj) {
        if (+event.currentTarget.parentNode.parentNode.id.slice(1) == itemJson["id"]) {
            currentObj = itemJson;
            break;
        }
    }
    if (cookies.length) {
        let flag = false;
        for (let cookie of cookies) {
            if (cookie.data.id == currentObj.id) {
                flag = true;
                document.getElementById('p' + currentObj.id).querySelector('.purchase__count').innerHTML++;
                cookie.count++;
                break;
            }
        }
        if (!flag) {
            tosetPurchases(currentObj);
        }
    }
    else {
        tosetPurchases(currentObj);
    }
    localStorage.setItem('purchases', JSON.stringify(cookies));
}
const showPurchases = () => {
    for (let cookie of cookies) {
        const purchase = document.createElement('div');
        const purchaseCard = document.createElement('div');
        const purchaseImage = document.createElement('img');
        const purchaseDescription = document.createElement('div');
        const purchaseName = document.createElement('span');
        const purchasePrice = document.createElement('span');
        const purchaseControl = document.createElement('div');
        const purchaseSetCount = document.createElement('div');
        const purchaseMinus = document.createElement('a');
        const purchaseCount = document.createElement('span');
        const purchasePlus = document.createElement('a');
        const purchaseRemove = document.createElement('a');
        purchase.className = 'bag__purchase purchase';
        purchase.id = 'p' + cookie.data.id;
        purchaseCard.className = 'purchase__card';
        purchaseImage.className = 'purchase__image';
        purchaseImage.src = cookie.data.src;
        purchaseImage.alt = '';
        purchaseDescription.className = 'purchase__description';
        purchaseName.className = 'purchase__name';
        purchaseName.innerHTML = cookie.data.name;
        purchasePrice.className = 'purchase__price';
        purchasePrice.innerHTML = '$' + cookie.data.price.toFixed(2);
        purchaseControl.className = 'purchase__control';
        purchaseSetCount.className = 'purchase__set_count';
        purchaseMinus.className = 'purchase__minus';
        purchaseMinus.href = '#';
        purchaseMinus.innerHTML = '-';
        purchaseMinus.addEventListener('click', foxMinus);
        purchaseCount.className = 'purchase__count';
        purchaseCount.innerHTML = cookie.count;
        purchasePlus.className = 'purchase__plus';
        purchasePlus.href = '#';
        purchasePlus.innerHTML = '+';
        purchasePlus.addEventListener('click', foxPlus);
        purchaseRemove.className = 'purchase__remove';
        purchaseRemove.href = '#';
        purchaseRemove.innerHTML = '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M20 0.5C9.22812 0.5 0.5 9.22812 0.5 20C0.5 30.7719 9.22812 39.5 20 39.5C30.7719 39.5 39.5 30.7719 39.5 20C39.5 9.22812 30.7719 0.5 20 0.5ZM24.9406 27.0594L20 22.1188L15.0594 27.0594C14.4781 27.6406 13.5219 27.6406 12.9406 27.0594C12.65 26.7687 12.5 26.3844 12.5 26C12.5 25.6156 12.65 25.2313 12.9406 24.9406L17.8812 20L12.9406 15.0594C12.65 14.7688 12.5 14.3844 12.5 14C12.5 13.6156 12.65 13.2312 12.9406 12.9406C13.5219 12.3594 14.4781 12.3594 15.0594 12.9406L20 17.8812L24.9406 12.9406C25.5219 12.3594 26.4781 12.3594 27.0594 12.9406C27.6406 13.5219 27.6406 14.4781 27.0594 15.0594L22.1188 20L27.0594 24.9406C27.6406 25.5219 27.6406 26.4781 27.0594 27.0594C26.4781 27.65 25.5219 27.65 24.9406 27.0594Z" fill="#8C8C8C"></path>\n' +
            '</svg><br>Remove';
        purchaseRemove.addEventListener('click', foxRemove);
        bagPurchases.appendChild(purchase);
        purchase.appendChild(purchaseCard);
        purchaseCard.appendChild(purchaseImage);
        purchaseCard.appendChild(purchaseDescription);
        purchaseDescription.appendChild(purchaseName);
        purchaseDescription.appendChild(purchasePrice);
        purchase.appendChild(purchaseControl);
        purchaseControl.appendChild(purchaseSetCount);
        purchaseSetCount.appendChild(purchaseMinus);
        purchaseSetCount.appendChild(purchaseCount);
        purchaseSetCount.appendChild(purchasePlus);
        purchaseControl.appendChild(purchaseRemove);
    }
}
const foxMinus = event => {
    event.preventDefault();
    if (+event.currentTarget.parentNode.querySelector('.purchase__count').innerHTML > 1) {
        event.currentTarget.parentNode.querySelector('.purchase__count').innerHTML--;
        for (let cookie of cookies) {
            if (event.currentTarget.parentNode.parentNode.parentNode.id.slice(1) == cookie.data.id) {
                cookie.count--;
                localStorage.setItem('purchases', JSON.stringify(cookies));
                break;
            }
        }
    }
    setTotal();
}
const foxPlus = event => {
    event.preventDefault();
    event.currentTarget.parentNode.querySelector('.purchase__count').innerHTML++;
    for (let cookie of cookies) {
        if (event.currentTarget.parentNode.parentNode.parentNode.id.slice(1) == cookie.data.id) {
            cookie.count++;
            localStorage.setItem('purchases', JSON.stringify(cookies));
            break;
        }
    }
    setTotal();
}
const foxRemove = event => {
    event.preventDefault();
    event.currentTarget.parentNode.parentNode.remove();
    const id = event.currentTarget.parentNode.parentNode.id.slice(1);

    const foxId = document.getElementById('f' + id);
    foxId.querySelector('.fox__background').style.display = 'none';
    cookies = cookies.filter(item => { item.data.id !== +id });
    localStorage.setItem('purchases', JSON.stringify(cookies));
    setTotal();
}
const setTotal = () => {
    let total = 0;
    for (let purchase of purchases) {
        const price = +purchase.querySelector('.purchase__price').innerHTML.slice(1);
        const count = +purchase.querySelector('.purchase__count').innerHTML;
        total += price * count;
    }
    bagPrice.innerHTML = total.toFixed(2);
}
const toBag = event => {
    event.preventDefault();
    bag.style.display = 'block';
    background.style.display = 'block';
}
button.addEventListener('click', () => {
    navbarSupportedContent.classList.toggle('collapsed');
    button.style.display = 'none';
    for (let icon of icons) {
        icon.style.display = 'none';
    }
});
closeMenu.addEventListener('click', () => {
    navbarSupportedContent.classList.toggle('collapsed');
    button.style.display = 'flex';
    for (let icon of icons) {
        icon.style.display = 'inline-block';
    }
});
navbarLinkShop.addEventListener('click', toBag);
for (let cart of carts) {
    cart.addEventListener('click', toBag);
}
bagClose.addEventListener('click', event => {
    event.preventDefault();
    bag.style.display = 'none';
    background.style.display = 'none';
});
for (let filterLink of filterLinks) {
    filterLink.addEventListener('click', event => {
        event.preventDefault();
        for (let filterLink of filterLinks) {
            filterLink.classList.remove('filter__link--active');
        }
        for (let active of filterLink.parentNode.children) {
            active.classList.add('filter__link--active');
        }
        for (let itesFox of itesFoxes) {
            itesFox.style.display = 'none';
        }
        switch (filterLink.innerHTML) {
            case 'All':
                for (let itesFox of itesFoxes) {
                    itesFox.style.display = 'block';
                }
            break;
            case 'Forest':
                for (let itesFox of itesFoxes) {
                    if (itesFox.querySelector('.fox__tag').innerHTML == 'Forest') {
                        itesFox.style.display = 'block';
                    }
                }
            break;
            case 'Fox kids':
                for (let itesFox of itesFoxes) {
                    if (itesFox.querySelector('.fox__tag').innerHTML == 'Foxkid') {
                        itesFox.style.display = 'block';
                    }
                }
            break;
            case 'Foxs kids':
                for (let itesFox of itesFoxes) {
                    if (itesFox.querySelector('.fox__tag').innerHTML == 'Foxkid') {
                        itesFox.style.display = 'block';
                    }
                }
            break;
            case 'Other':
                for (let itesFox of itesFoxes) {
                    if (itesFox.querySelector('.fox__tag').innerHTML == 'Other') {
                        itesFox.style.display = 'block';
                    }
                }
            break;
        }
    });
}
for (let purchaseMinus of purchaseMinuses) {
    purchaseMinus.addEventListener('click', foxMinus);
}
for (let purchasePlus of purchasePluses) {
    purchasePlus.addEventListener('click', foxPlus);
}
for (let purchaseRemove of purchaseRemoves) {
    purchaseRemove.addEventListener('click', foxRemove);
}
if (filterInput) {
    filterInput.addEventListener('input', () => {
        for (let itesFox of itesFoxes) {
            if (itesFox.querySelector('.fox__tag').innerHTML.toLowerCase().includes(filterInput.value.toLowerCase())) {
                itesFox.style.display = 'block';
            } else {
                itesFox.style.display = 'none';
            }
        }
    });
}
const requestUrl = '/src/js/fox.json';
const request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();
request.onload = () => {
    const foxes = request.response;
    showFoxes(foxes);
    showPurchases();
    setTotal();
}

const filterByPriceInternal = (maxPrice) => {
    for (let itesFox of itesFoxes) {
        const price = +itesFox.querySelector('.fox__price').textContent.slice(1);
        if (price <= maxPrice) {
            itesFox.style.display = 'block';
        } else {
            itesFox.style.display = 'none';
        }
    }
};

const updatePriceDisplay = (maxPrice) => {
    document.getElementById('maxPriceDisplay').textContent = `$${maxPrice}`;
};

const debounce = (func, delay) => {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
};

document.getElementById('priceRange').addEventListener('input', debounce(event => {
    const sliderValue = +event.target.value;
    updatePriceDisplay(sliderValue);
    filterByPriceInternal(sliderValue);
}, 300)); // Adjust the debounce delay as needed
