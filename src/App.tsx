import { useAsync, useAsyncEffect } from '@react-hook/async'
import { ReactElement, useState } from 'react'

import keystore from 'keystore-idb'
import { KeyStore } from 'keystore-idb/types'

import { runKeystoreDemo } from './keystore'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <div style={{ fontSize: '3em' }}>
        Powered by&nbsp;
        <a
          href="https://github.com/fission-codes/keystore-idb#config"
          target="_blank"
          rel="noreferrer"
        >
          keystore-idb
        </a>
      </div>
      <StoreProvider>{stores => <Demo {...stores} />}</StoreProvider>
    </div>
  )
}

interface IKeyStores {
  ks1: KeyStore
  ks2: KeyStore
}

function StoreProvider(props: {
  children: (data: IKeyStores) => ReactElement
}) {
  const { children } = props

  const state = useAsyncEffect(async () => {
    await keystore.clear()
    const ks1 = await keystore.init({ storeName: 'keystore' })
    const ks2 = await keystore.init({ storeName: 'keystore2' })
    return { ks1, ks2 }
  }, [])

  if (state.status === 'success') {
    return children(state.value as NonNullable<typeof state.value>)
  }

  if (state.status === 'loading') {
    return <>Initializing keystore...</>
  }

  if (state.status === 'error') {
    return <>Error: {state.error?.message}</>
  }

  return null
}

function Demo(props: IKeyStores) {
  const { ks1, ks2 } = props
  const { value: keys } = useAsyncEffect(async () => {
    return {
      exchangeKey1: await ks1.publicExchangeKey(),
      writeKey1: await ks1.publicWriteKey(),
      exchangeKey2: await ks2.publicExchangeKey(),
      writeKey2: await ks2.publicWriteKey(),
    }
  }, [])

  const [msg, setMsg] = useState('some arbitrary demo text to be encrypted')

  if (keys === undefined) {
    return null
  }

  return (
    <div className={styles.demo}>
      <div className={styles.grid}>
        <KeysList
          writeKey1={keys.writeKey1}
          writeKey2={keys.writeKey2}
          exchangeKey1={keys.exchangeKey1}
          exchangeKey2={keys.exchangeKey2}
        />

        <hr />

        <textarea
          value={msg}
          onChange={e => setMsg(e.target.value)}
          rows={3}
          style={{ padding: 12, fontSize: '1.2rem', resize: 'none' }}
        />

        <hr />

        <div
          className={styles.grid}
          style={{ gridAutoFlow: 'column', gridAutoColumns: '1fr' }}
        >
          <DemoVerifySignature
            ks1={ks1}
            ks2={ks2}
            writeKey1={keys.writeKey1}
            msg={msg}
          />

          <DemoEncrypt
            ks1={ks1}
            ks2={ks2}
            exchangeKey1={keys.exchangeKey1}
            exchangeKey2={keys.exchangeKey2}
            msg={msg}
          />
        </div>

        <hr />

        <button onClick={() => runKeystoreDemo(msg)}>
          Run demo in console (open dev tools to see)
        </button>
      </div>
    </div>
  )
}

function TitledText(props: { title: string; children: string }) {
  const { title, children } = props
  return (
    <span>
      <b>{title}:</b>&nbsp;
      <span
        onClick={() => navigator.clipboard.writeText(children)}
        style={{ cursor: 'context-menu' }}
        title="Click to copy"
      >
        {children}
      </span>
    </span>
  )
}

function KeysList(props: {
  writeKey1: string
  writeKey2: string
  exchangeKey1: string
  exchangeKey2: string
}) {
  const { writeKey1, writeKey2, exchangeKey1, exchangeKey2 } = props
  return (
    <div className={styles.grid} style={{ gridAutoFlow: 'column' }}>
      <div className={styles.grid}>
        <span className={styles.section_title}>Store 1</span>
        <TitledText title="ExchangeKey">{exchangeKey1}</TitledText>
        <TitledText title="WriteKey">{writeKey1}</TitledText>
      </div>

      <div className={styles.grid}>
        <span className={styles.section_title}>Store 2</span>
        <TitledText title="ExchangeKey">{exchangeKey2}</TitledText>
        <TitledText title="WriteKey">{writeKey2}</TitledText>
      </div>
    </div>
  )
}

function DemoVerifySignature(
  props: IKeyStores & { writeKey1: string; msg: string }
) {
  const { ks1, ks2, writeKey1, msg } = props

  const [{ value: data }, run] = useAsync(async () => {
    const sig = await ks1.sign(msg)
    const valid = await ks2.verify(msg, sig, writeKey1)
    return { sig, valid }
  })

  return (
    <div className={styles.grid}>
      <div className={styles.section_title}>Signature demo</div>

      <pre>
        <div>const sig = await ks1.sign(msg)</div>
        <div>const valid = await ks2.verify(msg, sig, writeKey1)</div>
      </pre>

      <Choose>
        <When condition={data === undefined}>
          <button onClick={run}>Verify signature</button>
        </When>

        <Otherwise>
          <TitledText title="Signature">{data!.sig}</TitledText>
          <div style={{ textAlign: 'start' }}>
            <b>Is signature valid:</b> {JSON.stringify(data!.valid)}
          </div>
        </Otherwise>
      </Choose>
    </div>
  )
}

function DemoEncrypt(
  props: IKeyStores & {
    exchangeKey1: string
    exchangeKey2: string
    msg: string
  }
) {
  const { ks1, ks2, exchangeKey1, exchangeKey2, msg } = props

  const [{ value: data }, run] = useAsync(async () => {
    const cipher = await ks1.encrypt(msg, exchangeKey2)
    const decipher = await ks2.decrypt(cipher, exchangeKey1)
    return { cipher, decipher }
  })

  return (
    <div className={styles.grid}>
      <div className={styles.section_title}>Encryption demo</div>

      <pre>
        <div>const cipher = await ks1.encrypt(msg, exchangeKey2)</div>
        <div>const decipher = await ks2.decrypt(cipher, exchangeKey1)</div>
      </pre>

      <button onClick={run}>Encrypt message</button>

      <div className={styles.grid}>
        <If condition={data !== undefined}>
          <TitledText title="Encrypted">{data!.cipher}</TitledText>
          <TitledText title="Decrypted">{data!.decipher}</TitledText>
        </If>
      </div>
    </div>
  )
}

export default App
