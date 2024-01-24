import Navigator from "@/components/node-provider/Navigator"
import { Box, Paper, Table, TableCell, TableHead, TableRow, TableContainer, TableBody } from "@mui/material"

export default function Farm() {
  const farmList = [
    {
      name: "VWAqwvki",
      cluster: "ClusterA",
      currency: "XMR",
      provider: "Provider2",
      application: "Application2",
      walletName: "YblPxqsZ",
      walletAddress: "TpcvNbtsVflJPU2jnrHp3CEBU5Xa5vl6XCFvvtNaUC",
      blockExplorer: "Explorer3",
    },
    {
      name: "plIyyfIE",
      cluster: "ClusterC",
      currency: "BTC",
      provider: "Provider1",
      application: "Application1",
      walletName: "flPXHTiG",
      walletAddress: "Cs8v2lk8LWkqTaZj77NKweELlSZSXGN5RVFTE7AkZv",
      blockExplorer: "Explorer3",
    },
    {
      name: "oQweYjhT",
      cluster: "ClusterA",
      currency: "ETH",
      provider: "Provider1",
      application: "Application2",
      walletName: "aBSpGZTw",
      walletAddress: "Ps9pZLRPOHVnqZXoW8bNOHyBlJjhyiJraDp5J4wS7H",
      blockExplorer: "Explorer1",
    },
    {
      name: "ztOPnbob",
      cluster: "ClusterB",
      currency: "BTC",
      provider: "Provider1",
      application: "Application3",
      walletName: "KLVKYiDN",
      walletAddress: "w5VVjjnrpFvKUiBVPfDLXGi2CdMWeQ80cw5lWZadDX",
      blockExplorer: "Explorer1",
    },
    {
      name: "MWEeqyDu",
      cluster: "ClusterA",
      currency: "XMR",
      provider: "Provider2",
      application: "Application2",
      walletName: "zMHyRnZw",
      walletAddress: "7nEyl4IHhmSajm9dHzqQwoZ4SBNhRrnLg8YGEQOOir",
      blockExplorer: "Explorer3",
    },
    {
      name: "jspwLzXY",
      cluster: "ClusterA",
      currency: "XMR",
      provider: "Provider1",
      application: "Application2",
      walletName: "qMbIxoxp",
      walletAddress: "gf5u3KZhXN7yihJwIcHAEPbBZQsE3ig2w9HMJ5pIFA",
      blockExplorer: "Explorer3",
    },
    {
      name: "gfWQWDVc",
      cluster: "ClusterB",
      currency: "BTC",
      provider: "Provider3",
      application: "Application1",
      walletName: "pLnjqybf",
      walletAddress: "1cGfWvykmzmdN7XjDupM2vcHPv5rpksmII2uHBOq9u",
      blockExplorer: "Explorer2",
    },
    {
      name: "JKqcSOZH",
      cluster: "ClusterA",
      currency: "XMR",
      provider: "Provider3",
      application: "Application1",
      walletName: "yrIhHYCB",
      walletAddress: "YfMZrjVEyMhL2tvn68MhCXoHZFM4eAAc5LMrRTHHBU",
      blockExplorer: "Explorer3",
    },
    {
      name: "puaSVMXU",
      cluster: "ClusterC",
      currency: "XMR",
      provider: "Provider2",
      application: "Application2",
      walletName: "RlPJwTsL",
      walletAddress: "BJMBR1du0hSddxhkfh5gxDI8StFMRkWXWHHu3Uy9fY",
      blockExplorer: "Explorer2",
    },
  ]

  return (
    <Box>
      <Navigator></Navigator>
      <Box className="mt-10 px-5">
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Cluster</TableCell>
                <TableCell className="font-bold">Currency</TableCell>
                <TableCell className="font-bold">Provider</TableCell>
                <TableCell className="font-bold">Application</TableCell>
                <TableCell className="font-bold">Wallet Name</TableCell>
                <TableCell className="font-bold">Wallet Address</TableCell>
                <TableCell className="font-bold">Block Explorer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farmList.map((farm, index) => (
                <TableRow key={`farm-${index}`}>
                  <TableCell>{farm.name}</TableCell>
                  <TableCell>{farm.cluster}</TableCell>
                  <TableCell>{farm.currency}</TableCell>
                  <TableCell>{farm.provider}</TableCell>
                  <TableCell>{farm.application}</TableCell>
                  <TableCell>{farm.walletName}</TableCell>
                  <TableCell>{farm.walletAddress}</TableCell>
                  <TableCell>{farm.blockExplorer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
