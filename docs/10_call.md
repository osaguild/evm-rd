# call

## call / delegate call

```
# call
caller: x = 0 , y = 0 , v = 2 , w = 3 , sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
callee: x = 2 , y = 3 , sender = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

# delegate call
caller: x = 2 , y = 3 , v = 2 , w = 3 , sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
callee: x = 0 , y = 0  , sender =  0x0000000000000000000000000000000000000000
```

## abi.call

```solidity
# Caller

function initialize() external {
  (bool success, bytes memory data) = callee.call(abi.encodeWithSignature('initialize()'));
  emit Response(success, abi.decode(data, (string)));
}

function sayHello() external {
  (bool success, bytes memory data) = callee.call(abi.encodeWithSignature('sayHello(string)', 'Hello'));
  emit Response(success, abi.decode(data, (string)));
}

function seyGreeting() external {
  (bool success, bytes memory data) = callee.call(
    abi.encodeWithSignature('seyGreeting(string,string)', 'Good morning', 'Have a nice day')
  );
  emit Response(success, abi.decode(data, (string)));
}

function getName() external view returns (string memory) {
  (bool success, bytes memory data) = callee.staticcall(abi.encodeWithSignature('getName()'));
  return abi.decode(data, (string));
}

event Response(bool success, string data);
```

```solidity
# Callee

function initialize() external returns (string memory) {
  _name = 'ExternalContract';
  return _name;
}

function sayHello(string memory greeting) external returns (string memory) {
  _greeting = greeting;
  return _greeting;
}

function seyGreeting(string memory greeting, string memory message) external returns (string memory) {
  _greeting = greeting;
  _message = message;
  return _message;
}

function getName() external view returns (string memory) {
  return _name;
}

```
