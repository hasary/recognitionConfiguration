import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

export function ActionIcons(props: {
  itemName: string;
  onEdit?: any;
  onDelete?: any;
  onMoveUp?: any;
  onMoveDown?: any;
}) {
  const { onEdit, onDelete, onMoveUp, onMoveDown, itemName } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <>
      {onMoveUp && (
        <Tooltip title="Move Up">
          <IconButton>
            <NorthIcon
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                onMoveUp();
              }}
              sx={{ '&:hover': { color: 'blue' } }}
            />
          </IconButton>
        </Tooltip>
      )}
      {onMoveDown && (
        <Tooltip title="Move Down">
          <IconButton>
            <SouthIcon
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                onMoveDown();
              }}
              sx={{ '&:hover': { color: 'blue' } }}
            />
          </IconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title={`Edit this ${itemName}`}>
          <IconButton>
            <EditIcon
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                onEdit();
              }}
              sx={{ '&:hover': { color: 'blue' } }}
            />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={`Delete this ${itemName}`}>
          <IconButton>
            <DeleteIcon
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setOpenDeleteDialog(true);
              }}
              sx={{ '&:hover': { color: 'blue' } }}
            />
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the {itemName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              setOpenDeleteDialog(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
