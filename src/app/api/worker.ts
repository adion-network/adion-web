"use client"
import { get } from "./request"
import { useState, useCallback } from "react"

function useWorkers() {
  const [workerList, setWorkerList] = useState<any>([])
  const [isWorkListFetching, setIsWorkListFetching] = useState(false)
  const [fetchingWorkerListError, setFetchingWorkerListError] = useState(null)
  const [fetchingWorderListSuccess, setFetchingWorderListSuccess] = useState(false)

  const fetchWorkerList = useCallback(async () => {
    setIsWorkListFetching(true)
    try {
      const { data } = await get("/api/v1/worker/list")
      setWorkerList(data)
      setFetchingWorderListSuccess(true)
    } catch (error: any) {
      setFetchingWorkerListError(error.message)
    } finally {
      setIsWorkListFetching(false)
    }
  }, [])

  return {
    workerList,
    isWorkListFetching,
    fetchingWorkerListError,
    fetchingWorderListSuccess,
    fetchWorkerList,
  }
}

export default useWorkers
