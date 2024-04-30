"use client"
import { useProjects } from "@/contexts/projects"
import { Circle, Delete, KeyboardArrowDown, Search } from "@mui/icons-material"
import { Box, Button, ToggleButtonGroup, ToggleButton, TextField, InputAdornment } from "@mui/material"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import NoProject from "@/components/node-provider/NoProject"
import Header from "@/components/node-provider/Header"
import CommandContent from "@/components/node-provider/CommandContent"
import WarningDialog from "@/components/node-provider/WarningDialog"
import WorkersList from "@/components/node-provider/WorkersList"
import { enqueueSnackbar } from "notistack"

export default function List() {
  const { fetchProjectNodes, isProjectNodeFetching, removeNodes, isRemovingNode } = useProjects()
  const router = useRouter()

  //table related
  const [rowSelected, setRowSelected] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  //filter
  const [currentFilter, setCurrentFilter] = useState("all")
  const [keyword, setKeyword] = useState("")
  const handleSearchByKeyword = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleChangeFilter(event, "all")
    }
  }

  const handleChangeFilter = async (event: any, newAlignment: string) => {
    setRowSelected([])
    setCurrentFilter(newAlignment)
    fetchProjectNodes({ page: page, pageSize: rowsPerPage, status: newAlignment, keyword: keyword })
    setRowsPerPage(10)
    setPage(0)
  }

  const handlePageChange = async (newPage: number) => {
    setRowSelected([])
    setPage(newPage)
    fetchProjectNodes({ page: newPage, pageSize: rowsPerPage, status: currentFilter, keyword: keyword })
  }

  const handlePageSizeChange = async (newPageSize: number) => {
    setRowSelected([])
    setPage(0)
    setRowsPerPage(newPageSize)
    fetchProjectNodes({ page: 0, pageSize: newPageSize, status: currentFilter, keyword: keyword })
  }

  //delete workers
  const [showDeleteWarning, setShowDeleteWaning] = useState(false)
  const handleDeleteWorkers = () => {
    removeNodes(rowSelected.map((item) => item.deviceId))
      .then(() => {
        setShowDeleteWaning(false)
        fetchProjectNodes({ page: page, pageSize: rowsPerPage, status: currentFilter, keyword: keyword })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  // command visable
  const [commandVisble, setCommandVisble] = useState(false)

  useEffect(() => {
    fetchProjectNodes({ page: page, pageSize: rowsPerPage })
  }, [])

  return (
    <Fragment>
      <WarningDialog
        open={showDeleteWarning}
        onOk={handleDeleteWorkers}
        onCancel={() => setShowDeleteWaning(false)}
        title="Delete Device"
        okLoading={isRemovingNode}
        description={`Are you sure you want to delete ${rowSelected.length} device(s)? This action cannot be revert.`}
        okText="Delete"
      ></WarningDialog>
      <Header />
      <Box className="mx-auto 2xl:w-2/3 w-4/5 mt-20">
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
              <CommandContent></CommandContent>
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
                onClick={() => setShowDeleteWaning(true)}
              >
                Delete
              </Button>
            </Box>
            <Box>
              <WorkersList
                rowSelected={rowSelected}
                onSelectedRow={setRowSelected}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handlePageSizeChange}
              ></WorkersList>
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  )
}
