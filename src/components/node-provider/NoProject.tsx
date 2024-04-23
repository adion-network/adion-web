import { Box, IconButton, Typography } from "@mui/material"
import noWorkersPic from "@/../public/images/cloud/no-workers.svg"
import Image from "next/image"
import { ContentCopy } from "@mui/icons-material"
import { enqueueSnackbar } from "notistack"

export default function NoProject() {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      enqueueSnackbar("Copied", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Failed to copy!", { variant: "error" })
    }
  }

  const execCommand =
    "curl https://demeters.s3.amazonaws.com/dmos_install.sh | bash -s b98080bdf63948a3bd49361e024f8ec8"
  return (
    <Box className="flex flex-col justify-center items-center min-h-[50rem]">
      <Image src={noWorkersPic} alt="no-workers" />
      <Typography variant="h5">No Devices Found</Typography>
      <Typography variant="subtitle1" className="mt-2">
        Please add Device via the following command
      </Typography>
      <Box className="py-6 rounded-2xl border border-gray-200/20 px-5 mt-10 list-disc space-y-4">
        <Typography component={"li"} className="ml-2 text-gray-300">
          DMOS the cloud operating system, Run the command to connect device
        </Typography>
        <Box className="bg-white px-4 py-2 rounded-2xl flex space-x-10 items-center">
          <Typography className="font-mono text-base text-black">{execCommand}</Typography>
          <IconButton color="primary" onClick={() => copyToClipboard(execCommand)}>
            <ContentCopy className="text-black text-xl"></ContentCopy>
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
