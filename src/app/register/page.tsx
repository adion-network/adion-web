"use client"
import { ArrowRightAlt, Try } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { enqueueSnackbar } from "notistack"
import { Fragment, useState } from "react"
import { sendMessageToDiscord } from "../api/request"
import { SvgSpinners12DotsScaleRotate } from "@/components/Icons"

export default function Register() {
  const [email, setEmail] = useState("")
  const [model, setModel] = useState("AI Cloud")
  const [isSubmited, setIsSubmited] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  const models = [
    {
      name: "AI Cloud",
      detail: "GPU requirements are relatively high, suitable for AI inference and large-scale model computations.",
    },
    {
      name: "GPU Mining Pool",
      detail: "GPU requirements are relatively low, suitable for mining in a scalable mode.",
    },
  ]

  const isModelSelected = (name: string) => {
    return model === name
  }

  const isEmailVaild = (email: string): boolean => {
    const match = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    return match !== null || email === ""
  }

  const handleRegister = async () => {
    if (!email || !model) {
      enqueueSnackbar("email or model invaild")
    }
    try {
      setIsSendingMessage(true)
      const res = await sendMessageToDiscord(`New Regisition received, Email: ${email}, Model: ${model}`)
      console.log(res)
      if (res.code !== 200) {
        throw new Error("register error")
      }
      setIsSubmited(true)
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsSendingMessage(false)
    }
  }

  return (
    <Fragment>
      <Dialog open={isSubmited}>
        <DialogTitle className="font-extrabold">Success</DialogTitle>
        <DialogContent>
          We received your information and we will reach out to you when your registration is approved!
        </DialogContent>
        <DialogActions className="px-8 py-3">
          <Button size="large" variant="contained" color="success" onClick={() => setIsSubmited(false)}>
            OK
          </Button>
          <Link href="/">
            <Button size="large" variant="text" className="underline text-green-700">
              Return To Home Page
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Box className="flex gap-x-20 py-12 mx-auto max-w-6xl">
        <Box className="w-2/5 flex flex-col justify-start space-y-24">
          <Box className="space-y-10">
            <Typography variant="h5" className="font-extrabold">
              Node Provider registration
            </Typography>
            <Typography variant="body1" className="text-gray-300">
              We are committed to becoming the global leader in the decentralized GPU computing market. Our vision is to
              break traditional boundaries, drive a secure, private, and interoperable technology ecosystem, and lead in
              GPU computing transactions and technological innovation. We are dedicated to building an unlimited and
              mutually beneficial digital future, driving continuous progress in global technology and business.
            </Typography>
            <Typography variant="body1" className="underline text-green-600 cursor-pointer">
              Are you not sure if you really want to become a Node Provider?
            </Typography>
          </Box>
          <Box className=" rounded-2xl bg-yellow-600 p-4 space-y-2">
            <Typography variant="h6" className="font-extrabold text-black">
              Policy issue?
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              We typically contact you between Monday and Friday, from 8:00 AM to 4:30 PM. If you currently do not meet
              our requirements, that&apos;s okay. In the future, when we expand our eligible Node Providers, we will
              reach out to you.
            </Typography>
            <Typography variant="body1" className="underline text-green-600 cursor-pointer">
              Contact Us<ArrowRightAlt></ArrowRightAlt>
            </Typography>
          </Box>
        </Box>
        <Box className="w-3/5 flex flex-col space-y-5 p-4 rounded-2xl border-2 border-gray-500">
          <Typography variant="h6" className="font-extrabold">
            General information
          </Typography>
          <Typography variant="body1" className="font-extrabold after:content-['*'] after:ml-0.5 after:text-red-500">
            Email:
          </Typography>
          <TextField
            error={!isEmailVaild(email)}
            helperText={!isEmailVaild(email) ? "Input a vaild email address" : ""}
            required
            fullWidth
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></TextField>
          <Typography variant="body1" className="font-extrabold after:content-['*'] after:ml-0.5 after:text-red-500">
            Model:
          </Typography>
          <Box className="w-full flex justify-center gap-x-8">
            {models.map((m: any, index: number) => (
              <Paper
                key={`model-${index}`}
                className={`w-1/2 bg-transparent relative p-4 border-2 border-gray-700 rounded-lg overflow-clip cursor-pointer ${
                  !isModelSelected(m.name) && "hover:border-gray-400"
                }`}
                onClick={() => {
                  setModel(m.name)
                }}
              >
                <Box className="space-y-2">
                  <Typography className="font-extrabold" variant="h6">
                    {m.name}
                  </Typography>
                  <Typography variant="body1">{m.detail}</Typography>
                </Box>
                {isModelSelected(m.name) && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-20 flex justify-center items-center"></div>
                )}
              </Paper>
            ))}
          </Box>
          <Box className="space-y-2">
            <Typography variant="h6" className="font-extrabold">
              System Requirements:
            </Typography>
            <Box component={"ul"} className="list-disc text-gray-300 ml-4 space-y-1 font-semibold">
              <Typography component={"li"}>Ubuntu 22.04</Typography>
              <Typography component={"li"}>Have access to the internet</Typography>
              <Typography component={"li"}>Static public IP support</Typography>
              {model === "AI Cloud" && (
                <Fragment>
                  <Typography component={"li"}>
                    Internet download speeds exceed 1 GBps, upload speeds exceed 500 Mbps, and latency is less than 30
                    milliseconds.
                  </Typography>
                  <Typography component={"li"}>
                    Test your internet speed here:{" "}
                    <Link href="https://www.speedtest.net" target="_blank" className="underline">
                      https://www.speedtest.net
                    </Link>
                  </Typography>
                </Fragment>
              )}
            </Box>
          </Box>
          <Box className="space-y-2">
            <Typography variant="h6" className="font-extrabold">
              Hardware Requirements:
            </Typography>
            <Box component={"ul"} className="list-disc text-gray-300 ml-4 space-y-1 font-semibold">
              {(model === "AI Cloud" && (
                <Fragment>
                  <Typography component={"li"}>At least 24 GPUs</Typography>
                  <Typography component={"li"}>NVIDIA GeForce RTX 30xx and RTX 40xx series or higher</Typography>
                  <Typography component={"li"}>
                    Option 1: At least 6 servers with 4 GPUs and at least 8GB VRAM per GPU.
                  </Typography>
                  <Typography component={"li"}>
                    Option 2: At least 3 servers with 8 GPUs and at least 24GB VRAM per GPU.
                  </Typography>
                  <Typography component={"li"}>At least 32 vCPUs</Typography>
                  <Typography component={"li"}>
                    The memory size should be at least equal to the total virtual memory (vRAM) of all GPUs + 4GB for
                    system operations.
                  </Typography>
                  <Typography component={"li"}>
                    1TB or greater memory recommended for eight GPU configurations of 80GB vRAM.
                  </Typography>
                  <Typography component={"li"}>Requires at least 1 TB of SSD storage, 2 TB is preferred.</Typography>
                </Fragment>
              )) || (
                <Fragment>
                  <Typography component={"li"}>Each machine should have at least 8 GiB or more of memory.</Typography>
                  <Typography component={"li"}>
                    Each machine should have at least 100 GB of available disk space.
                  </Typography>
                  <Typography component={"li"}>There should be a minimum of 24 GPUs.</Typography>
                  <Typography component={"li"}>
                    NVIDIA GeForce RTX 30 series or higher is required (if multiple GPUs are present in each system,
                    they should all be of the same model).
                  </Typography>
                </Fragment>
              )}
            </Box>
          </Box>
          <Button
            variant="contained"
            className="font-extrabold rounded-lg py-3 text-lg"
            size="large"
            fullWidth
            color="success"
            disabled={!isEmailVaild(email) || email === "" || isSendingMessage}
            onClick={handleRegister}
          >
            {isSendingMessage ? <SvgSpinners12DotsScaleRotate fontSize={28} /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </Fragment>
  )
}
