import * as React from 'react';
import List from '@mui/material/List';
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  ListItem,
  ListSubheader,
  Card,
  CardContent,
  TextField,
  Tooltip,
  Stack,
  Drawer,
} from '@mui/material';
import { Approval, ApprovalActor } from '../../common/interfaces/Approval';
import { ApprovalItem } from '../Approvals/ApprovalItem';
import MockData from '../../common/MockData';
import AddIcon from '@mui/icons-material/Add';
import EditApproval from '../Approvals/EditApproval';

export default function Approvals() {
  const [model, setModel] = React.useState<Approval[]>([]);
  const [newApproval, setNewApproval] = React.useState<Approval>({
    level: 0,
    approvalActor: ApprovalActor.Manager,
    substitueActor: ApprovalActor.NotSet,
  });
  const [openNew, setOpenNew] = React.useState<boolean>(false);
  const [ultimateApproverEmployeeId, setUltimateApproverEmployeeId] =
    React.useState<string | null>(null);
  const [
    ultimateApproverEmployeeIdInitial,
    setUltimateApproverEmployeeIdInitial,
  ] = React.useState<string | null>(null);

  const MAX_APPROVALS = 2;
  React.useEffect(() => {
    //API get approvals
    //API get program
    const data = { UltimateApproverEmployeeId: '02155' };
    setModel(MockData.Approvals);
    setUltimateApproverEmployeeId(data.UltimateApproverEmployeeId);
    setUltimateApproverEmployeeIdInitial(data.UltimateApproverEmployeeId);
  }, []);
  const handleOpenAddApproval = () => {
    setNewApproval({ ...newApproval, level: model.length + 1 });
    setOpenNew(true);
  };
  const handleAddApproval = (data: Approval) => {
    newApproval.approvalActor = data.approvalActor;
    newApproval.substitueActor = data.substitueActor;
    //API Call Crete approval
    setModel([...model, newApproval]);
    setOpenNew(false);
  };
  const handleOrderChange = (approval: Approval, order: number) => {
    debugger;
    const swapItem = model.find((x) => x.level === order) as Approval;
    swapItem.level = approval.level;
    approval.level = order;

    setModel([...model]);
  };
  const handleDeleteApproval = (approval: Approval) => {
    //api call
    setModel(model.filter((x) => x !== approval));
  };
  const handleUltimateApproverChange = (e) => {
    setUltimateApproverEmployeeId(e.target.value);
  };
  const handleSave = () => {
    //API Call PUT /program
  };
  const handleDiscard = () => {
    setUltimateApproverEmployeeId(ultimateApproverEmployeeIdInitial);
  };

  return (
    <>
      <Card>
        <CardContent>
          <List>
            <ListSubheader component="div" id="nested-list-subheader">
              Recognition Approvals:
              {` (${model.length}/${MAX_APPROVALS})`}
              <Tooltip
                title={
                  model.length < MAX_APPROVALS
                    ? 'Add Approval'
                    : 'Maximum Approvals reached'
                }
              >
                <span>
                  <Button
                    disabled={model.length === MAX_APPROVALS}
                    aria-haspopup="true"
                    onClick={handleOpenAddApproval}
                  >
                    <AddIcon /> Add
                  </Button>
                </span> 
              </Tooltip>
            </ListSubheader>

            {model
              .sort(({ level: a }, { level: b }) => a - b)
              .map((approval) => (
                <ApprovalItem
                  approval={approval}
                  lastLevel={Math.max(...model.map((o) => o.level))}
                  firstLevel={Math.min(...model.map((o) => o.level))}
                  onDeleteApproval={handleDeleteApproval}
                  onOrderChange={handleOrderChange}
                />
              ))}
          </List>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent>
          <List>
            <ListSubheader component="div" id="nested-list-subheader">
              Recognition Approvals Options:
            </ListSubheader>
            <ListItem>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  marginTop: '20px',
                }}
              >
                <FormGroup>
                  <Stack direction="row" spacing={3}>
                    <Box>Ultimate Approver</Box>
                    <Box
                      sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <FormControl size="small" sx={{ pr: 2 }}>
                        <TextField
                          id="employee-id"
                          size="small"
                          label="EmployeeId"
                          compact
                          value={ultimateApproverEmployeeId}
                          onChange={handleUltimateApproverChange}
                        />
                      </FormControl>
                    </Box>
                  </Stack>
                </FormGroup>
              </Box>
            </ListItem>
          </List>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={
                ultimateApproverEmployeeId == ultimateApproverEmployeeIdInitial
              }
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleDiscard}>
              Discard
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Drawer anchor="right" open={openNew}>
        <EditApproval
          approvalProp={newApproval}
          onClose={() => setOpenNew(false)}
          onSave={handleAddApproval}
        />
      </Drawer>
    </>
  );
}
