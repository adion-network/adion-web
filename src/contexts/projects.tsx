"use client"
import { enqueueSnackbar } from "notistack"
import { post, get, sendMessageToDiscord } from "@/app/api/request"
import { useState, useCallback, createContext, useContext } from "react"
import useProfile from "./profile"
import moment from "moment"

const ProjectContext = createContext({} as any)

export const ProjectProvider = ({ children }: any) => {
  const [projectList, setProjectList] = useState<any>([])
  const [projectDetailList, setProjectDetailList] = useState<any>([])
  const [isProjectListFetching, setIsProjectListFetching] = useState(false)
  const [fetchingProjectListError, setFetchingProjectListError] = useState("")
  const [isJoiningProject, setIsJoiningProject] = useState(false)
  const { userInfo, fetchUserInfo } = useProfile()
  const [hasPorject, setHasProject] = useState(false)
  const [isProjectNodeFetching, setIsProjectNodeFetching] = useState(false)
  const [projectNodeList, setProjectNodeList] = useState<any>([])

  //user project list
  const [userProjectList, setUserProjectList] = useState<any[]>([])
  const [isUserProjectListFetching, setIsUserProjectListFetching] = useState(false)

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
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsUserProjectListFetching(false)
    }
  }, [])

  const isUserHasProject = useCallback(async (projectList: any) => {
    for (let i = 0; i < projectList.length; i++) {
      const { data } = await get("/api/v1/user/project/list/?catalog_id=" + projectList[i].id)
      if (data.length > 0) {
        setHasProject(true)
        return
      }
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
User: ${userInfo.username} requested join to project: ${projectInfo.name}, projectId: ${projectInfo.id}
Command: ${res.data}
          `)
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

  const fetchProjectNodes = useCallback(async (projectId: number) => {
    try {
      setIsProjectNodeFetching(true)
      if (!projectId) {
        throw new Error("project id invaild")
      }
      const { data } = await get("/api/v1/user/node/list/?project_id=" + projectId)
      if (!data) {
        setProjectNodeList([])
      } else {
        setProjectNodeList(
          data.map((node: any) => {
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
            const currentTimeStamp = moment().unix()
            const status = currentTimeStamp - node.heartbeat_at > 600 ? "Failed" : "Running"
            return {
              devideId: node.device_id,
              ip: node.ip,
              status: status,
              gpuStatus: `Y:${gpuStatus.y} N:${gpuStatus.n}`,
              gpuModel: Object.keys(gpuModel).map((k) => {
                return { model: k, count: gpuModel[k] }
              }),
              region: node.geo,
            }
          })
        )
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsProjectNodeFetching(false)
    }
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjects = () => useContext(ProjectContext)
