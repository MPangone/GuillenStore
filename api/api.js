import Database from "./database.js";
import ProductBuilder from "./builder.js";
import EntityFactory from "./factory.js";
import DiscountDecorator from "./decorator.js";

// Instância do banco
const db = Database;

// Criar usuários
const user1 = EntityFactory.createEntity("user", {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
});
db.addData("users", user1);

// Criar produtos com o Builder
const product1 = new ProductBuilder()
    .setId(1)
    .setName("Logitech G PRO X SUPERLIGHT 2")
    .setPrice(948.98)
    .setCategory("Periféricos")
    .build();

const product2 = new ProductBuilder()
    .setId(2)
    .setName("Razer Viper V3 Pro")
    .setPrice(1899.90)
    .setCategory("Periféricos")
    .build();

db.addData("products", product1);
db.addData("products", product2);

// Aplicar desconto com o Decorator
const discountedProduct = new DiscountDecorator(product2).applyDiscount(15);
db.addData("products", discountedProduct);

// Criar pedido
const order = EntityFactory.createEntity("order", {
    id: 1,
    userId: user1.id,
    products: [product1, discountedProduct],
    total: product1.price + discountedProduct.price,
});
db.addData("orders", order);

// API Fake
export const API = {
    getUsers: () => db.getData("users"),
    getProducts: () => db.getData("products"),
    getOrders: () => db.getData("orders"),
};
