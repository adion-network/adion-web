import { Box, IconButton, Typography } from "@mui/material"
import { BiYoutube, IcBaselineDiscord, LogoIcon, MdiGithub, MdiTelegram, MdiTwitter } from "../Icons"
import Link from "next/link"

export default function Footer() {
  return (
    <Box id="contact-us" className="grid md:grid-cols-3 grid-cols-2 space-y-10 py-32 container mx-auto">
      <Box className="flex-col space-y-8 md:max-w-fit md:col-span-1 col-span-2">
        <Box className="text-center">
          <LogoIcon className="text-8xl w-40 ml-0" />
        </Box>
        <Box className="flex gap-x-5 justify-center">
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
      <Box className="flex flex-col items-center text-left md:space-y-8 space-y-4 px-10">
        <Box className="flex flex-col md:gap-y-4 gap-y-2">
          <Typography variant="h5" className="font-extrabold">
            Main
          </Typography>
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
      <Box className="text-left items-center md:space-y-8 space-y-4 px-10">
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
  )
}
