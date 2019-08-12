const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.got.show/api'
});

module.exports = instance;