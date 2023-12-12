import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {
  Box,
  FormControl,
  ListItemText,
  ListSubheader,
  Switch,Checkbox,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import { Ecard } from '../../common/interfaces/Ecard';
import Utils from '../../common/Utils';

export default function Ecards() {
  const [model, setModel] = React.useState<Ecard>({
    MandatoryEcard: false,
    EnableEcardStep: false,
  });
  const [initial, setInitial] = React.useState<Ecard>({
    MandatoryEcard: false,
    EnableEcardStep: false,
  });
  React.useEffect(() => {
    //API call GET Program
    const data = {
      MandatoryEcard: false,
      EnableEcardStep: false,
    };
    setModel(data);
    setInitial(data);
  }, []);
  const handleEnableEcardStepChange = () => {
    //API call update
    setModel({
      MandatoryEcard: false,
      EnableEcardStep: !model.EnableEcardStep,
    });
  };

  const handleMandatoryEcardChange = () => {
    //API call update
    setModel({ ...model, MandatoryEcard: !model.MandatoryEcard });
  };
  const handleSave = () => {
    //API Call PUT /program
  };
  const handleDiscard = () => {
    setModel(initial);
  };

  return (
    <>
      <Card sx={{ maxWidth: '650px' }}>
        <CardContent>
          <List>
            <ListSubheader component="div" id="nested-list-subheader">
              Recognition Ecards configuration:
            </ListSubheader>

            <ListItem
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                    checked={model.EnableEcardStep}
                    onChange={handleEnableEcardStepChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Enable Ecard Step"
                secondary="Show the ecard step on the recognition flow."
              />
            </ListItem>

            <ListItem
             
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                   
                    checked={model.MandatoryEcard}
                    onChange={handleMandatoryEcardChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Mandatory Ecard Selection"
                secondary="The user must select an Ecard before going to the next step."
              />
            </ListItem>
          </List>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={ initial == model}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleDiscard}>
              Discard
            </Button>
          </Stack>
        </CardContent>
      </Card>
     
    </>
   
  );
}
