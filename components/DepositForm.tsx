'use client'
import { useState } from 'react'
import { parseEther } from 'ethers'
import { getClient } from '../lib/contract'

export default function DepositForm() {
  const [amount, setAmount] = useState('0.005')
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState<string | null>(null)

  async function onDeposit() {
    setLoading(true)
    setTx(null)
    try {
      const { contract } = await getClient()
      const txResp = await contract.deposit({ value: parseEther(amount) })
      setTx(txResp.hash)
      await txResp.wait()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none"
        placeholder="Amount in ETH"
      />
      <button
        onClick={onDeposit}
        disabled={loading}
        className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
      >
        {loading ? 'Depositing...' : 'Deposit'}
      </button>
      {tx && (
        <a
          className="block text-xs text-blue-400 underline break-all"
          href={`https://basescan.org/tx/${tx}`}
          target="_blank"
        >
          View tx
        </a>
      )}
    </div>
  )
}
