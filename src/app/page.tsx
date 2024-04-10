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
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import net from "vanta/dist/vanta.net.min"
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
  const [vantaNetEffect, setVantaNetEffect] = useState<any>(0)
  const myRef = useRef(null)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = (e: any) => {
    setIsScroll(Boolean(e.target.scrollTop))
  }

  useEffect(() => {
    if (!vantaNetEffect) {
      setVantaNetEffect(
        net({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          fullWidth: true,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3fafff,
          backgroundColor: "#041729",
          points: 8.0,
          maxDistance: 25.0,
          spacing: 20.0,
        })
      )
    }
    return () => {
      if (vantaNetEffect) vantaNetEffect.destroy()
    }
  }, [vantaNetEffect])

  return (
    <Box>
      <Box
        className={`fixed flex flex-col justify-center h-16 ${
          isScroll ? "bg-gray-200 bg-opacity-10 border-b border-gray-800" : "bg-[#1A1A1A]"
        }  w-full z-10 backdrop-blur-md`}
      >
        <Box className="mx-auto relative flex justify-between items-center md:w-4/5 2xl:w-2/3">
          <Box className="flex items-end gap-x-10">
            <Link href="/">
              <Box className="flex gap-2 items-center">
                <LogoIcon className="text-4xl"></LogoIcon>
                <Typography className="text-2xl font-extrabold text-gray-200">Demeters.ai</Typography>
              </Box>
            </Link>
            <Link href="/cloud">
              <Typography className="font-bold text-gray-400 text-xl">Cloud</Typography>
            </Link>
            <Link href="#dmos">
              <Typography className="font-bold text-gray-400 text-xl">DMOS</Typography>
            </Link>
            <Link href="#">
              <Typography className="font-bold text-gray-400 text-xl">Explorer</Typography>
            </Link>
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
      </Box>
      <Box className="h-screen scrollable-container overflow-y-scroll snap-y snap-mandatory">
        <RainbowBg />
        <Box id="instruction" ref={myRef} className="h-screen snap-start">
          <Box component={"div"} className="bg-[#1A1A1A] bg-opacity-50">
            <Box className="2xl:w-2/3 md:w-4/5 mx-auto">
              <Box className="min-h-screen flex-col flex items-center justify-center gap-y-16">
                <Typography className="2xl:text-7xl md:text-6xl md:leading-snug 2xl:leading-snug text-center font-extrabold animate__animated animate__slideInDown">
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
                <Box className="font-sans antialiased 2xl:text-3xl md:text-xl text-center">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Infinite Network,")
                        .pauseFor(300)
                        .typeString("Flexible Switching, ")
                        .pauseFor(300)
                        .typeString("Decentralized AI")
                        .start()
                    }}
                    options={{
                      delay: 40,
                    }}
                  />
                </Box>
                <Box className="flex gap-x-6 animate__animated animate__fadeIn animate__delay-1s">
                  <Button variant="contained" color="success" className="rounded-full w-80" href="/cloud">
                    <Box className="flex flex-col text-nowrap text-center">
                      <Typography className=" text-gray-800 font-bold text-2xl">Node Provider</Typography>
                      <Typography className=" text-gray-800">Supply GPU Power</Typography>
                    </Box>
                  </Button>
                  <Button variant="outlined" className="rounded-full w-80 border-2 border-white">
                    <Box className="flex flex-col text-nowrap text-center">
                      <Typography className="font-bold text-2xl">Application Node</Typography>
                      <Typography className="">Become an APP Innovator</Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box id="cloud" className="h-screen snap-start 2xl:pt-32 md:pt-28">
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
              <Image className="2xl:h-[60vh] md:h-[55vh] w-full" src={layersPic} alt="demeters-layers"></Image>
            </AnimationOnScroll>
            <NextIcon />
          </Box>
        </Box>
        <Box className="h-screen snap-start 2xl:pt-32 md:pt-28">
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
                  className="2xl:h-[70vh] md:h-[65vh] w-full"
                ></Image>
              </AnimationOnScroll>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box id="chain" className="h-screen snap-start 2xl:pt-28 md:pt-24">
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
            <Box className="flex flex-col justify-between w-full mt-4">
              <Box className="flex flex-row justify-center items-center">
                <Box className="w-1/3 px-20">
                  <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                    <Image src={chain1Pic} alt="chain1"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="w-2/3 flex flex-col justify-start text-left px-20">
                  <AnimationOnScroll
                    animateIn="animate__fadeInRight"
                    duration={0.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2">Global Connectivity</Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Aggregating global GPU computing power to provide seamless cross-chain computational services for
                      AI and blockchain applications, complete with a flexible switching mechanism.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
              <Box className="flex flex-row justify-center items-center">
                <Box className="w-2/3 flex flex-col justify-start text-left gap-y-2 px-20">
                  <AnimationOnScroll
                    animateIn="animate__fadeInLeft"
                    duration={1}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2">
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
                <Box className="w-1/3 px-20">
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    duration={1.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Image src={chain2Pic} alt="chain1"></Image>
                  </AnimationOnScroll>
                </Box>
              </Box>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box className="h-screen snap-start 2xl:pt-28 md:pt-24">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <Box className="flex flex-col justify-between w-full max-h-[75vh] gap-y-4">
              <Box className="h-1/3 flex flex-row justify-center items-center">
                <Box className="w-1/3 p-24">
                  <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                    <Image src={chain3Pic} alt="chain3"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="w-2/3 flex flex-col justify-start text-left px-20">
                  <AnimationOnScroll animateIn="animate__fadeInRight" scrollableParentSelector=".scrollable-container">
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2">Security and Privacy</Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Employing zk-SNARKs encryption technology ensures data security and user privacy, creating a
                      trusted computing environment.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
              <Box className="h-1/3 flex flex-row justify-center items-center">
                <Box className="w-2/3 flex flex-col justify-start text-left gap-y-2 px-20">
                  <AnimationOnScroll
                    animateIn="animate__fadeInLeft"
                    duration={0.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2">Low Barrier to Entry</Typography>
                    <Typography className="md:text-base 2xl:text-lg text-gray-400">
                      Cloud services enable the free construction of computing frameworks and models as applications, as
                      simple as playing with LEGO bricks. Simplifying the process of joining the decentralized computing
                      network and encouraging wider participation with a rewarding mechanism, it facilitates the
                      effortless creation of a personalized AI computing factory.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
                <Box className="w-1/3 p-24">
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    duration={0.5}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Image src={chain4Pic} alt="chain4"></Image>
                  </AnimationOnScroll>
                </Box>
              </Box>
              <Box className="h-1/3 flex flex-row justify-center items-center">
                <Box className="w-1/3 p-24">
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    duration={1}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Image src={chain5Pic} alt="chain5"></Image>
                  </AnimationOnScroll>
                </Box>
                <Box className="w-2/3 flex flex-col justify-start text-left gap-y-2 px-20">
                  <AnimationOnScroll
                    animateIn="animate__fadeInRight"
                    duration={1}
                    scrollableParentSelector=".scrollable-container"
                  >
                    <Typography className="font-bold md:text-2xl 2xl:text-3xl pb-2">Community Governance</Typography>
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
        <Box id="dmos" className="h-screen snap-start 2xl:pt-28 md:pt-24">
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
            <Box className="flex flex-col space-y-4 md:w-2/3 h-1/5">
              <AnimationOnScroll
                animateIn="animate__fadeIn"
                duration={1}
                scrollableParentSelector=".scrollable-container"
              >
                <Image className="2xl:h-[50vh] md:h-[45vh] w-full" src={dmosPic} alt="dmos-construction"></Image>
              </AnimationOnScroll>
              <Box className="grid grid-cols-3 gap-4">
                <Box className="flex items-center text-left gap-x-2">
                  <MonitorIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm 2xl:text-base">
                    Comprehensive Resource Monitoring
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <MeterIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm 2xl:text-base">
                    Optimized Concurrency Performance
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ConvertIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm 2xl:text-base">
                    Seamless Application Switching
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ScheduleIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm 2xl:text-base">
                    Flexible Resource Scheduling
                  </Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ToolsIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm 2xl:text-base">AI Frameworks and Tools</Typography>
                </Box>
                <Box className="flex items-center text-left gap-x-2">
                  <ResourceIcon className="text-4xl" />
                  <Typography className="font-semibold md:text-sm 2xl:text-base">
                    Heterogeneous Resource Compatibility
                  </Typography>
                </Box>
              </Box>
            </Box>
            <NextIcon />
          </Box>
        </Box>
        <Box id="why-us" className="h-screen snap-start 2xl:pt-32 md:pt-28">
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
        <Box id="vision" className="h-screen snap-start 2xl:pt-32 md:pt-28">
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
        <Box id="plan" className="h-screen snap-start 2xl:pt-32 md:pt-28">
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
        <Box className="h-screen snap-start 2xl:pt-32 md:pt-28">
          <Box className="flex flex-col justify-between mx-auto md:w-4/5 2xl:w-2/3 text-center h-full items-center">
            <Box className="flex flex-row grow shrink space-x-10 px-32 items-center">
              <Box className="text-left space-y-16 w-1/2">
                <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                  <Typography className="2xl:text-4xl md:text-3xl font-semibold">Ready to Get Started?</Typography>
                </AnimationOnScroll>
                <Typography className="2xl:text-lg md:text-base text-gray-400">
                  In the rapidly evolving world of AI, Web3, and the metaverse, if you&apos;re eager to stand at the
                  forefront of technology, embrace the opportunities of the AI era, Demeter.AI invites you to join us in
                  shaping the future.
                </Typography>
                <Button variant="contained" color="success" className="rounded-full w-52" href="/cloud">
                  <Box className="flex flex-col text-nowrap">
                    <Typography className=" text-gray-800 font-bold md:text-lg 2xl:text-xl">Node Provider</Typography>
                    <Typography className=" text-gray-800 md:text-xs 2xl:text-sm">Supply GPU Power</Typography>
                  </Box>
                </Button>
              </Box>
              <Box className="flex flex-col w-1/2 space-y-4">
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
          <Box className="flex justify-center mx-auto md:w-4/5 2xl:w-2/3">
            <Box className="w-2/5 flex-col justify-center space-y-8">
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
            <Box className="w-1/5">
              <Box className="text-left space-y-8">
                <Typography variant="h5" className="font-extrabold">
                  Main
                </Typography>
                <Box className="flex flex-col gap-y-4">
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
            <Box className="w-1/5">
              <Box className="text-left space-y-8">
                <Typography variant="h5" className="font-extrabold">
                  Menu
                </Typography>
                <Box className="space-y-4">
                  <Link href="/cloud" className="hover:text-gray-400">
                    <Typography variant="body1">Cloud</Typography>
                  </Link>
                  <Typography variant="body1">Dmos</Typography>
                  <Typography variant="body1">Explorer</Typography>
                  <Typography variant="body1">Docs</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="w-1/5">
              <Box className="text-left space-y-8">
                <Typography variant="h5" className="font-extrabold">
                  Documents
                </Typography>
                <Box className="space-y-4">
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
