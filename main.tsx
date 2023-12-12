import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import Participants from './pages/Participants/Participants';
import RecognitionForm from './pages/RecognitionForm/RecognitionForm';
import Levels from './pages/Levels/Levels';
import Values from './pages/Values/Values';
import Ecards from './pages/Ecards/Ecards';
import Certificates from './pages/Certificates/Certificates';
import Approvals from './pages/Approvals/Approvals';
import { a11yProps, CustomTabPanel } from './common/CustomTabs';

export default function Main() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Main configiration tabs"
        >
          <Tab label="Participants" {...a11yProps(0)} />
          <Tab label="Recognition Form" {...a11yProps(1)} />
          <Tab label="Levels" {...a11yProps(2)} />
          <Tab label="Values" {...a11yProps(3)} />
          <Tab label="Ecards" {...a11yProps(4)} />
          <Tab label="Certificates" {...a11yProps(5)} />
          <Tab label="Approvals" {...a11yProps(6)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Participants />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <RecognitionForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Levels />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Values />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Ecards />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Certificates />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Approvals />
      </CustomTabPanel>
    </Box>
  );
}
