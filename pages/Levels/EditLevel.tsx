import * as React from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Stack,
  FormGroup,
  Checkbox,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Level from '../../common/interfaces/Level';
import LocalizedStringInput from '../../common/LocalizedStringInput';
import { LocalizedString } from '../../common/interfaces/LocalizedString';

export function EditLevel(props: {
  levelProp: Level;
  onClose: () => void;
  onSave: (level: Level) => void;
}) {
  const { levelProp, onClose, onSave } = props;
  const [model, setModel] = React.useState<Level>(levelProp);
  const handleSave = () => {
    //API call Save Level
    levelProp.Localizations = model.Localizations;
    levelProp.value = model.value;
    levelProp.disabled = model.disabled;
    onSave(model);
  };

  const handleTextChanage = (text: LocalizedString[]) => {
    setModel({ ...model, Localizations: text });
  };
  const handlePointsChange = (event: any) => {
    setModel({ ...model, value: event.target.value });
  };
  const handleDisabledChange = () => {
    setModel({ ...model, disabled: !model.disabled });
  };

  return (
    <>
      <DialogTitle>Edit Level</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit name & points here and add more UI elements
        </DialogContentText>
        <Stack spacing={3}>
          <LocalizedStringInput
            text={model.Localizations ?? []}
            onChange={handleTextChanage}
          />
          <TextField
            autoFocus
            margin="dense"
            id="points"
            label="Points"
            type="number"
            fullWidth
            variant="standard"
            value={model.value}
            onChange={handlePointsChange}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={model.disabled}
                  onChange={handleDisabledChange}
                />
              }
              label="Disabled."
            />
          </FormGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </>
  );
}
