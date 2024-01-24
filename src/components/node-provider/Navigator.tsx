"use client"
import { Box, Tab, Tabs, Link } from "@mui/material"
import { usePathname } from "next/navigation"
import {
  FluentClover24Filled,
  Fa6SolidCubes,
  ClarityBitcoinSolid,
  StreamlineInterfaceUploadDesktopActionActionsComputerDesktopDeviceDisplayMonitorScreenUpload,
} from "@/components/Icons"

export default function Navigator() {
  const pathName = usePathname()
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs className="ml-20" value={pathName}>
          <Tab
            label="Access Resources"
            component={Link}
            value="/node-provider/access-resources"
            href="/node-provider/access-resources"
            icon={<StreamlineInterfaceUploadDesktopActionActionsComputerDesktopDeviceDisplayMonitorScreenUpload />}
            iconPosition="start"
          />
          <Tab
            label="Overview"
            component={Link}
            value="/node-provider/overview"
            href="/node-provider/overview"
            icon={<FluentClover24Filled />}
            iconPosition="start"
          />
          <Tab
            label="Mining Pools"
            component={Link}
            value="/node-provider/mining-pools"
            href="/node-provider/mining-pools"
            icon={<Fa6SolidCubes />}
            iconPosition="start"
          />
          <Tab
            label="Farm"
            component={Link}
            value="/node-provider/farm"
            href="/node-provider/farm"
            icon={<ClarityBitcoinSolid />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
    </Box>
  )
}
