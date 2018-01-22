const Blog = require('../models/blog.model');
const BlogDb = require('../db/blog.db');
const Common = require('./common');

class CarController {
    constructor(router) {
        router.route('/blog/:id')
            .get(this.getOne)
            .put(this.updateOne)
            .delete(this.deleteOne);
        router.route('/car')
            .get(this.getAll)
            .post(this.insertOne);
    }

    async getOne(req, res, next) {
        try {
            const data = await BlogDb.getOne(req.params.id);
            if (data) {
                let blog = new Blog(data);
                return Common.resultOk(res, blog);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async updateOne(req, res, next) {
        try {
            const data = await BlogDb.updateOne(req.params.id, req.body);
            if (data) {
                let blog = new Blog(data);
                return Common.resultOk(res, blog);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async insertOne(req, res, next) {
        try {
            const data = await BlogDb.insertOne(req.body);
            if (data) {
                let blog = new Blog(data);
                return Common.resultOk(res, blog);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async deleteOne(req, res, next) {
        try {
            const data = await BlogDb.deleteOne(req.params.id);
            if (data) {
                return Common.resultOk(res, data);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async getAll(req, res, next) {
        try {
            const data = await BlogDb.getAll();
            if (data) {
                let blogs = data.map(blog => { return new Blog(blog) });
                return Common.resultOk(res, blogs);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            return Common.resultErr(res, e);
        }
    }
}

module.exports = BlogController;