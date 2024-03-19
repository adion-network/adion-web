import { Box, Button, Typography } from "@mui/material"
import { NvidaLogo } from "@/components/Icons"
import { NorthEast } from "@mui/icons-material"
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
        <Box className="bg-[url('/images/home/1.jpg')] bg-cover bg-no-repeat h-full bg-top min-w-[1440px] pl-20">
          <Typography variant="h3" className="w-[700px] mt-32 font-extrabold">
            Building the Future's AI/Blockchain Compute Network
          </Typography>
          <Typography variant="h6" className="w-[700px] mt-10 font-extrabold">
            Aggregate global GPU resources via Demeters.ai's decentralized platform, achieving deployment, scheduling,
            switching, and monitoring with full-stack services. Maximize resource efficiency and revenue growth
            effortlessly.
          </Typography>
          <Link href="/login">
            <Button
              variant="contained"
              color="success"
              size="large"
              className="text-md mt-10 font-extrabold"
              startIcon={<NorthEast />}
            >
              Start Now
            </Button>
          </Link>
        </Box>
      </Box>
      <Box className="h-screen snap-start px-10 pt-32">
        <Box className="flex justify-between">
          <Box>
            <Typography variant="h4" className="w-2/3 font-extrabold">
              Full control of your AI infrastructure
            </Typography>
            <Typography variant="subtitle1" className="w-2/3 mt-8 font-extrabold">
              Leverage global high-performance servers with DMOS (Demeter Cloud Operating System) for effortless
              resource management. Experience smart control through an intuitive dashboard, seamless cloud-native
              integrations, and extensive API. Simplified. Swift. Smart.
            </Typography>
          </Box>
          <Box>
            <NvidaLogo></NvidaLogo>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen snap-start flex justify-center items-center bg-green-500">第三屏</Box>
    </Box>
  )
}
