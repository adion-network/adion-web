import { Box, Typography } from "@mui/material"
import noWorkersPic from "@/../public/images/cloud/no-workers.svg"
import Image from "next/image"
import CommandContent from "./CommandContent"

export default function NoProject() {
  return (
    <Box className="flex flex-col justify-center items-center min-h-[50rem]">
      <Image src={noWorkersPic} alt="no-workers" />
      <Typography variant="h5">No Devices Found</Typography>
      <Typography variant="subtitle1" className="mt-2">
        Please add Device via the following command
      </Typography>
      <Box className="mt-10">
        <CommandContent></CommandContent>
      </Box>
    </Box>
  )
}
