var usersController = require('../controllers/users');

module.exports = (app) => {
    // app.use('/api', homeController);
    app.use('/api/users', usersController);
};