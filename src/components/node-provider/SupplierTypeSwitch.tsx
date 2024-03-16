import { useState } from "react"
import { Switch, Box, Button } from "@mui/material"
import { useProjects } from "@/contexts/projects"

interface SupplierTypeSwitchProps {
  onChange: () => void
  checked: boolean
}

const SupplierTypeSwitch: React.FC<SupplierTypeSwitchProps> = ({ onChange, checked }) => {
  const { projectList } = useProjects()

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        width: 420,
        height: 60,
        position: "relative",
        transition: "background-color 0.3s",
        backgroundColor: "action.disabledBackground",
      }}
    >
      <Box className="w-full flex justify-center">
        {projectList.map((item: any, index: number) => (
          <Button
            key={`btn-${index}`}
            size="large"
            variant="text"
            className="w-1/2 font-extrabold rounded-lg leading-8"
            onClick={onChange}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "210px",
          top: "50%",
          transform: "translateY(-50%)",
          left: checked ? "49%" : "4px", // Button animation
          transition: "left 0.3s", // Smooth slide transition
          textAlign: "center",
          fontFamily: "inherit",
          backgroundColor: "secondary.light",
          lineHeight: "3",
          borderRadius: 2,
        }}
        className="font-extrabold text-black"
      >
        {!checked ? projectList[0]?.name || "" : projectList[1]?.name || ""}
      </Box>
      <Switch
        checked={checked}
        onChange={onChange}
        sx={{
          opacity: 0,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </Box>
  )
}

export default SupplierTypeSwitch
