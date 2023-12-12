import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import QuestionItem from './QuestionItem';
import Question, {
  LevelHelperQuestion,
  QuestionFormat,
} from './interfaces/Question';

import Utils from './Utils';
import { Button, Menu, MenuItem, Tooltip, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditQuestion } from './EditQuestion';
import MockData from './MockData';

export default function QuestionManagement(props: {
  questionType: string;
  headerText: string;
  maxQuestions?: number;

  questionFormats: QuestionFormat[];
}) {
  const { headerText, maxQuestions, questionFormats, questionType } = props;
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const openAddMenu = Boolean(anchorEl);
  const handleClickAddMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [newQuestion, setNewQuestion] = React.useState<Question>({
    Type: questionType,
    Format: QuestionFormat.Text,
    disabled: true,
    DisplayOrder: 0,
    Localizations: [],
    Options: [],
  });

  const handleClickAddMenuItem = (format: QuestionFormat) => {
    setNewQuestion({
      ...newQuestion,
      Format: format,
      DisplayOrder: Math.max(...questions.map((o) => o.DisplayOrder)) + 1,
    });
    setOpenDrawer(true);
    setAnchorEl(null);
  };
  const handleAddQuestionSave = (question: Question) => {
    //API call Create Question

    setQuestions([...questions, question]);
    setOpenDrawer(false);
  };
  const handleOrderChange = (question: Question, order: number) => {
    //API call Edit question
    setQuestions(Utils.ChangeOrder(questions, question, order));
  };
  const handleDeleteQuestion: (question: Question) => void = (
    question: Question
  ) => {
    //API Call Delete question
    let newQuestions = questions.filter((x) => x !== question);

    setQuestions(newQuestions);
  };
  /******************************************************* useEffects */
  React.useEffect(() => {
    //API fetch Questions of type: questionType

    setQuestions(MockData.Questions[questionType]);
  }, []);

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {headerText}:{' '}
            {maxQuestions && `(${questions.length}/${maxQuestions})`}
            <Tooltip
              title={
                maxQuestions && questions.length < maxQuestions
                  ? 'Add Question'
                  : 'Maximum Questions reached'
              }
            >
              <span>
                <Button
                  id="basic-button"
                  disabled={maxQuestions && questions.length === maxQuestions}
                  aria-controls={openAddMenu ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAddMenu ? 'true' : undefined}
                  onClick={handleClickAddMenu}
                >
                  <AddIcon /> Add
                </Button>
              </span>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openAddMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {questionFormats.map((qt: QuestionFormat) => (
                <MenuItem onClick={() => handleClickAddMenuItem(qt)}>
                  {qt.toString()} Question
                </MenuItem>
              ))}
            </Menu>
          </ListSubheader>
        }
      >
        {questions.length &&
          questions
            .sort(({ DisplayOrder: a }, { DisplayOrder: b }) => a - b)
            .map((question) => (
              <QuestionItem
                question={question}
                lastDisplayOrder={Math.max(
                  ...questions.map((o) => o.DisplayOrder)
                )}
                firstDisplayOrder={Math.min(
                  ...questions.map((o) => o.DisplayOrder)
                )}
                onOrderChange={handleOrderChange}
                onDeleteQuestion={handleDeleteQuestion}
              />
            ))}
      </List>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <EditQuestion
          onClose={() => setOpenDrawer(false)}
          onSave={handleAddQuestionSave}
          questionProp={newQuestion}
        />
      </Drawer>
    </>
  );
}
