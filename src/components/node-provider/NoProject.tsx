import { MaterialSymbolsDesktopAccessDisabled } from "@/components/Icons"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

export default function NoProject() {
  return (
    <Box className="flex justify-center items-center min-h-[40rem]">
      <Box className="text-center">
        <Box className="inline-flex justify-center items-center w-28 h-28 rounded-full bg-white text-black">
          <MaterialSymbolsDesktopAccessDisabled fontSize={72} />
        </Box>
        <Box className="mt-4">
          <Typography variant="h5">No Worker data detected. </Typography>
          <Typography variant="subtitle1" className="mt-2">
            You seem to have no resources linked to Demeters.ai.
          </Typography>
        </Box>
        <Link href="/node-provider/supplier/create">
          <Button variant="contained" color="success" size="large" className="text-lg font-extrabold mt-6 px-6 py-3">
            Connect New Device
          </Button>
        </Link>
        <Box className="mt-4">
          <Link href="#">
            <Button className="underline">How to access resources?</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
