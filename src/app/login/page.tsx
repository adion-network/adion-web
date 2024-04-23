"use client"
import { Box, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useProfile from "@/contexts/profile"
import { LoadingButton } from "@mui/lab"
import { LogoIconWithDotAi } from "@/components/Icons"
import Link from "next/link"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { userInfo, fetchUserInfo, login, isLoging } = useProfile()

  useEffect(() => {
    if (userInfo.isLogin) {
      router.push("/node-provider/workers")
    }
  }, [userInfo.isLogin])

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    await login(username, password)
  }
  return (
    <Box className="min-h-screen bg-transparent flex items-center justify-center">
      <Box component="form" className="bg-[#333] p-16 space-y-4 rounded-3xl max-w-lg w-full">
        <Box className="flex flex-col w-full text-center py-2 space-y-4">
          <LogoIconWithDotAi className="text-6xl w-full mx-auto" />
          <Typography className="2xl:text-4xl text-3xl font-bold">Welcome</Typography>
          <Typography>Create an account to start exploring Cloud Portal</Typography>
        </Box>
        <Box className="space-y-4">
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-blue-500"
          />
        </Box>
        <Box className="flex flex-row py-2">
          <Typography>
            Looking for an GPU onboarding?{" "}
            <Link href="/register" className="hover:opacity-80 text-logo-from font-semibold">
              Sign up here!
            </Link>
          </Typography>
        </Box>
        <Box className="mt-16">
          <LoadingButton
            variant="contained"
            size="large"
            loading={isLoging}
            onClick={handleSubmit}
            className="w-full rounded-2xl font-extrabold text-lg h-14"
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}
