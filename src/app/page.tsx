"use client"
import {
  ConvertIcon,
  DoubleQuotationMarkLeftIcon,
  EarthConvert,
  FlowerIcon,
  LogoIcon,
  RobotIcon,
  Rocket,
} from "@/components/Icons"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
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
import stepsPic from "@/../public/images/home/steps.svg"
import mapPic from "@/../public/images/home/map.svg"
import Typewriter from "typewriter-effect"
import TorusOfCubesBg from "@/components/TorusOfCubesBg"
import { NorthEast } from "@mui/icons-material"
import Header from "@/components/home/Header"
import Footer from "@/components/home/Footer"

const NextIcon = () => {
  return (
    <svg viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  const chainListEl = [
    {
      title: "Global Connectivity",
      logo: chain1Pic,
      desc: "Applying global GPU computing power to provide seamless cross-chain services for AI and blockchain applications through a flexible switching tool.",
    },
    {
      title: "Decentralized Architecture",
      logo: chain2Pic,
      desc: "By utilizing the Cosmos SDK+IBC protocol and ADion's chain, we have become a fully decentralized platform. Our tools offer low latency, high concurrency, and scalability. The platform supports low-cost, quick cross-chain asset transfers, which establish a secure and efficient route for resourcing computing power into the network.",
    },
    {
      title: "Security and Privacy",
      logo: chain3Pic,
      desc: "By employing zk-SNARKs encryption technology, it ensures data security and user privacy, thus creating a trusted computing environment.",
    },
    {
      title: "Low Barrier to Entry",
      logo: chain4Pic,
      desc: "With our cloud services, we simplify the process of joining the decentralized computing network. We encourage wider participation through a rewarding mechanism that provides computing power to personalized AI computing factories.",
    },
    {
      title: "Community Governance",
      logo: chain5Pic,
      desc: "Community governance fuels our ecosystem and fosters innovation through a token-based economy and governance model.",
    },
  ]

  return (
    <Box>
      <Box className="opacity-15">
        <TorusOfCubesBg />
      </Box>
      <Header />
      <Box id="instruction" className="h-screen">
        <Box component={"div"}>
          <Box className="w-4/5 2xl:w-2/3 md:w-4/5 mx-auto">
            <Box className="min-h-screen flex-col flex items-center justify-center gap-y-16">
              <Typography className="text-3xl 2xl:text-7xl md:text-6xl text-center font-extrabold animate__animated animate__slideInDown">
                The{" "}
                <Box
                  component={"span"}
                  className="bg-clip-text text-transparent bg-gradient-to-b from-logo-from to-logo-to"
                >
                  GPU
                </Box>{" "}
                Grid of Infinite Compute
              </Typography>
              <Box className="text-sm font-sans antialiased 2xl:text-4xl md:text-3xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-logo-from to-logo-to">
                <Typewriter
                  options={{
                    strings: [
                      "Infinite Network",
                      "Flexible Switching",
                      "Decentralized AI",
                      "Build Your AI Factory with Ease",
                      "Maximize Your Profits",
                    ],
                    delay: 40,
                    deleteSpeed: 20,
                    autoStart: true,
                    loop: true,
                    cursor: "|",
                    cursorClassName: "text-blue-300 animate-[Typewriter-cursor_1s_ease-in-out_infinite]",
                  }}
                />
              </Box>
              <Box className="flex md:flex-row flex-col gap-y-2 gap-x-6 items-center animate__animated animate__fadeIn animate__delay-1s">
                <Button variant="contained" color="primary" className="rounded-2xl px-16 py-2 2xl:py-3" href="/cloud">
                  <Typography className="text-white font-semibold text-xl 2xl:text-2xl">Get Started</Typography>
                </Button>
                <Link href="#" className="text-gray-400 2xl:text-xl md:text-lg text-base hover:text-white">
                  Read more <NorthEast className="2xl:text-lg md:text-base text-sm" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="relative pt-10 mx-auto md:w-4/5 w-11/12">
        <Box id="cloud" className="flex flex-col justify-start text-center items-center">
          <Box className="flex justify-center space-x-2 items-center 2xl:text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
            <LogoIcon className="md:mr-4 mr-1 md:text-8xl md:w-40 text-xl w-20" /> | Cloud
          </Box>
          <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">Aggregation, Schedule, Trade</Typography>
          <Box className="w-full mt-8 bg-gray-300 bg-opacity-10 backdrop-blur-md md:px-24 2xl:px-32 md:py-10 px-2 py-2 rounded-xl">
            <Image src={layersPic} className="w-full" alt="demeters-layers"></Image>
          </Box>
          <Box className="mt-5 w-8">
            <NextIcon />
          </Box>
          <Box className="w-full mt-8 bg-gray-300 bg-opacity-10 backdrop-blur-md md:px-20 2xl:px-28 md:py-5 px-2 py-2 rounded-xl">
            <Box className="flex justify-center items-center py-2">
              <RobotIcon className="2xl:text-5xl md:text-4xl text-base" />
              <Typography className="2xl:text-3xl md:text-2xl text-sm font-bold items-center">
                ADion Intelligent Scheduling
              </Typography>
            </Box>
            <Image alt="demeters_construction" src={constructionPic} className="w-full py-5"></Image>
          </Box>
        </Box>
        <Box id="chain" className="mt-10 text-center h-full items-center">
          <Box className="flex justify-center space-x-2 items-center">
            <Box className="flex justify-center space-x-2 items-center 2xl:text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
              <LogoIcon className="md:mr-4 mr-1 md:text-8xl md:w-40 text-xl w-20" /> | Chain
            </Box>
          </Box>
          <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">
            Building the Infinite Application Chain
          </Typography>
          <Box className="flex flex-col justify-between w-full mt-4 md:gap-y-16 gap-y-4 md:py-16 md:px-20">
            {chainListEl.map((item, index) => (
              <Box
                className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}
                key={`chain-el-${index}`}
              >
                <Box
                  className={`md:w-1/4 md:h-full w-1/5 mx-auto py-2 overflow-y-auto md:flex  ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <Image src={item.logo} alt={`chain-${index}-pic`} className=""></Image>
                </Box>
                <Box className="md:w-3/4 flex flex-col justify-start text-left px-5 md:py-5">
                  <AnimationOnScroll animateIn="animate__fadeIn">
                    <Typography className="font-bold md:text-3xl 2xl:text-4xl pb-4 text-center md:text-left">
                      {item.title}
                    </Typography>
                    <Typography className="md:text-xl 2xl:text-2xl text-gray-400 text-sm">{item.desc}</Typography>
                  </AnimationOnScroll>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box id="dmos" className="flex flex-col justify-start text-center items-center mt-20">
          <Box className="flex justify-center space-x-2 items-center 2xl:text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
            <LogoIcon className="md:mr-4 mr-1 md:text-8xl md:w-40 text-xl w-20" /> | DMOS
          </Box>
          <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold">Route Smarter, Scale Faster</Typography>
          <Box className="w-full mt-8 bg-gray-300 bg-opacity-10 backdrop-blur-md md:px-24 2xl:px-32 md:py-10 p-2 rounded-xl ">
            <Image src={dmosPic} className="w-full" alt="dmos-construction"></Image>
          </Box>
        </Box>
        <Box id="why-us" className="flex flex-col text-center space-y-10 justify-center mt-20">
          <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
            Why US?
          </Typography>
          <Box className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-8 2xl:gap-12 md:px-20 2xl:px-32 mt-5">
            <Box className="flex flex-col items-center text-center gap-y-4">
              <EarthConvert className="text-6xl" />
              <Typography className="font-semibold md:text-lg text-base 2xl:text-2xl w-full">
                Access Global Opportunities
              </Typography>
              <Typography className="text-gray-300 md:text-base text-sm 2xl:text-lg w-full text-left">
                Dive directly into the world&apos;s top GPU ecosystem, securing project task revenues, airdrop rewards,
                and mainnet token incentives. Embark on a journey to wealth by exploring global opportunities with us.
              </Typography>
            </Box>
            <Box className="flex flex-col items-center text-center gap-y-4">
              <Rocket className="text-6xl" />
              <Typography className="font-semibold md:text-lg text-base 2xl:text-2xl w-full">
                AI Development Accelerator
              </Typography>
              <Typography className="text-gray-300 md:text-base text-sm 2xl:text-lg w-full text-left">
                A one-stop AI development solution, integrating mainstream frameworks like TensorFlow and PyTorch.
                Catering to startups and large enterprises alike, fulfilling all-around AI development needs. Begin your
                AI innovation journey now.
              </Typography>
            </Box>
            <Box className="flex flex-col items-center text-center gap-y-4">
              <ConvertIcon className="text-6xl" />
              <Typography className="font-semibold md:text-lg text-base 2xl:text-2xl w-full">
                Intelligent Scheduling
              </Typography>
              <Typography className="text-gray-300 md:text-base text-sm 2xl:text-lg w-full text-left">
                Maximize your resource efficiency with our smart scheduling technology, ensuring optimal resource
                allocation. The flexible project engagement mechanism allows you to adjust strategies anytime for higher
                gains. Experience intelligent scheduling today.
              </Typography>
            </Box>
            <Box className="flex flex-col items-center text-center gap-y-4">
              <FlowerIcon className="text-6xl" />
              <Typography className="font-semibold md:text-lg text-base 2xl:text-2xl w-full">
                Professional Technical Support
              </Typography>
              <Typography className="text-gray-300 md:text-base text-sm 2xl:text-lg w-full text-left">
                24/7 professional SRE operation and maintenance management, supported by global data center
                infrastructure, guarantees the continuous and stable running of your projects. Enjoy worry-free
                technical support while focusing on your core business.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box id="vision" className="flex flex-col text-center space-y-10 justify-center mt-20">
          <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
            Vision
          </Typography>
          <Box className="flex flex-col text-left space-y-4">
            <DoubleQuotationMarkLeftIcon className="2xl:text-6xl md:text-5xl text-3xl" />
            <AnimationOnScroll animateIn="animate__fadeIn">
              <Box className="px-16">
                <Typography className="md:text-3xl 2xl:text-4xl font-bold">
                  Powering the Future with Every Compute
                </Typography>
                <Typography className="md:text-lg 2xl:text-2xl text-gray-400 font-bold mt-8">ADion: </Typography>
                <Typography className="md:text-lg 2xl:text-2xl text-gray-400 mt-2">
                  Unleashing the full potential of decentralized computing for everyone, everywhere. We are transforming
                  the landscape of AI and cloud-native applications with our pioneering distributed cloud OS, DMOS,
                  making computing accessible, efficient, and universally available. Join us in building a limitless
                  computing ecosystem where innovation thrives without boundaries.
                </Typography>
              </Box>
            </AnimationOnScroll>
          </Box>
        </Box>
        <Box id="plan" className="flex flex-col text-center space-y-10 justify-center mt-20">
          <Typography className="mt-4 2xl:text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
            Master Plan
          </Typography>
          <Image className="2xl:h-[60vh] md:h-[55vh] w-full" src={stepsPic} alt="steps"></Image>
        </Box>
        <Box id="ready-to-start" className="flex flex-col text-center space-y-10 mt-20">
          <Box className="flex md:flex-row md:justify-between flex-col-reverse md:grow shrink md:space-x-10 md:px-20 px-5 items-center">
            <Box className="md:text-left text-center md:space-y-16 space-y-6 md:w-1/2">
              <Typography className="2xl:text-5xl md:text-4xl text-3xl font-semibold md:text-left text-center bg-clip-text text-transparent bg-gradient-to-t from-logo-from to-logo-to">
                Ready to start?
              </Typography>
              <Typography className="2xl:text-2xl md:text-xl text-gray-400 text-left">
                Step into the future with ADion.
                <br />
                In a world where AI, Web3, and the metaverse are reshaping reality, we offer you a front-row seat to
                innovation. Embrace the movement of the AI and join us in defining what comes next. Let&apos;s shape the
                future together.
              </Typography>
              <Button
                variant="text"
                className="transition duration-300 px-0 hover:scale-110 ease-in-out hover:bg-transparent"
                href="/register"
              >
                <Box className="flex flex-col text-nowrap text-center">
                  <Typography className=" text-white font-bold text-lg 2xl:text-xl">
                    Boost Your GPU,Launch,Earn <NorthEast />
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Box className="flex flex-col md:w-1/2 space-y-4 mb-10">
              <Image src={mapPic} className="w-full" alt="world-map"></Image>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}
