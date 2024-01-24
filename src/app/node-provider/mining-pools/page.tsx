"use client"
import { UilCloudComputing } from "@/components/Icons"
import Navigator from "@/components/node-provider/Navigator"
import { Description, CheckCircleOutline, Delete, Settings } from "@mui/icons-material"
import {
  Box,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Grid,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material"
import { useState } from "react"

export default function Overview() {
  const [showInputApplicationParams, setShowInputApplicationParams] = useState(false)
  const [applicationParamsOrigin, setApplicationParamsOrigin] = useState("")
  const [openSelectServer, setOpenSelectServer] = useState(false)
  const [poolList, setPoolList] = useState([
    {
      name: "KLS",
      provider: [
        {
          name: "F2pool",
          servers: [
            {
              location: "US",
              url: "a.b.c.us:10000",
            },
            {
              location: "EU",
              url: "a.b.c.eu:10000",
            },
          ],
        },
        {
          name: "herominers",
          servers: [
            {
              location: "US",
              url: "c.b.a.us:10000",
            },
            {
              location: "EU",
              url: "c.b.a.eu:10000",
            },
          ],
        },
      ],
    },
    {
      name: "RVN",
      provider: [
        {
          name: "F2pool",
          servers: [
            {
              location: "US",
              url: "a.b.c.us:10000",
            },
            {
              location: "EU",
              url: "a.b.c.eu:10000",
            },
          ],
        },
        {
          name: "herominers",
          servers: [
            {
              location: "US",
              url: "c.b.a.us:10000",
            },
            {
              location: "EU",
              url: "c.b.a.eu:10000",
            },
          ],
        },
      ],
    },
    {
      name: "KAS",
      provider: [
        {
          name: "herominers",
          servers: [
            {
              location: "US",
              url: "c.b.a.us:10000",
            },
            {
              location: "EU",
              url: "c.b.a.eu:10000",
            },
          ],
        },
      ],
    },
    {
      name: "IRON",
      provider: [
        {
          name: "F2pool",
          servers: [
            {
              location: "US",
              url: "a.b.c.us:10000",
            },
            {
              location: "EU",
              url: "a.b.c.eu:10000",
            },
          ],
        },
      ],
    },
  ])

  const walletList = [
    {
      name: "myaddress1",
      address: "223344556677889900",
      currency: "RVN",
    },
    {
      name: "myaddress2",
      address: "223344556677889922",
      currency: "RVN",
    },
    {
      name: "myaddress3",
      address: "993344556677889900",
      currency: "RVN",
    },
  ]

  const createParamsInit = {
    currency: "",
    provider: "",
    walletAddress: "",
    serverInfo: {
      location: "",
      url: "",
    },
    applicationInfo: {
      name: "",
      cluster: "",
      application: "",
      applicationParams: "",
    },
    activeStep: 0,
  }

  const clusterList = [
    {
      name: "us-west-1",
      id: 1,
    },
    {
      name: "us-west-2",
      id: 2,
    },
  ]

  const miningApplications = ["hoe-v1", "hoe-v2", "hoe-v3"]

  const [createParams, setCreateParams] = useState(createParamsInit)

  const filterServerList = (currency: string, provider: string) => {
    const pool = poolList.find((item) => item.name === currency)
    const p = pool?.provider.find((item) => item.name === provider)
    return p?.servers || []
  }

  const showSelectServer = (currency: string, provider: string) => {
    setOpenSelectServer(true)
    setCreateParams({
      ...createParams,
      currency: currency,
      provider: provider,
      walletAddress: "",
      serverInfo: { location: "", url: "" },
      applicationInfo: {
        name: "",
        cluster: "",
        application: "",
        applicationParams: "",
      },
      activeStep: 0,
    })
  }
  const handleCloseSelectServer = () => {
    setOpenSelectServer(false)
    if (createParams.serverInfo.location && createParams.serverInfo.url) {
      setCreateParams({ ...createParams, activeStep: 1 })
      //todo: fetch wallet list
    }
  }

  const handleCancelSelectServer = () => {
    setOpenSelectServer(false)
    setCreateParams(createParamsInit)
  }

  const isPoolSelected = (currency: string, provider: string): boolean => {
    const p = poolList.find((item) => item.name === currency)?.provider.find((p) => p.name === provider)
    const servers = p?.servers || []
    return (
      createParams.activeStep > 0 &&
      createParams.currency === currency &&
      createParams.provider === provider &&
      createParams.serverInfo.location !== "" &&
      createParams.serverInfo.url !== "" &&
      servers.filter(
        (s) => (s.location === createParams.serverInfo.location && s.url === createParams.serverInfo.url) || []
      ).length > 0
    )
  }

  return (
    <Box>
      <Navigator></Navigator>
      <Box className="w-[1000px] ml-auto mr-auto mt-6 mb-10">
        <Typography variant="h5">Add New Mining Pool</Typography>
        <Stepper className="mt-3" activeStep={createParams.activeStep} orientation="vertical">
          <Step key="0" expanded>
            <StepLabel className="block">
              <Typography variant="h6" className="text-gray-400 mt-2">
                Select crypto and mining pool provider
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[350px] mt-[-35px]">
                {poolList.map((item, index) => {
                  return (
                    <Box className="mb-2" key={`pool-${index}`}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Box className="grid grid-cols-3 gap-4">
                        {item.provider.map((p, i) => {
                          return (
                            <Paper
                              key={`pool-${index}-${i}`}
                              onClick={() => {
                                showSelectServer(item.name, p.name)
                              }}
                              className={`px-4 py-3 relative cursor-pointer ${
                                isPoolSelected(item.name, p.name) ? "bg-gray-100 border" : "hover:bg-gray-100 "
                              }`}
                              elevation={isPoolSelected(item.name, p.name) ? 0 : 4}
                            >
                              {isPoolSelected(item.name, p.name) && (
                                <CheckCircleOutline className="text-blue-500 text-lg absolute right-4 top-2" />
                              )}
                              <Box className="flex flex-row items-center">
                                <UilCloudComputing />
                                <Typography className="ml-2" variant="subtitle1">
                                  {p.name}
                                </Typography>
                              </Box>
                              <Box className="mt-2 flex justify-end">
                                <Description className="text-gray-500 hover:text-gray-700 text-lg" />
                              </Box>
                            </Paper>
                          )
                        })}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </StepContent>
          </Step>
          <Step key="1" active={createParams.activeStep === 1} expanded={createParams.activeStep > 1}>
            <StepLabel className="block">
              <Typography variant="h6" className="text-gray-400 mt-2">
                Select or add a wallet address
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[350px]">
                <Button className="px-16 py-2 text-base" variant="contained">
                  Add Wallet
                </Button>
                <TableContainer component={Paper} className="mt-6" variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Select</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Currency</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {walletList.map((wallet, index) => (
                        <TableRow key={`wallet-list-${index}`}>
                          <TableCell>
                            <Radio
                              name="select-wallet-address"
                              onChange={(e) => {
                                if (e.target.value) {
                                  setCreateParams({ ...createParams, walletAddress: e.target.value, activeStep: 2 })
                                }
                              }}
                              checked={createParams.walletAddress === wallet.address}
                              value={wallet.address}
                            />
                          </TableCell>
                          <TableCell>{wallet.name}</TableCell>
                          <TableCell>{wallet.address}</TableCell>
                          <TableCell>{wallet.currency}</TableCell>
                          <TableCell align="center">
                            <Delete />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </StepContent>
          </Step>
          <Step key="2" expanded={createParams.activeStep > 2} last>
            <StepLabel className="block">
              <Typography variant="h6" className="text-gray-400 mt-2">
                Setting mining application
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[350px] mt-[-20px]">
                <Box component="form" className="flex flex-col justify-start gap-y-4">
                  <TextField
                    label="Name"
                    placeholder="Input a task name"
                    value={createParams.applicationInfo.name}
                    onChange={(e) => {
                      setCreateParams({
                        ...createParams,
                        applicationInfo: { ...createParams.applicationInfo, name: e.target.value },
                      })
                    }}
                  ></TextField>
                  <TextField
                    select
                    label="Cluster"
                    placeholder="Select a cluster for mining task"
                    onChange={(e) => {
                      setCreateParams({
                        ...createParams,
                        applicationInfo: { ...createParams.applicationInfo, cluster: e.target.value },
                      })
                    }}
                  >
                    {clusterList.map((c, index) => (
                      <MenuItem key={`select-cluster-${index}`} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box className="flex">
                    <FormControl className="w-full">
                      <InputLabel>Mining Application</InputLabel>
                      <Select
                        placeholder="Select a mining application for mining task"
                        label="Mining Application"
                        onChange={(e) => {
                          setCreateParams({
                            ...createParams,
                            applicationInfo: { ...createParams.applicationInfo, application: e.target.value as string },
                          })
                        }}
                      >
                        {miningApplications.map((app: string, index: number) => (
                          <MenuItem key={`select-mining-application-${index}`} value={app}>
                            <Box className="flex flex-row justify-between items-center">{app}</Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      className="ml-4"
                      disabled={createParams.applicationInfo.application === ""}
                      onClick={() => {
                        setShowInputApplicationParams(true)
                      }}
                    >
                      <Settings />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        <Box className="flex justify-center mt-8">
          <Button
            color="primary"
            disabled={
              !(
                createParams.activeStep === 2 &&
                createParams.applicationInfo.name !== "" &&
                createParams.applicationInfo.cluster !== "" &&
                createParams.applicationInfo.application !== ""
              )
            }
            size="large"
            variant="contained"
            className="px-32 py-2 text-lg"
          >
            Deploy
          </Button>
        </Box>
      </Box>
      <Dialog open={showInputApplicationParams} fullWidth>
        <DialogTitle>Setting Application Params</DialogTitle>
        <DialogContent>
          <FormControl className="w-full mt-2">
            <TextField
              label="Application Params"
              placeholder="Input application params"
              multiline
              minRows={5}
              maxRows={10}
              value={applicationParamsOrigin}
              onChange={(e) => {
                setApplicationParamsOrigin(e.target.value)
              }}
            ></TextField>
          </FormControl>
        </DialogContent>
        <DialogActions className="justify-center mb-2">
          <Button
            className="w-[150px]"
            onClick={() => {
              setShowInputApplicationParams(false)
              setCreateParams({
                ...createParams,
                applicationInfo: { ...createParams.applicationInfo, applicationParams: applicationParamsOrigin },
              })
            }}
            color="primary"
            variant="contained"
            size="large"
          >
            OK
          </Button>
          <Button
            onClick={() => {
              setApplicationParamsOrigin(createParams.applicationInfo.applicationParams)
              setShowInputApplicationParams(false)
            }}
            variant="text"
            size="large"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSelectServer} fullWidth>
        <DialogTitle>Select servers</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              onChange={(e) => {
                e.preventDefault()
                const _value = JSON.parse(e.target.value)
                setCreateParams({
                  ...createParams,
                  serverInfo: { location: _value.location, url: _value.url },
                })
              }}
            >
              {filterServerList(createParams.currency, createParams.provider).map((item, index) => {
                return (
                  <FormControlLabel
                    key={`server-list-${index}`}
                    control={<Radio />}
                    value={JSON.stringify(item)}
                    checked={item.url === createParams.serverInfo.url}
                    label={
                      <Grid container spacing={5}>
                        <Grid item xs={3}>
                          {item.location}
                        </Grid>
                        <Grid item xs={9}>
                          {item.url}
                        </Grid>
                      </Grid>
                    }
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions className="justify-center mb-2">
          <Button
            className="w-[150px]"
            onClick={handleCloseSelectServer}
            color="primary"
            variant="contained"
            size="large"
          >
            OK
          </Button>
          <Button onClick={handleCancelSelectServer} variant="text" size="large">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
