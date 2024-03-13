"use client"
import { enqueueSnackbar } from "notistack"
import { get, post, sendMessageToDiscord } from "./request"
import { useState, useCallback, createContext, useContext } from "react"
import useProfile from "./profile"

const ProjectContext = createContext({} as any)

export const ProjectProvider = ({ children }: any) => {
  const [projectList, setProjectList] = useState<any>([])
  const [projectDetailList, setProjectDetailList] = useState<any>([])
  const [isProjectListFetching, setIsProjectListFetching] = useState(false)
  const [fetchingProjectListError, setFetchingProjectListError] = useState("")
  const [isJoiningProject, setIsJoiningProject] = useState(false)
  const { userInfo, fetchUserInfo } = useProfile()

  //user project list
  const [userProjectList, setUserProjectList] = useState<any>([])
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
      console.log(data)
      setUserProjectList(data)
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsUserProjectListFetching(false)
    }
  }, [])

  const joinProject = useCallback(async (projectInfo: any) => {
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjects = () => useContext(ProjectContext)
