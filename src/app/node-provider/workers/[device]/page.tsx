"use client"
import { useProjects } from "@/contexts/projects"
import { GraphicsCard, GraphicsCardStatus, SvgSpinners12DotsScaleRotate } from "@/components/Icons"
import {
  ArrowBack,
  ArrowBackIos,
  ArrowBackIosNew,
  Circle,
  Delete,
  KeyboardArrowDown,
  Search,
  Warning,
  WarningAmberOutlined,
  WarningOutlined,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  createSvgIcon,
  TextField,
  InputAdornment,
  Checkbox,
  Divider,
} from "@mui/material"
import { useParams } from "next/navigation"
import { Fragment, useEffect, useMemo, useState } from "react"
import NoProject from "@/components/node-provider/NoProject"
import Header from "@/components/node-provider/Header"
import CommandContent from "@/components/node-provider/CommandContent"
import Link from "next/link"
import { LogosUbuntu } from "@/components/node-provider/Icons"
import WarningDialog from "@/components/node-provider/WarningDialog"

const GraphicsCardStatusIcon = createSvgIcon(GraphicsCardStatus({}), "GraphicsCardStatusIcon")

export default function Page({ params }: { params: { device: string } }) {
  //delete workers
  const handleDeleteWorkers = async () => {
    console.log("111")
  }

  // command visable
  const [commandVisble, setCommandVisble] = useState(false)
  const joinCommand =
    "curl https://demeters.s3.amazonaws.com/dmos_install.sh | bash -s b98080bdf63948a3bd49361e024f8ec8"

  const [showWarning, setShowWarning] = useState(false)

  return (
    <Fragment>
      <WarningDialog
        open={showWarning}
        onOk={handleDeleteWorkers}
        onCancel={() => setShowWarning(false)}
        title="Delete Device"
        description={`Are you sure you want to delete this device? This action cannot be undone.`}
        okText="DELETE"
      ></WarningDialog>
      <Header />
      <Box className="mx-auto 2xl:w-3/5 md:w-2/3 w-4/5 mt-20">
        <Box className="flex flex-col space-y-4">
          <Box className="flex justify-start">
            <Button
              href="/node-provider/workers"
              variant="text"
              className="hover:scale-105 transition"
              startIcon={<ArrowBackIosNew />}
            >
              Back to workers
            </Button>
          </Box>
          <Box className="py-8 flex flex-row justify-between">
            <Box className="flex flex-row items-center space-x-3">
              <Typography className="font-semibold 2xl:text-4xl md:text-3xl">
                <span className="text-gray-100/50">IP:</span> 192.168.0.1
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
          <Box>
            <Typography className="text-gray-100/50">Up For: 2 days 09:40:12</Typography>
          </Box>
          <Box className="flex justify-between pb-8">
            <Box className="flex flex-row gap-x-4">
              <Typography className="flex items-center">
                <Circle className="text-green-600 text-sm mr-2" />
                Running
              </Typography>
              <Typography>
                <span className="text-gray-100/50">DiviceId: </span>
                {params.device}
              </Typography>
            </Box>
            <Box className="flex flex-row gap-x-6">
              <Box className="flex justify-center items-center">
                <GraphicsCard className="text-base mr-1" />
                <Typography>IO.net</Typography>
              </Box>
              <Typography>
                <span className="text-gray-100/50">Region: </span>
                US
              </Typography>
              <Box className="flex flex-row gap-x-2">
                <span className="text-gray-100/50">GPU Status: </span>
                <Box className="flex space-x-1 justify-center gap-x-1">
                  <GraphicsCardStatusIcon className="text-green-600"></GraphicsCardStatusIcon>
                  <Typography className="text-base">4</Typography>
                  <GraphicsCardStatusIcon color="disabled"></GraphicsCardStatusIcon>
                  <Typography className="text-base">0</Typography>
                </Box>
              </Box>
              <Box className="flex items-center">
                x4
                <GraphicsCard className="text-base text-green-600 mx-1" /> RTX 2080Ti
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
              <Typography variant="body1">4 GPU Available</Typography>
              <Typography variant="body1">4 GPU Active</Typography>
              <Typography variant="body1">0 GPU Pending</Typography>
            </Box>
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">GPU</Typography>
              <Typography variant="body1">4 GPU Available</Typography>
              <Typography variant="body1">4 GPU Active</Typography>
              <Typography variant="body1">0 GPU Pending</Typography>
            </Box>
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">GPU</Typography>
              <Typography variant="body1">4 GPU Available</Typography>
              <Typography variant="body1">4 GPU Active</Typography>
              <Typography variant="body1">0 GPU Pending</Typography>
            </Box>
            <Box className="pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">GPU</Typography>
              <Typography variant="body1">4 GPU Available</Typography>
              <Typography variant="body1">4 GPU Active</Typography>
              <Typography variant="body1">0 GPU Pending</Typography>
            </Box>
            <Box className="col-span-2 pl-6 py-4 rounded-lg bg-gray-100/10 flex flex-col">
              <Typography variant="subtitle1">GPU</Typography>
              <Typography variant="body1">4 GPU Available</Typography>
              <Typography variant="body1">Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz</Typography>
              <Typography variant="body1">0 GPU Pending</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}
