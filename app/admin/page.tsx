'use client'

import { useEffect, useState } from 'react'
import RefundTrigger from '../../components/RefundTrigger'
import { getClient, getReadOnly, getContract } from '../../lib/contract'
import { shorten } from '../../lib/utils'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [adminAddr, setAdminAddr] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      try {
        const { contract } = await getReadOnly()
        const admin = await contract.admin()
        setAdminAddr(admin)
        const { signer } = await getClient().catch(() => ({
          signer: null as any,
        }))
        const me = signer ? await signer.getAddress() : null
        setIsAdmin(!!me && me.toLowerCase() === admin.toLowerCase())
      } catch {
        setIsAdmin(false)
      }
    })()
  }, [])

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="text-sm text-gray-400">
        Contract admin: {adminAddr ? shorten(adminAddr) : '…'}
      </div>
      {isAdmin ? (
        <div className="p-4 rounded-2xl bg-white/5">
          <RefundTrigger />
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-white/5">
          Connect as admin to trigger refunds.
        </div>
      )}
    </main>
  )
}
