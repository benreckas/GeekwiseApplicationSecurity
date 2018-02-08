class User {
    constructor(obj) {
        obj && Object.assign(this, obj);
<<<<<<< HEAD
=======

        // don't return user hash in object
        delete this['password'];
>>>>>>> upstream/master
    }

    toString() {
        return ``;
    }
}

module.exports = User;