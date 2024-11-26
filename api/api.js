import Database from "./database.js";
import ProductBuilder from "./builder.js";
import EntityFactory from "./factory.js";
import DiscountDecorator from "./decorator.js";

// Instância do banco
const db = Database;

// Criar usuário
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

const product3 = new ProductBuilder()
    .setId(3)
    .setName("Logitech G403 Hero")
    .setPrice(229.99)
    .setCategory("Periféricos")
    .build();
const product4 = new ProductBuilder()
    .setId(4)
    .setName("Teclado Mecânico Razer Blackwidow")
    .setPrice(1089.90)
    .setCategory("Periféricos")
    .build();
const product5 = new ProductBuilder()
    .setId(5)
    .setName("Headset Gamer Havit HV-H2002D")
    .setPrice(160.90)
    .setCategory("Periféricos")
    .build();

const product6 = new ProductBuilder()
    .setId(6)
    .setName("Monitor Gamer LG Ultragear 27 Full Hd 144hz")
    .setPrice(1022.90)
    .setCategory("Periféricos")
    .build();
    	
db.addData("products", product1);
db.addData("products", product3); 
db.addData("products", product4); 
db.addData("products", product5); 
db.addData("products", product6); 
// Aplicar desconto no segundo produto
const discountedProduct = new DiscountDecorator(product2).applyDiscount(15);

// Remover o produto original para evitar duplicata
db.removeData("products", product2.id);

// Adicionar o produto com desconto
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
    getProducts: () => db.getData("products").map(product => ({ ...product })),
    getOrders: () => db.getData("orders"),
};
