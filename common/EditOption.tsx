import * as React from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Option from './interfaces/Question';
import LocalizedStringInput from './LocalizedStringInput';
import { LocalizedString } from './interfaces/LocalizedString';
import Utils from './Utils';

export function EditOption(props: {
  optionProp: Option;
  onClose: () => void;
  onSave: (option: Option) => void;
}) {
  const { optionProp, onClose, onSave } = props;
  const [option, setOption] = React.useState<Option>(optionProp);
  const handleSave = () => {
    //Api call Edit/Create CBTQ Option
    optionProp.Localizations = option.Localizations;
    optionProp.disabled = option.disabled;
    optionProp.score = option.score;
    onSave(option);
  };
  const handleTextChange = (text: LocalizedString[]) => {
    setOption({ ...option, Localizations: [...text] });
  };
  const handleDisabledOption = () => {
    setOption({ ...option, disabled: !option.disabled });
  };
  const handleOptionWieghtChange = (e: any) => {
    setOption({ ...option, score: +e.target.value });
  };
  return (
    <>
      <DialogTitle>Edit Option</DialogTitle>
      <DialogContent sx={{ width: 450 }}>
        <DialogContentText>Localized Text</DialogContentText>
        <LocalizedStringInput
          text={option.Localizations ?? []}
          onChange={handleTextChange}
        />
        <FormGroup>
          {option.score && (
            <Stack spacing={2} direction={'row'}>
              <Box sx={{ pt: 1, pl: 3, width: 70 }}>Score</Box>
              <FormControl sx={{ pr: 2 }}>
                <TextField
                  size="small"
                  compat
                  value={option.score}
                  onChange={handleOptionWieghtChange}
                />
              </FormControl>
            </Stack>
          )}
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={option.disabled}
                onChange={handleDisabledOption}
              />
            }
            label=" Disabled."
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      {/* {Utils.Debug(option)} */}
    </>
  );
}
