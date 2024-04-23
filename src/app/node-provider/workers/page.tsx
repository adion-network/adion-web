"use client"
import { useProjects } from "@/contexts/projects"
import {
  ClickMouse,
  GraphicsCard,
  GraphicsCardStatus,
  SvgSpinners12DotsScaleRotate,
  SvgSpinnersBlocksScale,
  UilExchange,
} from "@/components/Icons"
import SupplierTypeSwitch from "@/components/node-provider/SupplierTypeSwitch"
import { Circle, KeyboardArrowDown } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  Backdrop,
  CircularProgress,
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
  Tooltip,
  createSvgIcon,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useMemo, useState } from "react"
import NoProject from "@/components/node-provider/NoProject"
import Link from "next/link"
import Header from "@/components/node-provider/Header"

const GraphicsCardStatusIcon = createSvgIcon(GraphicsCardStatus({}), "GraphicsCardStatusIcon")

export default function List() {
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

  const [isNodeListOpen, setIsNodeListOpen] = useState(false)
  const [currentNodeProjectId, setCurrentNodeProjectId] = useState(-1)
  const [currentFilter, setCurrentFilter] = useState("all")
  const [typeChecked, setTypeChecked] = useState(false)

  //table pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleClickNodeList = async (open: boolean, projectId: number) => {
    if (isNodeListOpen && currentNodeProjectId !== projectId) {
      setCurrentNodeProjectId(projectId)
      await fetchProjectNodes(projectId)
    } else {
      setIsNodeListOpen(open)
      setCurrentNodeProjectId(projectId)
      if (open) {
        await fetchProjectNodes(projectId)
      } else {
        setProjectNodeList([])
      }
    }
    setCurrentFilter("all")
  }

  const handleChangeFilter = async (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setCurrentFilter(newAlignment)
    fetchProjectNodes(currentNodeProjectId, newAlignment)
    setRowsPerPage(5)
    setPage(0)
  }

  useEffect(() => {
    const processMenu = async () => {
      await fetchProjectList()
    }
    if (projectList.length == 0) {
      processMenu()
    }
  }, [])

  useEffect(() => {
    const processChecked = async () => {
      const result = await fetchUserProjectList(projectList[0].id)
      if (result.length === 0) {
        setTypeChecked(true)
        fetchUserProjectList(projectList[1].id)
      }
    }
    if (projectList.length > 0) {
      processChecked()
    }
  }, [projectList])

  useEffect(() => {
    const openDefaultNodeList = async () => {
      setIsNodeListOpen(true)
      setCurrentNodeProjectId(userProjectList[0].project.id)
      await fetchProjectNodes(userProjectList[0].project.id)
    }
    if (userProjectList.length > 0) {
      openDefaultNodeList()
    }
  }, [userProjectList])

  const handleCheckType = () => {
    typeChecked ? fetchUserProjectList(projectList[0].id) : fetchUserProjectList(projectList[1].id)
    setTypeChecked(!typeChecked)
  }

  const visibleRows = useMemo(
    () => projectNodeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, projectNodeList, rowsPerPage]
  )

  return (
    <Fragment>
      <Header />
      <Box className="mx-auto 2xl:w-3/5 md:w-2/3 w-4/5 mt-20">
        <Backdrop
          open={isProjectListFetching || isUserProjectListFetching || isCheckingHasProject}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
        <Box className="flex justify-start items-center">
          <Box>
            <SupplierTypeSwitch onChange={handleCheckType} checked={typeChecked} />
          </Box>
          <Box className="ml-4">
            <Button
              variant="contained"
              color="success"
              startIcon={<ClickMouse />}
              className="h-[55px] px-6 text-base font-extrabold rounded-lg"
              onClick={() => {
                router.push("/node-provider/supplier/create")
              }}
            >
              Connect New Device
            </Button>
          </Box>
        </Box>
        {(userProjectList?.length === 0 && (
          <Fragment>
            <NoProject />
          </Fragment>
        )) || (
          <Box className="py-10 flex flex-col justify-start gap-10">
            {userProjectList.map((item: any, index: number) => (
              <Box className="flex relative flex-col gap-4" key={`node-${index}`}>
                <Box className="flex justify-between border-b border-stone-400 items-center">
                  <Box className="py-3 px-4 flex justify-between rounded-t-lg gap-2 items-center bg-gray-100 bg-opacity-15 w-1/5">
                    <Avatar src={item.project.logo}>{item.project.name.slice(0, 1).toUpperCase()}</Avatar>
                    <Typography className="ml-2 text-lg font-extrabold">{item.project.name}</Typography>
                    <KeyboardArrowDown
                      className={`cursor-pointer transition-transform ${
                        isNodeListOpen && currentNodeProjectId === item.project.id && "rotate-180"
                      }`}
                      onClick={async () => {
                        await handleClickNodeList(!isNodeListOpen, item.project.id)
                      }}
                    />
                  </Box>
                  <Link href={`/node-provider/supplier/create?action=switch&from_project_id=${item.project.id}`}>
                    <Tooltip title="Switch Project" arrow placement="top" className="text-lg">
                      <Button>
                        <UilExchange fontWeight={32} fontSize={26} />
                      </Button>
                    </Tooltip>
                  </Link>
                </Box>
                <Box className="flex justify-between gap-4 py-4">
                  <Paper
                    className="bg-gray-800 w-1/3 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4"
                    elevation={3}
                  >
                    <Typography className="text-gray-500">Total CPU(s)</Typography>
                    <Typography className="mt-5 font-extrabold" variant="h5">
                      {item.summary.cpu_total}
                    </Typography>
                    <Typography className="mt-1 font-extrabold" variant="h6">
                      Total CPU(s)
                    </Typography>
                  </Paper>
                  <Paper
                    className="bg-gray-800 w-1/3 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4"
                    elevation={3}
                  >
                    <Typography className="text-gray-500">Total GPU(s)</Typography>
                    <Typography className="mt-5 font-extrabold" variant="h5">
                      {item.summary.gpu_total}
                    </Typography>
                    <Typography className="mt-1 font-extrabold" variant="h6">
                      Total GPU(s)
                    </Typography>
                  </Paper>
                  <Paper
                    className="bg-gray-800 w-1/3 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4"
                    elevation={3}
                  >
                    <Typography className="text-gray-500">Total Node(s)</Typography>
                    <Typography className="mt-5 font-extrabold" variant="h5">
                      {item.summary.node_total}
                    </Typography>
                    <Typography className="mt-1 font-extrabold" variant="h6">
                      Total Node(s)
                    </Typography>
                  </Paper>
                </Box>
                {isNodeListOpen && currentNodeProjectId === item.project.id && (
                  <Box className="flex flex-col">
                    <Box className="flex justify-start border-b border-stone-400">
                      <ToggleButtonGroup
                        exclusive
                        value={currentFilter}
                        onChange={handleChangeFilter}
                        disabled={isProjectNodeFetching}
                      >
                        <ToggleButton value="all" className="font-extrabold px-6">
                          Show all
                        </ToggleButton>
                        <ToggleButton value="running" className="font-extrabold px-6">
                          <Circle className="text-green-600 text-sm mr-2" />
                          Running
                        </ToggleButton>
                        <ToggleButton value="pending" className="font-extrabold px-6">
                          <Circle className="text-yellow-600 text-sm mr-2" />
                          Pending
                        </ToggleButton>
                        <ToggleButton value="offline" className="font-extrabold px-6">
                          <Circle className="text-red-600 text-sm mr-2" />
                          Offline
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>

                    <TableContainer
                      component={Paper}
                      className="mt-5 bg-gray-800 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4"
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className="text-base font-bold text-gray-500" align="center">
                              DeviceID
                            </TableCell>
                            <TableCell className="text-base font-bold text-gray-500" align="center">
                              IP
                            </TableCell>
                            <TableCell className="text-base font-bold text-gray-500" align="center">
                              Status
                            </TableCell>
                            <TableCell className="text-base font-bold text-gray-500" align="center">
                              GPU Status
                            </TableCell>
                            <TableCell className="text-base font-bold text-gray-500 w-[300px]" align="center">
                              GPU Model
                            </TableCell>
                            <TableCell className="text-base font-bold text-gray-500" align="center">
                              Region
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        {(isProjectNodeFetching && (
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={6} align="center">
                                <SvgSpinners12DotsScaleRotate fontSize={32} className="mx-auto" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )) || (
                          <TableBody>
                            {visibleRows.map((node: any, index: number) => (
                              <TableRow key={`tbl-content-${index}`}>
                                <TableCell className="font-bold text-base">
                                  {(node.devideId === "" && "-") || node.devideId.length > 20
                                    ? node.devideId.slice(0, 6) + "......" + node.devideId.slice(-6)
                                    : node.devideId}
                                </TableCell>
                                <TableCell align="center" className="font-bold text-base">
                                  {node.ip || "-"}
                                </TableCell>
                                <TableCell align="center" className="font-bold text-base">
                                  {node.status === "running" && (
                                    <Box className="items-center">
                                      <Circle className="text-green-600 text-sm mr-1" />
                                      Running
                                    </Box>
                                  )}
                                  {node.status === "offline" && (
                                    <Box className="items-center">
                                      <Circle className="text-red-600 text-sm mr-1" />
                                      Offline
                                    </Box>
                                  )}
                                  {node.status === "pending" && (
                                    <Box className="items-center">
                                      <Circle className="text-yellow-600 text-sm mr-1" />
                                      Pending
                                    </Box>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  {(
                                    <Box className="space-x-1 flex justify-center">
                                      <GraphicsCardStatusIcon className="text-green-600"></GraphicsCardStatusIcon>
                                      <Typography className="font-bold text-base">{node.gpuStatus.y}</Typography>
                                      <GraphicsCardStatusIcon color="disabled"></GraphicsCardStatusIcon>
                                      <Typography className="font-bold text-base">{node.gpuStatus.n}</Typography>
                                    </Box>
                                  ) || "-"}
                                </TableCell>
                                <TableCell align="center" className="font-bold">
                                  {(node.gpuModel.length > 0 &&
                                    node.gpuModel.map((model: any, i: number) => (
                                      <Box
                                        className="flex items-center justify-center gap-x-1 bg-gray-600 py-2 rounded-lg mb-1"
                                        key={`gpu-node-model-${index}-${i}`}
                                      >
                                        x{model.count} <GraphicsCard /> {model.model}
                                      </Box>
                                    ))) ||
                                    "-"}
                                </TableCell>
                                <TableCell align="center" className="font-bold text-base">
                                  {node.region || "-"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        )}
                        <TableFooter>
                          <TablePagination
                            rowsPerPageOptions={[5, 20, 50, 100]}
                            count={projectNodeList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => {
                              setPage(newPage)
                            }}
                            onRowsPerPageChange={(event) => {
                              setRowsPerPage(parseInt(event.target.value, 10))
                              setPage(0)
                            }}
                          ></TablePagination>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

                {item.summary.node_total === 0 && item.summary.cpu_total === 0 && item.summary.gpu_total === 0 && (
                  <Box className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center rounded-xl flex-col backdrop-blur-[5px] border-2 border-opacity-80 border-gray-500">
                    <SvgSpinnersBlocksScale fontSize={80} className="text-gray-500 mb-3" />
                    <Typography variant="h6" className="font-extrabold text-gray-500">
                      Deploying...
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Fragment>
  )
}
