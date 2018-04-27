var express = require('express');
var router = express.Router();

// Require controller modules.
var exchangerate_controller = require('../controllers/exchangerateController');

// GET request for list of all ExchangeRates.
router.get('/', exchangerate_controller.exchangerate_list);

// GET request for creating ExchangeRate. NOTE This must come before route for id (i.e. display exchangerate).
router.get('/create', exchangerate_controller.exchangerate_create_get);

// POST request for creating ExchangeRate.
router.post('/create', exchangerate_controller.exchangerate_create_post);

// GET request to delete ExchangeRate.
router.get('/:id/delete', exchangerate_controller.exchangerate_delete_get);

// POST request to delete ExchangeRate.
router.post('/:id/delete', exchangerate_controller.exchangerate_delete_post);

// GET request to update ExchangeRate.
router.get('/:id/update', exchangerate_controller.exchangerate_update_get);

// POST request to update ExchangeRate.
router.post('/:id/update', exchangerate_controller.exchangerate_update_post);

// GET request for one ExchangeRate.
router.get('/:id', exchangerate_controller.exchangerate_detail);


module.exports = router;
