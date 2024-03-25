"use client"

import Button from "@mui/material/Button"
import { Avatar, Box, MenuItem, Backdrop, CircularProgress } from "@mui/material"
import Link from "next/link"
import { LogoIcon } from "./Icons"
import { styled } from "@mui/material/styles"
import Menu, { MenuProps } from "@mui/material/Menu"
import { useState, Fragment, useEffect } from "react"
import useProfile from "@/contexts/profile"
import { usePathname } from "next/navigation"

const Header = () => {
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null)
  const userMenuopen = Boolean(userAnchorEl)
  const { userInfo, fetchUserInfo, logout, isLogouting } = useProfile()
  const path = usePathname()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserAnchorEl(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [userInfo.isLogin, path])

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
      border: "2px solid #333333",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    },
  }))

  return (
    <Box className="h-[80px]">
      <Backdrop open={isLogouting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Box className="h-full flex justify-between items-center mx-20">
        <Box className="flex justify-between items-center">
          <Box className="ml-10 w-full flex items-center">
            <Box>
              <Link href="/node-provider/supplier/list">
                <Button startIcon={<LogoIcon className="text-3xl" />} variant="text" className="text-xl font-extrabold">
                  Node Provider
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        {userInfo.isLogin && (
          <Fragment>
            <Box className="flex">
              <Avatar>{userInfo.username.slice(0, 1).toUpperCase()}</Avatar>
              <Button onClick={handleOpenUserMenu}>{userInfo.username}</Button>
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
                  onClick={async () => {
                    await logout()
                  }}
                >
                  Logout
                </MenuItem>
              </StyledMenu>
            </Box>
          </Fragment>
        )}
      </Box>
    </Box>
  )
}

export default Header
