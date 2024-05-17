import { Box, IconButton, Typography } from "@mui/material"
import { BiYoutube, IcBaselineDiscord, LogoIcon, MdiGithub, MdiTelegram, MdiTwitter } from "../Icons"
import Link from "next/link"

export default function Footer() {
  return (
    <Box id="contact-us" className="flex md:flex-row md:justify-between flex-col text-center space-y-10 py-32">
      <Box className="md:w-1/3 flex-col justify-center space-y-8">
        <Box className="text-center">
          <LogoIcon className="text-8xl w-40" />
        </Box>
        <Box className="flex justify-center gap-x-5">
          <IconButton
            className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200"
            href="https://twitter.com/AdionNetwork"
            target="_blank"
          >
            <MdiTwitter fontSize={32} color="black"></MdiTwitter>
          </IconButton>
          <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
            <BiYoutube fontSize={32} color="black"></BiYoutube>
          </Box>
          <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
            <MdiTelegram fontSize={32} color="black"></MdiTelegram>
          </Box>
          <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
            <IcBaselineDiscord fontSize={32} color="black"></IcBaselineDiscord>
          </Box>
          <IconButton
            className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200"
            href="https://github.com/adion-network"
            target="_blank"
          >
            <MdiGithub fontSize={32} color="black"></MdiGithub>
          </IconButton>
        </Box>
      </Box>
      <Box className="md:w-2/3 flex flex-row md:justify-end">
        <Box className="flex flex-col text-left md:space-y-8 space-y-4 px-10 w-1/2">
          <Typography variant="h5" className="font-extrabold">
            Main
          </Typography>
          <Box className="flex flex-col md:gap-y-4 gap-y-2">
            <Link href="/" className="hover:text-gray-400">
              <Typography variant="body1">Home</Typography>
            </Link>
            <Link href="#contact-us" className="hover:text-gray-400">
              <Typography variant="body1">About us</Typography>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Typography variant="body1">Terms of Use</Typography>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Typography variant="body1">Privacy Policy</Typography>
            </Link>
          </Box>
        </Box>
        <Box className="text-left md:space-y-8 space-y-4 px-10">
          <Typography variant="h5" className="font-extrabold">
            Menu
          </Typography>
          <Box className="flex flex-col md:gap-y-4 gap-y-2">
            <Link href="/cloud" className="hover:text-gray-400">
              <Typography variant="body1">Cloud</Typography>
            </Link>
            <Typography variant="body1">Chain</Typography>
            <Typography variant="body1">Dmos</Typography>
            <Typography variant="body1">Docs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
