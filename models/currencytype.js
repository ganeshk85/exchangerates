var mongoose = require('mongoose');

//Curreny Type Schema
var CurrencyTypeSchema = mongoose.Schema({
  currency_code: {
    type: String, 
    required: true, 
    max: 5
  },
  currency_name: {
    type: String, 
    required: true, 
    max: 100
  }
});

// Virtual for currency type's URL
CurrencyTypeSchema
.virtual('url')
.get(function () {
  return '/currencytype/' + this._id;
});

//Export model
module.exports = mongoose.model('CurrencyType', CurrencyTypeSchema);