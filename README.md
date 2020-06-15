# network-math

## Installation
```
npm install network-math --save
```

## Usage
```
const nm = require('network-math');

const octet = nm.numToBinary(116, true);
// 01110100
const binary = nm.numToBinary(116, false);
// 1110100
const num = nm.binaryOctetToNum('11010110');
// 214
const maskBinary = nm.cidrToSubnetMask(25, true);
// 255.255.255.128
const mask = nm.cidrToSubnetMask(25, false); 
// 11111111.11111111.11111111.10000000
const ipClass = getNetworkClass(172.27.8.131);
// Class B
```

## API

### `numToBinary(num, useOctet)`<br>
Returns the binary equivalent of an integer. <br>
Parameters:
- num - an integer between 0 and 255, inclusive.
- useOctet - a boolean
    - if true -  adds preceding zeroes to the binary for a complete octet
    - if false - does not add zeroes to the binary

Exceptions:
- RangeError thrown if num is not between 0 and 255
- TypeError thrown if num is not an integer
- TypeError thrown if useOctet is not a boolean


### `binaryOctetToNum(octet)` <br>
Returns the integer equivalent of a binary octet. <br>
Parameters:
- octet - an eight-character binary number

Exceptions:
- PropertyError thrown if octet is not eight characters long
- Error thrown if octet has characters besides 0 and 1
- TypeError thrown if octet is not a string


### `cidrToSubnetMask(cidr, inBinary)` <br>
Returns the subnet mask equivalent of a CIDR. <br>
Parameters:
- cidr - an integer between 0 and 32, inclusive.
- inBinary - a boolean
    - if true - returns the subnet mask in binary
    - if false - returns the subnet mask using integers

Exceptions:
- RangeError thrown if num is not between 0 and 32, inclusive
- TypeError thrown if cidr is not an integer
- TypeError thrown if inBinary is not a boolean

### `getNetworkClass(ip)`
Returns the class of the network that a provided ipv4 address is in. <br>
Parameters:
- ip -> an ip address (ipv4)

Exceptions:
- Error thrown if the ip address does not contain the following format: num.num.num.num
    - where num is an integer between 0 and 255, inclusive
- Error thrown if the ip address does not contain four octets
- TypeError thrown if mask is not a string
*/