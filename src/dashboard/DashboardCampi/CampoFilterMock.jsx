import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function CampoFilterDynamic({ fields = [] }) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({});

  const handleConfirm = () => {
    setOpen(false);
    console.log("Filtri confermati:", formState);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.name}
            label={field.label}
            variant="outlined"
            size="small"
            fullWidth
            value={formState[field.name] || ""}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))
            }
          />
        );
      case "checkbox-group":
        return (
          <Box key={field.name} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2">{field.label}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {field.options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  control={
                    <Checkbox
                      checked={formState[field.name]?.[opt.value] || false}
                      onChange={() =>
                        setFormState((prev) => ({
                          ...prev,
                          [field.name]: {
                            ...prev[field.name],
                            [opt.value]: !prev[field.name]?.[opt.value],
                          },
                        }))
                      }
                    />
                  }
                  label={opt.label}
                />
              ))}
            </Box>
          </Box>
        );
      case "select":
        return (
          <TextField
            key={field.name}
            label={field.label}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={formState[field.name] || ""}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))
            }
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </TextField>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "sticky",
          top: 8,
          right: 16,
          display: "flex",
          justifyContent: "flex-end",
          zIndex: 10,
        }}
      >
        <Tooltip title="Filtri" arrow>
          <Button
            startIcon={<FilterListIcon />}
            size="small"
            variant="outlined"
            onClick={() => setOpen(!open)}
          >
            Filtri
          </Button>
        </Tooltip>
      </Box>

      {open && (
        <Box
          sx={{
            position: "absolute",
            top: 40,
            right: 0,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
            zIndex: 20,
            boxShadow: 3,
          }}
        >
          {fields.map((field, index) => (
            <Box key={field.name}>
              {renderField(field)}
              {index < fields.length - 1 && <Divider sx={{ mt: 1, mb: 1 }} />}
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" size="small" onClick={handleConfirm}>
              Conferma
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
