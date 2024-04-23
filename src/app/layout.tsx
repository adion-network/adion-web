"use client"
import "./globals.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { darkTheme } from "@/app/theme"

//components
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
      <head>
        <title>Adion Network</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={3000}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <ProjectProvider>
                <UserProvider>
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
