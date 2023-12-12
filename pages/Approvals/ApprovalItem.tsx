import * as React from 'react';

import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Approval,
  ApprovalActor,
  ApprovalLevelIcon,
} from '../../common/interfaces/Approval';
import EditApproval from '../Approvals/EditApproval';
import { ActionIcons } from '../../common/ActionIcons';

export function ApprovalItem(props: {
  approval: Approval;
  onDeleteApproval: (approval: Approval) => void;
  onOrderChange: (approval: Approval, level: number) => void;
  lastLevel: number;
  firstLevel:number;
}) {
  const { approval, onDeleteApproval, lastLevel,firstLevel, onOrderChange } = props;
  const [showActions, setShowActions] = React.useState(false);
  const [opeEdit, setOpenEdit] = React.useState(false);
  const handleEditSave = (model: Approval) => {
    approval.level = model.level;
    approval.approvalActor = model.approvalActor;
    approval.substitueActor = model.substitueActor;
    //AiP call update approval
    setOpenEdit(false);
  };
  const handelMoveUp = (approval: Approval) => {
    onOrderChange(approval, approval.level - 1);
  };
  const handelMoveDown = (approval: Approval) => {
    onOrderChange(approval, approval.level + 1);
  };
  return ( 
    <>
      <ListItem
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        key={approval.level}
        secondaryAction={
          showActions && (
            <ActionIcons
              itemName="Approval"
              onEdit={() => {
                setOpenEdit(true);
              }}
              onDelete={() => onDeleteApproval(approval)}
              onMoveUp={approval.level > firstLevel && (() => handelMoveUp(approval))}
              onMoveDown={
                approval.level < lastLevel && (() => handelMoveDown(approval))
              }
            />
          )
        }
      >
        <IconButton aria-label="delete">
          {ApprovalLevelIcon[approval.level]}
        </IconButton>

        <ListItemText
          primary={`Actor: ${approval.approvalActor}`}
          secondary={`Substitue: ${approval.substitueActor}`}
        />
      </ListItem>
      <Drawer anchor="right" open={opeEdit}>
        <EditApproval
          approvalProp={approval}
          onClose={() => setOpenEdit(false)}
          onSave={handleEditSave}
        />
      </Drawer>
    </>
  );
}
