class ProductBuilder {
    constructor() {
        this.product = {};
    }

    setId(id) {
        this.product.id = id;
        return this;
    }

    setName(name) {
        this.product.name = name;
        return this;
    }

    setPrice(price) {
        this.product.price = price;
        return this;
    }

    setCategory(category) {
        this.product.category = category;
        return this;
    }

    build() {
        return this.product;
    }
}

export default ProductBuilder;
