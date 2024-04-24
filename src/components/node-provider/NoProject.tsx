import { Box, Typography } from "@mui/material"
import noWorkersPic from "@/../public/images/cloud/no-workers.svg"
import Image from "next/image"
import CommandContent from "./CommandContent"

export default function NoProject() {
  const execCommand =
    "curl https://demeters.s3.amazonaws.com/dmos_install.sh | bash -s b98080bdf63948a3bd49361e024f8ec8"
  return (
    <Box className="flex flex-col justify-center items-center min-h-[50rem]">
      <Image src={noWorkersPic} alt="no-workers" />
      <Typography variant="h5">No Devices Found</Typography>
      <Typography variant="subtitle1" className="mt-2">
        Please add Device via the following command
      </Typography>
      <Box className="mt-10">
        <CommandContent script={execCommand}></CommandContent>
      </Box>
    </Box>
  )
}
