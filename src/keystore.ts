import keystore from 'keystore-idb'

export async function runKeystoreDemo(msg = 'Incididunt id ullamco et do.') {
  await keystore.clear()

  const ks1 = await keystore.init({ storeName: 'keystore' })
  const ks2 = await keystore.init({ storeName: 'keystore2' })

  // exchange keys and write keys are separate because of the Web Crypto API
  const exchangeKey1 = await ks1.publicExchangeKey()
  const writeKey1 = await ks1.publicWriteKey()
  const exchangeKey2 = await ks2.publicExchangeKey()

  // these keys get exported as strings
  console.log('exchangeKey1: ', exchangeKey1)
  console.log('writeKey1: ', writeKey1)
  console.log('exchangeKey2: ', exchangeKey2)

  const sig = await ks1.sign(msg)
  const valid = await ks2.verify(msg, sig, writeKey1)
  console.log('sig: ', sig)
  console.log('valid: ', valid)

  const cipher = await ks1.encrypt(msg, exchangeKey2)
  const decipher = await ks2.decrypt(cipher, exchangeKey1)
  console.log('cipher: ', cipher)
  console.log('decipher: ', decipher)
}
