import * as React from 'react';
import List from '@mui/material/List';
import {
  Button,
  Drawer,
  FormControl,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Checkbox,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { LevelItem } from './LevelItem';
import Level from '../../common/interfaces/Level';
import MockData from '../../common/MockData';
import Utils from '../../common/Utils';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { EditLevel } from '../Levels/EditLevel';
import QuestionManagement from '../../common/QuestionManagement';
import Question, { QuestionFormat } from '../../common/interfaces/Question';

export default function Levels() {
  const [model, setModel] = React.useState<Level[]>([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [enableLevelHelper, setEnableLevelHelper] = React.useState(false);
  const [enableLevelHelperInitial] = React.useState(false);

  const [newLevel, setNewLevel] = React.useState<Level>({
    Localizations: [
      {
        cultureCode: 'en-US',
        title: ``,
        description: '',
      },
    ],
    disabled: true,
    value: 0,
    DisplayOrder: 0,
    id: 0,
  });

  const handleOpenAddlevel = () => {
    setNewLevel({
      ...newLevel,
      DisplayOrder: model.length + 1,
      id: model.length + 1,
    });
    setOpenNew(true);
  };
  const handleAddLevel = (level: Level) => {
    setModel([...model, level]);
    setOpenNew(false);
  };
  const handleDeletelevel = (level: Level) => {
    //API call delete Level
    const newLevels = model.filter((x) => x !== level) as Level[];
    setModel(newLevels);
  };

  const handleOrderChange = (level: Level, order: number) => {
    const newLevels = Utils.ChangeOrder(model, level, order) as Level[];
    setModel(newLevels);
  };

  React.useEffect(() => {
    //API call load levels,
    setModel(MockData.Levels); //API call getQuestion lvlhelp
  }, []);
  const handleEnableLevelHelperChange = () => {
    //api call
    setEnableLevelHelper(!enableLevelHelper);
  };
  const handleSave = () => {
    //API Call PUT /program
  };
  const handleDiscard = () => {
    setEnableLevelHelper(enableLevelHelperInitial);
  };
  return (
    <>
      <Card>
        <CardContent>
          <List
            sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}
          >
            <ListSubheader component="div" id="nested-list-subheader">
              Recognition Levels:
              <Button
                id="basic-button"
                aria-haspopup="true"
                onClick={handleOpenAddlevel}
              >
                <AddIcon /> Add
              </Button>
            </ListSubheader>
            {model
              .sort(({ DisplayOrder: a }, { DisplayOrder: b }) => a - b)
              .map((level, index) => (
                <LevelItem
                  level={level}
                  onDelete={handleDeletelevel}
                  onOrderChange={handleOrderChange}
                  lastDisplayOrder={Math.max(
                    ...model.map((o) => o.DisplayOrder)
                  )}
                  firstDisplayOrder={Math.min(
                    ...model.map((o) => o.DisplayOrder)
                  )}
                />
              ))}
          </List>
        </CardContent>
      </Card>
      <Drawer anchor="right" open={openNew}>
        <EditLevel
          levelProp={newLevel}
          onSave={handleAddLevel}
          onClose={() => setOpenNew(false)}
        />
      </Drawer>
      <br />
      <Card>
        <CardContent>
          <List>
            <ListSubheader component="div" id="nested-list-subheader">
              Level Helper Options:
            </ListSubheader>

            <ListItem
              secondaryAction={
                <FormControl size="small">
                  <Checkbox
                    checked={enableLevelHelper}
                    onChange={handleEnableLevelHelperChange}
                  />
                </FormControl>
              }
            >
              <ListItemText
                primary="Enable Level helper"
                secondary="Show the level helper suggestion link on the levels selection step."
              />
            </ListItem>
          </List>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={enableLevelHelperInitial == enableLevelHelper}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleDiscard}>
              Discard
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <br />

      <Card>
        <CardContent>
          <QuestionManagement
            questionFormats={[QuestionFormat.DropDown, QuestionFormat.Checkbox]}
            headerText="Level Helper Questions"
            questionType="lvlhelp"
          />
        </CardContent>
      </Card>
    </>
  );
}
