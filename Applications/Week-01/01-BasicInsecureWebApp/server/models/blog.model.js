class Blog {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Name: ${this.name}, Content: ${this.content}`;
    }
}

module.exports = Blog;