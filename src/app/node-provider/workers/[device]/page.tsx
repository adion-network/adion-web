"use client"
import { GraphicsCard, GraphicsCardStatus } from "@/components/Icons"
import { ArrowBackIosNew, Circle, Delete } from "@mui/icons-material"
import { Box, Button, Typography, createSvgIcon, Divider, Backdrop, CircularProgress, Avatar } from "@mui/material"
import { Fragment, useEffect, useMemo, useState } from "react"
import Header from "@/components/node-provider/Header"
import { LogosUbuntu, NoAppChain } from "@/components/node-provider/Icons"
import WarningDialog from "@/components/node-provider/WarningDialog"
import { useRouter } from "next/navigation"
import { useProjects } from "@/contexts/projects"
import { filesize } from "filesize"

const GraphicsCardStatusIcon = createSvgIcon(GraphicsCardStatus({}), "GraphicsCardStatusIcon")

export default function Page({ params }: { params: { device: string } }) {
  const router = useRouter()
  const { fetchNodeDetail, isNodeDetailFetching, nodeDetail, removeNodes, isRemovingNode } = useProjects()
  const [showWarning, setShowWarning] = useState(false)

  //delete workers
  const handleDeleteWorker = () => {
    removeNodes([params.device])
      .then(() => {
        setShowWarning(false)
        router.push("/node-provider/workers")
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchNodeDetail([params.device])
  }, [])

  const gpuStatus = useMemo(() => {
    const gpu_status = {
      y: 0,
      n: 0,
      model: [] as any[],
    }
    const modelCount: any = {}
    if (nodeDetail?.gpu) {
      nodeDetail.gpu.map((g: any) => {
        g.status === "ok" ? gpu_status.y++ : gpu_status.n++
        if (modelCount[g.product] === undefined) {
          modelCount[g.product] = 0
        }
        modelCount[g.product]++
      })
      Object.keys(modelCount).map((k) => {
        gpu_status.model.push({
          model: k,
          count: modelCount[k],
        })
      })
    }
    return gpu_status
  }, [nodeDetail])

  function TimeElapsed({ createdAt }: { createdAt: number }) {
    const [currentTime, setCurrentTime] = useState(Date.now())

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(Date.now())
      }, 1000) // Update every second

      return () => clearInterval(interval) // Clean up the interval on component unmount
    }, [])

    function formatDuration(createdAt: number, currentTime: number) {
      const milliseconds = currentTime - createdAt
      let seconds = Math.floor(milliseconds / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      let days = Math.floor(hours / 24)

      seconds = seconds % 60
      minutes = minutes % 60
      hours = hours % 24

      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    }

    return <span>{formatDuration(createdAt * 1000, currentTime)}</span>
  }

  const storageDisplay = useMemo(() => {
    const storageDisplay = {
      totalSize: 0,
    }
    if (nodeDetail?.disk) {
      nodeDetail.disk.map((d: any) => {
        if (d.name.startsWith("sd")) {
          storageDisplay.totalSize += d.total
        }
      })
    }
    return storageDisplay
  }, [nodeDetail])

  return (
    <Fragment>
      <WarningDialog
        open={showWarning}
        onOk={handleDeleteWorker}
        onCancel={() => setShowWarning(false)}
        title="Delete Device"
        description={`Are you sure you want to delete this device? This action cannot be revert.`}
        okText="Delete"
        okLoading={isRemovingNode}
      ></WarningDialog>
      <Header />
      <Backdrop open={isNodeDetailFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Box hidden={isNodeDetailFetching} className="mx-auto 2xl:w-2/3 w-4/5 mt-20">
        <Box className="flex flex-col space-y-4">
          <Box className="flex justify-start">
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
          <Box className="py-8 flex flex-row justify-between">
            <Box className="flex flex-row items-center space-x-3">
              <Typography className="font-semibold 2xl:text-4xl md:text-3xl">
                <span className="text-gray-100/50">IP:</span> {nodeDetail?.ip}
              </Typography>
              <LogosUbuntu className="2xl:text-4xl md:text-3xl"></LogosUbuntu>
            </Box>
            <Button
              variant="text"
              className="px-4 text-red-500 disabled:text-gray-300/30"
              color="error"
              startIcon={<Delete />}
              onClick={() => setShowWarning(true)}
            >
              Delete
            </Button>
          </Box>
          <Box className="w-full">
            <Typography>Attributes</Typography>
            <Divider className="py-2"></Divider>
          </Box>
          <Box className="text-gray-100/50">
            Up For: <TimeElapsed createdAt={nodeDetail?.created_at} />
          </Box>
          <Box className="flex justify-between pb-8 items-start">
            <Box className="flex flex-row gap-x-4">
              <Typography className="flex items-center">
                {nodeDetail?.status === "running" && <Circle className="text-green-600 text-sm mr-2" />}
                {nodeDetail?.status === "offline" && <Circle className="text-red-600 text-sm mr-2" />}
                {nodeDetail?.status.charAt(0).toUpperCase() + nodeDetail?.status.slice(1)}
              </Typography>
              <Typography>
                <span className="text-gray-100/50">DiviceId: </span>
                {params.device}
              </Typography>
            </Box>
            <Box className="flex flex-row gap-x-6 items-start">
              {!nodeDetail?.project ? (
                <Box className="flex items-center text-gray-100/50">
                  <NoAppChain className="text-base mr-1" />
                  <Typography>No Project</Typography>
                </Box>
              ) : (
                <Box className="flex items-center text-gray-100/50">
                  <Avatar src={nodeDetail.project.logo} sx={{ width: 24, height: 24 }} className="text-base mr-1" />
                  <Typography>{nodeDetail.project.name}</Typography>
                </Box>
              )}
              <Typography>
                <span className="text-gray-100/50">Region: </span>
                {nodeDetail?.geo}
              </Typography>
              <Box className="flex flex-row gap-x-2">
                <span className="text-gray-100/50">GPU Status: </span>
                <Box className="flex space-x-1 justify-center gap-x-1">
                  <GraphicsCardStatusIcon className="text-green-600"></GraphicsCardStatusIcon>
                  <Typography className="text-base">{gpuStatus.y}</Typography>
                  <GraphicsCardStatusIcon color="disabled"></GraphicsCardStatusIcon>
                  <Typography className="text-base">{gpuStatus.n}</Typography>
                </Box>
              </Box>
              <Box className="flex justify-center flex-col space-y-1">
                {gpuStatus.model.map((k, index: number) => (
                  <Box className="flex items-center" key={`gpu-status-${index}`}>
                    x{k.count}
                    <GraphicsCard className="text-base text-green-600 mx-1" /> {k.model}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="w-full">
            <Typography>Resources</Typography>
            <Divider className="py-2"></Divider>
          </Box>
          <Box className="grid grid-flow-row-dense grid-cols-6 gap-4 w-full">
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">GPU</Typography>
              <Typography variant="body1" className="text-[#40B883]">
                {filesize(nodeDetail?.gpu[0]?.memory || 0)} Memory
              </Typography>
              <Typography variant="body1" className="text-[#FF8A65]">
                {nodeDetail?.gpu[0]?.temperature || "-"} Temperature
              </Typography>
              <Typography variant="body1" className="text-[#FAAE1A]">
                {nodeDetail?.gpu[0]?.fan_speed || "-"} Fan speed
              </Typography>
            </Box>
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">Memory</Typography>
              <Typography variant="body1" className="text-[#40B883]">
                {filesize(nodeDetail?.memory?.capacity || 0)} Available
              </Typography>
              <Typography variant="body1" className="text-[#FF8A65]">
                {filesize(nodeDetail?.memory?.used || 0)} Active
              </Typography>
              <Typography variant="body1" className="text-[#FAAE1A]">
                {nodeDetail?.memory?.used_percent?.toFixed(2) || 0}% Usage rate
              </Typography>
            </Box>
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">Storage</Typography>
              <Typography variant="body1" className="text-[#40B883]">
                {filesize(storageDisplay.totalSize || 0)} Total
              </Typography>
            </Box>
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">Bandwidth</Typography>
              <Typography variant="body1" className="text-[#40B883]">
                {filesize(nodeDetail?.memory?.capacity || 0)} Available
              </Typography>
              <Typography variant="body1" className="text-[#FF8A65]">
                {filesize(nodeDetail?.memory?.used || 0)} Active
              </Typography>
              <Typography variant="body1" className="text-[#FAAE1A]">
                {nodeDetail?.memory?.used_percent?.toFixed(2) || 0}% Usage rate
              </Typography>
            </Box>
            <Box className="col-span-2 pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">CPU</Typography>
              <Typography variant="body1" className="text-[#40B883]">
                {nodeDetail?.cpu_core || 0} Cores
              </Typography>
              <Typography variant="body1" className="text-[#FF8A65]">
                {nodeDetail?.cpu?.model || ""}
              </Typography>
              <Typography variant="body1" className="text-[#FAAE1A]">
                {nodeDetail?.cpu?.mhz?.toFixed(2) || 0} MHz
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}
