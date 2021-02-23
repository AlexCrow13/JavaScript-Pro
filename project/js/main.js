class Products {
    data = [];
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData();
        this._render();
    }

    _fetchData() {
        this.data = [
            { title: 'Notebook', id: 1, price: 2000 },
            { title: 'Keyboard', id: 2, price: 200 },
            { title: 'Mouse', id: 3, price: 100 },
            { title: 'Gamepad', id: 4, price: 87 }
        ];
    }

    _render() {
        for (let data of this.data) {
            const product = new ProductItem(data);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    _sumProducts() {
        return this.products.reduce((sum, itemPrice) => sum += itemPrice.price, 0 )
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';

    constructor(product, img = 'https://placehold.it/200x150') {
        ({ title: this.title, price: this.price, id: this.id } = product);
        this.img = img;
    }

    render() {
        return `<div class="product-item">
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
    cartProducts =[];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._openCart();
        this._addItem();
    }

    _openCart(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
           document.querySelector('.cart').classList.toggle('hidden');
        });
    }

    // addItem() - добавление товара в корзину. Обработка клика по кнопке купить и добаление объекта товара в массив cartItems array

    _addItem(){
       document.querySelectorAll('.buy-btn').forEach(el => { el.addEventListener('click',  () => {
           //
           // this.cartProducts.push(cartProduct);
           // this.container.insertAdjacentHTML('afterbegin', cartProduct.render())
           })
       })
    }

    //_deleteItem() -  удаление товара из корзины. Обработка клика по кнопке "Удалить", определение удаляемого товара, удаление


    // _calculateCartCost() - подсчет стоимости товаров в корзине
    _calculateCartCost() {
        return this.cartProducts.reduce((sum, itemPrice) => sum += itemPrice.price, 0 )
    }
}

class CartItem {
    title = '';
    price = 0;
    id = 0;
    img = '';

    constructor(product, img = 'https://placehold.it/50x50') {
        ({ title: this.title, price: this.price, id: this.id } = product);
        this.img = img;
    }

    render() {
        return `<div class="cart-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="cart-desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="del-btn" data-id = "${this.id}">X</button>
                 </div>
             </div>`
    }
    // some - cartItems array

    // render() -  создание разметки для выпадающей корзины


    // _changeCountProducts() - изменение количества товара в корзине. Обработка поля input  в разметке товара и изменение общей стоимости одного товара в зависимости от его количества

}

const list = new Products('.products');
const  cart = new Cart('.cart');
console.log(list._sumProducts())




