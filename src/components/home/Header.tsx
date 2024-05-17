"use client"
import { Box, Typography, Button, Menu, MenuItem, Divider } from "@mui/material"
import { LogoIcon } from "../Icons"
import Link from "next/link"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface MenuItem {
  name: string
  href: string
}

interface HeaderProps {
  menu: MenuItem[]
}

export default function Header() {
  const [isScroll, setIsScroll] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const pathName = usePathname()

  const headerUrl = [
    {
      name: "Vision",
      href: "/#vision",
    },
    {
      name: "Roadmap",
      href: "/#plan",
    },
    {
      name: "Node Provider",
      href: "/cloud",
    },
    {
      name: "Docs",
      href: "#",
    },
  ]

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = (e: any) => {
    setIsScroll(Boolean(e.target?.scrollTop || e.target?.scrollingElement?.scrollTop))
  }

  return (
    <Box
      className={`fixed flex flex-col justify-center h-16 ${
        isScroll ? "bg-gray-200 bg-opacity-10 border-b border-gray-800" : "bg-[#1A1A1A]"
      }  w-full z-10 backdrop-blur-md`}
    >
      <Box className="hidden md:flex mx-auto relative justify-between items-center w-4/5 2xl:w-2/3">
        <Box className="flex items-end gap-x-10">
          <Link href="/">
            <Box className="flex gap-2 items-center">
              <LogoIcon className="w-28"></LogoIcon>
            </Box>
          </Link>
        </Box>
        <Box className="flex gap-x-10 items-center">
          {headerUrl.map((link: any, index: number) => (
            <Link href={link.href} key={`menu-${index}`}>
              <Typography
                className={`font-semibold  text-xl hover:text-white ${
                  pathName === link.href ? "text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </Typography>
            </Link>
          ))}
          <Link href="/login">
            <Button variant="outlined" className="border-2 rounded-lg">
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
      <Box className="md:hidden items-center flex mx-auto justify-center w-screen relative px-2">
        <Button className="absolute left-2" variant="outlined" onClick={handleMenuClick}>
          <MenuIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {headerUrl.map((link: any, index: number) => (
            <MenuItem key={`mobile-menu-${index}`}>
              <Link href={link.href}>{link.name}</Link>
            </MenuItem>
          ))}
          <Divider></Divider>
          <MenuItem>
            <Link href="/login">Get Started</Link>
          </MenuItem>
        </Menu>
        <Box className="flex">
          <Link href="/">
            <LogoIcon className="w-28"></LogoIcon>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
