var express = require('express');
var router = express.Router();

// Require controller modules.
var exchangerate_api_controller = require('../controllers/exchangerateApiController');

// GET request for list of all ExchangeRates.
router.get('/exchangerate', exchangerate_api_controller.exchangerate_list);

// POST request for creating ExchangeRate.
router.post('/exchangerate/create', exchangerate_api_controller.exchangerate_create_post);

// GET request to delete ExchangeRate.
//router.get('/exchangerate/:id/delete', exchangerate_api_controller.exchangerate_delete_get);

// POST request to delete ExchangeRate.
//router.post('/exchangerate/:id/delete', exchangerate_api_controller.exchangerate_delete_post);

// GET request to update ExchangeRate.
//router.get('/exchangerate/:id/update', exchangerate_api_controller.exchangerate_update_get);

// POST request to update ExchangeRate.
//router.post('/exchangerate/:id/update', exchangerate_api_controller.exchangerate_update_post);

// GET request for one ExchangeRate.
//router.get('/exchangerate/:id', exchangerate_api_controller.exchangerate_detail);

router.get('/exchangerate/currencytypes', exchangerate_api_controller.currencytypes_list);


module.exports = router;
