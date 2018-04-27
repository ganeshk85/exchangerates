var express = require('express');
var router = express.Router();

// Require controller modules.
var currencytype_controller = require('../controllers/currencytypeController');

// GET request for list of all CurrencyTypes.
router.get('/', currencytype_controller.currencytype_list);

// GET request for creating CurrencyType. NOTE This must come before route for id (i.e. display currencytype).
router.get('/create', currencytype_controller.currencytype_create_get);

// POST request for creating CurrencyType.
router.post('/create', currencytype_controller.currencytype_create_post);

// GET request to delete CurrencyType.
router.get('/:id/delete', currencytype_controller.currencytype_delete_get);

// POST request to delete CurrencyType.
router.post('/:id/delete', currencytype_controller.currencytype_delete_post);

// GET request to update CurrencyType.
router.get('/:id/update', currencytype_controller.currencytype_update_get);

// POST request to update CurrencyType.
router.post('/:id/update', currencytype_controller.currencytype_update_post);

// GET request for one CurrencyType.
router.get('/:id', currencytype_controller.currencytype_detail);


module.exports = router;
