// import { WalletBalance } from "@/components/wallet-balance"
// import { TransactionHistory } from "@/components/transaction-history"
// import { PaymentMethods } from "@/components/payment-methods"

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Your Wallet
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <WalletBalance /> */}<p>Coming Soon...</p>
        <div className="lg:col-span-2">
          {/* <PaymentMethods />
          <TransactionHistory /> */}
        </div>
      </div>
    </div>
  )
}

