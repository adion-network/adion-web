"use client"
import "./globals.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { darkTheme } from "@/app/theme"

//components
import Header from "@/components/Header"
import { SnackbarProvider } from "notistack"
import { ConfirmProvider } from "material-ui-confirm"
import { CssBaseline } from "@mui/material"
import { usePathname } from "next/navigation"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={3000}>
            <ConfirmProvider>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline /> {path !== "/login" && <Header />}
                {children}
              </ThemeProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
