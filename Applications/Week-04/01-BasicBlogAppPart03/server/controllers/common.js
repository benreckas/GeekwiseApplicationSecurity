class Common {
    static resultOk(res, obj) {
        res.json({ data: obj });
    }
    static resultErr(res, obj) {
        res.status(500).json({ error: obj });
    }
    static resultNotFound(res, msg) {
<<<<<<< HEAD
        res.status(404).json({ message: msg ? msg : 'Not found.' });
=======
        res.status(404).json({ message: msg ? msg : 'Not Found' });
    }
    static userAlreadyExists(res) {
        res.status(403).json({ message: 'User already exists.' });
>>>>>>> upstream/master
    }
}

module.exports = Common;