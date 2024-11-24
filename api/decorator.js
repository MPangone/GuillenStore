class DiscountDecorator {
    constructor(product) {
        this.product = product;
    }

    applyDiscount(percentage) {
        const discountAmount = (this.product.price * percentage) / 100;
        this.product.price -= discountAmount;
        return this.product;
    }
}

export default DiscountDecorator;
