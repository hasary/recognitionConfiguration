import * as React from 'react';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Tooltip from '@mui/material/Tooltip';

import QuestionItem from './QuestionItem';
import Option, { QuestionFormat } from './interfaces/Question';
import { EditOption } from './EditOption';

import QuizIcon from '@mui/icons-material/Quiz';
import { ActionIcons } from './ActionIcons';
import Question from './interfaces/Question';
import { Box, Drawer, IconButton, ListItem, ListItemIcon } from '@mui/material';
import { EditQuestion } from './EditQuestion';

export function OptionItem(props: {
  option: Option;
  lastDisplayOrder: number;
  firstDisplayOrder: number;
  onOrderChange: (option: Option, order: number) => void;
  onDelete?: (option: Option) => void;
}) {
  const { option, onOrderChange, lastDisplayOrder, firstDisplayOrder, onDelete } = props;
  const [showActions, setShowActions] = React.useState(false);
  const [openExpand, setOpenExpand] = React.useState(false);
  const [openSubQuestion, setOpenSubQuestion] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handelMoveUp = (option: Option) => {
    onOrderChange(option, option.DisplayOrder - 1);
  };
  const [subQuestion, setSubQuestion] = React.useState<Question>(
    option.SubQuestion
  );
  const handelMoveDown = (option: Option) => {
    onOrderChange(option, option.DisplayOrder + 1);
  };
  const handleEditOptionSave = (option: Option) => {
    setOpenEdit(false);
  };
  const handleAddSubQuestionOpen = () => {
    setSubQuestion({
      Format: QuestionFormat.Text,
      DisplayOrder: 1,
      Localizations: [
        {
          cultureCode: 'en-US',
          title: `Value Sub Question  `,
          description: 'New question description',
        },
        {
          cultureCode: 'fr-CA',
          title: 'Nouvelle Question Valeur ?',
          description: 'Déscription pour Nouvelle Question',
        },
      ],
      Options: [],
    });
    setOpenSubQuestion(true);
  };
  const handleAddSubQuestionSave = () => {
    option.SubQuestion = subQuestion;
    setOpenSubQuestion(false);
  };
  const handleDeleteOption = () => {
    onDelete(option);
  };
  return (
    <>
      <ListItem
        disabled={option.disabled}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={() => setOpenExpand(!openExpand)}
        sx={{ pl: 6 }}
      >
        <ListItemIcon>
          <TaskAltIcon />
        </ListItemIcon>
        <ListItemText
          sx={{ width: 200 }}
          primary={
            option.Localizations?.find((x) => x.cultureCode === 'en-US')
              ?.title ?? ''
          }
          secondary={
            option.Localizations?.find((x) => x.cultureCode === 'en-US')
              ?.description ?? ''
          }
        />

        <Box sx={{ visibility: showActions ? 'visible' : 'hidden' }}>
          {!subQuestion && (
            <Tooltip title="Add a Sub Question">
              <IconButton
                onClick={handleAddSubQuestionOpen}
                sx={{ visibility: showActions ? 'visible' : 'hidden' }}
              >
                <QuizIcon sx={{ '&:hover': { color: 'blue' } }} />
              </IconButton>
            </Tooltip>
          )}

          <ActionIcons
            itemName="Option"
            onEdit={() => {
              setOpenEdit(true);
            }}
            onMoveUp={
              option.DisplayOrder > firstDisplayOrder &&
              (() => handelMoveUp(option))
            }
            onMoveDown={
              option.DisplayOrder < lastDisplayOrder &&
              (() => handelMoveDown(option))
            }
            onDelete={handleDeleteOption}
          />
        </Box>

        {subQuestion && (openExpand ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {subQuestion && (
        <Collapse in={openExpand} timeout="auto" unmountOnExit>
          <List sx={{ pl: 8 }} component="div" disablePadding>
            <QuestionItem
              question={subQuestion}
              firstDisplayOrder={1}
              lastDisplayOrder={1}
              onOrderChange={() => {}}
            />
          </List>
        </Collapse>
      )}

      <Drawer anchor="right" open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditOption
          optionProp={option}
          onClose={() => setOpenEdit(false)}
          onSave={handleEditOptionSave}
        />
      </Drawer>
      <Drawer
        open={openSubQuestion}
        anchor="right"
        onClose={() => setOpenSubQuestion(false)}
      >
        <EditQuestion
          questionProp={subQuestion}
          onClose={() => setOpenSubQuestion(false)}
          onSave={handleAddSubQuestionSave}
        />
      </Drawer>
    </>
  );
}
