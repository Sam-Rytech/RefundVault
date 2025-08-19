import React from 'react'

export const metadata = {
  title: 'Gas Refund Vault',
  description: 'Deposit ETH and receive admin-triggered gas refunds (demo).',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100">
        <div className="max-w-3xl mx-auto p-6">{children}</div>
      </body>
    </html>
  )
}
