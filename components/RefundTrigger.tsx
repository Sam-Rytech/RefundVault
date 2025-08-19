'use client'
import { useState } from 'react'
import { parseEther } from 'ethers'
import { getClient } from '../lib/contract'

export default function RefundTrigger() {
  const [user, setUser] = useState('')
  const [amount, setAmount] = useState('0.0005')
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onRefund() {
    setLoading(true)
    setError(null)
    setTx(null)
    try {
      const { contract } = await getClient()
      const txResp = await contract.refund(user, parseEther(amount))
      setTx(txResp.hash)
      await txResp.wait()
    } catch (e: any) {
      setError(e?.message ?? 'Refund failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="User address 0x..."
        className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Refund amount (ETH)"
        className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none"
      />
      <button
        onClick={onRefund}
        disabled={loading || !user}
        className="px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50"
      >
        {loading ? 'Refunding...' : 'Trigger Refund'}
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
      {error && <div className="text-xs text-rose-400">{error}</div>}
      <p className="text-xs text-gray-400">
        Must be connected as <b>admin</b> (deployer) to call <code>refund</code>
        .
      </p>
    </div>
  )
}
