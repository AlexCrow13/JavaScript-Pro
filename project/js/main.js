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
        return `<div class="product-item" data-id = "${this.id}">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}


class Cart {
    // some - cartItems array

    // openPreviewCart() - открыть предварительный просмотр корзины (выпадающая корзина). Обработка события наведения на кнопку корзины ( по типу hover)

    // openPageCart() - открыть страницу корзины. Обработка клика по кнопке "Корзина" или по кнопке "Перейти в корзину" в предварительном просмотре

    // addItem() - добавление товара в корзину. Обработка клика по кнопке купить и добаление объекта товара в массив cartItems array

    //_deleteItem() -  удаление товара из корзины. Обработка клика по кнопке "Удалить", определение удаляемого товара, удаление

    // _calculateCartCost() - подсчет стоимости товаров в корзине

}

class CartItem {
    // some - cartItems array

    // renderPreview() -  создание разметки для выпадающей корзины

    // renderPage() -  создание разметки для страницы корзины

    // _changeCountProducts() - изменение количества товара в корзине. Обработка поля input  в разметке товара и изменение общей стоимости одного товара в зависимости от его количества

}

const list = new Products('.products');
console.log(list._sumProducts())




