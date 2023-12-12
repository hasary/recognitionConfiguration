import * as React from 'react';

import {
  Box,
  Button,
  FormControl,
  Stack,
  MenuItem,
  Select,
  List,
  ListSubheader,
  ListItem,
} from '@mui/material';
import { Approval, ApprovalActor } from '../../common/interfaces/Approval';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditApproval(props: {
  approvalProp: Approval;
  onClose: () => void;
  onSave: (approval: Approval) => void;
}) {
  const { approvalProp, onClose, onSave } = props;
  const [model, setModel] = React.useState<Approval>(approvalProp);
  const handleApprovalActorChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setModel({ ...model, approvalActor: value });
  };
  const handleApprovalSubstitueActorChange = (e: {
    target: { value: any };
  }) => {
    const value = e.target.value;
    setModel({ ...model, substitueActor: value });
  };

  return (
    <>
      <DialogTitle>Edit Approval</DialogTitle>
      <DialogContent sx={{ width: 450 }}>
        <List>
          <ListSubheader component="div" id="nested-list-subheader">
            Setup Actors:
          </ListSubheader>

          <ListItem>
            <Stack direction="column" spacing={2}>
              <Stack sx={{ pl: 1 }} direction="row" spacing={7}>
                <Box sx={{ pt: 1 }}>Approval Actor</Box>
                <FormControl size="small">
                  <Select
                    size="small"
                    value={model.approvalActor}
                    onChange={handleApprovalActorChange}
                  >
                    <MenuItem value={ApprovalActor.Manager}>
                      Recipient's manager
                    </MenuItem>
                    <MenuItem value={ApprovalActor.ManagerManager}>
                      Recipient's manager + 1
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack sx={{ pl: 1 }} direction="row" spacing={7}>
                <Box sx={{ pt: 1 }}>Substitue Actor</Box>
                <FormControl size="small">
                  <Select
                    size="small"
                    value={model.substitueActor}
                    onChange={handleApprovalSubstitueActorChange}
                  >
                    <MenuItem value={ApprovalActor.NotSet}>Disable</MenuItem>
                    <MenuItem value={ApprovalActor.Manager}>
                      Recipient's manager
                    </MenuItem>
                    <MenuItem value={ApprovalActor.ManagerManager}>
                      Recipient's manager + 1
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(model)}>Save</Button>
      </DialogActions>
    </>
  );
}
