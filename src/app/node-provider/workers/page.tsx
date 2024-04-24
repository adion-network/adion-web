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
} from "@mui/material"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useMemo, useState } from "react"
import NoProject from "@/components/node-provider/NoProject"
import Header from "@/components/node-provider/Header"
import CommandContent from "@/components/node-provider/CommandContent"
import Link from "next/link"
import { useConfirm } from "material-ui-confirm"

const GraphicsCardStatusIcon = createSvgIcon(GraphicsCardStatus({}), "GraphicsCardStatusIcon")

export default function List() {
  const confirm = useConfirm()
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
    fetchProjectNodes(currentNodeProjectId)
  }, [])

  //table pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const visibleRows = useMemo(
    () => projectNodeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, projectNodeList, rowsPerPage]
  )

  //table select
  const [rowSelected, setRowSelected] = useState<string[]>([])
  const isSelected = (workerId: string) => rowSelected.indexOf(workerId) !== -1

  const handleRowClick = (event: React.MouseEvent<unknown>, deviceId: string) => {
    const selectedIndex = rowSelected.indexOf(deviceId)
    let newSelected: string[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(rowSelected, deviceId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(rowSelected.slice(1))
    } else if (selectedIndex === rowSelected.length - 1) {
      newSelected = newSelected.concat(rowSelected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1))
    }
    setRowSelected(newSelected)
  }

  const handleSelectAllRowsClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((n: any) => n.deviceId)
      setRowSelected(newSelected)
      return
    }
    setRowSelected([])
  }

  //filter
  const [currentFilter, setCurrentFilter] = useState("all")
  const [keyword, setKeyword] = useState("")
  const handleSearchByKeyword = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleChangeFilter(event, "all")
    }
  }

  const handleChangeFilter = async (event: any, newAlignment: string) => {
    setCurrentFilter(newAlignment)
    fetchProjectNodes(currentNodeProjectId, newAlignment, keyword)
    setRowsPerPage(5)
    setPage(0)
  }

  //delete workers
  const handleDeleteWorkers = async () => {
    confirm({
      title: (
        <Typography variant="h6" className="tex-semibold text-white">
          Delete Device
        </Typography>
      ),
      content: (
        <Box className="flex flex-row items-center gap-x-2">
          <WarningAmberOutlined className="text-3xl" color="error"></WarningAmberOutlined>
          <Typography className="text-white">
            Are you sure want to delete {rowSelected.length} device(s)? This action cannot be undone.
          </Typography>
        </Box>
      ),
      confirmationText: "Delete",
      dialogProps: {
        className: "bg-gray-100/50",
        maxWidth: "sm",
      },
      dialogActionsProps: {
        className: "bg-black px-5",
      },
      contentProps: {
        className: "bg-black px-5",
      },
      titleProps: {
        className: "bg-black",
      },
      confirmationButtonProps: {
        variant: "outlined",
        color: "error",
      },
      cancellationButtonProps: {
        variant: "text",
      },
      buttonOrder: ["confirm", "cancel"],
    }).then(() => {
      console.log(rowSelected)
    })
  }

  // command visable
  const [commandVisble, setCommandVisble] = useState(false)
  const joinCommand =
    "curl https://demeters.s3.amazonaws.com/dmos_install.sh | bash -s b98080bdf63948a3bd49361e024f8ec8"

  return (
    <Fragment>
      <Header />
      <Box className="mx-auto 2xl:w-3/5 md:w-2/3 w-4/5 mt-20">
        {fetchProjectNodes?.length === 0 ? (
          <NoProject />
        ) : (
          <Box className="py-8 flex flex-col gap-y-4">
            <Box className="flex justify-end">
              <Button
                variant="contained"
                size="large"
                endIcon={
                  <KeyboardArrowDown className={`duration-300 transition-transform ${commandVisble && "rotate-180"}`} />
                }
                onClick={() => setCommandVisble(!commandVisble)}
              >
                Join the GPU Grid Network
              </Button>
            </Box>
            <Box
              className={`transition-all ${
                commandVisble ? " max-h-60 overflow-y-scroll" : "max-h-0 overflow-y-hidden"
              } duration-300`}
            >
              <CommandContent script={joinCommand}></CommandContent>
            </Box>
            <Box className="flex flex-row justify-between">
              <Box className="flex justify-start space-x-4 w-full">
                <TextField
                  className="w-1/3"
                  placeholder="Search Devices Deployed on the GPU Grid"
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleSearchByKeyword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="text-gray-100/50" />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <ToggleButtonGroup
                  exclusive
                  value={currentFilter}
                  onChange={handleChangeFilter}
                  disabled={isProjectNodeFetching}
                >
                  <ToggleButton value="all" className="font-semibold px-6 rounded-l-xl">
                    Show all
                  </ToggleButton>
                  <ToggleButton value="running" className="font-semibold px-6">
                    <Circle className="text-green-600 text-sm mr-2" />
                    Running
                  </ToggleButton>
                  <ToggleButton value="pending" className="font-semibold px-6">
                    <Circle className="text-yellow-600 text-sm mr-2" />
                    Pending
                  </ToggleButton>
                  <ToggleButton value="offline" className="font-semibold px-6 rounded-r-xl">
                    <Circle className="text-red-600 text-sm mr-2" />
                    Offline
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Button
                disabled={rowSelected.length === 0}
                variant="text"
                className="px-4 text-red-500 disabled:text-gray-300/30"
                color="error"
                startIcon={<Delete />}
                onClick={handleDeleteWorkers}
              >
                Delete
              </Button>
            </Box>
            <Box>
              <TableContainer component={Box}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          indeterminate={rowSelected.length > 0 && rowSelected.length < visibleRows.length}
                          checked={visibleRows.length > 0 && rowSelected.length === visibleRows.length}
                          onChange={handleSelectAllRowsClick}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </TableCell>
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
                      <TableCell className="text-base font-bold text-gray-500" align="center">
                        App Chain
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {(isProjectNodeFetching && (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <SvgSpinners12DotsScaleRotate fontSize={32} className="mx-auto" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )) || (
                    <TableBody>
                      {visibleRows.map((node: any, index: number) => {
                        const isItemSelected = isSelected(node.deviceId)
                        return (
                          <TableRow
                            key={`tbl-content-${index}`}
                            hover
                            selected={isItemSelected}
                            onClick={(event) => handleRowClick(event, node.deviceId)}
                            role="checkbox"
                            className="cursor-pointer"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox color="primary" checked={isItemSelected} />
                            </TableCell>
                            <TableCell className=" text-base">
                              <Link
                                href={`/node-provider/workers/${node.deviceId}`}
                                className="underline hover:text-logo-from"
                              >
                                {(node.deviceId === "" && "-") || node.deviceId.length > 20
                                  ? node.deviceId.slice(0, 6) + "......" + node.deviceId.slice(-6)
                                  : node.deviceId}
                              </Link>
                            </TableCell>
                            <TableCell align="center" className=" text-base">
                              {node.ip || "-"}
                            </TableCell>
                            <TableCell align="center" className=" text-base">
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
                                  <Typography className="text-base">{node.gpuStatus.y}</Typography>
                                  <GraphicsCardStatusIcon color="disabled"></GraphicsCardStatusIcon>
                                  <Typography className="text-base">{node.gpuStatus.n}</Typography>
                                </Box>
                              ) || "-"}
                            </TableCell>
                            <TableCell align="center">
                              {(node.gpuModel.length > 0 &&
                                node.gpuModel.map((model: any, i: number) => (
                                  <Box
                                    className="flex items-center justify-center gap-x-1 bg-gray-100/30 py-2 rounded-lg mb-1"
                                    key={`gpu-node-model-${index}-${i}`}
                                  >
                                    x{model.count} <GraphicsCard className="text-base text-green-600" /> {model.model}
                                  </Box>
                                ))) ||
                                "-"}
                            </TableCell>
                            <TableCell align="center" className="text-base">
                              {node.region || "-"}
                            </TableCell>
                            <TableCell align="center" className="text-base">
                              <Box className="flex justify-center items-center">
                                <GraphicsCard className="text-base mr-1" />
                                <Typography>IO.net</Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  )}
                  <TableFooter>
                    <TableRow>
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
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  )
}
