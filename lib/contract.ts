'use client'

import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers'
import ABIJson from '../abi/GasRefundVault.json'
const ABI = ABIJson.abi

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 8453)
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL

export async function ensureChain() {
  const eth = window.ethereum
  if (!eth) return
  const chainIdHex = '0x' + CHAIN_ID.toString(16)
  const current = await eth.request({ method: 'eth_chainId' })
  if (current !== chainIdHex) {
    try {
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      })
    } catch (e: any) {
    }
  }
}

export function getProvider() {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    return new BrowserProvider((window as any).ethereum)
  }
  if (RPC_URL) return new JsonRpcProvider(RPC_URL)
  throw new Error('No provider available')
}

export async function getClient() {
  const provider = getProvider() as BrowserProvider
  const signer = await provider.getSigner()
  const contract = new Contract(CONTRACT_ADDRESS, ABI, signer)
  return { provider, signer, contract }
}

export async function getReadOnly() {
  const provider = RPC_URL ? new JsonRpcProvider(RPC_URL) : getProvider()
  const contract = new Contract(CONTRACT_ADDRESS, ABI, provider)
  return { provider, contract }
}

export function getContract() {
  const provider = getProvider()
  return new Contract(CONTRACT_ADDRESS, ABI, provider)
}
