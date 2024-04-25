"use client"
import { useProjects } from "@/contexts/projects"
import { GraphicsCard, GraphicsCardStatus, SvgSpinners12DotsScaleRotate } from "@/components/Icons"
import {
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
  Avatar,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react"
import NoProject from "@/components/node-provider/NoProject"
import Header from "@/components/node-provider/Header"
import CommandContent from "@/components/node-provider/CommandContent"
import Link from "next/link"
import WarningDialog from "@/components/node-provider/WarningDialog"
import { NoAppChain } from "@/components/node-provider/Icons"
import Image from "next/image"

const GraphicsCardStatusIcon = createSvgIcon(GraphicsCardStatus({}), "GraphicsCardStatusIcon")

export default function List() {
  const currentNodeProjectId = 7
  const {
    projectList,
    userProjectList,
    isProjectListFetching,
    isUserProjectListFetching,
    fetchProjectList,
    fetchUserProjectList,
    isCheckingHasProject,
    fetchProjectNodes,
    projectNodeList,
    isProjectNodeFetching,
    setProjectNodeList,
  } = useProjects()
  const router = useRouter()

  useEffect(() => {
    fetchProjectList()
  }, [])

  //table pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  //table select
  const [rowSelected, setRowSelected] = useState<string[]>([])

  const ChainSummary = (props: { logo: ReactNode; workers: number; gpus: number; cpus: number; active?: boolean }) => {
    return (
      <Box className="rounded border border-gray-100/20 p-4 cursor-pointer hover:border-gray-100/75">
        <Box className="flex flex-row items-end">
          <Box className="w-5/12">{props.logo}</Box>
          <Box className="w-7/12 flex justify-between">
            <Box className="flex space-y-2 flex-col justify-center items-center">
              <Typography>{props.workers}</Typography>
              <Typography className="text-gray-100/50">Worker(s)</Typography>
            </Box>
            <Box className="flex space-y-2 flex-col justify-center items-center">
              <Typography>{props.gpus}</Typography>
              <Typography className="text-gray-100/50">GPU(s)</Typography>
            </Box>
            <Box className="flex space-y-2 flex-col justify-center items-center">
              <Typography>{props.cpus}</Typography>
              <Typography className="text-gray-100/50">CPU(s)</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Fragment>
      <Header />
      <Box className="mx-auto 2xl:w-3/5 md:w-2/3 w-4/5 mt-20">
        <Box className="grid grid-cols-3 gap-4">
          <ChainSummary
            logo={
              <Box className="flex space-y-2 flex-col justify-center items-center">
                <NoAppChain sx={{ fontSize: 32 }}></NoAppChain>
                <Typography>No App Chain</Typography>
              </Box>
            }
            gpus={0}
            cpus={0}
            workers={0}
            active
          ></ChainSummary>
          <Box></Box>
          <Box></Box>
          {projectList.map((type: any, index: number) => {
            return type.project.map((p: any, i: number) => (
              <ChainSummary
                logo={
                  <Box className="flex space-y-2 flex-col justify-center items-center">
                    <Avatar sx={{ width: 32, height: 32 }} src={p.logo} alt={`${p.name}-logo`}>
                      {p.name.slice(0, 1)}
                    </Avatar>
                    <Typography>{p.name}</Typography>
                  </Box>
                }
                workers={0}
                gpus={0}
                cpus={0}
                key={`project-${i}`}
              ></ChainSummary>
            ))
          })}
        </Box>
      </Box>
    </Fragment>
  )
}
