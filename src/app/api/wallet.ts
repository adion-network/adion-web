"use client"
import { useState, useCallback } from "react"
import { get, post } from "./request"
import { enqueueSnackbar } from "notistack"

export interface CreateWalletReq {
  name: string
  address: string
  coin_name: string
}

export interface DeleteWalletReq {
  id: number
}

function useWallet() {
  const [walletList, setWalletList] = useState([])
  const [isWalletListFetching, setIsWalletListFetching] = useState(false)
  const [fetchingWalletListError, setFetchingWalletListError] = useState(null)
  const [fetchingWalletListSuccess, setFetchingWalletListSuccess] = useState(false)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)

  //delete wallet state
  const [isDeleteingWallet, setIsDeleteingWallet] = useState(false)

  const fetchWalletList = useCallback(async (coinName: string | "") => {
    setIsWalletListFetching(true)
    setFetchingWalletListError(null)
    setFetchingWalletListSuccess(false)
    try {
      const { data } = await get("/api/v1/wallet/list/?coin_name=" + coinName)
      setWalletList(data)
      setFetchingWalletListSuccess(true)
    } catch (error: any) {
      setFetchingWalletListError(error.message)
    } finally {
      setIsWalletListFetching(false)
    }
  }, [])

  //create wallet
  const createWallet = useCallback(async (params: CreateWalletReq) => {
    setIsCreatingWallet(true)
    const res = await post("/api/v1/wallet/create/", params)
    setIsCreatingWallet(false)
    return res
  }, [])

  //delete wallet
  const deleteWallet = useCallback(async (params: DeleteWalletReq) => {
    setIsDeleteingWallet(true)
    const res = await post("/api/v1/wallet/delete/", params)
    setIsDeleteingWallet(false)
    return res
  }, [])

  return {
    walletList,
    isWalletListFetching,
    fetchingWalletListError,
    fetchingWalletListSuccess,
    fetchWalletList,
    createWallet,
    isCreatingWallet,
    deleteWallet,
    isDeleteingWallet,
  }
}

export default useWallet
