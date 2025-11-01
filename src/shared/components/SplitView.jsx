import React, { useState } from "react";
import { Box, Typography, List, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { selectDeviceType } from "../../store/slices/application/applicationSelectors";

export default function SplitView({
  title = "Lista elementi",
  items = [],
  groupBy = null,
  renderItem,
  renderDetail,
  width = 400,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const deviceType = useSelector(selectDeviceType);
  const isMobile = deviceType === "mobile";

  const groupedItems = groupBy
    ? items.reduce((acc, item) => {
        const key = groupBy(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {})
    : { Tutti: items };

  if (isMobile) {
    return (
      <Box sx={{ height: "100vh", overflowY: "auto", p: 2 }}>
        {!selectedItem ? (
          <>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                borderBottom: 1,
                borderColor: "divider",
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>

            {Object.entries(groupedItems).map(([groupName, groupItems]) => (
              <Box key={groupName}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "text.secondary", mb: 1, mt: 2 }}
                >
                  {groupName}
                </Typography>
                <List disablePadding>
                  {groupItems.map((item, index) =>
                    renderItem(item, selectedItem, setSelectedItem, index === groupItems.length - 1)
                  )}
                </List>
              </Box>
            ))}
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton onClick={() => setSelectedItem(null)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 1 }}>
                {title}
              </Typography>
            </Box>
            {renderDetail(selectedItem)}
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", minHeight: 0 }}>
      <Box
        sx={{
          width,
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {Object.entries(groupedItems).map(([groupName, groupItems]) => (
            <Box key={groupName}>
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  bgcolor: "background.default",
                  p: 1.4,
                  borderBottom: 1,
                  borderColor: "divider",
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "text.secondary" }}
                >
                  {groupName}
                </Typography>
              </Box>

              <List disablePadding>
                {groupItems.map((item, index) =>
                  renderItem(item, selectedItem, setSelectedItem, index === groupItems.length - 1)
                )}
              </List>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
        {selectedItem ? (
          renderDetail(selectedItem)
        ) : (
          <Typography variant="h5" color="text.secondary">
            Seleziona un elemento dalla lista
          </Typography>
        )}
      </Box>
    </Box>
  );
}
