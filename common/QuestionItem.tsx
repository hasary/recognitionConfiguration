import * as React from 'react';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Drawer, IconButton, ListItem } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import Tooltip from '@mui/material/Tooltip';
import Question, { QuestionFormat } from './interfaces/Question';
import Option from './interfaces/Question';

import { EditQuestion } from './EditQuestion';
import { EditOption } from './EditOption';

import Utils from './Utils';
import { ActionIcons } from './ActionIcons';
import { OptionItem } from './OptionItem';

export default function QuestionItem(props: {
  question: Question;
  lastDisplayOrder: number;
  firstDisplayOrder: number;
  initialExpandOptions?: boolean;
  onOrderChange: (question: Question, order: number) => void;
  onDeleteQuestion?: (question: Question) => void;
}) {
  const {
    question,
    lastDisplayOrder,
    firstDisplayOrder,
    onOrderChange,
    initialExpandOptions,
    onDeleteQuestion,
  } = props;
  const [showActions, setShowActions] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCollapse, setOpenCollapse] = React.useState(
    initialExpandOptions || false
  );
  const [openNew, setOpenNew] = React.useState(false);
  const [newOption, setNewOption] = React.useState<Option>({
    Localizations: [
      {
        cultureCode: 'en-US',
        title: ``,
        description: '',
      },
    ],
    disabled: true,
    DisplayOrder: 0,
    Options: [],
  });

  const [options, setOptions] = React.useState<Option[]>(
    question.Options ?? []
  );
  const handleAddOptionSave = (option: Option) => {
    setOptions([...(options ?? []), option]);
    setOpenNew(false);
    setOpenCollapse(true);
  };
  const handleAddOptionOpen = (event: { stopPropagation: () => void }) => {
    setNewOption({ ...newOption, DisplayOrder: options.length ?? 0 + 1 });
    //API Call AddOption or Update CBTQ
    setOpenNew(true);

    event.stopPropagation();
  };
  const handleDeleteOption: (option: Option) => void = (option: Option) => {
    //API call delete OPTION or update CBTQ
    const newOptions = options.filter((x) => x !== option) ?? [];
    setOptions(newOptions);
  };
  const handleEditQuestion = () => {
    setOpenEdit(true);
    // e.stopPropagation();
  };
  const handelMoveUp = (question: Question) => {
    onOrderChange(question, question.DisplayOrder - 1);
  };
  const handelMoveDown = (question: Question) => {
    onOrderChange(question, question.DisplayOrder + 1);
    // event.stopPropagation();
  };
  const handleOptionOrderChange = (option: Option, order: number) => {
    setOptions(Utils.ChangeOrder(options ?? [], option, order));
  };
  const handleEditQuestionSave = (editedQuestion: Question) => {
    setOpenEdit(false);
  };

  const handleDeleteQuestion = () => {
    onDeleteQuestion(question);
  };

  return (
    <>
      <ListItem
        disabled={question.disabled}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={() => setOpenCollapse(!openCollapse)}
      >
        <IconButton>
          <QuestionMarkIcon />
        </IconButton>
        <ListItemText
          primary={
            question.Localizations?.find((x) => x.cultureCode === 'en-US')
              ?.title ?? ''
          }
          secondary={`${
            question.Localizations?.find((x) => x.cultureCode === 'en-US')
              ?.description ?? ''
          } (${question.Format})`}
        />

        <Box sx={{ visibility: showActions ? 'visible' : 'hidden' }}>
          {question.Format === QuestionFormat.DropDown && (
            <Tooltip title="Add Option">
              <IconButton
                onClick={handleAddOptionOpen}
                sx={{ visibility: showActions ? 'visible' : 'hidden' }}
              >
                <AddTaskIcon sx={{ '&:hover': { color: 'blue' } }} />
              </IconButton>
            </Tooltip>
          )}

          <ActionIcons
            itemName="Question"
            onEdit={handleEditQuestion}
            onMoveUp={
              question.DisplayOrder > firstDisplayOrder &&
              (() => handelMoveUp(question))
            }
            onMoveDown={
              question.DisplayOrder < lastDisplayOrder &&
              (() => handelMoveDown(question))
            }
            onDelete={handleDeleteQuestion}
          />
        </Box>

        {question.Options && (openCollapse ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {options && (
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {options
              .sort(({ DisplayOrder: a }, { DisplayOrder: b }) => a - b)
              .map((option) => (
                <OptionItem
                  lastDisplayOrder={Math.max(
                    ...options.map((o) => o.DisplayOrder)
                  )}
                  firstDisplayOrder={Math.min(
                    ...options.map((o) => o.DisplayOrder)
                  )}
                  option={option}
                  onDelete={handleDeleteOption}
                  onOrderChange={handleOptionOrderChange}
                />
              ))}
          </List>
        </Collapse>
      )}
      <Drawer anchor="right" open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditQuestion
          questionProp={question}
          onClose={() => setOpenEdit(false)}
          onSave={handleEditQuestionSave}
        />
      </Drawer>
      <Drawer anchor="right" open={openNew}>
        <EditOption
          optionProp={newOption}
          onClose={() => setOpenNew(false)}
          onSave={handleAddOptionSave}
        />
      </Drawer>
    </>
  );
}
