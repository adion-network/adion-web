import { MaterialSymbolsDesktopAccessDisabled } from "@/components/Icons"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

export default function Overview() {
  return (
    <Box className="flex justify-center items-center min-h-[40rem]">
      <Box className="text-center">
        <Box className="inline-flex justify-center items-center w-28 h-28 rounded-full bg-white text-black">
          <MaterialSymbolsDesktopAccessDisabled fontSize={72} />
        </Box>
        <Box className="mt-4">
          <Typography variant="h5">We cannot see any of your Worker information</Typography>
          <Typography variant="subtitle1" className="mt-2">
            It seems that you do not have any resources associated with Demeters.io
          </Typography>
        </Box>
        <Link href="/node-provider/supplier/create">
          <Button variant="contained" color="success" size="large" className="text-lg font-extrabold mt-6 px-6 py-3">
            Add Supplier
          </Button>
        </Link>
        <Box className="mt-4">
          <Link href="#">
            <Button>How to access resources?</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
