class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.data = {
            users: [],
            products: [],
            orders: [],
        };

        Database.instance = this;
    }

    getData(type) {
        return this.data[type];
    }

    addData(type, item) {
        if (this.data[type]) {
            this.data[type].push(item);
        }
    }
}

export default new Database();
