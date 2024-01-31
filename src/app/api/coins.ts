"use client"
import { get } from "./request"
import { useState, useCallback } from "react"

function useCoins() {
  const [coinList, setCoinList] = useState<any>([])
  const [isCoinListFetching, setIsCoinListFetching] = useState(false)
  const [fetchingCoinListError, setFetchingCoinListError] = useState(null)
  const [fetchingCoinListSuccess, setFetchingCoinListSuccess] = useState(false)

  const [coinApplicationList, setCoinApplicationList] = useState<any>([])
  const [isCoinApplicationListFetching, setIsCoinApplicationListFetching] = useState(false)
  const [fetchingCoinApplicationListError, setFetchingCoinApplicationListError] = useState<string | null>(null)

  const [serverList, setServerList] = useState<any>([])
  const [isServerListFetching, setIsServerListFetching] = useState(false)
  const [fetchingServerListError, setFetchingServerListError] = useState<string | null>(null)

  const fetchCoinList = useCallback(async () => {
    setIsCoinListFetching(true)
    setFetchingCoinListError(null)
    setFetchingCoinListSuccess(false)
    try {
      const { data } = await get("/api/v1/coin/list")
      setCoinList(data)
      setFetchingCoinListSuccess(true)
    } catch (error: any) {
      setFetchingCoinListError(error.message)
    } finally {
      setIsCoinListFetching(false)
    }
  }, [])

  const fetchCoinApplications = useCallback(async (coinName: string) => {
    setIsCoinApplicationListFetching(true)
    try {
      const { data } = await get("/api/v1/mining/client/list/?coin_name=" + coinName)
      setCoinApplicationList(data)
    } catch (error: any) {
      setFetchingCoinApplicationListError(error.message)
    } finally {
      setIsCoinApplicationListFetching(false)
    }
  }, [])

  const fetchServerList = useCallback(async (providerId: number) => {
    setIsServerListFetching(true)
    try {
      const { data } = await get("/api/v1/mining/server/list/?pool_id=" + providerId)
      setServerList(data)
    } catch (error: any) {
      setFetchingServerListError(error.message)
    } finally {
      setIsServerListFetching(false)
    }
  }, [])

  return {
    coinList,
    isCoinListFetching,
    fetchingCoinListError,
    fetchingCoinListSuccess,
    fetchCoinList,
    fetchCoinApplications,
    coinApplicationList,
    isCoinApplicationListFetching,
    fetchingCoinApplicationListError,
    fetchServerList,
    serverList,
    isServerListFetching,
    fetchingServerListError,
  }
}

export default useCoins
