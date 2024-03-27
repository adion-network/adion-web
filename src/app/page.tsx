"use client"
import { Box, Button, Typography } from "@mui/material"
import {
  ConfigIcon,
  LinkIcon,
  NvidaLogo,
  PodwiseLogo,
  StackIcon,
  WorldMap,
  PuzzleIcon,
  ChainIcon,
  MdiTwitter,
  BiYoutube,
  MdiTelegram,
  IcBaselineDiscord,
  LogoIcon,
  DemeterConstruction,
} from "@/components/Icons"
import { NorthEast } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import detailPic1 from "@/../public/images/home/3.png"
import detailPic2 from "@/../public/images/home/4.png"
import detailPic3 from "@/../public/images/home/5.png"
import projectListPic from "@/../public/images/home/7.png"
import dFilPic from "@/../public/images/home/8.png"
import { useRef, useState, useEffect } from "react"
import globe from "vanta/dist/vanta.globe.min"
import net from "vanta/dist/vanta.net.min"
import * as THREE from "three"
import "animate.css"
import { AnimationOnScroll } from "react-animation-on-scroll"

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState<any>(0)
  const [vantaNetEffect, setVantaNetEffect] = useState<any>(0)
  const [isScroll, setIsScroll] = useState(false)

  const myRef = useRef(null)
  const netRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        globe({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3fafff,
          size: 1.0,
          backgroundColor: 0x0,
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  useEffect(() => {
    if (!vantaNetEffect) {
      setVantaNetEffect(
        net({
          el: netRef.current,
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
          backgroundColor: 0x0,
          backgroundAlpha: 100,
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = (e: any) => {
    setIsScroll(Boolean(e.target.scrollTop))
  }

  return (
    <Box component={"div"} ref={netRef}>
      <Box component={"div"} className="bg-black bg-opacity-50">
        <Box
          className={`fixed flex flex-col justify-center h-16 ${
            isScroll ? "bg-gray-200 bg-opacity-10 border-b border-gray-800" : "bg-black bg-opacity-10"
          }  w-full z-10 backdrop-blur-md`}
        >
          <Box className="mx-auto relative flex justify-between items-center md:w-4/5 2xl:w-2/3">
            <Link href="/">
              <Box className="flex gap-2 items-center">
                <LogoIcon className="text-4xl"></LogoIcon>
                <Typography className="text-2xl font-extrabold text-gray-200">Demeters.ai</Typography>
              </Box>
            </Link>
            <Link href="/login">
              <Button variant="outlined" className="border-2 rounded-lg">
                Sign In
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className="h-screen scrollable-container overflow-y-scroll snap-y snap-mandatory">
          <Box className="h-screen snap-start">
            <Box ref={myRef} className="bg-cover bg-no-repeat">
              <Box className="2xl:w-2/3 md:w-4/5 mx-auto">
                <Box className="w-1/2 h-full min-h-screen py-32 flex-col flex justify-start space-y-6">
                  <Typography className="2xl:text-5xl md:text-4xl font-extrabold animate__animated animate__slideInDown">
                    Building the Future&apos;s AI/Blockchain Compute Network
                  </Typography>
                  <Typography className="2xl:text-xl md:text-md text-gray-300 animate__animated animate__fadeIn">
                    Aggregate global GPU resources via Demeters.ai&apos;s decentralized platform, achieving deployment,
                    scheduling, switching, and monitoring with full-stack services. Maximize resource efficiency and
                    revenue growth effortlessly.
                  </Typography>
                  <Link href="/register" className="w-[180px] animate__animated animate__fadeIn">
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      className="w-full text-md mt-10 font-extrabold py-3 text-base"
                      startIcon={<NorthEast />}
                    >
                      Start Now
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="h-screen snap-start py-32">
            <Box className="flex flex-col justify-center mx-auto md:w-4/5 2xl:w-2/3 h-full gap-y-32">
              <Box className="flex justify-between gap-y-10 items-center">
                <Box className="w-2/3 space-y-10">
                  <AnimationOnScroll animateIn="animate__fadeInLeft" scrollableParentSelector=".scrollable-container">
                    <Typography className="2xl:text-4xl md:text-3xl font-extrabold">
                      Full control of your AI infrastructure
                    </Typography>
                  </AnimationOnScroll>
                  <AnimationOnScroll animateIn="animate__fadeInRight" scrollableParentSelector=".scrollable-container">
                    <Typography className="2xl:text-xl md:text-base text-gray-300">
                      Leverage global high-performance servers with DMOS (Demeter Cloud Operating System) for effortless
                      resource management. Experience smart control through an intuitive dashboard, seamless
                      cloud-native integrations, and extensive API. Simplified. Swift. Smart.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
                <Box className="mr-10">
                  <NvidaLogo />
                </Box>
              </Box>
              <Box className="transition">
                <AnimationOnScroll
                  animateIn="animate__zoomIn"
                  duration={1}
                  scrollableParentSelector=".scrollable-container"
                >
                  <DemeterConstruction style={{ width: "100%" }}></DemeterConstruction>
                </AnimationOnScroll>
              </Box>
            </Box>
          </Box>
          <Box className="h-screen snap-start section pt-40 pb-32">
            <Box className="flex flex-col justify-center mx-auto md:w-4/5 2xl:w-2/3 h-full space-y-10">
              <Box className="flex justify-between items-center">
                <Box className="w-1/2 space-y-5">
                  <Box className="ml-4 inline-flex rounded-full bg-green-500 shadow-halo shadow-green-500">
                    <ConfigIcon></ConfigIcon>
                  </Box>
                  <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                    <Typography className="2xl:text-4xl md:text-3xl font-extrabold">
                      Professional. Worry-Free. 24/7.
                    </Typography>
                    <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                      Experience global, full-stack SRE operational management—including overseas data center equipment
                      setup and 24/7 technical support. Ensure optimal maintenance of hardware resources, freeing you
                      from technical concerns and maintenance worries.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
                <Box className="w-2/5">
                  <Image src={detailPic1} alt="demeter-detail-1"></Image>
                </Box>
              </Box>
              <Box className="flex justify-between items-center">
                <Box className="w-2/5">
                  <Image src={detailPic2} alt="demeter-detail-1"></Image>
                </Box>
                <Box className="w-1/2 space-y-5">
                  <Box className="ml-4 inline-flex rounded-full bg-orange-300 shadow-halo shadow-orange-300">
                    <StackIcon></StackIcon>
                  </Box>
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    scrollableParentSelector=".scrollable-container"
                    duration={1.5}
                  >
                    <Typography className="2xl:text-4xl md:text-3xl font-extrabold">
                      DMOS Cloud OS: Resource Mastery.
                    </Typography>
                    <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                      Harness DMOS Cloud Operating System for remote, visual management of all hardware resources within
                      cluster nodes. Features customizable projects, versatile single-card task management, earnings
                      insights, and withdrawals—maximizing resource utilization efficiently.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="h-screen snap-start section pt-16 pb-32">
            <Box className="flex flex-col justify-center mx-auto md:w-4/5 2xl:w-2/3 h-full space-y-10">
              <Box className="flex justify-between items-center">
                <Box className="w-1/2 space-y-5">
                  <Box className="ml-4 inline-flex rounded-full  bg-purple-500 shadow-halo shadow-purple-500">
                    <PodwiseLogo></PodwiseLogo>
                  </Box>
                  <AnimationOnScroll animateIn="animate__fadeIn" scrollableParentSelector=".scrollable-container">
                    <Typography className="2xl:text-4xl md:text-3xl font-extrabold">
                      Podwise Rental Service: Expand Horizons.
                    </Typography>
                    <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                      Connect to Podwise for diverse GPU cluster rental services—bare metal, AI acceleration, GPU
                      container cloud, and more. Broaden the application scenarios and market reach of your hardware
                      resources.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
                <Box className="w-2/5">
                  <Image src={detailPic3} alt="demeter-detail-1"></Image>
                </Box>
              </Box>
              <Box className="flex justify-between items-center">
                <Box className="w-2/5 flex justify-center items-center">
                  <WorldMap></WorldMap>
                </Box>
                <Box className="w-1/2 space-y-5">
                  <Box className="ml-4 inline-flex rounded-full bg-teal-500 shadow-halo shadow-teal-500">
                    <LinkIcon></LinkIcon>
                  </Box>
                  <AnimationOnScroll
                    animateIn="animate__fadeIn"
                    scrollableParentSelector=".scrollable-container"
                    duration={1.5}
                  >
                    <Typography variant="h4" className="2xl:text-4xl md:text-3xl font-extrabold">
                      Global Project Access: Unlock Potential.
                    </Typography>
                    <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                      Clients connect through the Demeter.Ai network for smart access to global GPU project pools and
                      GPU POW mining pools. Enjoy project task profits, airdrop rewards, and mainnet Token incentives.
                    </Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="h-screen snap-start section pt-24 pb-32">
            <Box className="flex justify-center items-center mx-auto md:w-4/5 2xl:w-2/3 h-full space-y-4">
              <Box className="w-3/5 md:space-y-4 2xl:space-y-8">
                <Box className="ml-4 inline-flex rounded-full bg-sky-600 shadow-halo shadow-sky-600">
                  <PuzzleIcon></PuzzleIcon>
                </Box>
                <AnimationOnScroll animateIn="animate__flipInX" scrollableParentSelector=".scrollable-container">
                  <Typography className="2xl:text-4xl md:text-2xl font-extrabold">
                    AI R&D Acceleration: Streamline Development.
                  </Typography>
                </AnimationOnScroll>
                <AnimationOnScroll
                  animateIn="animate__flipInX"
                  duration={0.5}
                  scrollableParentSelector=".scrollable-container"
                >
                  <Typography className="2xl:text-xl md:text-base text-gray-300 ">
                    Harness advanced ML Tools and Platforms to fast-track AI project cycles—from model training to
                    inference acceleration.
                  </Typography>
                </AnimationOnScroll>
                <AnimationOnScroll
                  animateIn="animate__flipInX"
                  duration={1}
                  scrollableParentSelector=".scrollable-container"
                >
                  <Typography className="2xl:text-3xl md:text-xl font-extrabold">
                    ML Tools: Integrated AI Development Toolkit
                  </Typography>
                  <Box component={"ul"} className="space-y-1 list-disc ml-4 mt-2">
                    <Box component={"li"}>
                      <Typography variant="body1" className="2xl:text-xl md:text-base text-gray-300">
                        <Box component={"span"} className="font-extrabold">
                          Versatile Framework Support:{" "}
                        </Box>
                        Incorporates TensorFlow, Caffe, PyTorch, and more, meeting diverse development needs.
                      </Typography>
                    </Box>
                    <Box component={"li"}>
                      <Typography variant="body1" className="2xl:text-xl md:text-base text-gray-300">
                        <Box component={"span"} className="font-extrabold">
                          Comprehensive Tool Integration:{" "}
                        </Box>
                        Features distributed training and model visualization for rapid deployment of large-scale tasks.
                      </Typography>
                    </Box>
                  </Box>
                </AnimationOnScroll>
                <AnimationOnScroll
                  animateIn="animate__flipInX"
                  duration={1.5}
                  scrollableParentSelector=".scrollable-container"
                >
                  <Typography className="2xl:text-3xl md:text-xl font-extrabold">
                    ML Platform: Unified Machine Learning Platform
                  </Typography>
                  <Box component={"ul"} className="space-y-1 list-disc ml-4 mt-2">
                    <Box component={"li"}>
                      <Typography variant="body1" className="2xl:text-xl md:text-base text-gray-300">
                        <Box component={"span"} className="font-extrabold">
                          Kubeflow Integration:{" "}
                        </Box>
                        A Kubernetes-based, open-source ML framework for robust model training support.
                      </Typography>
                    </Box>
                    <Box component={"li"}>
                      <Typography variant="body1" className="2xl:text-xl md:text-base text-gray-300">
                        <Box component={"span"} className="font-extrabold">
                          KServe Functionality:{" "}
                        </Box>
                        Focuses on model inference, streamlining deployment and service processes.
                      </Typography>
                    </Box>
                    <Box component={"li"}>
                      <Typography variant="body1" className="2xl:text-xl md:text-base text-gray-300">
                        <Box component={"span"} className="font-extrabold">
                          KubeRay Capabilities:{" "}
                        </Box>
                        Offers an integrated solution for model training and inference, enhancing project efficiency.
                      </Typography>
                    </Box>
                  </Box>
                </AnimationOnScroll>
              </Box>
              <Box className="w-2/5 px-8 mx-auto flex justify-center">
                <AnimationOnScroll
                  animateIn="animate__fadeIn"
                  duration={2}
                  scrollableParentSelector=".scrollable-container"
                >
                  <Image src={projectListPic} alt="demeter-project-list" height={600}></Image>
                </AnimationOnScroll>
              </Box>
            </Box>
          </Box>
          <Box className="h-screen snap-start section pt-44 pb-32">
            <Box className="flex flex-col justify-center mx-auto md:w-4/5 2xl:w-2/3 h-full space-y-4">
              <Box className="w-4/5">
                <AnimationOnScroll animateIn="animate__zoomIn" scrollableParentSelector=".scrollable-container">
                  <Typography variant="h5" className="2xl:text-3xl md:text-xl font-extrabold">
                    Exploring DFIL: Connecting the future of decentralized computing and storage.
                  </Typography>
                  <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                    DFIL is a revolutionary cross-chain bridge built between the Demeter and Filecoin ecosystems. It
                    combines cutting-edge IBC protocol and FVM technology to create a pioneering platform for
                    cross-chain asset transfer and remote computation.
                  </Typography>
                </AnimationOnScroll>
              </Box>
              <Box className="flex justify-between">
                <Box className="w-1/3">
                  <AnimationOnScroll
                    animateIn="animate__slideInLeft"
                    scrollableParentSelector=".scrollable-container"
                    className="space-y-2"
                    duration={1}
                  >
                    <Box className="gap-x-1 flex">
                      <Box>
                        <ChainIcon fontSize={25} />
                      </Box>
                      <Box className="2xl:space-y-4 md:space-y-1">
                        <Typography className="2xl:text-2xl md:text-base font-bold">
                          One-Stop Solution: Seamless Filecoin Integration.
                        </Typography>
                        <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                          DFIL enables single-call execution for temporary computational needs and offers a hassle-free
                          node encapsulation service for those interested in Filecoin projects without the means for
                          software and hardware maintenance.
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="gap-x-1 flex">
                      <Box>
                        <ChainIcon fontSize={25} />
                      </Box>
                      <Box className="2xl:space-y-4 md:space-y-1">
                        <Typography className="2xl:text-2xl md:text-base font-bold">
                          Cross-Chain Connectivity: Enhancing Interoperability.
                        </Typography>
                        <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                          Facilitate direct token transfers between Demeters and Filecoin ecosystems via the IBC
                          protocol or settle tasks through smart contracts, simplifying cross-chain transactions.
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="gap-x-1 flex">
                      <Box>
                        <ChainIcon fontSize={25} />
                      </Box>
                      <Box className="2xl:space-y-4 md:space-y-1">
                        <Typography className="2xl:text-2xl md:text-base font-bold">
                          Computational Power Dispatch: Flexible & Reliable.
                        </Typography>
                        <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                          DFIL meets all computational demands, from sudden spikes to consistent support, with its
                          remote computing task service.
                        </Typography>
                      </Box>
                    </Box>
                  </AnimationOnScroll>
                </Box>
                <Box className="flex w-1/3 space-y-1 justify-center items-center">
                  <Image src={dFilPic} alt="dfil-icon" width={400}></Image>
                </Box>

                <Box className="w-1/3 space-y-1">
                  <AnimationOnScroll
                    animateIn="animate__slideInRight"
                    scrollableParentSelector=".scrollable-container"
                    className="space-y-2"
                    duration={1}
                  >
                    <Box className="gap-x-1 flex">
                      <Box>
                        <ChainIcon fontSize={25} />
                      </Box>
                      <Box className="2xl:space-y-4 md:space-y-1">
                        <Typography className="2xl:text-2xl md:text-base font-bold">
                          Transparency & Fairness: Built on Trust.
                        </Typography>
                        <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                          Demeters, constructed on Cosmos&apos; technology stack and integrated with Cosmos&apos;
                          communication protocols and consensus mechanisms via FVM, serves as a bridge to Filecoin,
                          upgrading the Filecoin network&apos;s development capabilities.
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="gap-x-1 flex">
                      <Box>
                        <ChainIcon fontSize={25} />
                      </Box>
                      <Box className="2xl:space-y-4 md:space-y-1">
                        <Typography className="2xl:text-2xl md:text-base font-bold">
                          Storage Incentivization: Expanding the Filecoin Network.
                        </Typography>
                        <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                          As encapsulation costs decrease and computational resources are optimized, more data is
                          motivated to be stored on the Filecoin network, enhancing its value and fostering the growth
                          of the decentralized storage ecosystem.
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="gap-x-1 flex">
                      <Box>
                        <ChainIcon fontSize={25} />
                      </Box>
                      <Box className="2xl:space-y-4 md:space-y-1">
                        <Typography className="2xl:text-2xl md:text-base font-bold">
                          Resource Optimization: Maximizing Utility.
                        </Typography>
                        <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                          DFIL offers a platform for Filecoin miners to market idle computational resources, providing
                          computational power to users or projects and generating additional income.
                        </Typography>
                      </Box>
                    </Box>
                  </AnimationOnScroll>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="h-screen snap-start section pt-32 pb-32">
            <Box className="flex flex-col justify-center mx-auto md:w-4/5 2xl:w-2/3 h-1/3 pt-16 space-y-10">
              <Box className="w-full space-y-8">
                <Typography variant="h3" className="font-extrabold">
                  Begin Your Journey with Demeters.ai?
                </Typography>
                <Typography variant="subtitle1" className="text-gray-300">
                  Join our innovative decentralized computing service platform tailored for node providers. We&apos;re
                  dedicated to maximizing resource utilization and accelerating revenue growth for every partner.
                </Typography>
                <Link href="/register">
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    className="w-[180px] text-md mt-10 font-extrabold py-3 text-base"
                    startIcon={<NorthEast />}
                  >
                    Start Now
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box className="w-full h-2/3 mt-32 bg-[#1A1A1A] py-20">
              <Box className="flex mx-auto md:w-4/5 2xl:w-2/3">
                <Box className="w-1/3 flex-col justify-center space-y-8">
                  <Box className="text-center">
                    <Typography variant="h5" className="font-extrabold">
                      Demeters.ai
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
                <Box className="w-1/3">
                  <Box className="text-center space-y-8">
                    <Typography variant="h5" className="font-extrabold">
                      Main
                    </Typography>
                    <Box className="space-y-6">
                      <Typography variant="body1">Introduction</Typography>
                      <Typography variant="body1">Architecture</Typography>
                      <Typography variant="body1">DFIL Features</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="w-1/3">
                  <Box className="text-center space-y-8">
                    <Typography variant="h5" className="font-extrabold">
                      Documents
                    </Typography>
                    <Box className="space-y-6">
                      <Typography variant="body1">Terms of use</Typography>
                      <Typography variant="body1">Privacy Policy</Typography>
                      <Typography variant="body1">Docs</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
