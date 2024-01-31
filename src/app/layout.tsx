"use client"
import type { Metadata } from "next"
import "./globals.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "@/app/theme"

//components
import Header from "@/components/Header"
import { SnackbarProvider } from "notistack"
import { ConfirmProvider } from "material-ui-confirm"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={3000}>
            <ConfirmProvider>
              <ThemeProvider theme={theme}>
                {" "}
                <Header />
                {children}
              </ThemeProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
