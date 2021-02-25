const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            console.log('some error');
            return;
        }

        cb(xhr.responseText);
    }
};

class Products {
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData()
            .then(() => this._render());
    }

    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                for(let product of data) {
                    this.products.push(new ProductItem(product));
                }
            })
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered){
                continue;
            }
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    calcSum() {
        return this.products.reduce((sum, itemPrice) => sum += itemPrice.price, 0 )
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';
    rendered = false;

    constructor(product, img = 'https://placehold.it/200x150') {
        ({ product_name: this.title, price: this.price, id_product: this.id } = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `<div class="product-item" data-id = "${this.id}">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-id = "${this.id}">Купить</button>
                 </div>
             </div>`
    }
}


class Cart {
    cartProducts = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._openCart();
        this._fetchData()
            .then(() => this._addItem());
    }

    _fetchData() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                for (let product of data['contents']) {
                    this.cartProducts.push(new CartItem(product));
                }
            })
    }

    _openCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart').classList.toggle('hidden');
        });
    }

    _addItem() {
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = +btn.getAttribute("data-id")
                // const productItem = document.querySelectorAll('.product-item').find((el) =>{
                //     if(el.attributes === productId){
                //         return;
                //     }
                // })
                for (let product of this.cartProducts) {
                    if (product.id === productId) {
                        if (product.rendered) {
                            product.changeCountProductsUp();
                            product.updateCartItem();
                            continue;
                        }
                        this.container.insertAdjacentHTML('beforeend', product.render())
                    }
                }
            })
        })
    }
}
    //_deleteItem() -  удаление товара из корзины. Обработка клика по кнопке "Удалить", определение удаляемого товара, удаление

    // _calculateCartCost() - подсчет стоимости товаров в корзине


class CartItem {
    title = '';
    price = 0;
    id = 0;
    img = '';
    rendered = false;
    quantity = 0;

    constructor(product, img = 'https://placehold.it/50x50') {
        ({ product_name: this.title, price: this.price, id_product: this.id, quantity:this.quantity } = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `<div class="cart-item" data-id = "${this.id}">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="cart-desc">
                     <h3>${this.title}</h3>
                     <form action="#">
                        <input class="cart-item-count" type="number" min="1" value="${this.quantity}">
                     </form>
                     <p class="cart-item-price">${this.price}</p>
                     <button class="del-btn" data-id = "${this.id}">X</button>
                 </div>
             </div>`
    }

    // changeCountProducts() - изменение количества товара в корзине. Обработка поля input  в разметке товара и изменение общей стоимости одного товара в зависимости от его количества
    changeCountProductsUp(){
        this.quantity += 1;
    }

    updateCartItem(){
     return   document.querySelector('.cart-item-count').value = this.quantity,
        document.querySelector('.cart-item-price').textContent = this.quantity*this.price;
    }
}


const list = new Products('.products');
const  cart = new Cart('.cart');