## BytesMap API 0.4.0
The `BytesMap` contract is a `SandalStraps` compliant contract that stores
owned byte arrays in a `bytes32 => bytes` mapping.  This can be useful for storing
`resource` bytes longer than 32 bytes. A `bytesMap` key is the sha3 hash of
`msg.sender` and the byte array with the first four bytes masked out and replaced with a 
type descriptor.  A byte array can only be deleted by the
caller who set it or by the `BytesMap` owner using its mapping key.

### Heritage
```
OwnedAbstract <- Owned <-.
                         |
RegBaseAbstract <--------+- RegBase <- BytesMap


OwnedAbstract <- Owned <-.
                         |
RegBaseAbstract <--------+- RegBase <- Factory <- BytesMapFactory
```

## ABI
In addition to the `RegBase API`, a `SandalStraps` `BytesMap` contract
exposes a minimum of the following functions:

```
[{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"clearHash","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_safePhrase","type":"bytes32"}],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"bytes4"},{"name":"_bytes","type":"bytes"}],"name":"clear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"bytes4"},{"name":"_bytes","type":"bytes"}],"name":"store","outputs":[{"name":"hash_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"bytesMap","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_hash","type":"bytes32"}],"name":"Stored","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}]
```

### Type Descriptors

Stored bytes can be prefixed with an optional type descriptor
Type descriptors are arbitrarily defined by the signature of
their interface function, e.g. For a UTF8 string the descriptor
is arrived at as a 4 byte cast of the sha3 hash of a function
name and parameter type:
```
0xcccac034 == bytes4(sha3("utf8(bytes32)"))
```

`0x00000000` Raw bytes data (set if no type descriptor provided)

`0x01ffc9a7` ENS INTERFACE\_META\_ID

`0x3b3b57de` ENS ADDR\_INTERFACE\_ID

`0xd8389dc5` ENS CONTENT\_INTERFACE\_ID

`0x691f3431` ENS NAME\_INTERFACE\_ID

`0x2203ab56` ENS ABI\_INTERFACE\_ID

`0xc8690233` ENS PUBKEY\_INTERFACE\_ID

`0x59d1d43c` ENS TEXT\_INTERFACE\_ID

`0x9ed19ddb` URI\_INTERFACE\_ID

`0xc868992a` IPFS\_INTERFACE\_ID

`0xcccac034` UTF8\_INTERFACE\_ID

`0x9727fea0` ASCII\_INTERFACE\_ID

`0x3952feb5` UUID\_INTERFACE\_ID


### bytesMap
```
function bytesMap(bytes32 _hash) constant returns (bytes bytes_);
```
Returns a stored bytes array given its key

`_hash` A mapping key the byte array is stored at.

### set
```
function store(bytes4 _type, bytes _bytes) public returns (bytes32 hash_)
```
Stores an owned byte array in the mapping keyed by a sha3 contatination of

`msg.sender` with byte array content and 4 byte descriptor prefix.

`_type` A four byte data type descriptor

`_bytes` The byte array to store

Returns bytes32 hash consisting of the first 4 byte being the descriptor with the remaing being the sha3 of the sender address and the bytes array

### clear
```
function clear(bytes4 _type, bytes _bytes);
```
Allows a byte array owner to clear a stored byte array.

`_type` A four byte data type descriptor

`_bytes` The string to be deleted.

### clearHash
```
function clear(bytes32 _hash)
```
Allows a byte array owner or `BytesMap` owner to delete a stored byte array.

`_hash` The hash key of the byte array to delete
