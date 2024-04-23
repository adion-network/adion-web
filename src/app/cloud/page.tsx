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
  DemeterConstruction,
} from "@/components/Icons"
import { NorthEast } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import detailPic1 from "@/../public/images/cloud/3.png"
import detailPic2 from "@/../public/images/cloud/4.png"
import detailPic3 from "@/../public/images/cloud/5.png"
import projectListPic from "@/../public/images/cloud/7.png"
import dFilPic from "@/../public/images/cloud/8.svg"
import { useRef, useState, useEffect } from "react"
import globe from "vanta/dist/vanta.globe.min"
import * as THREE from "three"
import "animate.css"
import { AnimationOnScroll } from "react-animation-on-scroll"
import Header from "@/components/home/Header"
import Footer from "@/components/home/Footer"

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState<any>(0)

  const myRef = useRef(null)

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

  const explorEfil = [
    {
      title: "One-Stop Solution: Seamless Filecoin Integration.",
      desc: "DFIL enables single-call execution for temporary computational needs and offers a hassle-free node encapsulation service for those interested in Filecoin projects without the means for software and hardware maintenance.",
    },
    {
      title: "Transparency & Fairness: Built on Trust.",
      desc: "ADion, constructed on Cosmos' technology stack and integrated with Cosmos' communication protocols and consensus mechanisms via FVM, serves as a bridge to Filecoin, upgrading the Filecoin network's development capabilities.",
    },
    {
      title: "Cross-Chain Connectivity: Enhancing Interoperability.",
      desc: "Facilitate direct token transfers between ADion and Filecoin ecosystems via the IBC protocol or settle tasks through smart contracts, simplifying cross-chain transactions.",
    },
    {
      title: "Storage Incentivization: Expanding the Filecoin Network.",
      desc: "As encapsulation costs decrease and computational resources are optimized, more data is motivated to be stored on the Filecoin network, enhancing its value and fostering the growth of the decentralized storage ecosystem.",
    },
    {
      title: "Computational Power Dispatch: Flexible & Reliable.",
      desc: "DFIL meets all computational demands, from sudden spikes to consistent support, with its remote computing task service.",
    },
    {
      title: "Resource Optimization: Maximizing Utility.",
      desc: "DFIL offers a platform for Filecoin miners to market idle computational resources, providing computational power to users or projects and generating additional income.",
    },
  ]

  return (
    <Box component={"div"}>
      <Box component={"div"} className="bg-black bg-opacity-50">
        <Header />
        <Box ref={myRef} className="h-screen">
          <Box className="w-4/5 2xl:w-2/3 h-full mx-auto md:items-start items-center flex flex-col justify-center">
            <Box className="flex-col md:w-2/3 flex justify-start space-y-8">
              <Typography className="2xl:text-5xl md:text-4xl text-2xl md:text-left font-extrabold animate__animated animate__fadeIn">
                Building the Future&apos;s AI/Blockchain Compute Network
              </Typography>
              <Typography className="2xl:text-xl md:text-md text-gray-300 animate__animated animate__fadeIn">
                Aggregate global GPU resources via ADion.ai&apos;s decentralized platform, achieving deployment,
                scheduling, switching, and monitoring with full-stack services. Maximize resource efficiency and revenue
                growth effortlessly.
              </Typography>
              <Link href="/register" className="w-[180px] animate__animated animate__fadeIn">
                <Button
                  variant="contained"
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
        <Box className="flex flex-col justify-center mx-auto w-4/5 2xl:w-2/3 h-full gap-y-16 mt-20">
          <Box className="flex md:flex-row flex-col justify-between gap-y-10 items-center">
            <Box className="md:w-2/3 space-y-10">
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-4xl md:text-3xl text-2xl md:text-left text-center font-extrabold">
                  Full control of your AI infrastructure
                </Typography>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-xl md:text-base text-gray-300">
                  Leverage global high-performance servers with <b>DMOS(the cloud operating system)</b> for effortless
                  resource management. Experience smart control through an intuitive dashboard, seamless cloud-native
                  integrations, and extensive API. Simplified. Swift. Smart.
                </Typography>
              </AnimationOnScroll>
            </Box>
            <Box className="md:mr-10">
              <NvidaLogo />
            </Box>
          </Box>
          <Box className="transition">
            <AnimationOnScroll animateIn="animate__fadeIn">
              <DemeterConstruction style={{ width: "100%" }}></DemeterConstruction>
            </AnimationOnScroll>
          </Box>
          <Box className="flex md:flex-row flex-col justify-between items-center">
            <Box className="md:w-1/2 space-y-5">
              <Box className="ml-4 inline-flex rounded-full bg-green-500 shadow-halo shadow-green-500">
                <ConfigIcon></ConfigIcon>
              </Box>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-4xl md:text-3xl text-xl font-extrabold">
                  Professional. Worry-Free. 24/7.
                </Typography>
                <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                  Experience global, full-stack SRE operational management—including overseas data center equipment
                  setup and 24/7 technical support. Ensure optimal maintenance of hardware resources, freeing you from
                  technical concerns and maintenance worries.
                </Typography>
              </AnimationOnScroll>
            </Box>
            <Box className="md:w-2/5">
              <Image src={detailPic1} alt="demeter-detail-1"></Image>
            </Box>
          </Box>
          <Box className="flex md:flex-row flex-col-reverse justify-between items-center">
            <Box className="md:w-2/5">
              <Image src={detailPic2} alt="demeter-detail-1"></Image>
            </Box>
            <Box className="md:w-1/2 space-y-5">
              <Box className="ml-4 inline-flex rounded-full bg-orange-300 shadow-halo shadow-orange-300">
                <StackIcon></StackIcon>
              </Box>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-4xl md:text-3xl text-xl font-extrabold">
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
          <Box className="flex md:flex-row flex-col justify-between items-center">
            <Box className="md:w-1/2 space-y-5">
              <Box className="ml-4 inline-flex rounded-full  bg-purple-500 shadow-halo shadow-purple-500">
                <PodwiseLogo></PodwiseLogo>
              </Box>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-4xl md:text-3xl text-xl font-extrabold">
                  Podwise Rental Service: Expand Horizons.
                </Typography>
                <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                  Connect to Podwise for diverse GPU cluster rental services—bare metal, AI acceleration, GPU container
                  cloud, and more. Broaden the application scenarios and market reach of your hardware resources.
                </Typography>
              </AnimationOnScroll>
            </Box>
            <Box className="md:w-2/5">
              <Image src={detailPic3} alt="demeter-detail-1"></Image>
            </Box>
          </Box>
          <Box className="flex md:flex-row flex-col-reverse justify-between items-center">
            <Box className="md:w-2/5 w-full flex justify-center items-center">
              <WorldMap></WorldMap>
            </Box>
            <Box className="md:w-1/2 space-y-5">
              <Box className="ml-4 inline-flex rounded-full bg-teal-500 shadow-halo shadow-teal-500">
                <LinkIcon></LinkIcon>
              </Box>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-4xl md:text-3xl text-xl font-extrabold">
                  Global Project Access: Unlock Potential.
                </Typography>
                <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2">
                  Clients connect through the ADion.Ai network for smart access to global GPU project pools and GPU POW
                  mining pools. Enjoy project task profits, airdrop rewards, and mainnet Token incentives.
                </Typography>
              </AnimationOnScroll>
            </Box>
          </Box>
          <Box className="flex md:flex-row flex-col justify-center items-center mx-auto space-y-4 md:mt-16 mt-4">
            <Box className="md:w-3/5 md:space-y-4 space-y-2 2xl:space-y-8">
              <Box className="ml-4 inline-flex rounded-full bg-sky-600 shadow-halo shadow-sky-600">
                <PuzzleIcon></PuzzleIcon>
              </Box>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-3xl md:text-xl text-lg font-extrabold">
                  AI R&D Acceleration: Streamline Development.
                </Typography>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-lg text-sm text-gray-300 ">
                  Harness advanced ML Tools and Platforms to fast-track AI project cycles—from model training to
                  inference acceleration.
                </Typography>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-2xl md:text-xl text-lg font-extrabold">
                  ML Tools: Integrated AI Development Toolkit
                </Typography>
                <Box component={"ul"} className="space-y-1 list-disc ml-4 mt-2">
                  <Box component={"li"}>
                    <Typography variant="body1" className="2xl:text-lg text-sm text-gray-300">
                      <Box component={"span"} className="font-semibold">
                        Versatile Framework Support:{" "}
                      </Box>
                      Incorporates TensorFlow, Caffe, PyTorch, and more, meeting diverse development needs.
                    </Typography>
                  </Box>
                  <Box component={"li"}>
                    <Typography variant="body1" className="2xl:text-lg text-sm text-gray-300">
                      <Box component={"span"} className="font-semibold">
                        Comprehensive Tool Integration:{" "}
                      </Box>
                      Features distributed training and model visualization for rapid deployment of large-scale tasks.
                    </Typography>
                  </Box>
                </Box>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography className="2xl:text-2xl md:text-xl text-lg font-extrabold">
                  ML Platform: Unified Machine Learning Platform
                </Typography>
                <Box component={"ul"} className="space-y-1 list-disc ml-4 mt-2">
                  <Box component={"li"}>
                    <Typography variant="body1" className="2xl:text-lg text-sm text-gray-300">
                      <Box component={"span"} className="font-extrabold">
                        Kubeflow Integration:{" "}
                      </Box>
                      A Kubernetes-based, open-source ML framework for robust model training support.
                    </Typography>
                  </Box>
                  <Box component={"li"}>
                    <Typography variant="body1" className="2xl:text-lg text-sm text-gray-300">
                      <Box component={"span"} className="font-extrabold">
                        KServe Functionality:{" "}
                      </Box>
                      Focuses on model inference, streamlining deployment and service processes.
                    </Typography>
                  </Box>
                  <Box component={"li"}>
                    <Typography variant="body1" className="2xl:text-lg text-sm text-gray-300">
                      <Box component={"span"} className="font-extrabold">
                        KubeRay Capabilities:{" "}
                      </Box>
                      Offers an integrated solution for model training and inference, enhancing project efficiency.
                    </Typography>
                  </Box>
                </Box>
              </AnimationOnScroll>
            </Box>
            <Box className="md:w-2/5 px-8 mx-auto flex justify-center">
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Image src={projectListPic} alt="demeter-project-list" height={600}></Image>
              </AnimationOnScroll>
            </Box>
          </Box>
          <Box className="flex flex-col justify-center md:items-start items-center mx-auto md:mt-16 mt-5 space-y-4">
            <Box className="md:w-4/5 md:py-8 w-full">
              <AnimationOnScroll animateIn="animate__fadeIn">
                <Typography variant="h5" className="2xl:text-4xl md:text-3xl text-lg font-extrabold">
                  Exploring DFIL: Connecting the future of decentralized computing and storage.
                </Typography>
                <Typography className="2xl:text-xl md:text-base text-gray-300 mt-2 md:mt-8">
                  DFIL is a revolutionary cross-chain bridge built between the ADion and Filecoin ecosystems. It
                  combines cutting-edge IBC protocol and FVM technology to create a pioneering platform for cross-chain
                  asset transfer and remote computation.
                </Typography>
              </AnimationOnScroll>
            </Box>
            <Box className="grid md:grid-rows-3 grid-rows-1 md:grid-flow-col 2xl:gap-8 gap-4 flex-col">
              {explorEfil.slice(0, 3).map((item: any, index: number) => (
                <AnimationOnScroll
                  key={`explor-efil-${index}`}
                  animateIn="animate__fadeIn"
                  className="md:space-y-8 space-y-4"
                >
                  <Box className="gap-x-1 flex">
                    <Box>
                      <ChainIcon fontSize={25} />
                    </Box>
                    <Box className="2xl:space-y-4 md:space-y-1">
                      <Typography className="2xl:text-2xl md:text-base font-bold">{item.title}</Typography>
                      <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                </AnimationOnScroll>
              ))}
              <Box className="row-span-3 h-full flex items-center justify-center">
                <Image src={dFilPic} alt="dfil-icon"></Image>
              </Box>
              {explorEfil.slice(-3).map((item: any, index: number) => (
                <AnimationOnScroll
                  key={`explor-efil-${index}`}
                  animateIn="animate__fadeIn"
                  className="md:space-y-8 space-y-4"
                >
                  <Box className="gap-x-1 flex">
                    <Box>
                      <ChainIcon fontSize={25} />
                    </Box>
                    <Box className="2xl:space-y-4 md:space-y-1">
                      <Typography className="2xl:text-2xl md:text-base font-bold">{item.title}</Typography>
                      <Typography variant="body2" className="2xl:text-lg md:text-sm text-gray-300 ">
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                </AnimationOnScroll>
              ))}
            </Box>
          </Box>
          <Box className="flex flex-col justify-center mx-auto pt-16 space-y-10">
            <Box className="w-full space-y-8">
              <Typography variant="h3" className="font-extrabold">
                Begin Your Journey with Adion.ai?
              </Typography>
              <Typography variant="subtitle1" className="text-gray-300">
                Join our innovative decentralized computing service platform tailored for node providers. We&apos;re
                dedicated to maximizing resource utilization and accelerating revenue growth for every partner.
              </Typography>
              <Link href="/register">
                <Button
                  variant="contained"
                  size="large"
                  className="w-[180px] text-md mt-10 font-extrabold py-3 text-base"
                  startIcon={<NorthEast />}
                >
                  Start Now
                </Button>
              </Link>
            </Box>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
