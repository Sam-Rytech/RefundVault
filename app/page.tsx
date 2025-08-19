import Image from 'next/image'
import ConnectButton from '../components/ConnectButton'
import DepositForm from '../components/DepositForm'
import WithdrawForm from '../components/WithdrawForm'
import VaultPanel from '../components/VaultPanel'

export default function Page() {
  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="text-2xl font-semibold">Gas Refund Vault</h1>
        </div>
        <ConnectButton />
      </header>

      <VaultPanel />

      <section className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-2xl bg-white/5">
          <h2 className="font-medium mb-3">Deposit</h2>
          <DepositForm />
        </div>
        <div className="p-4 rounded-2xl bg-white/5">
          <h2 className="font-medium mb-3">Withdraw</h2>
          <WithdrawForm />
        </div>
      </section>

      <p className="text-xs text-gray-400">
        Demo only. Use small amounts. Refunds are triggered by the admin via
        /admin page.
      </p>
    </main>
  )
}
