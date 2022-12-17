require('dotenv').config()

const config = {
    db: {
        host: 'db4free.net',
        user: 'security_zone',
        password: process.env.DB_PASSWORD,
        database: 'security_zone'
    },
    listPerPage: 200
}

module.exports = config;
