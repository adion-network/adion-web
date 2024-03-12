"use client"

import Button from "@mui/material/Button"
import { Box, MenuItem } from "@mui/material"
import Link from "next/link"
import { CryptocurrencyColorIotx, FluentSettingsCogMultiple24Regular } from "./Icons"
import { KeyboardArrowDown } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import Menu, { MenuProps } from "@mui/material/Menu"

import { useEffect, useState } from "react"
import { ResData } from "@/app/api/request"
import { useRouter } from "next/navigation"

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null)
  const [username, setUsername] = useState<string | null>("")
  const open = Boolean(anchorEl)
  const userMenuopen = Boolean(userAnchorEl)
  const router = useRouter()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserAnchorEl(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null)
  }

  const toLogout = () => {
    router.push("/api/logout")
  }

  useEffect(() => {
    fetchUsreInfo()
  }, [])

  const fetchUsreInfo = async () => {
    let username = localStorage.getItem("username")
    if (!username) {
      const res: ResData = await (await fetch("/api/login", { method: "GET" })).json()
      username = res.data.username
    }
    console.log(username)
    setUsername(username)
  }

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(() => ({
    "& .MuiPaper-root": {
      borderRadius: 10,
      minWidth: 180,
      backgroundColor: "transparent",
      border: "2px solid #333333",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    },
  }))

  return (
    <Box className="h-[80px]">
      <Box className="h-full flex justify-between mx-20">
        <Box className="flex justify-between items-center">
          <CryptocurrencyColorIotx fontSize={50}></CryptocurrencyColorIotx>
          <Box className="ml-10 w-full flex items-center">
            <Box>
              <Link href="/">
                <Button variant="text" className="text-xl font-extrabold">
                  Node Provider
                </Button>
              </Link>
            </Box>
            <Box className="cursor-pointer">
              <Button onClick={handleOpenMenu}>
                <KeyboardArrowDown></KeyboardArrowDown>
              </Button>
              <StyledMenu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
                <MenuItem>
                  <Link href="/supplier">
                    <Box className="flex items-center text-2xl px-4 py-2 gap-3">
                      <FluentSettingsCogMultiple24Regular fontSize={36} />
                      Supplier
                    </Box>
                  </Link>
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>
        </Box>
        <Button onClick={handleOpenUserMenu}>{username}</Button>
        <StyledMenu
          id="basic-menu"
          anchorEl={userAnchorEl}
          open={userMenuopen}
          onClose={handleCloseUserMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              toLogout()
            }}
          >
            Logout
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  )
}

export default Header
