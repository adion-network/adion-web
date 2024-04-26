"use client"
import { useProjects } from "@/contexts/projects"
import { ContentCopy } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { Fragment, useEffect } from "react"
import { SvgSpinners12DotsScaleRotate } from "../Icons"

export default function CommandContent() {
  const { fetchUserAgentInstallCommand, agentInstallCommand, isAgentInstallCommandFetching } = useProjects()

  useEffect(() => {
    fetchUserAgentInstallCommand()
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      enqueueSnackbar("Copied", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Failed to copy!", { variant: "error" })
    }
  }
  return (
    <Fragment>
      {isAgentInstallCommandFetching ? (
        <SvgSpinners12DotsScaleRotate fontSize={32} className="mx-auto" />
      ) : (
        <Box className="py-6 rounded-2xl border border-gray-200/20 px-5 list-disc space-y-4">
          <Typography component={"li"} className="ml-2 text-gray-300">
            DMOS the cloud operating system, Run the command to connect device
          </Typography>
          <Box className="bg-gray-300/100 px-4 py-2 rounded-2xl flex justify-between space-x-10 items-center">
            <Typography className="font-mono text-base text-black">{agentInstallCommand}</Typography>
            <IconButton color="primary" onClick={() => copyToClipboard(agentInstallCommand)}>
              <ContentCopy className="text-black text-xl"></ContentCopy>
            </IconButton>
          </Box>
        </Box>
      )}
    </Fragment>
  )
}
