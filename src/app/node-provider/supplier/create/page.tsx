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
  Avatar,
} from "@mui/material"
import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { useProjects } from "@/contexts/projects"
import Link from "next/link"
import { AILogo, GpuMiningPool, SvgSpinners12DotsScaleRotate } from "@/components/Icons"
import { useRouter } from "next/navigation"

export default function Overview() {
  const {
    projectList,
    fetchProjectList,
    isProjectListFetching,
    projectDetailList,
    setProjectDetailList,
    searchProjecByType,
    joinProject,
    isJoiningProject,
  } = useProjects()
  const router = useRouter()

  const createParamsInit = {
    option: -1,
    activeStep: 0,
    projectInfo: {} as any,
  }

  const [createParams, setCreateParams] = useState(createParamsInit)

  const processStepOne = async (index: number) => {
    if (createParams.option !== index) {
      setCreateParams({
        ...createParams,
        option: index,
        projectInfo: {},
        activeStep: 1,
      })
      setProjectDetailList(searchProjecByType(index))
    }
  }

  const processStepTwo = async (projectInfo: any) => {
    if (createParams.projectInfo.id !== projectInfo.id) {
      setCreateParams({
        ...createParams,
        projectInfo: projectInfo,
        activeStep: 2,
      })
    }
  }

  const isOptionSelected = (option: number): boolean => {
    return option === createParams.option
  }

  const isApplicationSelected = (projectId: number): boolean => {
    return projectId === createParams.projectInfo.id
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

  useEffect(() => {
    fetchProjectList()
  }, [])

  return (
    <Box>
      <Backdrop open={isProjectListFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                  {projectList.map((item: any, index: number) => {
                    const LogoComponent = item.name == "AI Cloud" ? AILogo : GpuMiningPool
                    return (
                      <Paper
                        key={`option-${index}`}
                        onClick={() => processStepOne(index)}
                        className={`py-6 bg-transparent relative rounded-xl flex cursor-pointer overflow-hidden border-2 border-gray-600 ${
                          isOptionSelected(index) ? "border-yellow-600" : "hover:border-yellow-600"
                        }`}
                      >
                        <Box className="ml-6 py-3 flex flex-row items-center w-full">
                          <LogoComponent />
                          <Typography className="ml-2 font-extrabold" variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        {isOptionSelected(index) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-yellow-600 bg-opacity-20 flex justify-center items-center">
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
                  {projectDetailList.map((item: any, index: number) => {
                    return (
                      <Paper
                        key={`pool-${index}`}
                        onClick={() => processStepTwo(item)}
                        className={`py-6 relative rounded-xl flex cursor-pointer bg-transparent overflow-hidden border-2 border-gray-600 ${
                          isApplicationSelected(item.id) ? "border-yellow-600" : "hover:border-yellow-600"
                        }`}
                      >
                        <Box className="ml-6 py-3 flex flex-row items-center w-full">
                          <Avatar src={item.logo} sx={{ width: 50, height: 50 }} className="bg-gray-200/30">
                            {item.name.slice(0, 1).toUpperCase()}
                          </Avatar>
                          <Typography className="ml-2 font-extrabold" variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        {isApplicationSelected(item.id) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-yellow-900 bg-opacity-20 flex justify-center items-center">
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
            disabled={
              !(createParams.activeStep === 2 && createParams.option !== -1 && createParams.projectInfo.id > 0) ||
              isJoiningProject
            }
            size="large"
            variant="contained"
            className="w-full py-2 text-xl font-extrabold mt-10 rounded-lg"
            onClick={async () => {
              joinProject(createParams.projectInfo).then(() => {
                router.push("/node-provider/supplier/list")
              })
            }}
          >
            {isJoiningProject ? (
              <Box className="flex gap-x-2">
                <SvgSpinners12DotsScaleRotate fontSize={28}></SvgSpinners12DotsScaleRotate>
                Lauching
              </Box>
            ) : (
              "Launch Now"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
