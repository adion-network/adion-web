"use client"
import { SvgSpinnersBlocksScale, UilExchange } from "@/components/Icons"
import SupplierTypeSwitch from "@/components/node-provider/SupplierTypeSwitch"
import { Add, KeyboardArrowDown } from "@mui/icons-material"
import { Avatar, Box, Button, Paper, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

const nodeList = [
  {
    name: "Filecoin",
    state: "developing",
  },
  {
    name: "IO.net",
    state: "developed",
    icon: "https://api.iconify.design/cryptocurrency-color:fil.svg",
    totalGpu: 1000,
    totalComputerPower: 10000,
    lastDayEarning: 20000,
    estimatedEarning: 23000,
    nodeDetail: [
      {
        deviceId: 61020319,
        ip: "192.168.0.1",
        state: "runing",
        power: "1000w",
        gpuState: "Y:4 N:0",
        gpuModel: "RTX 4090",
        gpuCount: 4,
        region: "us-west-1",
      },
      {
        deviceId: 61020319,
        ip: "192.168.0.1",
        state: "runing",
        power: "1000w",
        gpuState: "Y:4 N:0",
        gpuModel: "RTX 4090",
        gpuCount: 4,
        region: "us-west-1",
      },
      {
        deviceId: 61020319,
        ip: "192.168.0.1",
        state: "runing",
        power: "1000w",
        gpuState: "Y:4 N:0",
        gpuModel: "RTX 4090",
        gpuCount: 4,
        region: "us-west-1",
      },
    ],
  },
]

export default function List() {
  const router = useRouter()
  return (
    <Box className="mx-auto w-[1000px] mt-20">
      <Box className="flex justify-start items-center">
        <Box>
          <SupplierTypeSwitch />
        </Box>
        <Box className="ml-4">
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            className="h-[55px] px-6 text-base font-extrabold rounded-lg"
            onClick={() => {
              router.push("/node-provider/supplier/create")
            }}
          >
            Add Supplier
          </Button>
        </Box>
      </Box>
      <Box className="py-10 flex flex-col justify-start gap-10">
        {nodeList.map((item: any, index: number) => (
          <Box className="flex relative flex-col gap-4" id={`node-${index}`}>
            <Box className="flex justify-between border-b border-stone-400 items-center">
              <Box className="py-3 px-4 flex justify-between rounded-t-lg gap-2 items-center bg-gray-100 bg-opacity-15 w-1/5">
                <Avatar src={item.icon}></Avatar>
                <Typography className="ml-2 text-lg font-extrabold">{item.name}</Typography>
                <KeyboardArrowDown className="cursor-pointer" />
              </Box>
              <UilExchange fontWeight={32} fontSize={26} className="mr-2" />
            </Box>
            <Box className="flex justify-between gap-4 py-4">
              <Paper className="bg-gray-800 w-1/4 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4" elevation={3}>
                <Typography className="text-gray-500">Total GPU(s)</Typography>
                <Typography className="mt-5 font-extrabold" variant="h5">
                  {item.totalGpu}
                </Typography>
                <Typography className="mt-1 font-extrabold" variant="h6">
                  Total GPU(s)
                </Typography>
              </Paper>
              <Paper className="bg-gray-800 w-1/4 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4" elevation={3}>
                <Typography className="text-gray-500">Total GPU(s)</Typography>
                <Typography className="mt-5 font-extrabold" variant="h5">
                  {item.totalGpu}
                </Typography>
                <Typography className="mt-1 font-extrabold" variant="h6">
                  Total GPU(s)
                </Typography>
              </Paper>
              <Paper className="bg-gray-800 w-1/4 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4" elevation={3}>
                <Typography className="text-gray-500">Total GPU(s)</Typography>
                <Typography className="mt-5 font-extrabold" variant="h5">
                  {item.totalGpu}
                </Typography>
                <Typography className="mt-1 font-extrabold" variant="h6">
                  Total GPU(s)
                </Typography>
              </Paper>
              <Paper className="bg-gray-800 w-1/4 border-2 border-gray-500 rounded-xl bg-opacity-20 p-4" elevation={3}>
                <Typography className="text-gray-500">Total GPU(s)</Typography>
                <Typography className="mt-5 font-extrabold" variant="h5">
                  {item.totalGpu}
                </Typography>
                <Typography className="mt-1 font-extrabold" variant="h6">
                  Total GPU(s)
                </Typography>
              </Paper>
            </Box>
            <Box>
              <Box>11111111111111111111111111111111</Box>
              <Box>11111111111111111111111111111111</Box>
              <Box>11111111111111111111111111111111</Box>
              <Box>11111111111111111111111111111111</Box>
            </Box>
            {item.state == "developing" && (
              <Box className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center rounded-xl flex-col backdrop-blur-[5px] border-2 border-opacity-80 border-gray-500">
                <SvgSpinnersBlocksScale fontSize={80} className="text-gray-500 mb-3" />{" "}
                <Typography variant="h6" className="font-extrabold text-gray-500">
                  Developing
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
