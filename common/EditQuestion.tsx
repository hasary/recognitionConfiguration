import * as React from 'react';
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Question from './interfaces/Question';
import LocalizedStringInput from './LocalizedStringInput';
import { LocalizedString } from './interfaces/LocalizedString';

export function EditQuestion(props: {
  questionProp: Question;

  onClose: () => void;
  onSave: (question: Question) => void;
}) {
  const { questionProp, onClose, onSave } = props;

  const [question, setQuestion] = React.useState<Question>(questionProp ?? {});
  const handleSave = () => {
    //Api call Edit CBTQ
    questionProp.Localizations = question.Localizations;
    questionProp.disabled = question.disabled;
    onSave(question);
  };
  const handleTextChange = (text: LocalizedString[]) => {
    setQuestion({ ...question, Localizations: [...text] });
  };
  const handleDisabledQuestion = () => {
    setQuestion({ ...question, disabled: !question.disabled });
  };
  return (
    <>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent sx={{ width: 450 }}>
        <DialogContentText>Localized Text</DialogContentText>
        <LocalizedStringInput
          text={question.Localizations ?? []}
          onChange={handleTextChange}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={question.disabled}
                onChange={handleDisabledQuestion}
              />
            }
            label=" Disabled"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </>
  );
}
