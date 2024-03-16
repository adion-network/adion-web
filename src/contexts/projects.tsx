"use client"
import { enqueueSnackbar } from "notistack"
import { post, get, sendMessageToDiscord } from "@/app/api/request"
import { useState, useCallback, createContext, useContext } from "react"
import useProfile from "./profile"
import { useRouter } from "next/navigation"

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

  const { userInfo, fetchUserInfo } = useProfile()
  //user project list
  const [userProjectList, setUserProjectList] = useState<any[]>([])
  const [isUserProjectListFetching, setIsUserProjectListFetching] = useState(false)
  const [isCheckingHasProject, setIsCheckingHasProject] = useState(false)

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

  const fetchUserProjectList = useCallback(async (catalogId: number) => {
    setIsUserProjectListFetching(true)
    try {
      const { data } = await get("/api/v1/user/project/list/?catalog_id=" + catalogId)
      setUserProjectList(data)
      return data
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsUserProjectListFetching(false)
    }
  }, [])

  const isUserHasProject = useCallback(async (projectList: any) => {
    try {
      setIsCheckingHasProject(true)
      for (let i = 0; i < projectList.length; i++) {
        const { data } = await get("/api/v1/user/project/list/?catalog_id=" + projectList[i].id)
        if (data.length > 0) {
          return
        }
      }
      setHasProject(false)
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsCheckingHasProject(false)
    }
  }, [])

  const joinProject = useCallback(
    async (projectInfo: any) => {
      try {
        setIsJoiningProject(true)
        if (!projectInfo?.id) {
          throw new Error("project id invaild")
        }

        const res = await post("/api/v1/user/project/join", { project_id: projectInfo.id })
        if (res.code === 200) {
          await fetchUserInfo()
          await sendMessageToDiscord(`
User: ${userInfo.username} requested to join project: ${projectInfo.name}, projectId: ${projectInfo.id}
Command: ${res.data}
          `)
          router.push("/node-provider/supplier/list")
        } else {
          throw new Error(res.msg)
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" })
      } finally {
        setIsJoiningProject(false)
      }
    },
    [userInfo]
  )

  const switchProject = useCallback(
    async (fromProject: any, toProject: any) => {
      try {
        setIsJoiningProject(true)
        if (!fromProject?.id || !toProject?.id) {
          throw new Error("project id invaild")
        }

        const res = await post("/api/v1/user/project/switch/", {
          dest_project_id: toProject.id,
          src_project_id: fromProject.id,
        })
        if (res.code === 200) {
          await fetchUserInfo()
          await sendMessageToDiscord(`
User: ${userInfo.username} requested to switch project: 
  From project: ${fromProject.name}, Id: ${fromProject.id}
  To project: ${toProject.name}, Id: ${toProject.id}
Command: ${res.data}
          `)
          router.push("/node-provider/supplier/list")
        } else {
          throw new Error(res.msg)
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" })
      } finally {
        setIsJoiningProject(false)
      }
    },
    [userInfo]
  )

  const fetchProjectNodes = useCallback(async (projectId: number, filterStatus: string = "all") => {
    try {
      setIsProjectNodeFetching(true)
      if (!projectId) {
        throw new Error("project id invaild")
      }
      const { data } = await get("/api/v1/user/node/list/?project_id=" + projectId)
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
            devideId: node.device_id,
            ip: node.ip,
            status: node.status,
            gpuStatus: `Y:${gpuStatus.y} N:${gpuStatus.n}`,
            gpuModel: Object.keys(gpuModel).map((k) => {
              return { model: k, count: gpuModel[k] }
            }),
            region: node.geo,
          }
        })
        if (filterStatus !== "all") {
          result = result.filter((item: any) => {
            return item.status === filterStatus
          })
        }
        setProjectNodeList(result)
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsProjectNodeFetching(false)
    }
  }, [])

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
        isUserHasProject,
        hasPorject,
        fetchProjectNodes,
        projectNodeList,
        isProjectNodeFetching,
        setProjectNodeList,
        switchProject,
        isCheckingHasProject,
        clearProjectData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjects = () => useContext(ProjectContext)
