/*
Returns the binary equivalent of an integer.
Parameters:
- num -> an integer between 0 and 255, inclusive.
- useOctet -> a boolean
    - if true ->  adds preceding zeroes to the binary for a complete octet
    - if false -> does not add zeroes to the binary
Exceptions:
- RangeError thrown if num is not between 0 and 255
- TypeError thrown if num is not an integer
- TypeError thrown if useOctet is not a boolean
*/
const numToBinary = (num, useOctet) => {
    if(num == 0) { 
        return '0';
    }
    if(num > 255 || num < 0) {
        throw new RangeError('num must be between 0 and 255, inclusive.'); 
    }
    if(num === parseInt(data, 10)) {
        throw new TypeError('num must be an  integer');
    }
    if(useOctet != true && useOcter != false) {
        throw new TypeError('useOctet must be a boolean');
    }
    var numDigits = 0;
    var current = 1;
    while(current <= num) {
        current *= 2;
        numDigits++;
    }
    var sum = 0;
    var binary = '';
    for(var i = numDigits - 1; i >= 0; i--) {
        if(sum + Math.pow(2, i) <= num) {
            binary += '1';
            sum += Math.pow(2, i);
        } else {
            binary += '0';
        }
    }
    if(useOctet) {
        binary = '0'.repeat(8 - binary.length) + binary;
    }
    return binary;
}

/*
Returns the integer equivalent of a binary octet.
Parameters:
- octet -> an eight-character binary number
Exceptions:
- PropertyError thrown if octet is not eight characters long
- TypeError thrown if octet is not a string
*/
const binaryOctetToNum = (octet) => {
    if(octet.length != 8) {
        throw new PropertyError('octet must be 8 characters long');
    }
    if(typeof octet != 'string') {
        throw new TypeError('octet must be a string');
    }
    if(octet)
    var num = 0;
    var index = 0;
    for(var i = octet.length - 1; i >= 0; i--) {
        if(octet.charAt(index) == '1') {
            num += Math.pow(2, i);
        }
        index++;
    }
    return num;
}

/*
Returns the subnet mask equivalent of a CIDR. <br>
Parameters:
- cidr -> an integer between 0 and 32, inclusive.
- inBinary -> a boolean
    - if true -> returns the subnet mask in binary
    - if false -> returns the subnet mask using integers
Exceptions:
- RangeError thrown if cidr is not between 0 and 32, inclusive
- TypeError thrown if num is not an integer
- TypeError thrown if inBinary is not a boolean
*/
const cidrToSubnetMask = (cidr, inBinary) => {
    if(cidr < 0 || cidr > 32) {
        throw new RangeError('cidr must be between 0 and 32');
    }
    if(cidr === parseInt(data, 10)) {
        throw new TypeError('cidr must be an integer');
    }
    if(inBinary != true && inBinary != false) {
        throw new TypeError('inBinary must be a boolean');
    }
    var conversion = new Map([
        ['11111111', '255'], ['11111110', '254'], ['11111100', '252'],
        ['11111000', '248'], ['11110000', '240'], ['11100000', '224'],
        ['11000000', '192'], ['10000000', '128'], ['00000000', '0']
    ]);
    var mask = '';
    var numCompleteParts = Math.floor(cidr / 8);
    var numOnes = cidr - (numCompleteParts * 8);
    var numZeroes = 32 - cidr;
    for(var i = 0; i < 4; i++) {
        if(numCompleteParts > 0) {
            mask += conversion.keys().next().value + '.';
            numCompleteParts--;
        } else {
            if(numOnes > 0) {
                mask += '1'.repeat(numOnes);
                mask += '0'.repeat(8 - numOnes);
                mask += '.';
                numZeroes -= (8 - numOnes);
                numOnes = 0;
            }
            if(numZeroes > 8) {
                while(numZeroes > 0) {
                    mask += '0'.repeat(8);
                    mask += '.';
                    numZeroes -= 8;
                }
            }
        }
    }
    if(inBinary) {
        var parts = mask.split('.');
        parts.pop();
        var numericMask = '';
        for(var i = 0; i < parts.length; i++) {
            numericMask += conversion.get(parts[i]);
            numericMask +=  '.';
        }
        mask = numericMask;
    }
    return mask.substring(0, mask.length - 1);
}

// Exporting for use in an npm module
module.exports = {
    numToBinary,
    binaryOctetToNum,
    cidrToSubnetMask
}

// For development and testing purposes
// function main() {
//     console.log(numToBinary(116, true));
// }
// main();