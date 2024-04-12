"use client"
import {
  BiYoutube,
  ConvertIcon,
  DoubleQuotationMarkLeftIcon,
  DoubleQuotationMarkRightIcon,
  IcBaselineDiscord,
  LogoIcon,
  MdiTelegram,
  MdiTwitter,
  MeterIcon,
  MonitorIcon,
  ResourceIcon,
  RobotIcon,
  ScheduleIcon,
  ToolsIcon,
} from "@/components/Icons"
import { Box, Button, Typography, Menu, MenuItem, Divider } from "@mui/material"
import Link from "next/link"
import { useState, useEffect } from "react"
import "animate.css"
import { AnimationOnScroll } from "react-animation-on-scroll"
import Image from "next/image"
//images
import constructionPic from "@/../public/images/home/construction.svg"
import layersPic from "@/../public/images/home/layers.svg"
import chain1Pic from "@/../public/images/home/chain1.svg"
import chain2Pic from "@/../public/images/home/chain2.svg"
import chain3Pic from "@/../public/images/home/chain3.svg"
import chain4Pic from "@/../public/images/home/chain4.svg"
import chain5Pic from "@/../public/images/home/chain5.svg"
import dmosPic from "@/../public/images/home/dmos.svg"
import whyUsPic from "@/../public/images/home/why_us.svg"
import stepsPic from "@/../public/images/home/steps.svg"
import mapPic from "@/../public/images/home/map.svg"
import RainbowBg from "@/components/RainbowBg"
import Typewriter from "typewriter-effect"
import TorusOfCubesBg from "@/components/TorusOfCubesBg"
import { Menu as MenuIcon } from "@mui/icons-material"

const NextIcon = () => {
  return (
    <svg
      className="w-8 mb-5 animate-[bounce_3s_ease-in-out_32]"
      viewBox="0 0 22 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4005 15.4189L19.9869 6.89568C20.1763 6.70628 20.1763 6.3906 19.9869 6.2012C19.7974 6.01179 19.4818 6.01179 19.2924 6.2012L11.0848 14.4087L2.68791 6.2012C2.49851 6.01179 2.18283 6.01179 1.99343 6.2012C1.80403 6.3906 1.80403 6.70628 1.99343 6.89568L10.706 15.4189C10.8954 15.6083 11.2111 15.6083 11.4005 15.4189Z"
        fill="#0090FF"
      />
      <path
        d="M11.4005 23.5002L19.9869 14.977C20.1763 14.7876 20.1763 14.4719 19.9869 14.2825C19.7974 14.0931 19.4818 14.0931 19.2924 14.2825L11.0848 22.49L2.68791 14.2825C2.49851 14.0931 2.18283 14.0931 1.99343 14.2825C1.80403 14.4719 1.80403 14.7876 1.99343 14.977L10.706 23.5002C10.8954 23.6896 11.2111 23.6896 11.4005 23.5002Z"
        fill="#0090FF"
      />
    </svg>
  )
}

export default function Home() {
  const [isScroll, setIsScroll] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = (e: any) => {
    setIsScroll(Boolean(e.target.scrollTop))
  }

  const headerUrl = [
    {
      name: "Cloud",
      href: "/cloud",
    },
    {
      name: "DMOS",
      href: "#dmos",
    },
    {
      name: "Explorer",
      href: "#",
    },
  ]

  return (
    <Box>
      <Box
        className={`fixed flex flex-col justify-center h-16 ${
          isScroll ? "bg-gray-200 bg-opacity-10 border-b border-gray-800" : "bg-[#1A1A1A]"
        }  w-full z-10 backdrop-blur-md`}
      >
        <Box className="hidden md:flex mx-auto relative justify-between items-center w-4/5 2xl:w-2/3">
          <Box className="flex items-end gap-x-10">
            <Link href="/">
              <Box className="flex gap-2 items-center">
                <LogoIcon className="text-4xl"></LogoIcon>
                <Typography className="text-2xl font-extrabold text-gray-200">Demeters.ai</Typography>
              </Box>
            </Link>
            {headerUrl.map((link: any, index: number) => (
              <Link href={link.href} key={`menu-${index}`}>
                <Typography className="font-bold text-gray-400 text-xl">{link.name}</Typography>
              </Link>
            ))}
          </Box>
          <Box className="flex gap-x-10 items-center">
            <Link href="#">
              <Typography className="font-bold text-gray-400 text-md">Docs</Typography>
            </Link>
            <Link href="/login">
              <Button variant="outlined" className="border-2 rounded-lg">
                Sign In
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className="md:hidden items-center flex mx-auto justify-center w-screen relative px-2">
          <Button className="absolute left-2" variant="outlined" onClick={handleMenuClick}>
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {headerUrl.map((link: any, index: number) => (
              <MenuItem key={`mobile-menu-${index}`}>
                <Link href={link.href}>{link.name}</Link>
              </MenuItem>
            ))}
            <Divider></Divider>
            <MenuItem>
              <Link href="/login">Sign In</Link>
            </MenuItem>
            <MenuItem>
              <Link href="#">Docs</Link>
            </MenuItem>
          </Menu>
          <Box className="flex items-end gap-x-10">
            <Link href="/">
              <Box className="flex gap-2 items-center">
                <LogoIcon className="text-2xl"></LogoIcon>
                <Typography className="text-xl font-extrabold text-gray-200">Demeters.ai</Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen scrollable-container overflow-y-scroll snap-y snap-mandatory">
        <Box id="instruction" className="relative h-screen snap-start">
          <TorusOfCubesBg />
          <Box component={"div"} className="bg-[#1A1A1A] bg-opacity-70 z-10">
            <Box className="w-4/5 2xl:w-2/3 md:w-4/5 mx-auto">
              <Box className="min-h-screen flex-col flex items-center justify-center gap-y-16">
                <Typography className="text-3xl 2xl:text-7xl md:text-6xl md:leading-snug 2xl:leading-snug text-center font-extrabold animate__animated animate__slideInDown">
                  Aggregating Global{" "}
                  <Box
                    component={"span"}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-[#60D28D] to-green-600"
                  >
                    GPU
                  </Box>{" "}
                  Resources to Accelerate{" "}
                  <Box
                    component={"span"}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-[#60D28D] to-green-600"
                  >
                    AI
                  </Box>{" "}
                  Innovation
                </Typography>
                <Box className="text-sm font-sans antialiased 2xl:text-4xl md:text-xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-300">
                  <Typewriter
                    options={{
                      strings: ["Infinite Network", "Flexible Switching", "Decentralized AI"],
                      delay: 40,
                      deleteSpeed: 40,
                      autoStart: true,
                      loop: true,
                      cursor: "|",
                      cursorClassName: "text-yellow-300 animate-[Typewriter-cursor_1s_ease-in-out_infinite]",
                    }}
                  />
                </Box>
                <Box className="flex gap-x-6 animate__animated animate__fadeIn animate__delay-1s">
                  <Button variant="contained" color="success" className="rounded-full w-80" href="/cloud">
                    <Box className="flex flex-col text-nowrap text-center">
                      <Typography className=" text-gray-800 font-bold text-2xl">Get Start</Typography>
                      <Typography className=" text-gray-800">Supply GPU Power</Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box id="cloud" className="relative h-screen snap-start pt-28 2xl:pt-32">
          <Box className={`${isScroll ? "fixed" : "absolute"} -z-20 top-0 left-0`}>
            <RainbowBg />
          </Box>
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Box className="flex justify-center space-x-2 items-center">
                <LogoIcon className="2xl:text-3xl md:text-2xl" />
                <Typography className="2xl:text-3xl md:text-2xl font-extrabold items-center text-gray-500">
                  Demeters.ai | Cloud
                </Typography>
              </Box>
              <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">
                Aggregation, Schedule, Trade
              </Typography>
            </AnimationOnScroll>
            <AnimationOnScroll
              animateIn="animate__fadeIn"
              duration={1}
              scrollableParentSelector=".scrollable-container"
            >
              <Image className="2xl:h-[60vh] h-[55vh] w-full" src={layersPic} alt="demeters-layers"></Image>
            </AnimationOnScroll>
            <NextIcon />
          </Box>
        </Box>
        <Box className="h-screen snap-start 2xl:pt-32 pt-28">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <Box className="flex flex-col items-center text-center justify-between">
              <Box className="flex items-center gap-x-2">
                <RobotIcon className="2xl:text-6xl md:text-5xl" />
                <Typography className="2xl:text-4xl md:text-3xl font-extrabold items-center">
                  Demeters.AI intelligent scheduling
                </Typography>
              </Box>
              <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                <Image
                  alt="demeters_construction"
                  src={constructionPic}
                  className="2xl:h-[70vh] h-[65vh] w-full"
                ></Image>
              </AnimationOnScroll>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box id="chain" className="h-screen snap-start 2xl:pt-28 pt-24">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Box className="flex justify-center space-x-2 items-center">
                <LogoIcon className="2xl:text-3xl md:text-2xl" />
                <Typography className="2xl:text-3xl md:text-2xl font-extrabold items-center text-gray-500">
                  Demeters.ai | Chain
                </Typography>
              </Box>
              <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">
                Building the Infinite Application Chain
              </Typography>
            </AnimationOnScroll>
            <Box className="flex flex-col justify-between w-full mt-4 gap-y-4">
              <Box className="flex md:flex-row flex-col justify-center items-center">
                <Box className="md:w-1/3 md:px-20 w-1/5 overflow-y-auto">
                  <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                    <Image src={chain1Pic} alt="chain1"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="md:w-2/3 flex flex-col justify-start text-left md:px-20 px-5">
                  <AnimationOnScroll
                    animateIn="animate__fadeInRight"
                    duration={0.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2 text-center md:text-left">
                      Global Connectivity
                    </Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400 text-sm">
                      Aggregating global GPU computing power to provide seamless cross-chain computational services for
                      AI and blockchain applications, complete with a flexible switching mechanism.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
              <Box className="flex md:flex-row-reverse flex-col justify-center items-center">
                <Box className="md:w-1/3 md:px-20 w-1/5 overflow-y-auto">
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    duration={1.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Image src={chain2Pic} alt="chain2" className="md:max-w-full"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="md:w-2/3 flex flex-col justify-start text-left md:px-20 px-5">
                  <AnimationOnScroll
                    animateIn="animate__fadeInLeft"
                    duration={1}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2 text-center md:text-left">
                      Decentralized Architecture
                    </Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Utilizing the Cosmos SDK+IBC protocol and Demeter chain&apos;s advanced architecture for true
                      decentralization, it offers low latency, high concurrency, and scalability. The platform supports
                      low-cost, quick cross-chain asset transfers, establishing a secure and efficient computational
                      resource scheduling network.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box className="h-screen snap-start 2xl:pt-28 pt-24">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <Box className="flex flex-col justify-between w-full md:max-h-[75vh] gap-y-4">
              <Box className="md:h-1/3 flex md:flex-row flex-col justify-center items-center">
                <Box className="md:w-1/3 md:px-24 w-1/5 overflow-y-auto">
                  <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                    <Image src={chain3Pic} alt="chain3"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="md:w-2/3 flex flex-col justify-start text-left md:px-20 px-5">
                  <AnimationOnScroll animateIn="animate__fadeInRight" scrollableParentSelector=".scrollable-container">
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2 text-center md:text-left">
                      Security and Privacy
                    </Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Employing zk-SNARKs encryption technology ensures data security and user privacy, creating a
                      trusted computing environment.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
              <Box className="md:h-1/3 flex md:flex-row-reverse flex-col justify-center items-center">
                <Box className="md:w-1/3 md:px-24 w-1/5 overflow-y-auto">
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    duration={0.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Image src={chain4Pic} alt="chain4"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="md:w-2/3 flex flex-col justify-start text-left md:px-20 px-5">
                  <AnimationOnScroll
                    animateIn="animate__fadeInLeft"
                    duration={0.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2 text-center md:text-left">
                      Low Barrier to Entry
                    </Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Cloud services enable the free construction of computing frameworks and models as applications, as
                      simple as playing with LEGO bricks. Simplifying the process of joining the decentralized computing
                      network and encouraging wider participation with a rewarding mechanism, it facilitates the
                      effortless creation of a personalized AI computing factory.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
              <Box className="md:h-1/3 flex md:flex-row flex-col justify-center items-center">
                <Box className="md:w-1/3 md:px-24 w-1/5 overflow-y-auto">
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    duration={1}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Image src={chain5Pic} alt="chain5"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="md:w-2/3 flex flex-col justify-start text-left md:px-20 px-5">
                  <AnimationOnScroll
                    animateIn="animate__fadeInRight"
                    duration={1}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2 text-center md:text-left">
                      Community Governance
                    </Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Advocacy for community governance energizes the ecosystem and fosters innovation through a token
                      economy and governance model.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box id="dmos" className="h-screen snap-start 2xl:pt-28 pt-24">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center min-h-full items-center">
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Box className="flex justify-center space-x-2 items-center">
                <LogoIcon className="2xl:text-3xl md:text-2xl" />
                <Typography className="2xl:text-3xl md:text-2xl font-extrabold items-center text-gray-500">
                  Demeters.ai | DMOS
                </Typography>
              </Box>
              <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">
                Demeter Cloud Operating System
              </Typography>
            </AnimationOnScroll>
            <Box className="flex flex-col space-y-4 md:w-2/3">
              <AnimationOnScroll
                animateIn="animate__fadeIn"
                duration={1}
                scrollableParentSelector=".scrollable-container"
              >
                <Image className="2xl:h-[50vh] md:h-[45vh] w-full" src={dmosPic} alt="dmos-construction"></Image>
              </AnimationOnScroll>
              <Box className="grid md:grid-cols-3 grid-cols-2 gap-4 px-5">
                <Box className="flex items-center text-left gap-x-2">
                  <MonitorIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm text-xs 2xl:text-base">
                    Comprehensive Resource Monitoring
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <MeterIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm text-xs 2xl:text-base">
                    Optimized Concurrency Performance
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ConvertIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm text-xs 2xl:text-base">
                    Seamless Application Switching
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ScheduleIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm text-xs 2xl:text-base">
                    Flexible Resource Scheduling
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ToolsIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm text-xs 2xl:text-base">
                    AI Frameworks and Tools
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ResourceIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm text-xs 2xl:text-base">
                    Heterogeneous Resource Compatibility
                  </Typography>
                </Box>
              </Box>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box id="why-us" className="h-screen snap-start 2xl:pt-32 pt-28">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">Why US?</Typography>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Image className="2xl:h-[60vh] md:h-[55vh] w-full" src={whyUsPic} alt="why-us"></Image>
            </AnimationOnScroll>
            <NextIcon />
          </Box>
        </Box>
        <Box id="vision" className="h-screen snap-start 2xl:pt-32 pt-28">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">Vision</Typography>
            </AnimationOnScroll>
            <Box className="flex flex-col text-left space-y-4">
              <DoubleQuotationMarkLeftIcon className="text-6xl" />
              <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                <Box className="px-16 space-y-8">
                  <Typography className="md:text-3xl 2xl:text-4xl font-bold">
                    Powering the Future with Every Compute
                  </Typography>
                  <Typography className="md:text-base 2xl:text-lg text-gray-400">
                    Demeter.AI: Unleashing the full potential of decentralized computing for everyone, everywhere.
                    We&apos;re transforming the landscape of AI and cloud-native applications with our pioneering
                    distributed cloud OS, DMOS—making cutting-edge computing accessible, efficient, and universally
                    available. Join us in building a limitless computing ecosystem where innovation thrives beyond
                    boundaries.
                  </Typography>
                  <Typography className="md:text-3xl 2xl:text-4xl font-bold text-end">
                    Explore. Innovate. Transform.
                  </Typography>
                </Box>
              </AnimationOnScroll>
              <DoubleQuotationMarkRightIcon className="text-6xl self-end" />
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box id="plan" className="h-screen snap-start 2xl:pt-32 pt-28">
          <Box className="flex flex-col justify-between mx-auto text-center h-full items-center">
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">Master Plan</Typography>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
              <Image className="2xl:h-[60vh] md:h-[55vh] w-full" src={stepsPic} alt="steps"></Image>
            </AnimationOnScroll>
            <NextIcon />
          </Box>
        </Box>
        <Box className="h-screen snap-start 2xl:pt-32 pt-28">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <Box className="flex md:flex-row flex-col-reverse md:grow shrink md:space-x-10 md:px-32 px-5 items-center">
              <Box className="md:text-left text-center md:space-y-16 space-y-6 md:w-1/2">
                <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                  <Typography className="2xl:text-4xl md:text-3xl text-2xl font-semibold md:text-left text-center">
                    Ready to Get Started?
                  </Typography>
                </AnimationOnScroll>
                <Typography className="2xl:text-lg md:text-base text-gray-400 text-left">
                  In the rapidly evolving world of AI, Web3, and the metaverse, if you&apos;re eager to stand at the
                  forefront of technology, embrace the opportunities of the AI era, Demeter.AI invites you to join us in
                  shaping the future.
                </Typography>
                <Button variant="contained" color="success" className="rounded-full w-52" href="/cloud">
                  <Box className="flex flex-col text-nowrap">
                    <Typography className=" text-gray-800 font-bold text-lg 2xl:text-xl">Node Provider</Typography>
                    <Typography className=" text-gray-800 text-xs 2xl:text-sm">Supply GPU Power</Typography>
                  </Box>
                </Button>
              </Box>
              <Box className="flex flex-col md:w-1/2 space-y-4 mb-10">
                <Typography className="2xl:text-xl md:text-lg font-serif text-[#B9CEB8]">
                  Boost Your GPU,Launch,Earn
                </Typography>
                <Image src={mapPic} alt="world-map"></Image>
              </Box>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box className="h-screen snap-start section pt-32 pb-32 items-center flex">
          <Box className="grid md:grid-cols-5 grid-cols-2 gap-8 md:gap-0 justify-center mx-auto md:w-4/5 2xl:w-2/3">
            <Box className="col-span-2 flex-col justify-center space-y-8">
              <Box className="text-center">
                <Typography variant="h5" className="font-extrabold text-gray-400 items-center">
                  <LogoIcon className="text-3xl" /> Demeters.ai
                </Typography>
              </Box>
              <Box className="flex justify-center gap-x-5 px-10">
                <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
                  <MdiTwitter fontSize={32} color="black"></MdiTwitter>
                </Box>
                <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
                  <BiYoutube fontSize={32} color="black"></BiYoutube>
                </Box>
                <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
                  <MdiTelegram fontSize={32} color="black"></MdiTelegram>
                </Box>
                <Box className="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200">
                  <IcBaselineDiscord fontSize={32} color="black"></IcBaselineDiscord>
                </Box>
              </Box>
            </Box>
            <Box className="">
              <Box className="text-left md:space-y-8 space-y-4">
                <Typography variant="h5" className="font-extrabold">
                  Main
                </Typography>
                <Box className="flex flex-col md:gap-y-4 gap-y-2">
                  <Link href="#instruction" className="hover:text-gray-400">
                    <Typography variant="body1">Introduction</Typography>
                  </Link>
                  <Link href="#cloud" className="hover:text-gray-400">
                    <Typography variant="body1">Demeter | Cloud</Typography>
                  </Link>
                  <Link href="#chain" className="hover:text-gray-400">
                    <Typography variant="body1">Demeter | Chain</Typography>
                  </Link>
                  <Link href="#dmos" className="hover:text-gray-400">
                    <Typography variant="body1">Demeter | Dmos</Typography>
                  </Link>
                  <Link href="#why-us" className="hover:text-gray-400">
                    <Typography variant="body1">Why US?</Typography>
                  </Link>
                  <Link href="#vision" className="hover:text-gray-400">
                    <Typography variant="body1">Vision</Typography>
                  </Link>
                  <Link href="#plan" className="hover:text-gray-400">
                    <Typography variant="body1">Master Plan</Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box className="">
              <Box className="text-left md:space-y-8 space-y-4">
                <Typography variant="h5" className="font-extrabold">
                  Menu
                </Typography>
                <Box className="md:space-y-4 space-y-2">
                  <Link href="/cloud" className="hover:text-gray-400">
                    <Typography variant="body1">Cloud</Typography>
                  </Link>
                  <Typography variant="body1">Dmos</Typography>
                  <Typography variant="body1">Explorer</Typography>
                  <Typography variant="body1">Docs</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="">
              <Box className="text-left md:space-y-8 space-y-4">
                <Typography variant="h5" className="font-extrabold">
                  Documents
                </Typography>
                <Box className="md:space-y-4 space-y-2">
                  <Typography variant="body1">Terms of use</Typography>
                  <Typography variant="body1">Privacy Policy</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
