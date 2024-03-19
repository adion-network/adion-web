import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

export default function Home() {
  return (
    <Box className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-none bg-black">
      <Box className="h-screen snap-start flex flex-col justify-start">
        <Box className="h-16 bg-[#1A1A1A] w-full flex justify-end py-3 px-20">
          <Link href="/login">
            <Button variant="outlined" className="border-2 rounded-lg">
              Sign In
            </Button>
          </Link>
        </Box>
        <Box className="bg-[url('/images/home/1.jpg')] bg-cover bg-no-repeat h-full bg-top min-w-[1080px]">
          <Typography variant="h4" className=" mt-10 ml-20">
            Building the Future's AI/Blockchain Compute Network
          </Typography>
        </Box>
      </Box>
      <Box className="h-screen snap-start flex justify-center items-center bg-red-500">第二屏</Box>
      <Box className="h-screen snap-start flex justify-center items-center bg-green-500">第三屏</Box>
    </Box>
  )
}
