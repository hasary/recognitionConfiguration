import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Certificate from '../../common/interfaces/Certificate';

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Link,
  ListItemText,
  ListSubheader,
  Stack,
  Switch,
} from '@mui/material';

export default function Certificates() {
  const [model, setModel] = React.useState<Certificate>({
    mandatoryCertificate: false,
    EnableCertificateStep: false,
  });
  const [initial, setInitial] = React.useState<Certificate>({
    mandatoryCertificate: false,
    EnableCertificateStep: false,
  });
  React.useEffect(() => {
    //API call load Recipients
    const data = {
      mandatoryCertificate: false,
      EnableCertificateStep: false,
    };
    setInitial(data);
    setModel(data);
  }, []);
  const handleEnableCertificateChange = () => {
    //API call update
    setModel({
      mandatoryCertificate: false,
      EnableCertificateStep: !model.EnableCertificateStep,
    });
  };
  const handleMandatoryCertificateChange = () => {
    //API call update
    setModel({ ...model, mandatoryCertificate: !model.mandatoryCertificate });
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
              Recognition Certificate configuration:
            </ListSubheader>

            <ListItem
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                    checked={model.EnableCertificateStep}
                    onChange={handleEnableCertificateChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Enable Certificate Step"
                secondary="Show the certificate step on the recognition flow." 
              />
            </ListItem>

            <ListItem
             
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                   
                    checked={model.mandatoryCertificate}
                    onChange={handleMandatoryCertificateChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Mandatory Certificate Selection"
                secondary="The user must select a certificate before going to the next step."
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
      <p>
        The certificate template can be managed in{' '}
        <Link href="https://dev-admin.cxsrecognize.com/feature-management/cf3bc2ab-a18d-4f3f-8a22-23bd5e3ae646/feature/657/group/588">
          Feature Management{' '}
        </Link>
        .
      </p>
    </>
  );
}
