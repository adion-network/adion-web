"use client"
import Footer from "@/components/home/Footer"
import Header from "@/components/node-provider/Header"
import { ArrowBackIosNew, Error as ErrorIcon } from "@mui/icons-material"
import { Backdrop, Box, Button, Chip, CircularProgress, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useMemo, useState } from "react"

export default function TxPage({ params }: { params: { txhash: string } }) {
  const [txDetail, setTxDetail] = useState<any>()
  const [fetchError, setFetchError] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const showDetailField = []
  const fetchTxDetail = async () => {
    try {
      // fetch
      setIsFetching(true)
      const res = await fetch(`/api/chain/tx?hash=0x${params.txhash}`)
      if (!res.ok) {
        throw new Error(`Failed to fetch tx detail: ${res.statusText}`)
      }
      setTxDetail((await res.json())?.result || {})
    } catch (error: any) {
      setFetchError(error.message)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    fetchTxDetail()
  }, [])
  const router = useRouter()

  const fee = useMemo(() => {
    if (txDetail?.tx_result?.events) {
      const fee = txDetail.tx_result.events.find((e: any) => {
        return (e.type = "tx" && e.attributes.find((a: any) => a.key == "fee"))
      })
      if (fee) {
        return fee.attributes.find((a: any) => a.key == "fee").value
      } else return ""
    }
  }, [txDetail])

  const gas = useMemo(() => {
    if (txDetail) {
      return `${txDetail?.tx_result?.gas_used || 0} / ${txDetail?.tx_result?.gas_wanted || 0}`
    }
  }, [txDetail])

  const message = useMemo(() => {
    if (txDetail?.tx_result?.events) {
      const message = txDetail.tx_result.events.find((e: any) => {
        return (e.type = "message" && e?.attributes?.[0]?.key === "action")
      })
      if (message) {
        return message.attributes
      } else return []
    }
  }, [txDetail])
  return (
    <Fragment>
      <Backdrop open={isFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Header></Header>
      <div className="mx-auto container">
        <Box className="mb-4">
          <Button
            onClick={() => {
              router.back()
            }}
            variant="text"
            className="hover:scale-105 transition"
            startIcon={<ArrowBackIosNew />}
          >
            Go Back
          </Button>
        </Box>
        {fetchError ? (
          <Box className="flex justify-center text-center text-2xl text-red-500 items-center space-x-2">
            <ErrorIcon></ErrorIcon> <p>{fetchError}</p>
          </Box>
        ) : (
          <Box className="py-4 space-y-4">
            <Typography variant="h6">Transaction Detail</Typography>
            <Box className="border border-gray-400 rounded-xl p-8">
              <Box className="grid grid-cols-[10rem_1fr] gap-4">
                <p className="text-gray-400 font-bold">Hash</p>
                <p>{txDetail?.hash}</p>
                <p className="text-gray-400 font-bold">Status</p>
                <p>
                  {txDetail?.tx_result?.code === 0 ? (
                    <Chip variant="outlined" label="Success" color="success"></Chip>
                  ) : (
                    "Unknow"
                  )}
                </p>
                <p className="text-gray-400 font-bold">Height</p>
                <p>{txDetail?.height}</p>
                <p className="text-gray-400 font-bold">Fee</p>
                <p>{fee}</p>
                <p className="text-gray-400 font-bold">{`Gas (Used/wanted)`}</p>
                <p>{gas}</p>
                <p className="text-gray-400 font-bold">Memo</p>
                <p></p>
              </Box>
            </Box>

            <Typography variant="h6">Message</Typography>
            {message?.length > 0 && (
              <Box className="border border-gray-400 rounded-xl p-8">
                <Box className="grid grid-cols-[10rem_1fr] gap-4">
                  {message.map((m: any, index: number) => {
                    if (m.key !== "msg_index") {
                      return (
                        <Fragment key={`msg-${index}`}>
                          <p className="text-gray-400 font-bold">{m.key.charAt(0).toUpperCase() + m.key.slice(1)}</p>
                          <p className="text-gray-400 font-bold">{m.value}</p>
                        </Fragment>
                      )
                    }
                  })}
                  <div className="col-span-2 max-w-full p-4 rounded-lg bg-gray-100/5 text-sm text-white text-wrap whitespace-pre-wrap overflow-x-scroll">
                    {JSON.stringify(txDetail, null, 2)}
                  </div>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </div>
      <Footer></Footer>
    </Fragment>
  )
}
