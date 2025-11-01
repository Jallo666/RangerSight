import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  setNavigationItem,
} from "../../store/slices/application/applicationSlice";
import { selectNavigation } from "../../store/slices/application/applicationSelectors";
import { motion } from "framer-motion";

export default function DockIcon({
  icon: Icon,
  label,
  onClick = () => {},
  navigation = false,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentNavigation = useSelector(selectNavigation);

  const isActive = currentNavigation?.includes(label);

  const handleClick = (event) => {
    onClick(event);
    if (navigation) {
      dispatch(setNavigationItem(label));
    }
  };

  return (
    <Tooltip title={label} arrow>
      <Box
        component={motion.div}
        whileTap={{ scale: 0.9 }}
        whileHover={!isActive ? { scale: 1.15 } : {}}
        animate={isActive ? { scale: 1.2 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            transition: "all 0.25s ease-in-out",
            color: isActive
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
            backgroundColor: isActive
              ? theme.palette.primary.main
              : "transparent",
            boxShadow: isActive
              ? `0 0 10px ${theme.palette.primary.main}`
              : "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          <Icon fontSize="medium" />
        </IconButton>
      </Box>
    </Tooltip>
  );
}
