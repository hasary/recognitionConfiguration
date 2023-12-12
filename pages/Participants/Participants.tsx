import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

import Participant, {
  EligibilityToSend,
  EligibileForAward,
} from '../../common/interfaces/Participant';
import MockData from '../../common/MockData';

export default function Participants() {
  const defaultModel = {
    maxRecipients: 0,
    eligibilityToSend: EligibilityToSend.AllUsers,
    eligibleForAward: EligibileForAward.AllUsers,
    dupplicateValidationDays: 0,
    supportOptionalCCs: false,
    supportAutoCCs: false,
    supportPublicPost: false,
  };
  const [model, setModel] = React.useState<Participant>(defaultModel);
  const [initialModel, setInitialModel] =
    React.useState<Participant>(defaultModel);

  React.useEffect(() => {
    //API call load Recipients

    const data: Participant = MockData.Participant;
    setInitialModel(data);
    setModel(data);
  }, []);

  const handleMaxRecipientChange = (e: { target: { value: any } }) => {
    const value = +e.target.value;
    if (value < 1 || value > 20) {
      return;
    }
    //API call update
    setModel({ ...model, maxRecipients: value });
  };

  const handleEligibilityToSendChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    const payload = { ...model, eligibilityToSend: value };
    //API call update
    const data = payload; // axios.response.data
    setModel(data);
  };
  const handleEligibleForAwardChange = (e: { target: { value: any } }) => {
    //API call update
    const value = e.target.value;
    setModel({ ...model, eligibleForAward: value });
  };
  const handleDupplicateValidationDaysChange = (e: {
    target: { value: any };
  }) => {
    const value = e.target.value;
    if (value < 1 || value > 30) {
      return;
    }
    //API call update
    setModel({ ...model, dupplicateValidationDays: value });
  };
  const handleSupportAutoCCsChange = () => {
    //API call update
    setModel({ ...model, supportAutoCCs: !model.supportAutoCCs });
  };
  const handleSupportOptionalCCs = () => {
    //API call update
    setModel({ ...model, supportOptionalCCs: !model.supportOptionalCCs });
  };
  const handleSupportPublicPostChange = () => {
    
    setModel({ ...model, supportPublicPost: !model.supportPublicPost });
  };

  const handleSave = () => {
    //API Call PUT /program
  };
  const handleDiscard = () => {
    setModel(initialModel);
  };
  const handleDirectReportOnyChange = () => {
    setModel({ ...model, directReportOnly: !model.directReportOnly });
  };

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          Recipient Filtering:
        </ListSubheader>

        <ListItem>
          <Box sx={{ width: 200 }}>Maximum Recipients</Box>
          <FormControl size="small" sx={{ width: 200 }}>
            <TextField
              id="outlined-number"
              type="number"
              size="small"
              compact
              InputLabelProps={{
                shrink: true,
              }}
              value={model.maxRecipients}
              onChange={handleMaxRecipientChange}
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <Box sx={{ width: 200 }}>Eligibility To Send</Box>

          <FormControl size="small" sx={{ width: 200 }}>
            <Select
              compact
              value={model.eligibilityToSend}
              onChange={handleEligibilityToSendChange}
            >
              <MenuItem value={EligibilityToSend.AllUsers}>All Users</MenuItem>
              <MenuItem value={EligibilityToSend.ManagerOnly}>
                Manager Only
              </MenuItem>
              <MenuItem value={EligibilityToSend.BasedOnDbTeam}>
                Based on DB Team
              </MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <Box sx={{ pt: 1, width: 200 }}>Eligible For Award</Box>
          <FormControl size="small" sx={{ width: 200 }}>
            <Select
              compact
              value={model.eligibleForAward}
              onChange={handleEligibleForAwardChange}
            >
              <MenuItem value={EligibileForAward.AllUsers}>All Users</MenuItem>

              <MenuItem value={EligibilityToSend.BasedOnDbTeam}>
                Based on DB Team
              </MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <Box sx={{ width: 200 }}>Duplicate Validation</Box>
          <FormControl sx={{ width: 200 }} size="small">
            <TextField
              id="outlined-number"
              type="number"
              size="small"
              compact
              InputLabelProps={{
                shrink: true,
              }}
              value={model.dupplicateValidationDays}
              onChange={handleDupplicateValidationDaysChange}
            />
          </FormControl>
          <Box sx={{ pl: 1 }}>(Days)</Box>
        </ListItem>
   
        <ListItem
          secondaryAction={
            <FormControl size="small">
              <Checkbox
                checked={model.directReportOnly}
                onChange={handleDirectReportOnyChange}
              />
            </FormControl>
          }
        >
          <ListItemText
            primary="Direct Report Only"
            secondary="Restrict recipients to sender direct reports only."
          />
        </ListItem>
        <br />
        <Divider />
        <ListSubheader component="div" id="nested-list-subheader">
          CC & Sharing:
        </ListSubheader>
        <ListItem
          secondaryAction={
            <FormControl size="small">
              <Checkbox
                checked={model.supportOptionalCCs}
                onChange={handleSupportOptionalCCs}
              />
            </FormControl>
          }
        >
          <ListItemText
            primary="Support Optional CCs"
            secondary="The user can add CCs employees or leave it empty."
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <FormControl size="small">
              <Checkbox
                checked={model.supportAutoCCs}
                onChange={handleSupportAutoCCsChange}
              />
            </FormControl>
          }
        >
          <ListItemText
            primary="Support Auto CCs"
            secondary="The recipient's manager will be added as CC."
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <FormControl size="small">
              <Checkbox
                checked={model.supportPublicPost}
                onChange={handleSupportPublicPostChange}
              />
            </FormControl>
          }
        >
          <ListItemText
            primary="Support Public Post"
            secondary="Show the recognition on public newsfeed."
          />
        </ListItem>
      </List>
      <br />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={initialModel == model}
        >
          Save
        </Button>
        <Button variant="outlined" onClick={handleDiscard}>
          Discard
        </Button>
      </Stack>
    </Box>
  );
}
