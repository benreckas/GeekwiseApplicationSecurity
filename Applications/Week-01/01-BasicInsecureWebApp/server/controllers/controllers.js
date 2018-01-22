const BlogController = require('./blog.controller');
const express = require('express');
const router = express.Router();

const blogController = new BlogController(router);

module.exports = router;