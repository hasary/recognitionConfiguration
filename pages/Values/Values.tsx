import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Value } from '../../common/interfaces/Value';
import MockData from '../../common/MockData';
import {
  FormControl,
  ListItem,
  ListItemText,
  Switch,
  Stack,
  Button,
  Checkbox,
  Box,
  Link,
  Card,
  CardContent,
} from '@mui/material';

export default function Values() {
  const [model, setModel] = React.useState<Value>({
    EnableValuesStep: false,
    ShowValuesDescription: false,
    EnableNestedValues: false,
  });
  const [initial, setInitial] = React.useState<Value>({
    EnableValuesStep: false,
    ShowValuesDescription: false,
    EnableNestedValues: false,
  });
  React.useEffect(() => {
    //API load CBT program
    const data = MockData.Value;
    setModel(data);
    setInitial(data);
  }, []);

  const handleEnableValuesStepChange = () => {
    setModel({ ...model, EnableValuesStep: !model.EnableValuesStep });
  };
  const handleShowValuesDescriptionChange = () => {
    setModel({ ...model, ShowValuesDescription: !model.ShowValuesDescription });
  };
  const handleEnableNestedValuesChange = () => {
    setModel({ ...model, EnableNestedValues: !model.EnableNestedValues });
  };

  const handleSave = () => {
    //API Call PUT /program
  };
  const handleDiscard = () => {
    setModel(initial);
  };

  return (
    <>
      <Card sx={{ maxWidth: '650px', bgcolor: 'background.paper' }}>
        <CardContent>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Recognition Corporate Values Options:
              </ListSubheader>
            }
          >
            <ListItem
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                    checked={model.EnableValuesStep}
                    onChange={handleEnableValuesStepChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Enable Values Step"
                secondary="Show the values step on the recognition flow."
              />
            </ListItem>

            <ListItem
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                    checked={model.ShowValuesDescription}
                    onChange={handleShowValuesDescriptionChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Show Values Description"
                secondary="Show the values description."
              />
            </ListItem>

            <ListItem
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                    checked={model.EnableNestedValues}
                    onChange={handleEnableNestedValuesChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Enable Nested Values"
                secondary="Enable Nested Values."
              />
            </ListItem>
          </List>
          <br />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={initial == model}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleDiscard}>
              Discard
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <p>
        The corporate values badges can be managed in{' '}
        <Link href="https://dev-admin.cxsrecognize.com/assets-management/cf3bc2ab-a18d-4f3f-8a22-23bd5e3ae646/feature/657/group/588">
          Badges Management{' '}
        </Link>
        .
      </p>
    </>
  );
}
