'use client'
import { useEffect, useState } from 'react'
import { formatEther } from 'ethers'
import { getReadOnly, getClient } from '../lib/contract'
import { shorten } from '../lib/utils'

export default function VaultPanel() {
  const [myAddr, setMyAddr] = useState<string | null>(null)
  const [myBal, setMyBal] = useState<string>('0')
  const [admin, setAdmin] = useState<string>('')

  async function refresh() {
    const { contract } = await getReadOnly()
    const a = await contract.admin()
    setAdmin(a)

    try {
      const { signer } = await getClient()
      const me = await signer.getAddress()
      setMyAddr(me)
      const bal = await contract.balances(me)
      setMyBal(formatEther(bal))
    } catch {
      setMyAddr(null)
      setMyBal('0')
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Stat label="You" value={myAddr ? shorten(myAddr) : '—'} />
      <Stat label="Your Vault Balance" value={`${myBal} ETH`} />
      <Stat label="Admin" value={admin ? shorten(admin) : '—'} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-xl">{value}</div>
    </div>
  )
}
