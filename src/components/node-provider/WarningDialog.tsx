import { WarningAmberOutlined } from "@mui/icons-material"
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
        <Button variant="outlined" color="error" onClick={props.onOk}>
          {props.okText || "OK"}
        </Button>
        <Button variant="text" onClick={props.onCancel}>
          {props.cancelText || "CANCEL"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
