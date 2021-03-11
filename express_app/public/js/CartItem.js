export const CartItem = {
    props: ['img', 'cartItem'],
    emits: ['remove'],
    template: `
        <div class="cart-item">
                        <div class="product-bio">
                            <img :src="img" :alt="cartItem.product_name">
                            <div class="product-desc">
                                <p class="product-title">{{cartItem.product_name}}</p>
                                <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                                <p class="product-single-price">$ {{cartItem.price}} each</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
                            <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        </div>
                    </div>
    `
};