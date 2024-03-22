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
} from "@mui/material"
import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { useProjects } from "@/contexts/projects"
import useProfile from "@/contexts/profile"

import Link from "next/link"
import { AILogo, GpuMiningPool, SvgSpinners12DotsScaleRotate } from "@/components/Icons"
import { useRouter, useSearchParams } from "next/navigation"

export default function Overview() {
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
  } = useProjects()
  const router = useRouter()
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
    if (searchParams.get("action") === "switch" && projectList.length > 0) {
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

  return (
    <Box>
      <Backdrop open={isProjectListFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Box className="w-[1000px] ml-auto mr-auto mt-6 mb-10">
        <Box className="mb-4">
          <Link href="/node-provider/supplier/list">
            <Button variant="text" className="px-0 text-gray-400">
              <ArrowBackIosNew fontSize="small" className="mr-2" />
              Go Back
            </Button>
          </Link>
        </Box>
        <Typography variant="h5">{(isSwitchAction && "Edit Device") || "Add New Device"}</Typography>
        <Stepper className="mt-3" activeStep={createParams.activeStep} orientation="vertical">
          <Step key="0" expanded>
            <StepLabel className="w-[200px] flex-col justify-start items-start">
              <Typography variant="h6" className="text-gray-400 mt-2 text-wrap">
                Preferred mode:
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[200px] mt-[-90px] mb-16">
                <Box className="mb-2 grid grid-cols-2 gap-4">
                  {projectList.map((item: any, index: number) => {
                    const LogoComponent = item.name == "AI Cloud" ? AILogo : GpuMiningPool
                    return (
                      <Button
                        variant="outlined"
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
                      </Button>
                    )
                  })}
                </Box>
              </Box>
            </StepContent>
          </Step>
          <Step key="1" active={createParams.activeStep === 1} expanded={createParams.activeStep > 1}>
            <StepLabel className="w-[200px] flex-col justify-start items-start">
              <Typography variant="h6" className="text-gray-400 mt-2">
                Favorite project:
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[200px] mt-[-90px]">
                <Box className="mb-2 grid grid-cols-2 gap-4">
                  {projectDetailList.map((item: any, index: number) => {
                    return (
                      <Button
                        key={`pool-${index}`}
                        disabled={item.id === Number(searchParams.get("from_project_id"))}
                        variant="outlined"
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
                        {item.id === Number(searchParams.get("from_project_id")) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-red-900 bg-opacity-10 flex justify-center items-center">
                            <Cancel className="absolute text-3xl right-0 bottom-0 text-red-500 opacity-20" />
                          </div>
                        )}
                        {isApplicationSelected(item.id) && (
                          <div className="absolute top-0 left-0 w-full h-full bg-yellow-900 bg-opacity-20 flex justify-center items-center">
                            <CheckCircleOutline className="absolute text-3xl right-0 bottom-0 text-yellow-600" />
                          </div>
                        )}
                        {item.is_hot && <HotBadge badgeContent="Hot"></HotBadge>}
                      </Button>
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
              isJoiningProject ||
              isSwitchUnchanged
            }
            size="large"
            variant="contained"
            className="w-full py-2 text-xl font-extrabold mt-10 rounded-lg"
            onClick={async () => {
              if (isSwitchAction) {
                await switchProject(fromProject, createParams.projectInfo, userInfo.username)
              } else {
                await joinProject(createParams.projectInfo, userInfo.username)
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
