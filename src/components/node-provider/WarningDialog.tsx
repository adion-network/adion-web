import { WarningAmberOutlined } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography } from "@mui/material"
import { ReactNode } from "react"

export default function WarningDialog(props: {
  onOk: () => void
  title: ReactNode
  description: ReactNode
  open: boolean
  okText?: string
  cancelText?: string
  onCancel: () => void
  okLoading?: boolean
}) {
  return (
    <Dialog open={props.open} maxWidth="md">
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Box className="flex items-center space-x-2">
          <WarningAmberOutlined color="error"></WarningAmberOutlined>
          <Typography>{props.description}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={props.okLoading} variant="outlined" color="error" onClick={props.onOk}>
          {props.okText || "OK"}
        </LoadingButton>
        <Button variant="text" onClick={props.onCancel}>
          {props.cancelText || "CANCEL"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
