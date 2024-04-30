"use client"
import {
  Avatar,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  createSvgIcon,
} from "@mui/material"
import { GraphicsCard, GraphicsCardStatus, SvgSpinners12DotsScaleRotate } from "../Icons"
import { useProjects } from "@/contexts/projects"
import Link from "next/link"
import { Circle } from "@mui/icons-material"
import { NoAppChain } from "./Icons"

const GraphicsCardStatusIcon = createSvgIcon(GraphicsCardStatus({}), "GraphicsCardStatusIcon")

export default function WorkersList({
  rowSelected,
  onSelectedRow,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: {
  rowSelected: any[]
  onSelectedRow: (rowSelected: string[]) => void
  page: number
  onPageChange: (newPage: number) => void
  rowsPerPage: number
  onRowsPerPageChange: (newRowsPerPage: number) => void
}) {
  const { projectNodeList, isProjectNodeFetching, projectNodeListCount } = useProjects()

  //table select
  const isSelected = (workerId: string) => rowSelected.findIndex((item) => item.deviceId === workerId) !== -1

  const handleRowClick = (event: React.MouseEvent<unknown>, node: any) => {
    const selectedIndex = rowSelected.findIndex((item) => item.deviceId === node.deviceId)
    let newSelected: any[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(rowSelected, node)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(rowSelected.slice(1))
    } else if (selectedIndex === rowSelected.length - 1) {
      newSelected = newSelected.concat(rowSelected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1))
    }
    onSelectedRow(newSelected)
  }

  const handleSelectAllRowsClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelectedRow(projectNodeList)
      return
    }
    onSelectedRow([])
  }

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={rowSelected.length > 0 && rowSelected.length < projectNodeList.length}
                checked={projectNodeList.length > 0 && rowSelected.length === projectNodeList.length}
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
            {projectNodeList.map((node: any, index: number) => {
              const isItemSelected = isSelected(node.deviceId)
              return (
                <TableRow
                  key={`tbl-content-${index}`}
                  hover
                  selected={isItemSelected}
                  onClick={(event) => handleRowClick(event, node)}
                  role="checkbox"
                  className="cursor-pointer"
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell className=" text-base">
                    <Link href={`/node-provider/workers/${node.deviceId}`} className="underline hover:text-logo-from">
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
                      {node?.projectInfo ? (
                        <Avatar className="mr-1" src={node?.projectInfo?.logo} sx={{ width: 20, height: 20 }}>
                          {node?.projectInfo?.name}{" "}
                        </Avatar>
                      ) : (
                        <NoAppChain className="text-base mr-1" />
                      )}

                      <Typography>{node?.projectInfo?.name || "No App Chain"}</Typography>
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
              rowsPerPageOptions={[10, 20, 50, 100]}
              count={projectNodeListCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => {
                onPageChange(newPage)
              }}
              onRowsPerPageChange={(event) => {
                onRowsPerPageChange(parseInt(event.target.value, 10))
              }}
            ></TablePagination>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
