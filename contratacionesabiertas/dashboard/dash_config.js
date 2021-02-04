
var options = {};

var pgp = require('pg-promise')(options);

const configDash = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_NAME ||'edca',
    user: process.env.POSTGRES_USER || 'dashboard',
    password: process.env.POSTGRES_PASSWORD || 'P4ssw0rd'
};

var connectionDashboard = pgp(configDash);
////////////////////////////////


module.exports = {
    dashboard: connectionDashboard
};
