"use client"
import { Box, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { ResData } from "../api/request"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!username || !password) {
      enqueueSnackbar("input username and password", { variant: "error" })
    }
    const response: ResData = await (
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      })
    ).json()
    if (response.code === 200) {
      router.push("/node-provider/overview")
    } else {
      enqueueSnackbar(response.msg, { variant: "error" })
    }
  }
  return (
    <Box className="min-h-screen bg-transparent flex items-center justify-center">
      <Box className="bg-white/10 backdrop-blur-[1px] border border-gray-200 border-opacity-20 shadow-lg p-16 rounded-lg max-w-lg w-full">
        <Typography variant="h4" className="mb-4 text-center font-extrabold text-gray-300/50">
          Login
        </Typography>
        <form>
          <Box className="space-y-10">
            <TextField
              fullWidth
              label="username"
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
            <Button
              variant="outlined"
              size="large"
              color="success"
              onClick={handleSubmit}
              className="border-2 bg-violet-500 bg-opacity-20 hover:bg-opacity-30 border-violet-500/50 w-full font-extrabold text-lg h-14"
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
