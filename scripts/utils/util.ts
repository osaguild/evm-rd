const remove0x = (hex: string) => {
  return hex.startsWith('0x') ? hex.slice(2) : hex
}

;(async () => {
  console.log('remove0x("0xaa"):', remove0x('0xaa'))
  console.log('remove0x("aa")  :', remove0x('aa'))
})()

export { remove0x }
