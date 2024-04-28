"use client"
import { CheckCircleOutline, ArrowBackIosNew, Cancel } from "@mui/icons-material"
import {
  Box,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  Backdrop,
  Avatar,
  StepProps,
  StepLabelProps,
  TextField,
} from "@mui/material"
import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { useProjects } from "@/contexts/projects"
import useProfile from "@/contexts/profile"
import { AILogo, GpuMiningPool, SvgSpinners12DotsScaleRotate } from "@/components/Icons"
import { useSearchParams } from "next/navigation"
import Header from "@/components/node-provider/Header"
import { useRouter } from "next/navigation"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

export default function AppChain({ params }: { params: { action: string } }) {
  const router = useRouter()
  const {
    projectList,
    fetchProjectList,
    isProjectListFetching,
    setIsProjectListFetching,
    projectDetailList,
    setProjectDetailList,
    searchProjecByType,
    joinProject,
    isJoiningProject,
    switchProject,
    selectedNodes,
  } = useProjects()
  const searchParams = useSearchParams()

  const createParamsInit = {
    option: -1,
    activeStep: 0,
    projectInfo: {} as any,
  }

  const [createParams, setCreateParams] = useState(createParamsInit)
  const [submitText, setSubmitText] = useState(["Launch Now", "Launching"])

  //switch project
  const [isSwitchUnchanged, setIsSwitchUnchanged] = useState(false)
  const [isSwitchAction, setIsSwitchAction] = useState(false)
  const [fromProject, setFromProject] = useState<any>({})

  //user profile
  const { userInfo } = useProfile()

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
      right: -37,
      top: -25,
      padding: "0px 30px 0px 30px",
    },
  }))

  useEffect(() => {
    if (selectedNodes.length === 0) {
      router.push("/node-provider/app-chain")
    }
    if (projectList.length > 0) {
      return
    }
    fetchProjectList()
  }, [])

  useEffect(() => {
    const processParams = () => {
      setIsProjectListFetching(true)
      const fromProjectId = Number(searchParams.get("from_project_id"))
      for (let i = 0; i < projectList.length; i++) {
        for (let j = 0; j < projectList[i].project.length; j++) {
          const p = projectList[i].project[j]
          if (p.id === fromProjectId) {
            setProjectDetailList(searchProjecByType(i))
            setCreateParams({
              option: i,
              activeStep: 2,
              projectInfo: p,
            })
            setFromProject(p)
            setIsSwitchUnchanged(true)
          }
        }
      }
      setIsProjectListFetching(false)
    }
    if (params.action === "switch" && projectList.length > 0) {
      processParams()
      setSubmitText(["Switch Now", "Switching"])
      setIsSwitchAction(true)
    }
  }, [projectList])

  useEffect(() => {
    const fromProjectId = Number(searchParams.get("from_project_id"))
    if (fromProjectId !== createParams.projectInfo.id) {
      setIsSwitchUnchanged(false)
    } else {
      setIsSwitchUnchanged(true)
    }
  }, [createParams.projectInfo])

  const CustomizedStepLabel = styled((props: StepLabelProps) => (
    <StepLabel
      sx={{
        width: "35%",
        display: "flex",
        alignItems: "start",
        padding: 0,
      }}
      {...props}
    />
  ))(() => ({
    "& .MuiStepLabel-iconContainer": {
      height: "100%",
      position: "relative",
      display: "inline-block",
      paddingRight: 0,
    },
    "& .MuiStepLabel-iconContainer:after": {
      content: '""',
      zIndex: "-10",
      position: "absolute",
      right: "50%",
      top: "32px",
      bottom: 0,
      width: "1px",
      borderLeft: "2px dashed gray",
    },
    "& .MuiStepLabel-labelContainer": {
      paddingLeft: "8px",
    },
  }))

  const CustomizedStepLabelLast = styled((props: StepLabelProps) => (
    <StepLabel
      sx={{
        width: "35%",
        display: "flex",
        alignItems: "start",
        padding: 0,
      }}
      {...props}
    />
  ))(() => ({
    "& .MuiStepLabel-iconContainer": {
      height: "100%",
      position: "relative",
      display: "inline-block",
      paddingRight: 0,
    },
    "& .MuiStepLabel-labelContainer": {
      paddingLeft: "8px",
    },
  }))

  const ipListColumns: GridColDef[] = [
    { field: "ip", headerName: "Worker IP", minWidth: 120 },
    { field: "deviceId", headerName: "Device ID", minWidth: 350 },
  ]

  return (
    <Box>
      <Header />
      <Backdrop open={isProjectListFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Box className="mx-auto 2xl:w-2/3 w-4/5 mt-20">
        <Box className="mb-4">
          <Button
            onClick={() => {
              router.back()
            }}
            variant="text"
            className="hover:scale-105 transition"
            startIcon={<ArrowBackIosNew />}
          >
            Go Back
          </Button>
        </Box>
        <Typography variant="h5">{(isSwitchAction && "Swith App Chain") || "Connect App Chain"}</Typography>
        <Stepper
          className="mt-12"
          activeStep={createParams.activeStep}
          orientation="vertical"
          sx={{
            ".MuiStepConnector-vertical": {
              display: "none",
            },
          }}
        >
          <Step
            key="0"
            expanded
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <CustomizedStepLabel>
              <Typography variant="h6" className="text-white text-wrap">
                Preferred mode:
              </Typography>
              <Typography variant="body1" className="text-gray-400 text-wrap">
                Choose the mode you wish your hardware to be grouped on
              </Typography>
            </CustomizedStepLabel>
            <StepContent sx={{ width: "65%" }} className="border-none pb-20">
              <Box className="mb-16">
                <Box className="mb-2 grid grid-cols-2 gap-4">
                  {projectList.map((item: any, index: number) => {
                    const LogoComponent = item.name == "AI Cloud" ? AILogo : GpuMiningPool
                    return (
                      <Button
                        variant="outlined"
                        key={`option-${index}`}
                        onClick={() => processStepOne(index)}
                        className={`py-6 relative rounded-lg flex cursor-pointer bg-transparent overflow-hidden border border-gray-600 ${
                          isOptionSelected(index) ? "border-logo-from" : "hover:border-logo-from hover:bg-logo-from/10"
                        }`}
                      >
                        <Box className="ml-6 py-3 flex flex-row items-center w-full">
                          <LogoComponent />
                          <Typography className="ml-2 font-extrabold" variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        {isOptionSelected(index) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-logo-from bg-opacity-20 flex justify-center items-center">
                            <CheckCircleOutline className="absolute text-3xl right-0 bottom-0 text-logo-from" />
                          </div>
                        )}
                      </Button>
                    )
                  })}
                </Box>
              </Box>
            </StepContent>
          </Step>
          <Step
            key="1"
            active={createParams.activeStep === 1}
            className="mt-2"
            expanded={createParams.activeStep > 1}
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <CustomizedStepLabel>
              <Typography variant="h6" className="text-white text-wrap">
                Select App Chain:
              </Typography>
              <Typography variant="body1" className="text-gray-400 text-wrap">
                Choose the app chain you wish your hardware to be grouped on
              </Typography>
            </CustomizedStepLabel>
            <StepContent sx={{ width: "65%" }} className="border-none pb-20">
              <Box className="mb-2 grid grid-cols-2 gap-4">
                {projectDetailList.map((item: any, index: number) => {
                  return (
                    <Button
                      key={`pool-${index}`}
                      disabled={item.id === Number(searchParams.get("from_project_id"))}
                      variant="outlined"
                      onClick={() => processStepTwo(item)}
                      className={`py-6 relative rounded-lg flex cursor-pointer bg-transparent overflow-hidden border border-gray-600 ${
                        isApplicationSelected(item.id) ? "border-logo-from" : "hover:border-logo-from"
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
                      {item.id === Number(searchParams.get("from_project_id")) && (
                        <div className="absolute top-0 left-0 w-full h-full bg-red-900 bg-opacity-10 flex justify-center items-center">
                          <Cancel className="absolute text-3xl right-0 bottom-0 text-red-500 opacity-20" />
                        </div>
                      )}
                      {isApplicationSelected(item.id) && (
                        <div className="absolute top-0 left-0 w-full h-full bg-logo-from bg-opacity-20 flex justify-center items-center">
                          <CheckCircleOutline className="absolute text-3xl right-0 bottom-0 text-logo-from" />
                        </div>
                      )}
                      {item.is_hot && <HotBadge badgeContent="Hot"></HotBadge>}
                    </Button>
                  )
                })}
              </Box>
            </StepContent>
          </Step>
          <Step
            key="2"
            active={createParams.activeStep === 2}
            expanded
            className="mt-2"
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <CustomizedStepLabelLast>
              <Typography variant="h6" className="text-white text-wrap">
                Workers List
              </Typography>
              <Typography variant="body1" className="text-gray-400 text-wrap">
                The workers devices to access the project
              </Typography>
            </CustomizedStepLabelLast>
            <StepContent sx={{ width: "65%" }} className="border-none">
              <DataGrid hideFooter columns={ipListColumns} rows={selectedNodes} getRowId={(r) => r.deviceId}></DataGrid>
            </StepContent>
          </Step>
        </Stepper>
        <Box className="flex justify-end mt-8 pb-10">
          <Button
            disabled={
              !(createParams.activeStep === 2 && createParams.option !== -1 && createParams.projectInfo.id > 0) ||
              isJoiningProject ||
              isSwitchUnchanged
            }
            size="large"
            variant="contained"
            className="w-2/3 py-2 text-xl font-extrabold mt-10 rounded-lg"
            onClick={async () => {
              if (isSwitchAction) {
                await switchProject(fromProject, createParams.projectInfo, userInfo.username, selectedNodes)
              } else {
                await joinProject(createParams.projectInfo, userInfo.username, selectedNodes)
              }
            }}
          >
            {isJoiningProject ? (
              <Box className="flex gap-x-2">
                <SvgSpinners12DotsScaleRotate fontSize={28}></SvgSpinners12DotsScaleRotate>
                {submitText[1]}
              </Box>
            ) : (
              submitText[0]
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
