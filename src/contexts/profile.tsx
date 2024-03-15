"use client"
import { useCallback, useState, createContext, useContext } from "react"
import { ResData } from "@/app/api/request"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"

const userProfileInit = {
  isLogin: false,
  username: "",
}

const ProfileContext = createContext({
  userInfo: userProfileInit,
  fetchUserInfo: async (): Promise<void> => {},
  logout: async (): Promise<void> => {},
  login: async (_username: string, _password: string): Promise<void> => {},
  isLoging: false,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(userProfileInit)
  const [isLoging, setIsLoging] = useState(false)

  const fetchUserInfo = useCallback(async () => {
    try {
      const res: ResData = await (await fetch("/api/login", { method: "GET" })).json()
      if (res.code !== 200) {
        throw new Error("not profile found")
      }
      const username = res.data.username
      setUserInfo({ isLogin: true, username: username })
    } catch (error) {
      setUserInfo({ isLogin: false, username: "" })
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    try {
      setIsLoging(true)
      if (!username || !password) {
        throw new Error("username or password can not empty")
      }
      const res: ResData = await (
        await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        })
      ).json()
      if (res.code !== 200) {
        throw new Error(res.msg || "not login")
      }
      router.push("/node-provider/supplier/list")
    } catch (error: any) {
      enqueueSnackbar(error.message.toString(), { variant: "error" })
    } finally {
      setIsLoging(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const res: ResData = await (await fetch("/api/logout", { method: "POST" })).json()
      if (res.code !== 200) {
        throw new Error("not login")
      }
      setUserInfo({ isLogin: false, username: "" })
      router.push("/login")
    } catch (error: any) {
      enqueueSnackbar(error.message.toString(), { variant: "error" })
    }
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        userInfo,
        fetchUserInfo,
        logout,
        login,
        isLoging,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

const useProfile = () => useContext(ProfileContext)
export default useProfile
