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
    if(useOctet != true && useOctet != false) {
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
- Error thrown if octet has characters besides 0 and 1
- TypeError thrown if octet is not a string
*/
const binaryOctetToNum = (octet) => {
    if(octet.length != 8) {
        throw new PropertyError('octet must be 8 characters long');
    }
    if(typeof octet != 'string') {
        throw new TypeError('octet must be a string');
    }
    var num = 0;
    var index = 0;
    for(var i = octet.length - 1; i >= 0; i--) {
        if(octet.charAt(i) != '0' || octet.charAt(i) != '1') {
            throw new Error('octet must only have 0s and 1s');
        }
        if(octet.charAt(index) == '1') {
            num += Math.pow(2, i);
        }
        index++;
    }
    return num;
}

/*
Returns the subnet mask equivalent of a CIDR.
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

/*
Returns the CIDR equivalent of a subnet mask.
Parameters:
- mask -> a string representation of a subnet mask
Exceptions:
- Error thrown if the mask does not contain the following format: num.num.num.num
    - where num is an integer between 0 and 255, inclusive
- TypeError thrown if mask is not a string
*/
const subnetMaskToCidr = (mask) => {
    if(mask.indexOf('.') == -1) {
        throw new Error('Mask must be formatted with periods');
    }
    var maskParts = mask.split('.');
    if(maskParts.length != 4) {
        throw new Error('Mask must contain four parts');
    }
    var conversion = new Map([
        ['255', '11111111'], ['254', '11111110'], ['252', '11111100'],
        ['248', '11111000'], ['240', '11110000'], ['224', '11100000'],
        ['192', '11000000'], ['128', '10000000'], ['0', '00000000']
    ]);
    var cidr = 0;
    for(var i = 0; i < maskParts.length; i++) {
        if(!conversion.has(maskParts[i])) {
            throw new Error('Invalid number in the subnet mask');
        }
        cidr += conversion.get(maskParts[i]).split('1').length - 1;
    }
    return cidr;
}

/*
Returns the class of the network that a provided ipv4 address is in
Parameters:
- ip -> an ip address (ipv4)
Exceptions:
- Error thrown if the ip address does not contain the following format: num.num.num.num
    - where num is an integer between 0 and 255, inclusive
- TypeError thrown if mask is not a string
*/
const getNetworkClass = (ip) => {
    if(ip.indexOf('.') == -1) {
        throw new Error('IP Address must be formatted with four periods');
    }
    var ipParts = ip.split('.');
    if(ipParts.length != 4) {
        throw new Error('IP Address must have four parts');
    }
    for(var i = 0; i < ipParts.length; i++) {
        if(parseInt(ipParts[i]) > 255 || parseInt(ipParts[i]) < 0) {
            throw new Error('IP Address must have octets between 0 and 255 inclusive');
        } 
    }
    if(ipParts[0] >= 1 && ipParts[0] <= 126) {
        return 'Class A'; // Default mask: 255.0.0.0
    }
    else if(ipParts[0] >= 128 && ipParts[0] <= 191) {
        return 'Class B'; // Default mask: 255.255.0.0
    }
    else if(ipParts[0] >= 192 && ipParts[0] <= 223) {
        return 'Class C'; // Default mask: 255.255.255.0
    }
    else if(ipParts[0] >= 224 && ipParts[0] <= 239) {
        return 'Class D'; // Multicasting
    }
    else if(ipParts[0] >= 240 && ipParts[0] <= 255) {
        return 'Class E'; // Experimental
    }
    return 'Loopback';
}

/*
Returns a Map with:
- number of subnets that can be made if the specified mask is applied. 
- number of hosts that can exist within each subnet if the specified mask is applied.
Parameters:
- mask -> a string representation of a subnet mask
Exceptions:
- Error thrown if the cidr is not between 0 and 32, inclusive
- Error thrown if the ip address does not contain the following format: num.num.num.num
    - where num is an integer between 0 and 255, inclusive
- TypeError thrown if ip is not a string
- TypeError thrown if cidr is not an integer
https://networkengineering.stackexchange.com/questions/7106/how-do-you-calculate-the-prefix-network-subnet-and-host-numbers#:~:text=Calculating%20the%20maximum%20possible%20number,bits%20in%20an%20IPv4%20address).
*/
// const calcNetworkIdBroadcast = (ip, cidr) => {
//     if(ip.indexOf('.' == -1)) {
//         throw new Error('IP Address must be formatted with four periods');
//     }
//     var ipParts = ip.split('.');
//     var ipPartsInBinary = ['', '', '', ''];
//     var fullIpInBinary = '';
//     if(ipParts.length != 4) {
//         throw new Error('IP Address must have four parts');
//     }
//     for(var i = 0; i < ipParts.length; i++) {
//         ipPartsInBinary[i] = parseInt(numToBinary(ipParts[i], true));
//         fullIpInBinary += ipPartsInBinary[i];
//         //fullIpInBinary += '.';
//     }
//     fullIpInBinary = fullIpInBinary.substr(0, fullIpInBinary.length - 1);
//     var networkPartOfAddress = fullIpInBinary.substr(0, cidr);
//     var hostPartOfAddress = fullIpInBinary.substr(cidr, fullIpInBinary.length);
//     var calcNetworkID = '0'.repeat(hostPartOfAddress.length);
//     var calcBroadcast = '1'.repeat(hostPartOfAddress.length);
// }

/*
Returns a Map with:
- number of subnets that can be made if the specified mask is applied. 
- number of hosts that can exist within each subnet if the specified mask is applied.
Parameters:
- mask -> a string representation of a subnet mask
Exceptions:
- Error thrown if the mask does not contain the following format: num.num.num.num
    - where num is an integer between 0 and 255, inclusive
- TypeError thrown if mask is not a string
*/
// const numSubnetsAndHostsInMask = (mask) => {
//     if(mask.indexOf('.') == -1) {
//         throw new Error('Mask must be formatted with four  periods');
//     }
//     var maskParts = mask.split('.');
//     if(maskParts.length != 4) {
//         throw new Error('Mask must contain four parts');
//     }
//     var conversion = new Map([
//         ['255', '11111111'], ['254', '11111110'], ['252', '11111100'],
//         ['248', '11111000'], ['240', '11110000'], ['224', '11100000'],
//         ['192', '11000000'], ['128', '10000000'], ['0', '00000000']
//     ]);
//     var numSubnets = 0;
//     var numHosts = 0;
//     for(var i = 0; i < maskParts.length; i++) {
//         if(!conversion.has(maskParts[i])) {
//             throw new Error('Invalid number in the subnet mask');
//         }
//         var numOnes = conversion.get(maskParts[i]).split('1').length - 1;
//         if(numOnes < 8) {
//             numSubnets = Math.pow(2, numOnes);
//             numHosts = Math.pow(2, numOnes) - 2;
//         }
//     }
//     var counts = new Map([
//         ['Number of subnets', numSubnets],
//         ['Number of hosts per subnet', numHosts]
//     ]);
//     return counts;
// }

// Exporting for use in an npm module
module.exports = {
    numToBinary,
    binaryOctetToNum,
    cidrToSubnetMask,
    subnetMaskToCidr,
    getNetworkClass
}

//For development and testing purposes
function main() {
    var mask = '255.255.248.0';
    // console.log(subnetMaskToCidr(mask));
    // var addr = '11111111111111111111111110000000';
    // var cidr = 25;
    // var networkpart = addr.substr(0, cidr);
    // var hostpart = addr.substr(cidr, addr.length);
    // console.log(networkpart);
    // console.log(networkpart.length);
    // console.log(hostpart);
    // console.log(hostpart.length);
    // console.log(getNetworkClass(mask));
}
main();