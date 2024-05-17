"use client"

import Button from "@mui/material/Button"
import { Avatar, Box, MenuItem, Backdrop, CircularProgress } from "@mui/material"
import { LogoIconWithDotAi } from "../Icons"
import { styled } from "@mui/material/styles"
import Menu, { MenuProps } from "@mui/material/Menu"
import { useState, Fragment, useEffect } from "react"
import useProfile from "@/contexts/profile"
import { usePathname } from "next/navigation"
import { BlockIcon, DocsIcon, ExplorerIcon } from "./Icons"
import Link from "next/link"

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
    <Box className="h-20">
      <Backdrop open={isLogouting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Box className="h-full flex justify-between items-center px-24">
        <Box className="flex justify-between items-center">
          <Box className="w-full flex justify-start items-center space-x-4">
            <Box className="px-10">
              <LogoIconWithDotAi className="text-5xl w-full" />
            </Box>
            <Button
              variant="text"
              startIcon={<BlockIcon />}
              href="/node-provider/workers"
              className={`2xl:text-lg hover:bg-gray-100/20 px-6 ${
                path.startsWith("/node-provider") && "bg-gray-100/20"
              }`}
            >
              Node Provider
            </Button>
            <Button
              variant="text"
              startIcon={<ExplorerIcon />}
              href="#"
              className={`2xl:text-lg hover:bg-gray-100/20 px-6 ${
                path === "/node-provider/explorer" && "bg-gray-100/20"
              }`}
            >
              Explorer
            </Button>
            <Button
              variant="text"
              startIcon={<DocsIcon />}
              href="#"
              className={`2xl:text-lg hover:bg-gray-100/20 px-6 ${path === "/Docs" && "bg-gray-100/20"}`}
            >
              Docs
            </Button>
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
      <Box className="h-full flex justify-start space-x-8 items-center px-36">
        <Link href="/node-provider/workers">
          <Box
            className={`border-b-2 ${
              path.startsWith("/node-provider/workers")
                ? "border-white text-white"
                : " text-gray-400 border-b-transparent"
            }  py-2 px-1 hover:border-gray-300 hover:text-white`}
          >
            Workers
          </Box>
        </Link>
        <Link href="/node-provider/app-chain">
          <Box
            className={`border-b-2 ${
              path.startsWith("/node-provider/app-chain")
                ? "border-white text-white"
                : " text-gray-400 border-b-transparent"
            }  py-2 px-1 hover:border-gray-300 hover:text-white`}
          >
            App Chain
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

export default Header
