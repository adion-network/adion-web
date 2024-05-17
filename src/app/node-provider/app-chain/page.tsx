"use client"
import { useProjects } from "@/contexts/projects"
import { Box, Button, Typography, Avatar, Divider, Skeleton } from "@mui/material"
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react"
import Header from "@/components/node-provider/Header"
import { ConnectToChain, NoAppChain } from "@/components/node-provider/Icons"
import WorkersList from "@/components/node-provider/WorkersList"
import { UilExchange } from "@/components/Icons"
import { useRouter, useSearchParams } from "next/navigation"

export default function List() {
  const router = useRouter()
  const requestParams = useSearchParams()
  const [currentProject, setCurrentProject] = useState<any>({})
  const {
    userProjectList,
    fetchUserProjectList,
    isUserProjectListFetching,
    fetchProjectNodes,
    selectedNodes,
    setSelectedNodes,
  } = useProjects()

  //table related
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handlePageChange = async (newPage: number) => {
    setSelectedNodes([])
    setPage(newPage)
    fetchProjectNodes({ page: newPage, pageSize: rowsPerPage, projectId: currentProject.project.id })
  }

  const handlePageSizeChange = async (newPageSize: number) => {
    setSelectedNodes([])
    setPage(0)
    setRowsPerPage(newPageSize)
    fetchProjectNodes({ page: 0, pageSize: newPageSize, projectId: currentProject.project.id })
  }

  const handleSelectProject = async (project: any) => {
    setCurrentProject(project)
    fetchProjectNodes({ page: 0, pageSize: rowsPerPage, projectId: project.project.id })
  }

  useEffect(() => {
    fetchUserProjectList()
  }, [])

  useEffect(() => {
    if (Object.keys(currentProject).length === 0 && userProjectList.length > 0) {
      let _id = Number(requestParams.get("projectId")) || 0
      if (_id > 0) {
        setCurrentProject(userProjectList.find((item: any) => item.project.id === _id))
      } else {
        const curProject = userProjectList.find((p: any) => p?.summary?.node_total > 0) || userProjectList[0]
        setCurrentProject(curProject)
        _id = curProject.project.id
      }
      fetchProjectNodes({ page: page, pageSize: rowsPerPage, projectId: _id })
    }
  }, [userProjectList])

  const ChainSummary = useMemo(
    () =>
      function ChainSummary(props: {
        logo: ReactNode
        workers: number
        gpus: number
        cpus: number
        active?: boolean
        isHot?: boolean
        onClick: () => void
      }) {
        return (
          <Box
            onClick={props.onClick}
            className={`relative border rounded p-4 cursor-pointer overflow-clip ${
              props.active ? "bg-gray-100/20 border-transparent" : " border-gray-100/20 hover:bg-gray-100/10"
            }`}
          >
            {props.isHot && <Box className="absolute px-5 bg-red-500 rotate-45 z-10 -right-4 top-2 text-xs">Hot!</Box>}
            <Box className="flex flex-row items-end">
              <Box className={`w-5/12`}>{props.logo}</Box>
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
      },
    [userProjectList]
  )

  return (
    <Fragment>
      <Header />
      <Box className="mx-auto 2xl:w-2/3 w-4/5 mt-20">
        {isUserProjectListFetching ? (
          <Box className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton className="h-36" key={`loading-project-${index}`}></Skeleton>
            ))}
          </Box>
        ) : (
          <Box className="grid grid-cols-3 gap-4">
            <ChainSummary
              logo={
                <Box className="flex space-y-2 flex-col justify-center items-center text-inherit">
                  <NoAppChain sx={{ fontSize: 32 }}></NoAppChain>
                  <Typography>No App Chain</Typography>
                </Box>
              }
              gpus={userProjectList[0]?.summary?.gpu_total || 0}
              cpus={userProjectList[0]?.summary?.cpu_total || 0}
              workers={userProjectList[0]?.summary?.node_total || 0}
              active={currentProject?.project?.id === 0}
              onClick={() => handleSelectProject(userProjectList[0])}
            ></ChainSummary>
            <Box></Box>
            <Box></Box>
            {userProjectList.map((p: any, index: number) => {
              if (index === 0) {
                return
              }
              return (
                <ChainSummary
                  logo={
                    <Box className="flex space-y-2 flex-col justify-center items-center">
                      <Avatar sx={{ width: 32, height: 32 }} src={p.project.logo} alt={`${p.project.name}-logo`}>
                        {p.project.name.slice(0, 1)}
                      </Avatar>
                      <Typography>{p.project.name}</Typography>
                    </Box>
                  }
                  workers={p?.summary?.node_total || 0}
                  gpus={p?.summary?.gpu_total || 0}
                  cpus={p?.summary?.cpu_total || 0}
                  isHot={p?.project?.is_hot}
                  onClick={() => handleSelectProject(p)}
                  active={currentProject?.project?.id == p.project.id}
                  key={`project-node-${index}`}
                ></ChainSummary>
              )
            })}
          </Box>
        )}

        <Box className="flex flex-col py-6">
          <Box className="py-2 flex flex-row justify-between">
            <Box className="flex items-center font-semibold 2xl:text-xl md:text-lg">
              {currentProject?.project?.id === 0 ? (
                <NoAppChain sx={{ fontSize: 28 }} className="mr-2" />
              ) : (
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src={currentProject?.project?.logo}
                  alt={`${currentProject?.project?.name}-logo`}
                  className="mr-2"
                >
                  {currentProject?.project?.name.slice(0, 1)}
                </Avatar>
              )}
              {currentProject?.project?.id === 0 ? "No App Chain" : currentProject?.project?.name}
            </Box>

            <Button
              variant="contained"
              startIcon={currentProject?.project?.id === 0 ? <ConnectToChain /> : <UilExchange />}
              onClick={() => {
                currentProject?.project?.id === 0
                  ? router.push("/node-provider/app-chain/join")
                  : router.push("/node-provider/app-chain/switch?from_project_id=" + currentProject?.project?.id)
              }}
              disabled={selectedNodes.length === 0}
            >
              {" "}
              {currentProject?.project?.id === 0 ? "Join App Chain" : "Switch App Chain"}
            </Button>
          </Box>
          <Divider className="w-full"></Divider>
        </Box>
        <WorkersList
          rowSelected={selectedNodes}
          onSelectedRow={setSelectedNodes}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handlePageSizeChange}
        ></WorkersList>
      </Box>
    </Fragment>
  )
}
