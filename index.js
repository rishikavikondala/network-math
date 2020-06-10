module.exports = function numToBinary(num, useOctet) {
    if(num == 0) { return '0'; }
    if(num > 255) {return 'Invalid number'; }
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

// exports.binaryOctetToNum = function(octet) {
//     if(octet.length != 8) { return "Invalid octet"; }
//     var num = 0;
//     var index = 0;
//     for(var i = octet.length - 1; i >= 0; i--) {
//         if(octet.charAt(index) == '1') {
//             num += Math.pow(2, i);
//         }
//         index++;
//     }
//     return num;
// }

// exports.cidrToSubnetMask = function(cidr, inBinary) {
//     if(cidr > 32 || cidr < 0) {
//         return "Invalid CIDR";
//     }
//     var conversion = new Map([
//         ['11111111', '255'], ['11111110', '254'], ['11111100', '252'],
//         ['11111000', '248'], ['11110000', '240'], ['11100000', '224'],
//         ['11000000', '192'], ['10000000', '128'], ['00000000', '0']
//     ]);
//     var mask = '';
//     var numCompleteParts = Math.floor(cidr / 8);
//     var numOnes = cidr - (numCompleteParts * 8);
//     var numZeroes = 32 - cidr;
//     for(var i = 0; i < 4; i++) {
//         if(numCompleteParts > 0) {
//             mask += conversion.keys().next().value + '.';
//             numCompleteParts--;
//         } else {
//             if(numOnes > 0) {
//                 mask += '1'.repeat(numOnes);
//                 mask += '0'.repeat(8 - numOnes);
//                 mask += '.';
//                 numZeroes -= (8 - numOnes);
//                 numOnes = 0;
//             }
//             if(numZeroes > 8) {
//                 while(numZeroes > 0) {
//                     mask += '0'.repeat(8);
//                     mask += '.';
//                     numZeroes -= 8;
//                 }
//             }
//         }
//     }
//     if(inBinary) {
//         var parts = mask.split('.');
//         parts.pop();
//         var numericMask = '';
//         for(var i = 0; i < parts.length; i++) {
//             numericMask += conversion.get(parts[i]);
//             numericMask +=  '.';
//         }
//         mask = numericMask;
//     }
//     return mask.substring(0, mask.length - 1);
// }