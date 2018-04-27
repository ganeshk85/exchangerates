var ExchangeRate = require('../models/exchangerate');
var CurrencyType = require('../models/currencytype');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

/*exports.index = function(req, res) {
    async.parallel({
        exchange_count: function(callback) {
            ExchangeRate.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Exchange Rate Home', error: err, data: results });
    });
};*/

// Display list of all Exchange Types.
exports.exchangerate_list = function(req, res) {
    ExchangeRate.find({}, 'date_recorded currency_type rate')
    .populate('currency_type')
    .sort({date_recorded: 1})
    .exec(function (err, list_exchangerates) {
      if (err) { return next(err); }
      //Successful, so render
      return res.json(list_exchangerates);
      //res.render('exchangerate/list', { title: 'Exchange Rate List', exchangerate_list: list_exchangerates });
    });
};


exports.currencytypes_list = function(req, res) {
    CurrencyType.find({}, 'currency_code currency_name')
    .exec(function (err, list_currencytypes) {
      if (err) { return next(err); }
      //Successful, so render
      return res.json(list_currencytypes);
      //res.render('exchangerate/list', { title: 'Exchange Rate List', exchangerate_list: list_exchangerates });
    });
};

// Display detail page for a specific Exchange.
/*exports.exchangerate_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: Exchange Rate detail: ' + req.params.id);
    // get a exchangerate with specific ID
    ExchangeRate.findById(req.params.id, function(err, exchangerate) {
        if (err) throw err;
    
        return res.json(exchangerate);
    });
};*/

// Handle Exchange create on POST.
exports.exchangerate_create_post = [ 
    //res.send('NOT IMPLEMENTED: Exchange create POST');
    
    // Sanitize fields.
    sanitizeBody('rate').trim().escape(),
    sanitizeBody('currency_type').trim().escape(),
    sanitizeBody('date_recorded').toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Create an ExchangeRate object with escaped and trimmed data.
        var exchangerate = new ExchangeRate(
        {
                rate: req.body.rate,
                currency_type: req.body.currency_type,
                date_recorded: req.body.date_recorded
        });
       
        // Data from form is valid.Save exchangerate.
        exchangerate.save(function (err, rate) {
            if(err) {
              res.json({success: false, msg: 'Failed to add new rate'});
            } else {
              res.json({success: true, msg: 'New Rate added'});
            }
        });
        
    }
];

// Display Exchange delete form on GET.
exports.exchangerate_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Exchange Rate delete GET');
};

// Handle Exchange delete on POST.
exports.exchangerate_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Exchange Rate delete POST');
};

// Display Exchange update form on GET.
exports.exchangerate_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Exchange Rate update GET');
};

// Handle Exchange update on POST.
exports.exchangerate_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Exchange Rate update POST');
};

