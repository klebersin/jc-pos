import { Autocomplete, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MONTHLY_PAYMENT_TYPES, SERVICES_TYPES } from "../../constants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Invoice = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box mt={2}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {Object.keys(SERVICES_TYPES).map((key) => (
              <Tab label={SERVICES_TYPES[key].label} />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Object.keys(MONTHLY_PAYMENT_TYPES).map(
              (key) => MONTHLY_PAYMENT_TYPES[key]
            )}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Invoice;
