var CurrencyType = require('../models/currencytype');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Currency Types.
exports.currencytype_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Currency Type list');
};

// Display detail page for a specific Currency.
exports.currencytype_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Currency Type detail: ' + req.params.id);
};

// Display Currency create form on GET.
exports.currencytype_create_get = function(req, res) {
    //res.send('NOT IMPLEMENTED: Currency create GET');
    res.render('currencytype/create', { title: 'Add Currency Type'});
};

// Handle Currency create on POST.
exports.currencytype_create_post = [ 
    //res.send('NOT IMPLEMENTED: Exchange create POST');
    // Validate fields.
    body('currency_code').isLength({ min: 1 }).trim().withMessage('Currency Code must be specified.'),
    body('currency_name').isLength({ min: 1 }).trim().withMessage('Currency Name must be specified.'),
    
    // Sanitize fields.
    sanitizeBody('currency_code').trim().escape(),
    sanitizeBody('currency_name').trim().escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('currencytype/create', { title: 'Add Currency Type', currencytype: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an ExchangeRate object with escaped and trimmed data.
            var currencytype = new CurrencyType(
                {
                    currency_code: req.body.currency_code,
                    currency_name: req.body.currency_name
                });
                
            currencytype.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new exchangerate record.
                res.redirect(currencytype.url);
            });
        }
    }
];

// Display Currency delete form on GET.
exports.currencytype_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Currency Type delete GET');
};

// Handle Currency delete on POST.
exports.currencytype_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Currency Type delete POST');
};

// Display Currency update form on GET.
exports.currencytype_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Currency Type update GET');
};

// Handle Currency update on POST.
exports.currencytype_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Currency Type update POST');
};