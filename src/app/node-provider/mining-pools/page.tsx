"use client"
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
  FormControl,
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
  Avatar,
  CircularProgress,
  Backdrop,
} from "@mui/material"
import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { useState, useEffect } from "react"
import useCoins from "@/app/api/coins"
import useWallet, { CreateWalletReq } from "@/app/api/wallet"
import useWorkers from "@/app/api/worker"
import { enqueueSnackbar } from "notistack"
import { useConfirm } from "material-ui-confirm"

export default function Overview() {
  const [showInputApplicationParams, setShowInputApplicationParams] = useState(false)
  const [applicationParamsOrigin, setApplicationParamsOrigin] = useState("")
  const [openAddWallet, setOpenAddWallet] = useState(false)
  const [providerList, setProviderList] = useState<any[]>([])
  const [createWalletParams, setCreateWalletParams] = useState<CreateWalletReq>({
    name: "",
    address: "",
    coin_name: "",
  })
  const confirm = useConfirm()

  const {
    coinList,
    fetchCoinList,
    isCoinListFetching,
    coinApplicationList,
    fetchCoinApplications,
    fetchServerList,
    isServerListFetching,
    serverList,
  } = useCoins()

  const {
    walletList,
    isWalletListFetching,
    fetchWalletList,
    createWallet,
    isCreatingWallet,
    deleteWallet,
    isDeleteingWallet,
  } = useWallet()
  const { workerList, fetchWorkerList } = useWorkers()

  const createParamsInit = {
    currency: "",
    provider: "",
    walletId: "",
    serverId: "",
    clusterId: "",
    clientId: "",
    name: "",
    args: "",
    activeStep: 0,
  }

  const [createParams, setCreateParams] = useState(createParamsInit)

  const processStepOne = async (currency: string) => {
    if (createParams.currency !== currency) {
      setCreateParams({
        ...createParams,
        currency: currency,
        provider: "",
        walletId: "",
        serverId: "",
        clusterId: "",
        clientId: "",
        name: "",
        activeStep: 1,
      })
      setProviderList(coinList.find((p: any) => p.name === currency).miner_pools)
      fetchCoinApplications(currency)
      fetchWalletList(currency)
      fetchWorkerList()
    }
  }

  const isPoolSelected = (currency: string): boolean => {
    return currency === createParams.currency
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
      right: -15,
      top: 17,
      padding: "0px 20px 0px 20px",
    },
  }))

  const handleAddWallet = async () => {
    const res = await createWallet({ ...createWalletParams, coin_name: createParams.currency })
    if (res.code === 200) {
      enqueueSnackbar("Create wallet successful", { variant: "success" })
      setOpenAddWallet(false)
      fetchWalletList(createParams.currency)
    } else {
      enqueueSnackbar(res.msg, { variant: "error" })
    }
  }

  const handleDeleteWallet = async (walletId: number) => {
    confirm({
      description: "Are you sure to delete this wallet address?",
    }).then(async () => {
      const res = await deleteWallet({ id: walletId })
      if (res.code === 200) {
        enqueueSnackbar("Delete wallet successful", { variant: "success" })
        fetchWalletList(createParams.currency)
      } else {
        enqueueSnackbar(res.msg, { variant: "error" })
      }
    })
  }

  useEffect(() => {
    fetchCoinList()
  }, [])

  return (
    <Box>
      <Backdrop open={isDeleteingWallet || isCoinListFetching} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Navigator></Navigator>
      <Box className="w-[1000px] ml-auto mr-auto mt-6 mb-10">
        <Typography variant="h5">Add New Mining Pool</Typography>
        <Stepper className="mt-3" activeStep={createParams.activeStep} orientation="vertical">
          <Step key="0" expanded>
            <StepLabel className="block">
              <Typography variant="h6" className="text-gray-400 mt-2">
                Select crypto to mining
              </Typography>
            </StepLabel>
            <StepContent>
              <Box className="ml-[350px] mt-[-35px]">
                <Box className="mb-2 grid grid-cols-2 gap-4">
                  {coinList.map((item: any, index: number) => {
                    return (
                      <Paper
                        key={`pool-${index}`}
                        onClick={() => processStepOne(item.name)}
                        className={`py-3 relative flex cursor-pointer overflow-hidden ${
                          isPoolSelected(item.name) ? "bg-gray-100 border" : "hover:bg-gray-100 "
                        }`}
                        elevation={isPoolSelected(item.name) ? 0 : 4}
                      >
                        <Box className="ml-4 py-3 flex flex-row items-center w-full">
                          <Avatar src={item.logo} sx={{ width: 50, height: 50 }}></Avatar>
                          <Typography className="ml-2" variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        {isPoolSelected(item.name) && (
                          <CheckCircleOutline className="absolute text-lg right-7 bottom-2 text-blue-500" />
                        )}
                        <Description className="absolute text-gray-500 hover:text-gray-700 text-lg right-2 bottom-2" />
                        {item.is_hot && <HotBadge badgeContent="Hot"></HotBadge>}
                      </Paper>
                    )
                  })}
                </Box>
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
                <Button
                  className="px-16 py-2 text-base"
                  variant="contained"
                  onClick={() => {
                    setCreateWalletParams({ name: "", address: "", coin_name: createParams.currency })
                    setOpenAddWallet(true)
                  }}
                >
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
                      {isWalletListFetching ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <CircularProgress color="inherit" />
                          </TableCell>
                        </TableRow>
                      ) : walletList.length > 0 ? (
                        walletList.map((wallet: any, index: number) => (
                          <TableRow key={`wallet-list-${index}`}>
                            <TableCell>
                              <Radio
                                name="select-wallet-address"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    setCreateParams({
                                      ...createParams,
                                      walletId: e.target.value,
                                      activeStep: 2,
                                    })
                                  }
                                }}
                                checked={createParams.walletId === wallet.id.toString()}
                                value={wallet.id}
                              />
                            </TableCell>
                            <TableCell>
                              {wallet.name.length > 16
                                ? wallet.name.slice(0, 8) + "..." + wallet.name.slice(-8)
                                : wallet.name}
                            </TableCell>
                            <TableCell>
                              {wallet.address.length > 16
                                ? wallet.address.slice(0, 8) + "..." + wallet.address.slice(-8)
                                : wallet.address}
                            </TableCell>
                            <TableCell>{wallet.coin_name}</TableCell>
                            <TableCell align="center">
                              <Delete
                                className="cursor-pointer hover:text-gray-500"
                                onClick={() => handleDeleteWallet(wallet.id)}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center" className="py-6">
                            <Typography variant="subtitle1">No Address Found</Typography>
                          </TableCell>
                        </TableRow>
                      )}
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
                    error={createParams.name === ""}
                    placeholder="Input a task name"
                    value={createParams.name}
                    onChange={(e) => {
                      setCreateParams({
                        ...createParams,
                        name: e.target.value,
                      })
                    }}
                  ></TextField>
                  <TextField
                    select
                    label="Cluster"
                    error={createParams.clusterId === ""}
                    placeholder="Select a cluster for mining task"
                    onChange={(e) => {
                      setCreateParams({
                        ...createParams,
                        clusterId: e.target.value,
                      })
                    }}
                  >
                    {workerList.map((c: any, index: number) => (
                      <MenuItem key={`select-cluster-${index}`} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Provider"
                    error={createParams.provider === ""}
                    placeholder="Select a mining pool provider"
                    onChange={(e) => {
                      setCreateParams({
                        ...createParams,
                        provider: e.target.value,
                      })
                      fetchServerList(Number(e.target.value))
                    }}
                  >
                    {providerList.map((p: any, index: number) => (
                      <MenuItem key={`select-provider-${index}`} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Server"
                    error={createParams.serverId === ""}
                    disabled={!createParams.currency || !createParams.provider}
                    placeholder="Select a mining pool server"
                    onChange={(e) => {
                      setCreateParams({
                        ...createParams,
                        serverId: e.target.value,
                      })
                    }}
                  >
                    {isServerListFetching ? (
                      <Box className="flex justify-center w-full">
                        <CircularProgress />
                      </Box>
                    ) : (
                      serverList.map((s: any, index: number) => (
                        <MenuItem key={`select-server-${index}`} value={s.id}>
                          {s.server}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                  <Box className="flex">
                    <FormControl className="w-full">
                      <InputLabel>Mining Application</InputLabel>
                      <Select
                        placeholder="Select a mining application for mining task"
                        label="Mining Application"
                        error={createParams.clientId === ""}
                        onChange={(e) => {
                          setCreateParams({
                            ...createParams,
                            clientId: e.target.value as string,
                          })
                        }}
                      >
                        {coinApplicationList.map((app: any, index: number) => (
                          <MenuItem key={`select-mining-application-${index}`} value={app.id}>
                            <Box className="flex flex-row justify-between items-center">{app.name}</Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      className="ml-4"
                      disabled={createParams.clientId === ""}
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
                createParams.name !== "" &&
                createParams.serverId !== "" &&
                createParams.clientId !== "" &&
                createParams.walletId !== "" &&
                createParams.clusterId !== ""
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
        <DialogActions className="justify-center pb-5">
          <Button
            className="w-[150px]"
            onClick={() => {
              setShowInputApplicationParams(false)
              setCreateParams({
                ...createParams,
                args: applicationParamsOrigin,
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
              setApplicationParamsOrigin(createParams.args)
              setShowInputApplicationParams(false)
            }}
            variant="text"
            size="large"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddWallet} fullWidth>
        <DialogTitle>New Wallet</DialogTitle>
        <DialogContent>
          <FormControl className="mt-2 w-full flex flex-col gap-y-5">
            <TextField
              label="Name"
              placeholder="Input a wallet name"
              value={createWalletParams.name}
              onChange={(e) => {
                setCreateWalletParams({ ...createWalletParams, name: e.target.value })
              }}
            ></TextField>
            <TextField
              label="Address"
              placeholder="Input a wallet address"
              value={createWalletParams.address}
              onChange={(e) => {
                setCreateWalletParams({ ...createWalletParams, address: e.target.value })
              }}
            ></TextField>
            <TextField label="Currency" value={createParams.currency} disabled></TextField>
          </FormControl>
        </DialogContent>
        <DialogActions className="justify-center pb-5">
          <Button
            className="w-[150px]"
            onClick={handleAddWallet}
            color="primary"
            variant="contained"
            size="large"
            disabled={isCreatingWallet}
          >
            {isCreatingWallet ? <CircularProgress size={26} color="inherit" /> : "OK"}
          </Button>
          <Button onClick={() => setOpenAddWallet(false)} variant="text" size="large" disabled={isCreatingWallet}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
