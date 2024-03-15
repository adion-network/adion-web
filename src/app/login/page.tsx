"use client"
import { Box, Typography, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useProfile from "@/contexts/profile"
import { LoadingButton } from "@mui/lab"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { userInfo, fetchUserInfo, login, isLoging } = useProfile()

  useEffect(() => {
    const processIsLogin = async () => {
      await fetchUserInfo()
      if (userInfo.isLogin) {
        router.push("/node-provider/supplier/list")
      }
    }
    processIsLogin()
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    await login(username, password)
  }
  return (
    <Box className="min-h-screen bg-transparent flex items-center justify-center">
      <Box
        component="form"
        className="bg-white/10 backdrop-blur-[1px] border border-gray-200 border-opacity-20 shadow-lg p-16 rounded-lg max-w-lg w-full"
      >
        <Typography variant="h4" className="mb-4 text-center font-extrabold text-gray-300/50">
          LOGIN
        </Typography>
        <Box className="space-y-10">
          <TextField
            fullWidth
            label="Username"
            variant="standard"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="standard"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </Box>
        <Box className="mt-16">
          <LoadingButton
            variant="outlined"
            size="large"
            color="success"
            loading={isLoging}
            onClick={handleSubmit}
            className="border-2 bg-violet-500 bg-opacity-20 hover:bg-opacity-30 border-violet-500/50 w-full font-extrabold text-lg h-14"
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}
