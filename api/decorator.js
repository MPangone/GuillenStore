class DiscountDecorator {
    constructor(product) {
        this.product = product;
    }

    applyDiscount(discountPercentage) {
        const discountedPrice = this.product.price * (1 - discountPercentage / 100);
        return {
            ...this.product,
            price: parseFloat(discountedPrice.toFixed(2)), 
            originalPrice: this.product.price, 
        };
    }
}

export default DiscountDecorator;
