"use client"

import Button from "@mui/material/Button"
import { usePathname } from "next/navigation"
import { Typography, Box } from "@mui/material"
import Link from "next/link"

const Header = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <Box className="h-[80px]">
      <Box className="h-full flex justify-between mx-20">
        <Box className="flex justify-between items-center">
          <Typography fontSize={22} variant="overline" display="block" className="font-bold text-blue-500">
            demeters
          </Typography>
          <Box component="ul" className="ml-10 w-full flex gap-10">
            <li>
              <Link href="/">
                <Button className={`text-black ${isActive("/node-provider") ? "font-extrabold bg-slate-100" : ""}`}>
                  Node Provider
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/marketplace">
                <Button
                  variant="text"
                  className={`text-black ${isActive("/marketplace") ? "font-extrabold bg-slate-100" : ""}`}
                >
                  Market Place
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/application-node">
                <Button
                  variant="text"
                  className={`text-black ${isActive("/application-node") ? "font-extrabold bg-slate-100" : ""}`}
                >
                  Application Node
                </Button>
              </Link>
            </li>
          </Box>
        </Box>
        <Button>username</Button>
      </Box>
    </Box>
  )
}

export default Header
