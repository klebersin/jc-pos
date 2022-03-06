import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { SERVICES_TYPES } from "../../constants";
import MonthlyPayment from "./MonthlyPayment";
import Registration from "./Registration";

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

const Invoice = ({ setItems, items }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ p: 2, border: 1 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            {Object.keys(SERVICES_TYPES).map((key) => (
              <Tab
                label={SERVICES_TYPES[key].label}
                disabled={
                  SERVICES_TYPES[key].value === SERVICES_TYPES.PRODUCTS.value
                }
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Registration items={items} setItems={setItems} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MonthlyPayment items={items} setItems={setItems} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Coming soon
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Invoice;
