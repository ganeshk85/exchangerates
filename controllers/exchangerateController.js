var ExchangeRate = require('../models/exchangerate');
var CurrencyType = require('../models/currencytype');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        exchange_count: function(callback) {
            ExchangeRate.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Exchange Rate Home', error: err, data: results });
    });
};

// Display list of all Exchange Types.
exports.exchangerate_list = function(req, res) {
    ExchangeRate.find({}, 'date_recorded currency_type rate')
    .populate('currency_type')
    .sort({date_recorded: 1})
    .exec(function (err, list_exchangerates) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('exchangerate/list', { title: 'Exchange Rate List', exchangerate_list: list_exchangerates });
    });
};

// Display detail page for a specific Exchange.
exports.exchangerate_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Exchange Rate detail: ' + req.params.id);
};

// Display Exchange create form on GET.
exports.exchangerate_create_get = function(req, res, next) {
    
    // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        currencytypes: function(callback) {
            CurrencyType.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('exchangerate/create', { title: 'Add Exchange Rate', currencytypes: results.currencytypes });
    });
    
    //res.render('exchangerate/create', { title: 'Add Exchange Rate'});
};

// Handle Exchange create on POST.
exports.exchangerate_create_post = [ 
    //res.send('NOT IMPLEMENTED: Exchange create POST');
    // Validate fields.
    body('rate').isLength({ min: 1 }).trim().withMessage('Rate must be specified.'),
    
    // Sanitize fields.
    sanitizeBody('rate').trim().escape(),
    sanitizeBody('currency_type').trim().escape(),
    sanitizeBody('date_recorded').toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create an ExchangeRate object with escaped and trimmed data.
        var exchangerate = new ExchangeRate(
            {
                rate: req.body.rate,
                currency_type: req.body.currency_type,
                date_recorded: req.body.date_recorded
            });
        
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            
            // Get all currencytypes for form.
            async.parallel({
                currencytypes: function(callback) {
                    CurrencyType.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }
            
                res.render('exchangerate/create', { title: 'Add Exchange Rate',currencytypes:results.currencytypes, exchangerate: exchangerate, errors: errors.array() });
                //res.render('exchangerate/create', { title: 'Add Exchange Rate', exchangerate: req.body, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid.Save exchangerate.
            exchangerate.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new exchangerate record.
                res.redirect(exchangerate.url);
            });
        }
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