define(
['ojs/ojvalidation-base'],
function(ValidationBase) {

    function PhoneNumberConverter() {}

    PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH = 10;

    PhoneNumberConverter.getExtractedNumbers = function(value) {
        let extractedNumbers = ``;
        const lengthOfString = value.length;
        if (lengthOfString < PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH) {
            return value;
        }
        for (let index=0; index<lengthOfString; index++) {
            const characterAtIndex = value.charAt(index);
            extractedNumbers += isNaN(characterAtIndex) ? `` : characterAtIndex;
        }
        return extractedNumbers;
    };

    PhoneNumberConverter.prototype.format = function(value) {
        let formattedValue = ``, initValue = ``;
        if (!value) {
            return formattedValue;
        }
        if (typeof value === 'string') {
            initValue = PhoneNumberConverter.getExtractedNumbers(value.trim());
            if (initValue.length !== PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH) {
                return value;
            }
        } else if (typeof value === 'number') {
            initValue = PhoneNumberConverter.getExtractedNumbers(value.toString());
            if (initValue.length !== PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH) {
                return value;
            }
        } else {
            return formattedValue;
        }
        const part1 = initValue.substring(0, 3);
        const part2 = initValue.substring(3, 6);
        const part3 = initValue.substring(6, 10);
        formattedValue = `(${part1}) ${part2}-${part3}`;
        return formattedValue;
    };

    PhoneNumberConverterFactory = (function() {
        function _createPhoneNumberConverter() {
            return new PhoneNumberConverter();
        }
        return { createConverter: function() { return _createPhoneNumberConverter(); } };
    }());

    ValidationBase.Validation.converterFactory("phonenumber", PhoneNumberConverterFactory);

});