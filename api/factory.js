class EntityFactory {
    static createEntity(type, data) {
        switch (type) {
            case "user":
                return {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                };
            case "product":
                return {
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    category: data.category,
                };
            case "order":
                return {
                    id: data.id,
                    userId: data.userId,
                    products: data.products,
                    total: data.total,
                };
            default:
                throw new Error("Invalid entity type");
        }
    }
}

export default EntityFactory;
