import { ContentCopy } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"

export default function CommandContent(props: { script: string }) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      enqueueSnackbar("Copied", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Failed to copy!", { variant: "error" })
    }
  }
  return (
    <Box className="py-6 rounded-2xl border border-gray-200/20 px-5 list-disc space-y-4">
      <Typography component={"li"} className="ml-2 text-gray-300">
        DMOS the cloud operating system, Run the command to connect device
      </Typography>
      <Box className="bg-gray-300/100 px-4 py-2 rounded-2xl flex justify-between space-x-10 items-center">
        <Typography className="font-mono text-base text-black">{props.script}</Typography>
        <IconButton color="primary" onClick={() => copyToClipboard(props.script)}>
          <ContentCopy className="text-black text-xl"></ContentCopy>
        </IconButton>
      </Box>
    </Box>
  )
}
