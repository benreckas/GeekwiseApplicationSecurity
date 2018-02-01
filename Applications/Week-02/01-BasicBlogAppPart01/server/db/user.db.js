const db = require('./db');

const TABLENAME = 'users';

class userDb {
    static getUserLogin(username, password) {
        id = parseInt(id);
        let query = `SELECT * FROM ${TABLENAME} WHERE username = $1 AND password = $2`;
        console.log(query);
        return db.oneOrNone(query, [username, password]);
    }

    static getAll() {
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false ORDER BY id DESC`;
        console.log(query);
        return db.any(query);
    }

    static updateOne(id, data) {
        id = parseInt(id);
        let params = [];
        Object.keys(data).forEach((key) => {
            params.push(`${key} = '${data[key]}'`);
        });
        let query = `UPDATE ${TABLENAME} SET ${params.join()} WHERE is_deleted=false AND id = ${id} RETURNING *`;
        console.log(query);
        return db.one(query);
    }

    static deleteOne(id) {
        id = parseInt(id);
        //let query = `DELETE FROM ${TABLENAME} WHERE id = ${id}`;
        let query = `UPDATE ${TABLENAME} SET is_deleted=true WHERE id = ${id}`;
        console.log(query);
        return db.result(query, [], r => r.rowCount);
    }

    static insertOne(data) {
        let params = [];
        let values = [];
        Object.keys(data).forEach((key) => {
            params.push(key);
            values.push(`'${data[key]}'`);
        });
        let query = `INSERT into ${TABLENAME} (${params.join()}) VALUES(${values.join()}) RETURNING *`;
        console.log(query);
        return db.one(query);
    }

    static getTotal() {
        let query = `SELECT count(*) FROM ${TABLENAME}`;
        console.log(query);
        return db.one(query, [], a => +a.count);
    }

    static search(param) {
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND post ILIKE '%${param}%' OR author ILIKE '%${param}%'`;
        //let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND make = '${param}'`;
        console.log(query);
        return db.any(query);
    }
}

module.exports = userDb;