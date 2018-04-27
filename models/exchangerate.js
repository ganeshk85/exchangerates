var mongoose = require('mongoose');

var moment = require('moment');

var ExchangerateSchema = mongoose.Schema({
  date_recorded: {
    type: Date, 
    default: Date.now
  },
  currency_type: {
    type: mongoose.Schema.ObjectId, 
    ref: 'CurrencyType', 
    required: true
  },
  rate: {
    type: Number, 
    required: true
  }
});

//Virtual for Date Recorded
ExchangerateSchema
.virtual('date_recorded_formatted')
.get(function () {
  return moment(this.date_recorded).format('MMMM Do, YYYY , h:mm:ss a');
});

// Virtual for exchangerate's URL
ExchangerateSchema
.virtual('url')
.get(function () {
  return '/exchangerate/' + this._id;
});

//Export model
module.exports = mongoose.model('ExchangeRate', ExchangerateSchema);