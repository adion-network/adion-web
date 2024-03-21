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
} from "@/components/Icons"
import { NorthEast } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import constructionPic from "@/../public/images/home/2.png"
import detailPic1 from "@/../public/images/home/3.png"
import detailPic2 from "@/../public/images/home/4.png"
import detailPic3 from "@/../public/images/home/5.png"
import projectListPic from "@/../public/images/home/7.png"
import dFilPic from "@/../public/images/home/8.png"

export default function Home() {
  return (
    <Box className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-none bg-black">
      <Box className="h-screen snap-start flex flex-col justify-start">
        <Box className="h-16 bg-[#1A1A1A] w-full flex justify-end py-3 px-20">
          <Link href="/login">
            <Button variant="outlined" className="border-2 rounded-lg">
              Sign In
            </Button>
          </Link>
        </Box>
        <Box className="bg-[url('/images/home/1.png')] bg-cover bg-no-repeat h-full bg-top min-w-[1440px]">
          <Box className="w-1/2 top-[15%] gap-y-10 left-[10%] flex flex-col relative justify-start">
            <Typography variant="h3" className="font-extrabold">
              Building the Future&apos;s AI/Blockchain Compute Network
            </Typography>
            <Typography variant="h6" className="font-extrabold">
              Aggregate global GPU resources via Demeters.ai&apos;s decentralized platform, achieving deployment,
              scheduling, switching, and monitoring with full-stack services. Maximize resource efficiency and revenue
              growth effortlessly.
            </Typography>
            <Link href="/register" className="w-[180px]">
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
      <Box className="h-screen snap-start pb-32">
        <Box className="flex flex-col relative justify-center left-[10%] top-[10%] w-4/5 h-full gap-y-32">
          <Box className="flex justify-between gap-y-10 items-center">
            <Box className="w-2/3 space-y-10">
              <Typography variant="h3" className="font-extrabold">
                Full control of your AI infrastructure
              </Typography>
              <Typography variant="h6" className="font-extrabold">
                Leverage global high-performance servers with DMOS (Demeter Cloud Operating System) for effortless
                resource management. Experience smart control through an intuitive dashboard, seamless cloud-native
                integrations, and extensive API. Simplified. Swift. Smart.
              </Typography>
            </Box>
            <Box className="mr-10">
              <NvidaLogo />
            </Box>
          </Box>
          <Box className="transition min-w-[1000px] w-full">
            <Image src={constructionPic} alt="demeter-ai-construction"></Image>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen snap-start pb-32">
        <Box className="flex flex-col justify-center mx-auto w-4/5 h-full pt-16 space-y-10">
          <Box className="flex justify-between items-center">
            <Box className="w-1/2 space-y-8">
              <Box className="ml-4 inline-flex rounded-full bg-green-500 shadow-halo shadow-green-500">
                <ConfigIcon></ConfigIcon>
              </Box>
              <Typography variant="h4" className="font-extrabold">
                Professional. Worry-Free. 24/7.
              </Typography>
              <Typography variant="h6" className="font-extrabold">
                Experience global, full-stack SRE operational management—including overseas data center equipment setup
                and 24/7 technical support. Ensure optimal maintenance of hardware resources, freeing you from technical
                concerns and maintenance worries.
              </Typography>
            </Box>
            <Box className="w-5/12">
              <Image src={detailPic1} alt="demeter-detail-1"></Image>
            </Box>
          </Box>
          <Box className="flex justify-between items-center">
            <Box className="w-5/12">
              <Image src={detailPic2} alt="demeter-detail-1"></Image>
            </Box>
            <Box className="w-1/2 space-y-8">
              <Box className="ml-4 inline-flex rounded-full bg-orange-300 shadow-halo shadow-orange-300">
                <StackIcon></StackIcon>
              </Box>
              <Typography variant="h4" className="font-extrabold">
                DMOS Cloud OS: Resource Mastery.
              </Typography>
              <Typography variant="h6" className="font-extrabold">
                Harness DMOS Cloud Operating System for remote, visual management of all hardware resources within
                cluster nodes. Features customizable projects, versatile single-card task management, earnings insights,
                and withdrawals—maximizing resource utilization efficiently.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen snap-start pb-32">
        <Box className="flex flex-col justify-center mx-auto w-4/5 h-full pt-16 space-y-10">
          <Box className="flex justify-between items-center">
            <Box className="w-1/2 space-y-8">
              <Box className="ml-4 inline-flex rounded-full  bg-purple-500 shadow-halo shadow-purple-500">
                <PodwiseLogo></PodwiseLogo>
              </Box>
              <Typography variant="h4" className="font-extrabold">
                Podwise Rental Service: Expand Horizons.
              </Typography>
              <Typography variant="h6" className="font-extrabold">
                Connect to Podwise for diverse GPU cluster rental services—bare metal, AI acceleration, GPU container
                cloud, and more. Broaden the application scenarios and market reach of your hardware resources.
              </Typography>
            </Box>
            <Box className="w-5/12">
              <Image src={detailPic3} alt="demeter-detail-1"></Image>
            </Box>
          </Box>
          <Box className="flex justify-between items-center">
            <Box className="w-5/12 flex justify-center items-center">
              <WorldMap></WorldMap>
            </Box>
            <Box className="w-1/2 space-y-8">
              <Box className="ml-4 inline-flex rounded-full bg-teal-500 shadow-halo shadow-teal-500">
                <LinkIcon></LinkIcon>
              </Box>
              <Typography variant="h4" className="font-extrabold">
                Global Project Access: Unlock Potential.
              </Typography>
              <Typography variant="h6" className="font-extrabold">
                Clients connect through the Demeter.Ai network for smart access to global GPU project pools and GPU POW
                mining pools. Enjoy project task profits, airdrop rewards, and mainnet Token incentives.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen snap-start pb-32">
        <Box className="flex justify-center items-center mx-auto w-4/5 h-full pt-32 space-y-10">
          <Box className="w-3/5 space-y-8">
            <Box className="ml-4 inline-flex rounded-full bg-sky-600 shadow-halo shadow-sky-600">
              <PuzzleIcon></PuzzleIcon>
            </Box>
            <Typography variant="h4" className="font-extrabold">
              AI R&D Acceleration: Streamline Development.
            </Typography>
            <Typography variant="body1" className="font-extrabold">
              Harness advanced ML Tools and Platforms to fast-track AI project cycles—from model training to inference
              acceleration.
            </Typography>
            <Typography variant="h6" className="font-extrabold">
              ML Tools: Integrated AI Development Toolkit
            </Typography>
            <Box component={"ul"} className="space-y-2 list-disc ml-4">
              <Box component={"li"}>
                <Typography variant="body1">
                  <Box component={"span"} className="font-extrabold">
                    Versatile Framework Support:{" "}
                  </Box>
                  Incorporates TensorFlow, Caffe, PyTorch, and more, meeting diverse development needs.
                </Typography>
              </Box>
              <Box component={"li"}>
                <Typography variant="body1">
                  <Box component={"span"} className="font-extrabold">
                    Comprehensive Tool Integration:{" "}
                  </Box>
                  Features distributed training and model visualization for rapid deployment of large-scale tasks.
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" className="font-extrabold">
              ML Platform: Unified Machine Learning Platform
            </Typography>
            <Box component={"ul"} className="space-y-2 list-disc ml-4">
              <Box component={"li"}>
                <Typography variant="body1">
                  <Box component={"span"} className="font-extrabold">
                    Kubeflow Integration:{" "}
                  </Box>
                  A Kubernetes-based, open-source ML framework for robust model training support.
                </Typography>
              </Box>
              <Box component={"li"}>
                <Typography variant="body1">
                  <Box component={"span"} className="font-extrabold">
                    KServe Functionality:{" "}
                  </Box>
                  Focuses on model inference, streamlining deployment and service processes.
                </Typography>
              </Box>
              <Box component={"li"}>
                <Typography variant="body1">
                  <Box component={"span"} className="font-extrabold">
                    KubeRay Capabilities:{" "}
                  </Box>
                  Offers an integrated solution for model training and inference, enhancing project efficiency.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="w-2/5 px-8 mx-auto flex justify-center">
            <Image src={projectListPic} alt="demeter-project-list" height={600}></Image>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen snap-start pb-32">
        <Box className="flex flex-col justify-center mx-auto w-4/5 h-full pt-16 space-y-10">
          <Box className="w-4/5 space-y-3">
            <Typography variant="h4" className="font-extrabold">
              Exploring DFIL: Connecting the future of decentralized computing and storage.
            </Typography>
            <Typography variant="body1" className="font-extrabold text-gray-300">
              DFIL is a revolutionary cross-chain bridge built between the Demeter and Filecoin ecosystems. It combines
              cutting-edge IBC protocol and FVM technology to create a pioneering platform for cross-chain asset
              transfer and remote computation.
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Box className="w-1/3 space-y-4">
              <Box className="gap-x-1 flex">
                <Box>
                  <ChainIcon fontSize={30} />
                </Box>
                <Box className="space-y-2">
                  <Typography variant="h6" className="font-bold">
                    One-Stop Solution: Seamless Filecoin Integration.
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    DFIL enables single-call execution for temporary computational needs and offers a hassle-free node
                    encapsulation service for those interested in Filecoin projects without the means for software and
                    hardware maintenance.
                  </Typography>
                </Box>
              </Box>
              <Box className="gap-x-1 flex">
                <Box>
                  <ChainIcon fontSize={30} />
                </Box>
                <Box className="space-y-2">
                  <Typography variant="h6" className="font-bold">
                    Cross-Chain Connectivity: Enhancing Interoperability.
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    Facilitate direct token transfers between Demeters and Filecoin ecosystems via the IBC protocol or
                    settle tasks through smart contracts, simplifying cross-chain transactions.
                  </Typography>
                </Box>
              </Box>
              <Box className="gap-x-1 flex">
                <Box>
                  <ChainIcon fontSize={30} />
                </Box>
                <Box className="space-y-2">
                  <Typography variant="h6" className="font-bold">
                    Computational Power Dispatch: Flexible & Reliable.
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    DFIL meets all computational demands, from sudden spikes to consistent support, with its remote
                    computing task service.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="flex w-1/3 space-y-4 justify-center items-center">
              <Image src={dFilPic} alt="dfil-icon" width={400}></Image>
            </Box>
            <Box className="w-1/3 space-y-4">
              <Box className="gap-x-1 flex">
                <Box>
                  <ChainIcon fontSize={30} />
                </Box>
                <Box className="space-y-2">
                  <Typography variant="h6" className="font-bold">
                    Transparency & Fairness: Built on Trust.
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    Demeters, constructed on Cosmos&apos; technology stack and integrated with Cosmos&apos;
                    communication protocols and consensus mechanisms via FVM, serves as a bridge to Filecoin, upgrading
                    the Filecoin network&apos;s development capabilities.
                  </Typography>
                </Box>
              </Box>
              <Box className="gap-x-1 flex">
                <Box>
                  <ChainIcon fontSize={30} />
                </Box>
                <Box className="space-y-2">
                  <Typography variant="h6" className="font-bold">
                    Storage Incentivization: Expanding the Filecoin Network.
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    As encapsulation costs decrease and computational resources are optimized, more data is motivated to
                    be stored on the Filecoin network, enhancing its value and fostering the growth of the decentralized
                    storage ecosystem.
                  </Typography>
                </Box>
              </Box>
              <Box className="gap-x-1 flex">
                <Box>
                  <ChainIcon fontSize={30} />
                </Box>
                <Box className="space-y-2">
                  <Typography variant="h6" className="font-bold">
                    Resource Optimization: Maximizing Utility.
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    DFIL offers a platform for Filecoin miners to market idle computational resources, providing
                    computational power to users or projects and generating additional income.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="h-screen snap-start pb-32">
        <Box className="flex flex-col justify-center mx-auto w-4/5 h-1/3 pt-16 space-y-10">
          <Box className="w-full space-y-8">
            <Typography variant="h3" className="font-extrabold">
              Begin Your Journey with Demeters.ai?
            </Typography>
            <Typography variant="subtitle1" className="font-extrabold text-gray-300">
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
        <Box className="flex justify-center w-full h-2/3 mt-32 bg-[#1A1A1A] py-20">
          <Box className="w-1/3 flex-col justify-center space-y-20">
            <Box className="text-center">
              <Typography variant="h5" className="font-extrabold">
                Demeters.ai
              </Typography>
            </Box>
            <Box className="flex justify-center gap-x-10 px-10">
              <Box className="bg-gray-400 rounded-full p-3 cursor-pointer hover:bg-gray-200">
                <MdiTwitter fontSize={42} color="black"></MdiTwitter>
              </Box>
              <Box className="bg-gray-400 rounded-full p-3 cursor-pointer hover:bg-gray-200">
                <BiYoutube fontSize={42} color="black"></BiYoutube>
              </Box>
              <Box className="bg-gray-400 rounded-full p-3 cursor-pointer hover:bg-gray-200">
                <MdiTelegram fontSize={42} color="black"></MdiTelegram>
              </Box>
              <Box className="bg-gray-400 rounded-full p-3 cursor-pointer hover:bg-gray-200">
                <IcBaselineDiscord fontSize={42} color="black"></IcBaselineDiscord>
              </Box>
            </Box>
          </Box>
          <Box className="w-1/3">
            <Box className="text-center space-y-16">
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
            <Box className="text-center space-y-16">
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
  )
}
