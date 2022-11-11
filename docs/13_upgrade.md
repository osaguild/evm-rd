# upgrade

## link

- [learn upgrade](https://docs.openzeppelin.com/learn/upgrading-smart-contracts)
- [upgrade plugin](https://docs.openzeppelin.com/upgrades)
- [proxies contracts](https://docs.openzeppelin.com/contracts/4.x/api/proxy)
- [openZeppelin blog](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/#transparent-proxies)

## transparent proxy

- ![iamge](../assets/proxy.png)
- Box can upgrade to BoxV2
- Box can not upgrade to BoxV3, because BoxV3 has not implemented the same interface as Box
- Box can upgrade to BoxV4
- Box can not upgrade to BoxV5, because BoxV5 changed the order of variables definition

## beacon proxy

- ![image](../assets/beacon.png)
- Box can upgrade to BoxV2
- Box can not upgrade to BoxV3, because BoxV3 has not implemented the same interface as Box
- Box can upgrade to BoxV4
- Box can not upgrade to BoxV5, because BoxV5 changed the order of variables definition

## uups

- Pizza implements Initializable and UUPSUpgradeable
- Pizza can upgrade to PizzaV2, because PizzaV2 inherits Pizza.
- Pizza can not upgrade to PizzaV3, because PizzaV3 does not inherit Pizza and has different interface and variables definition.
- Pizza can not upgrade to PizzaV4, because PizzaV4 inherits Initializable and UUPSUpgradeable, but not inherits Pizza variable definition.
- Pizza can upgrade to PizzaV5, because PizzaV5 inherits Pizza. PizzaV5 also implements new variable definition. It's ok, just adding.
