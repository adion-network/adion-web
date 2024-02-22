"use client"

import Button from "@mui/material/Button"
import { Box, MenuItem } from "@mui/material"
import Link from "next/link"
import { CryptocurrencyColorIotx, FluentSettingsCogMultiple24Regular } from "./Icons"
import { KeyboardArrowDown } from "@mui/icons-material"
import { styled, alpha } from "@mui/material/styles"
import Menu, { MenuProps } from "@mui/material/Menu"

import { useState } from "react"

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
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
      backgroundColor: "#000000",
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
        <Button>username</Button>
      </Box>
    </Box>
  )
}

export default Header
