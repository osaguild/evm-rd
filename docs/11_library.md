# library

## internal library

- internal does not need to deploy and link, it is included in the contract

```typescript
# deploy only contract

const inMain = await new MainWithInternal__factory(deployer).deploy()
expect(await inMain.add()).to.be.equals(3)
expect(await inMain.sub()).to.be.equals(1)
```

## external library

- external library needs to deploy and link

```typescript
const exLib = await new ExternalLib__factory(deployer).deploy()
const exMain = await new MainWithExternal__factory(
  { 'contracts/lib2/ExternalLib.sol:ExternalLib': exLib.address },
  deployer
).deploy()
expect(await exMain.add()).to.be.equals(3)
expect(await exMain.sub()).to.be.equals(1)
```
