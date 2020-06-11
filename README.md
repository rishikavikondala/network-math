# network-math

### *An npm module that performs standard calculations that are used in network design and engineering.*

### Version: 1.0.3

## Installation
```
npm install network-math
```

## API

`numToBinary(num, useOctet)`<br>
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


`binaryOctetToNum(octet)` <br>
Returns the integer equivalent of a binary octet. <br>
Parameters:
- octet - an eight-character binary number

Exceptions:
- PropertyError thrown if octet is not eight characters long
- TypeError thrown if octet is not a string


`cidrToSubnetMask(cidr, inBinary)` <br>
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