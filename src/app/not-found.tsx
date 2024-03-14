"use client"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

export default function NotFound() {
  return (
    <Box className="mt-20 flex justify-center">
      <Box className="flex flex-col gap-y-4">
        <Typography variant="h2">Coming Soon!</Typography>
        <Typography variant="h4">This feature is under developing</Typography>
        <Link href="/node-provider/supplier/list">
          <Button variant="contained" color="success" className="px-4 py-2">
            Return To Home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
