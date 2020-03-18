define([
'ojs/ojvalidation-base',
'./custom-phone.converter',
'ojs/ojvalidation-datetime',
'ojs/ojtimezonedata'],
function(ValidationBase, PhoneNumberConverter) {

    function FormatterUtils() {}

    FormatterUtils.getDateConverter = function(options) {
        return new ValidationBase.Validation.converterFactory('datetime').createConverter(options);
    };

    FormatterUtils.getCurrencyConverter = function(options) {
        return new ValidationBase.Validation.converterFactory('number').createConverter(options);
    };

    FormatterUtils.getPhoneNumberConverter = function() {
        return new ValidationBase.Validation.converterFactory('phonenumber').createConverter();
    }

    FormatterUtils.prototype.getStringFromDate = function(date, format) {
        if (!format) {
            format = 'medium';
        }
        const converter = FormatterUtils.getDateConverter({ formatStyle: 'date', dateFormat: format });
        return converter.format(date);
    };

    FormatterUtils.prototype.getCurrencyString = function(value, currency) {
        if (!currency) {
            format = 'INR';
        }
        const converter = FormatterUtils.getCurrencyConverter({ style: 'currency', currency });
        return converter.format(value);
    };

    FormatterUtils.prototype.getPhoneNumberString = function(value) {
        const converter = FormatterUtils.getPhoneNumberConverter();
        return converter.format(value);
    };

    return new FormatterUtils();
});