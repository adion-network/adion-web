"use client"
import "./globals.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { DarkTheme } from "@/app/theme"

//components
import Header from "@/components/Header"
import { SnackbarProvider } from "notistack"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { CssBaseline } from "@mui/material"
import { usePathname } from "next/navigation"
import { ProjectProvider } from "@/contexts/projects"
import { UserProvider } from "@/contexts/profile"
import { blue } from "@mui/material/colors"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={3000}>
            <ThemeProvider theme={DarkTheme}>
              <CssBaseline />
              <ProjectProvider>
                <UserProvider>
                  {path !== "/login" && path !== "/" && path !== "/register" && <Header />}
                  {children}
                  <ProgressBar height="1px" color={blue[600]} options={{ showSpinner: false }} shallowRouting />
                </UserProvider>
              </ProjectProvider>
            </ThemeProvider>
          </SnackbarProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
