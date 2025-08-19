'use client'
import { useEffect, useState } from 'react'
import { ensureChain } from '../lib/contract'
import { shorten } from '../lib/utils'

export default function ConnectButton() {
  const [account, setAccount] = useState<string | null>(null)

  async function connect() {
    // @ts-ignore
    const accs: string[] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    await ensureChain()
    setAccount(accs[0])
  }

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.ethereum) {
      // @ts-ignore
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accs: string[]) => setAccount(accs[0] ?? null))
      // @ts-ignore
      window.ethereum.on('accountsChanged', (accs: string[]) =>
        setAccount(accs[0] ?? null)
      )
    }
  }, [])

  return (
    <button
      onClick={connect}
      className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20"
    >
      {account ? shorten(account) : 'Connect Wallet'}
    </button>
  )
}
