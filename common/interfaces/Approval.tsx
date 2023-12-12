import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import * as React from 'react';
export interface Approval {
  level: number;
  approvalActor: ApprovalActor;
  substitueActor: ApprovalActor;
}

export enum ApprovalActor {
  NotSet = 'No Set',
  Manager = "Recipient's Manager",
  ManagerManager = "Recipient's Manager +1",
}

export const ApprovalLevelIcon = [
  <BrowserNotSupportedIcon />,
  <LooksOneIcon />,
  <LooksTwoIcon />,
];
