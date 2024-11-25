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

    removeData(type, id) {
        if (this.data[type]) {
            this.data[type] = this.data[type].filter(item => item.id !== id);
        }
    }
}

export default new Database();
