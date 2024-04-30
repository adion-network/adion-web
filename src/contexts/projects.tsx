"use client"
import { enqueueSnackbar } from "notistack"
import { post, get, sendMessageToDiscord } from "@/app/api/request"
import { useState, useCallback, createContext, useContext } from "react"
import useProfile from "./profile"
import { useRouter } from "next/navigation"
import { error } from "console"

const ProjectContext = createContext({} as any)

export const ProjectProvider = ({ children }: any) => {
  const [projectList, setProjectList] = useState<any>([])
  const [projectDetailList, setProjectDetailList] = useState<any>([])
  const [isProjectListFetching, setIsProjectListFetching] = useState(false)
  const [fetchingProjectListError, setFetchingProjectListError] = useState("")
  const [isJoiningProject, setIsJoiningProject] = useState(false)
  const [hasPorject, setHasProject] = useState(true)
  const [isProjectNodeFetching, setIsProjectNodeFetching] = useState(false)
  const [projectNodeList, setProjectNodeList] = useState<any>([])
  const [projectNodeListCount, setProjectNodeListCount] = useState<number>(0)

  const { userInfo, fetchUserInfo } = useProfile()
  //user project list
  const [userProjectList, setUserProjectList] = useState<any[]>([])
  const [isUserProjectListFetching, setIsUserProjectListFetching] = useState(false)
  const [isCheckingHasProject, setIsCheckingHasProject] = useState(false)

  //agent install command
  const [agentInstallCommand, setAgentInstallCommand] = useState("")
  const [isAgentInstallCommandFetching, setIsAgentInstallCommandFetching] = useState(false)

  //node detail
  const [nodeDetail, setNodeDetail] = useState<any>()
  const [isNodeDetailFetching, setIsNodeDetailFetching] = useState(false)

  //nodes to operation
  const [selectedNodes, setSelectedNodes] = useState<any[]>([])

  //remove node
  const [isRemovingNode, setIsRemovingNode] = useState(false)

  //router
  const router = useRouter()

  const fetchProjectList = useCallback(async () => {
    setIsProjectListFetching(true)
    try {
      const { data } = await get("/api/v1/project/list")
      setProjectList(data)
    } catch (error: any) {
      setFetchingProjectListError(error.message)
    } finally {
      setIsProjectListFetching(false)
    }
  }, [])

  const searchProjecByType = (index: number): [] => {
    return projectList[index].project
  }

  const fetchUserProjectList = useCallback(async () => {
    setIsUserProjectListFetching(true)
    try {
      const { data } = await get("/api/v1/user/project/list/")
      setUserProjectList(data)
      return data
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsUserProjectListFetching(false)
    }
  }, [])

  const joinProject = async (projectInfo: any, user: string, deviceList: any[]) => {
    try {
      setIsJoiningProject(true)
      if (!projectInfo?.id) {
        throw new Error("project id invaild")
      }

      if (deviceList.length === 0) {
        throw new Error("no device selected")
      }

      const requestParam = {
        project_id: projectInfo.id,
        device_list: deviceList.map((item) => item.deviceId),
      }

      const res = await post("/api/v1/user/project/join", requestParam)
      if (res.code === 200) {
        enqueueSnackbar("Join project success", { variant: "success" })
        setSelectedNodes([])
        router.push("/node-provider/app-chain?projectId=" + projectInfo?.id)
      } else {
        throw new Error(res.msg)
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsJoiningProject(false)
    }
  }

  const switchProject = async (fromProject: any, toProject: any, user: String, deviceList: any[]) => {
    try {
      setIsJoiningProject(true)
      if (!fromProject?.id || !toProject?.id) {
        throw new Error("project id invaild")
      }

      if (deviceList.length === 0) {
        throw new Error("no device selected")
      }

      const switchParams = {
        dest_project_id: toProject.id,
        src_project_id: fromProject.id,
        device_list: deviceList.map((item) => item.deviceId),
      }

      const res = await post("/api/v1/user/project/switch/", switchParams)
      if (res.code === 200) {
        enqueueSnackbar("Switch project success", { variant: "success" })
        setSelectedNodes([])
        router.push("/node-provider/app-chain?projectId=" + toProject.id)
      } else {
        throw new Error(res.msg)
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsJoiningProject(false)
    }
  }

  const fetchProjectNodes = useCallback(
    async ({
      page,
      pageSize,
      status = "all",
      keyword = "",
      projectId = undefined,
    }: {
      page: number
      pageSize: number
      status: "all" | "running" | "offline"
      keyword: string
      projectId: number | undefined
    }) => {
      try {
        setIsProjectNodeFetching(true)
        let url = `/api/v1/user/node/list/?page=${page + 1}&page_size=${pageSize}&keyword=${keyword}`
        if (status !== "all") {
          url += `&status=${status}`
        }
        if (projectId !== undefined) {
          url += `&project_id=${projectId}`
        }

        const { data, paging_info } = await get(url)
        if (!data) {
          setProjectNodeList([])
        } else {
          let result = data.map((node: any) => {
            const gpuStatus = {
              y: 0,
              n: 0,
            }
            const gpuModel: { [key: string]: number } = {}

            if (node.gpu) {
              node.gpu.map((g: any) => {
                g.status === "ok" ? gpuStatus.y++ : gpuStatus.n++
                if (gpuModel[g.product] === undefined) {
                  gpuModel[g.product] = 0
                }
                gpuModel[g.product]++
              })
            }
            return {
              deviceId: node.device_id,
              ip: node.ip,
              status: node.status,
              gpuStatus: { y: gpuStatus.y, n: gpuStatus.n },
              gpuModel: Object.keys(gpuModel).map((k) => {
                return { model: k, count: gpuModel[k] }
              }),
              region: node.geo,
              projectInfo: node.project,
            }
          })
          setProjectNodeList(result)
          setProjectNodeListCount(paging_info.count)
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" })
      } finally {
        setIsProjectNodeFetching(false)
      }
    },
    []
  )

  const fetchUserAgentInstallCommand = useCallback(async () => {
    try {
      setIsAgentInstallCommandFetching(true)
      const { data } = await get("/api/v1/user/agent/install/")
      if (data) {
        setAgentInstallCommand(data)
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsAgentInstallCommandFetching(false)
    }
  }, [])

  const fetchNodeDetail = useCallback(async (deviceId: string) => {
    try {
      if (!deviceId) {
        enqueueSnackbar("device id invaild", { variant: "error" })
      }
      setIsNodeDetailFetching(true)
      const res = await get("/api/v1/user/node/detail/?device_id=" + deviceId)
      if (res.code !== 200) {
        throw new Error(res.msg)
      }
      setNodeDetail(res.data)
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsNodeDetailFetching(false)
    }
  }, [])

  const removeNodes = useCallback(async (deviceIds: string[]) => {
    try {
      if (deviceIds.length === 0) {
        enqueueSnackbar("device id invaild", { variant: "error" })
      }
      setIsRemovingNode(true)
      const res = await post("/api/v1/user/node/remove", { device_list: deviceIds })
      if (res.code !== 200) {
        throw new Error(res.msg)
      }
      enqueueSnackbar(`remove ${deviceIds.length} node(s) success`, { variant: "success" })
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsRemovingNode(false)
    }
  }, [])

  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  const clearProjectData = useCallback(() => {
    setHasProject(true)
    setProjectList([])
    setUserProjectList([])
    setProjectDetailList([])
    setProjectNodeList([])
  }, [])

  return (
    <ProjectContext.Provider
      value={{
        projectList,
        setProjectList,
        setProjectDetailList,
        searchProjecByType,
        fetchProjectList,
        isProjectListFetching,
        setIsProjectListFetching,
        isUserProjectListFetching,
        projectDetailList,
        joinProject,
        isJoiningProject,
        fetchUserProjectList,
        userProjectList,
        hasPorject,
        fetchProjectNodes,
        projectNodeList,
        isProjectNodeFetching,
        setProjectNodeList,
        switchProject,
        isCheckingHasProject,
        clearProjectData,
        fetchUserAgentInstallCommand,
        agentInstallCommand,
        isAgentInstallCommandFetching,
        projectNodeListCount,
        fetchNodeDetail,
        isNodeDetailFetching,
        nodeDetail,
        selectedNodes,
        setSelectedNodes,
        removeNodes,
        isRemovingNode,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjects = () => useContext(ProjectContext)
