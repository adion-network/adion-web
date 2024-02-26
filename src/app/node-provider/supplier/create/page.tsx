"use client"
import { CheckCircleOutline, ArrowBackIosNew } from "@mui/icons-material"
import {
  Box,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  StepContent,
  Paper,
  CircularProgress,
  Backdrop,
} from "@mui/material"
import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { useState, useEffect } from "react"
import useCoins from "@/app/api/coins"
import Link from "next/link"
import { AILogo, GpuMiningPool } from "@/components/Icons"

export default function Overview() {
  const { coinList, fetchCoinList, isCoinListFetching } = useCoins()

  const createParamsInit = {
    option: "",
    application: "",
    activeStep: 0,
  }

  const [createParams, setCreateParams] = useState(createParamsInit)

  const processStepOne = async (option: string) => {
    if (createParams.option !== option) {
      setCreateParams({
        ...createParams,
        option: option,
        application: "",
        activeStep: 1,
      })
    }
  }

  const processStepTwo = async (application: string) => {
    if (createParams.application !== application) {
      setCreateParams({
        ...createParams,
        application: application,
        activeStep: 2,
      })
    }
  }

  const isOptionSelected = (option: string): boolean => {
    return option === createParams.option
  }

  const isApplicationSelected = (application: string): boolean => {
    return application === createParams.application
  }

  const HotBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#FD6260",
      fontWeight: "900",
      color: "white",
      transform: "rotate(45deg)",
      transformOrigin: "top right",
      textAlign: "center",
      lineHeight: "20px",
      borderRadius: 0,
      right: -15,
      top: 17,
      padding: "0px 30px 0px 30px",
    },
  }))

  const optionList = [
    {
      logo: AILogo,
      name: "AI Cloud",
    },
    {
      logo: GpuMiningPool,
      name: "GPU Mining Pool",
    },
  ]

  useEffect(() => {
    fetchCoinList()
    //todo: fetch application list
  }, [])

  return (
    <Box>
      <Backdrop open={isCoinListFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>

      <Box className="w-[1000px] ml-auto mr-auto mt-6 mb-10">
        <Box className="mb-4">
          <Link href="/node-provider/overview">
            <Button variant="text" className="px-0 text-gray-400">
              <ArrowBackIosNew fontSize="small" className="mr-2" />
              Go Back
            </Button>
          </Link>
        </Box>
        <Typography variant="h5">Add New Supplier</Typography>
        <Stepper className="mt-3" activeStep={createParams.activeStep} orientation="vertical">
          <Step key="0" expanded>
            <StepLabel className="w-[200px] flex-col justify-start items-start">
              <Typography variant="h6" className="text-gray-400 mt-2 text-wrap">
                Please select your preferred mode?
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[200px] mt-[-90px] mb-16">
                <Box className="mb-2 grid grid-cols-2 gap-4">
                  {optionList.map((item: any, index: number) => {
                    const LogoComponent = item.logo
                    return (
                      <Paper
                        key={`option-${index}`}
                        onClick={() => processStepOne(item.name)}
                        className={`py-6 relative rounded-xl flex cursor-pointer bg-black overflow-hidden border-2 border-gray-600 ${
                          isOptionSelected(item.name) ? "border-yellow-600" : "hover:border-yellow-600"
                        }`}
                      >
                        <Box className="ml-6 py-3 flex flex-row items-center w-full">
                          <LogoComponent />
                          <Typography className="ml-2 font-extrabold" variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        {isOptionSelected(item.name) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                            <CheckCircleOutline className="absolute text-3xl right-0 bottom-0 text-yellow-600" />
                          </div>
                        )}
                      </Paper>
                    )
                  })}
                </Box>
              </Box>
            </StepContent>
          </Step>
          <Step key="1" active={createParams.activeStep === 1} expanded={createParams.activeStep > 1}>
            <StepLabel className="w-[200px] flex-col justify-start items-start">
              <Typography variant="h6" className="text-gray-400 mt-2">
                Please select your favorite project?
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[200px] mt-[-90px]">
                <Box className="mb-2 grid grid-cols-2 gap-4">
                  {coinList.map((item: any, index: number) => {
                    return (
                      <Paper
                        key={`pool-${index}`}
                        onClick={() => processStepTwo(item.name)}
                        className={`py-6 relative rounded-xl flex cursor-pointer bg-black overflow-hidden border-2 border-gray-600 ${
                          isApplicationSelected(item.name) ? "border-yellow-600" : "hover:border-yellow-600"
                        }`}
                      >
                        <Box className="ml-6 py-3 flex flex-row items-center w-full">
                          <GpuMiningPool />
                          <Typography className="ml-2 font-extrabold" variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        {isApplicationSelected(item.name) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                            <CheckCircleOutline className="absolute text-3xl right-0 bottom-0 text-yellow-600" />
                          </div>
                        )}
                        {item.is_hot && <HotBadge badgeContent="Hot"></HotBadge>}
                      </Paper>
                    )
                  })}
                </Box>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        <Box className="flex justify-center mt-8">
          <Button
            color="success"
            disabled={!(createParams.activeStep === 2 && createParams.option !== "" && createParams.application !== "")}
            size="large"
            variant="contained"
            className="w-full py-2 text-xl font-extrabold mt-10"
          >
            Launch Now
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
