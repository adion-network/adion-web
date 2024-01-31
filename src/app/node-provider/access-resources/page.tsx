"use client"

import useWorkers from "@/app/api/worker"
import Navigator from "@/components/node-provider/Navigator"
import { Box, Backdrop, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"

export default function AccessResources() {
  const { workerList, fetchWorkerList, isWorkListFetching } = useWorkers()

  useEffect(() => {
    fetchWorkerList()
  }, [])
  return (
    <Box>
      <Backdrop open={isWorkListFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Navigator></Navigator>
      <Box className="w-[1000px] ml-auto mr-auto mt-6 mb-10">
        <Typography variant="h5">Access New Resource</Typography>
        <Typography variant="subtitle1" className="text-gray-400 mt-2">
          Add A Worker For Mining Pools
        </Typography>
        <Box></Box>
      </Box>
    </Box>
  )
}
