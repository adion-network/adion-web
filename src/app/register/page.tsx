"use client"
import { ContentCopy, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { enqueueSnackbar } from "notistack"
import { useRef, useState, useEffect } from "react"
import { SvgSpinners12DotsScaleRotate } from "@/components/Icons"

export default function Register() {
  const regionList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Caribbean Netherlands",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "DR Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern and Antarctic Lands",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "North Macedonia",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn Islands",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of the Congo",
    "Romania",
    "Russia",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syria",
    "São Tomé and Príncipe",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "United States Virgin Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands",
  ]
  const gpuModels = [
    "RTX 4090",
    "RTX 4080",
    "RTX 3090",
    "RTX 3080",
    "A6000",
    "A5000",
    "A4000",
    "H100",
    "A10",
    "A40",
    "V100",
    "Other",
  ]
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    name: "",
    external: true,
    node_location: "",
    gpu_models: [],
    gpu_configuration: "",
    bandwidth_speed: "",
    storage_size: "",
    script_result: "",
    policy_agree: false,
  })
  const [isSubmited, setIsSubmited] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const stepRefs = useRef<any>([])
  const [activeStep, setActiveStep] = useState(0)
  const [displayError, setDisplayError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offsets = stepRefs.current.map((ref: any) => {
        return ref.getBoundingClientRect().top + window.scrollY
      })

      const currentPosition = window.scrollY + window.innerHeight / 2

      const currentStep = offsets.findIndex((offset: number) => {
        return currentPosition <= offset
      })
      if (currentStep !== activeStep) {
        setActiveStep(currentStep == -1 ? offsets.length : currentStep)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeStep])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      enqueueSnackbar("Copied", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Failed to copy!", { variant: "error" })
    }
  }

  const execCommand =
    "curl https://demeters.s3.amazonaws.com/dmos_install.sh | bash -s b98080bdf63948a3bd49361e024f8ec8"

  const models = [
    {
      name: "AI Cloud",
      systemRequirements: [
        "Ubuntu 22.04",
        "Stable internet connection",
        "Static public IP Support",
        <ul className="space-y-1" key="ai-cloud-req-3">
          <li>Internet speed: </li>
          <li>Download &gt; 1 GBps</li>
          <li>Upload &gt; 500 Mbps</li>
          <li>Latency &lt; 30 milliseconds(ms).</li>
        </ul>,
        <>
          Test your internet speed here:{" "}
          <Link className="hover:opacity-70" href="https://www.speedtest.net" target="_blank">
            https://www.speedtest.net
          </Link>
        </>,
      ],
      hardwareRequirements: [
        "At least 24 GPUs",
        "NVIDIA GeForce RTX 30xx and RTX 40xx series or higher",
        <ul key="hd-req-2">
          <li>Option 1:</li>
          <li>Minimum 6 servers with 4 GPUs and 8GB VRAM per GPU</li>
        </ul>,
        <ul key="hd-req-3">
          <li>Option 2:</li>
          <li>Minimum 3 servers with 8 GPUs and 24GB VRAM per GPU.</li>
        </ul>,
        "Minimum 32 vCPUs",
        "The memory size should be at least equal to the total virtual memory (vRAM) of all GPUs + 4GB for system operations.",
        "1TB or greater memory recommended for 8 GPU configurations of 80GB vRAM.",
        "Requires minimum 1 TB of SSD storage, 2 TB is preferred.",
      ],
    },
    {
      name: "GPU Mining model",
      systemRequirements: ["Ubuntu 22.04", "Stable internet connection", "Static public IP Support"],
      hardwareRequirements: [
        "Each machine should have at least 8 GiB or more of memory.",
        "Each machine should have at least 100 GB of available disk space.",
        "There should be a minimum of 24 GPUs.",
        "NVIDIA GeForce RTX 30 series or higher is required (if multiple GPUs are present in each system, they should all be of the same model).",
      ],
    },
  ]

  const isEmailVaild = (email: string): boolean => {
    const match = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    return match !== null
  }

  const handleRegister = async () => {
    try {
      if (
        !isEmailVaild(registerInfo.email) ||
        !registerInfo.email ||
        !registerInfo.node_location ||
        registerInfo.gpu_models.length === 0 ||
        !registerInfo.gpu_configuration ||
        !registerInfo.bandwidth_speed ||
        !registerInfo.storage_size
      ) {
        setDisplayError(true)
        throw new Error("Fill all required information marked as *")
      }

      if (!registerInfo.policy_agree) {
        setDisplayError(true)
        throw new Error("Agree our privacy policy to continue")
      }

      setIsSendingMessage(true)
      //const res = await sendMessageToDiscord(`New Regisition received, Email: ${registerInfo.email}`)
      //console.log(res)
      //if (res.code !== 200) {
      //  throw new Error("register error")
      //}
      setIsSubmited(true)
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setIsSendingMessage(false)
    }
  }

  return (
    <Box className="bg-black">
      <Dialog open={isSubmited}>
        <DialogTitle className="font-extrabold">Success</DialogTitle>
        <DialogContent>
          We received your information and we will reach out to you when your registration is approved!
        </DialogContent>
        <DialogActions className="px-8 py-3">
          <Button
            size="large"
            variant="contained"
            className="bg-blue-500 hover:opacity-80"
            onClick={() => setIsSubmited(false)}
          >
            OK
          </Button>
          <Link href="/">
            <Button size="large" variant="text" className="underline text-blue-500">
              Return To Home Page
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Box className="lg:w-4/5 w-full px-2 mx-auto flex py-12 flex-col justify-start">
        <Box className="space-y-6">
          <Typography className="2xl:text-2xl md:text-xl text-lg font-extrabold">GPU Onboarding</Typography>
          <Typography className="text-gray-300">
            <b>Join Adion.AI</b> and become a Node Provider to fully leverage your GPU investment. Our cutting-edge
            technology and global project access ensure optimal profit returns at any location. We simplify complex
            project setups with seamless application chain switching at the click of a mouse, relieving you of
            operational concerns. Our smart scheduling and flexible participation mechanisms not only increase resource
            efficiency but also guarantee stable operations. With us handling the technical details, you can focus
            solely on strategic decisions, adapting effortlessly to market changes and focusing on profit growth. We are
            dedicated to breaking traditional boundaries and driving forward a secure, private, and interoperable
            ecosystem in the decentralized GPU computing market.
          </Typography>
          <Divider className="text-gray-300 before:border-t-2 before:border-gray-500 after:border-t-2 after:border-gray-500 relative">
            <Box className="flex items-center justify-between mx-[-1rem] space-x-3">
              <Box className="w-2 h-2 rounded-full bg-gray-500"></Box>
              <Typography>Registrations list</Typography>
              <Box className="w-2 h-2 rounded-full bg-gray-500"></Box>
            </Box>
          </Divider>
        </Box>
        <Box className="w-full py-8">
          <Box ref={(el: any) => (stepRefs.current[0] = el)} className="flex flex-row gap-x-4">
            <Box className="flex flex-col justify-end w-1/6 min-w-48 bg-[#333333] rounded-t-2xl px-4">
              <Box className="flex text-blue-500 flex-row justify-between w-full items-center">
                <Typography className="2xl:text-base md:text-sm text-xs">1.Basic Information</Typography>
                <RadioButtonChecked className="text-base" />
              </Box>
              <Box className="border-r h-1/2 border-r-blue-500 mx-2 mt-2"></Box>
            </Box>
            <Box className="w-5/6 flex flex-col space-y-5 px-12 py-6 rounded-2xl bg-[#181818]">
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">What&apos;s your email?</li>
              </Typography>
              <TextField
                error={displayError && !isEmailVaild(registerInfo.email)}
                helperText={!isEmailVaild(registerInfo.email) ? "Input a vaild email address" : ""}
                required
                fullWidth
                placeholder="Your Email Address"
                value={registerInfo.email}
                onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
                type="email"
              ></TextField>
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li>What&apos;s your name?</li>
              </Typography>
              <TextField
                fullWidth
                placeholder="Your Name"
                value={registerInfo.name}
                onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
              ></TextField>
            </Box>
          </Box>
          <Box ref={(el: any) => (stepRefs.current[1] = el)} className="flex flex-row gap-x-4">
            <Box className="flex flex-col justify-end w-1/6 min-w-48 bg-[#333333] px-4">
              <Box className="border-r h-1/2 border-r-blue-500 mx-2 mb-2"></Box>
              <Box
                className={`flex ${
                  activeStep >= 2 && "text-blue-500"
                } transition duration-300 ease-out flex-row justify-between w-full items-center`}
              >
                <Typography className="2xl:text-base md:text-sm text-xs">2.Requirements</Typography>
                {activeStep >= 2 ? (
                  <RadioButtonChecked className="text-base" />
                ) : (
                  <RadioButtonUnchecked className="text-base" />
                )}
              </Box>
              <Box
                className={`border-r h-1/2  ${
                  activeStep >= 3 && "border-r-blue-500"
                } transition duration-300 ease-out mx-2 mt-2`}
              ></Box>
            </Box>
            <Box className="w-5/6 flex flex-col space-y-5 px-12 py-6 rounded-2xl bg-[#181818] mt-6">
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li>
                  ADion Cloud is divided into AI Cloud Model and GPU Mining Model. Different models have different
                  requirements. Please check whether you meet the requirements.
                </li>
              </Typography>
              <Box className="w-full flex justify-center gap-x-8">
                {models.map((m: any, index: number) => (
                  <Box
                    key={`model-${index}`}
                    className="w-1/2 bg-transparent relative p-4 border border-[#666] rounded-2xl"
                  >
                    <Box className="space-y-2">
                      <Typography className="font-extrabold" variant="h6">
                        {m.name}
                      </Typography>
                      <Typography variant="h6" className="font-semibold">
                        System Requirements:
                      </Typography>
                      <Box component={"ul"} className="list-disc text-gray-400 ml-4 space-y-1 font-semibold">
                        {m.systemRequirements.map((r: string, i: number) => (
                          <Typography component={"li"} key={`model-${index}-${i}`}>
                            {r}
                          </Typography>
                        ))}
                      </Box>
                      <Typography variant="h6" className="font-semibold">
                        Hardware Requirements:
                      </Typography>
                      <Box component={"ul"} className="list-disc text-gray-400 ml-4 space-y-1 font-semibold">
                        {m.hardwareRequirements.map((r: string, i: number) => (
                          <Typography component={"li"} key={`model-${index}-${i}`}>
                            {r}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box ref={(el: any) => (stepRefs.current[2] = el)} className="flex flex-row gap-x-4">
            <Box className="flex flex-col justify-end w-1/6 min-w-48 bg-[#333333] px-4">
              <Box
                className={`border-r h-1/2 ${
                  activeStep >= 3 && "border-r-blue-500"
                } transition duration-300 ease-out mx-2 mb-2`}
              ></Box>
              <Box
                className={`flex ${
                  activeStep >= 3 && "text-blue-500"
                } transition duration-300 ease-out flex-row justify-between w-full items-center`}
              >
                <Typography className="2xl:text-base md:text-sm text-xs">3.Need to know</Typography>
                {activeStep >= 3 ? (
                  <RadioButtonChecked className="text-base" />
                ) : (
                  <RadioButtonUnchecked className="text-base" />
                )}
              </Box>
              <Box
                className={`border-r h-1/2  ${
                  activeStep >= 4 && "border-r-blue-500"
                } transition duration-300 ease-out mx-2 mt-2`}
              ></Box>
            </Box>
            <Box className="w-5/6 flex flex-col space-y-5 px-12 py-6 rounded-2xl bg-[#181818] mt-6">
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">
                  Are you interested in participating as a node for external compute clients?
                </li>
              </Typography>
              <Typography variant="body1" className="text-gray-300">
                External Compute Clients run workloads outside of traditional Render jobs. These workloads tend to have
                unique payment and workload requirements. Your node may be completely reserved for an unknown period
                (e.g. up to a week or more). During this time, your node will be unable to accept other jobs (including
                your own renders) and nodes need to stay up and online during the entire period. Additionally, ADion
                does not guarantee any security requirements for external clients. We recommend running a zero trust
                node — removing any personal data on the node and network — for new clients.
              </Typography>
              <Box className="flex gap-4">
                <Button
                  variant="outlined"
                  className={`rounded-lg border ${registerInfo.external && "border-blue-500"}`}
                  onClick={() => setRegisterInfo({ ...registerInfo, external: true })}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  className={`rounded-lg border ${!registerInfo.external && "border-blue-500"}`}
                  onClick={() => setRegisterInfo({ ...registerInfo, external: false })}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Box>
          <Box ref={(el: any) => (stepRefs.current[3] = el)} className="flex flex-row gap-x-4">
            <Box className="flex flex-col justify-end w-1/6 min-w-48 bg-[#333333] px-4">
              <Box
                className={`border-r h-1/2 ${
                  activeStep >= 4 && "border-r-blue-500"
                } transition duration-300 ease-out mx-2 mb-2`}
              ></Box>
              <Box
                className={`flex ${
                  activeStep >= 4 && "text-blue-500"
                } transition duration-300 ease-out flex-row justify-between w-full items-center`}
              >
                <Typography className="2xl:text-base md:text-sm text-xs">4.System Information</Typography>
                {activeStep >= 4 ? (
                  <RadioButtonChecked className="text-base" />
                ) : (
                  <RadioButtonUnchecked className="text-base" />
                )}
              </Box>
              <Box
                className={`border-r h-1/2  ${
                  activeStep >= 5 && "border-r-blue-500"
                } transition duration-300 ease-out mx-2 mt-2`}
              ></Box>
            </Box>
            <Box className="w-5/6 flex flex-col space-y-5 px-12 py-6 rounded-2xl bg-[#181818] mt-6">
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">Where is your node located?</li>
              </Typography>
              <Select
                error={displayError && !registerInfo.node_location}
                placeholder="Select Location"
                value={registerInfo.node_location}
                onChange={(e) => setRegisterInfo({ ...registerInfo, node_location: e.target.value })}
              >
                {regionList.map((value, index: number) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">
                  Which of the following GPUs do you have?
                </li>
              </Typography>
              <Select
                error={displayError && registerInfo.gpu_models.length === 0}
                multiple
                placeholder="Select Models"
                value={registerInfo.gpu_models}
                onChange={(e) => setRegisterInfo({ ...registerInfo, gpu_models: e.target.value as never[] })}
              >
                {gpuModels.map((value, index: number) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">
                  Please describe your GPU configuration.
                </li>
              </Typography>
              <TextField
                error={displayError && !registerInfo.gpu_configuration}
                placeholder="eg. 5 4090s."
                value={registerInfo.gpu_configuration}
                onChange={(e) => setRegisterInfo({ ...registerInfo, gpu_configuration: e.target.value })}
              ></TextField>
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">
                  What is your internet bandwidth speed?
                </li>
              </Typography>
              <TextField
                error={displayError && !registerInfo.bandwidth_speed}
                placeholder="e.g. Min upload 500 mbps./Min download is 1000 mbps."
                value={registerInfo.bandwidth_speed}
                onChange={(e) => setRegisterInfo({ ...registerInfo, bandwidth_speed: e.target.value })}
              ></TextField>
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">
                  What is your max available hard disk storage for compute jobs?
                </li>
              </Typography>
              <TextField
                error={displayError && !registerInfo.storage_size}
                placeholder="e.g. 1500 for 1.5 terabytes"
                value={registerInfo.storage_size}
                onChange={(e) => setRegisterInfo({ ...registerInfo, storage_size: e.target.value })}
              ></TextField>
            </Box>
          </Box>
          <Box ref={(el: any) => (stepRefs.current[4] = el)} className="flex flex-row gap-x-4">
            <Box className="flex flex-col justify-start w-1/6 min-w-48 bg-[#333333] px-4 rounded-b-2xl">
              <Box
                className={`border-r h-1/2 ${
                  activeStep >= 5 && "border-r-blue-500"
                } transition duration-300 ease-out mx-2 mb-2`}
              ></Box>
              <Box
                className={`flex ${
                  activeStep >= 5 && "text-blue-500"
                } transition duration-300 ease-out flex-row justify-between w-full items-center`}
              >
                <Typography className="2xl:text-base md:text-sm text-xs">5.Prerequisites</Typography>
                {activeStep >= 5 ? (
                  <RadioButtonChecked className="text-base" />
                ) : (
                  <RadioButtonUnchecked className="text-base" />
                )}
              </Box>
            </Box>
            <Box className="w-5/6 flex flex-col space-y-5 px-12 py-6 rounded-2xl bg-[#181818] mt-6">
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li className="after:content-['*'] after:ml-1 after:text-red-500">Download and run the script</li>
              </Typography>
              <TextField
                disabled
                fullWidth
                multiline
                value={execCommand}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => copyToClipboard(execCommand)}>
                        <ContentCopy></ContentCopy>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Typography component={"ul"} variant="h6" className="font-semibold list-disc list-outside px-4">
                <li>Please copy the running results into the text box</li>
              </Typography>
              <TextField fullWidth multiline minRows={5}></TextField>
            </Box>
          </Box>
        </Box>
        <Divider className="border-gray-500"></Divider>
        <Box className="py-4 flex items-start">
          <FormControl error={true} required variant="standard">
            <FormControlLabel
              control={
                <Checkbox
                  checked={registerInfo.policy_agree}
                  onChange={(e) => setRegisterInfo({ ...registerInfo, policy_agree: e.target.checked })}
                />
              }
              label={
                <Typography variant="body1">
                  I agree to receive communications from Adion, and I understand Adion will process my personal
                  information in accordance with Adion&apos;s{" "}
                  <Link href="#" className="font-semibold hover:opacity-70">
                    Privacy Policy.
                  </Link>
                </Typography>
              }
            ></FormControlLabel>
            {displayError && !registerInfo.policy_agree && (
              <FormHelperText>You must agree our privacy policy</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box className="w-full text-center">
          <Button
            variant="contained"
            className="font-extrabold rounded-2xl py-3 text-lg w-80"
            size="large"
            onClick={handleRegister}
          >
            {isSendingMessage ? <SvgSpinners12DotsScaleRotate fontSize={28} /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
