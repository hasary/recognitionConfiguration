import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Drawer } from '@mui/material';
import Level from '../../common/interfaces/Level';
import { EditLevel } from '../Levels/EditLevel';
import { ActionIcons } from '../../common/ActionIcons';

export function LevelItem(props: {
  level: Level;
  lastDisplayOrder: number;
  firstDisplayOrder:number;
  onDelete: (level: Level) => void;
  onOrderChange: (level: Level, order: number) => void;
}) {
  const { level, onOrderChange, lastDisplayOrder,firstDisplayOrder } = props;
  const [edit, setOpenEdit] = React.useState(false);
  const [showActions, setShowActions] = React.useState(false);
  const handelMoveUp = (level: Level) => {
    onOrderChange(level, level.DisplayOrder - 1);
  };

  const handelMoveDown = (level: Level) => {
    onOrderChange(level, level.DisplayOrder + 1);
  };
  const handleEditSave = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <ListItem
        disabled={level.disabled}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        key={level.id}
        secondaryAction={
          <Box sx={{ visibility: showActions ? 'visible' : 'hidden' }}>
            <ActionIcons
              itemName="Level"
              onEdit={() => setOpenEdit(true)}
              onMoveUp={level.DisplayOrder > firstDisplayOrder && (() => handelMoveUp(level))}
              onMoveDown={
                level.DisplayOrder < lastDisplayOrder && (() => handelMoveDown(level))
              }
            />
          </Box>
        }
      >
        <ListItemText
          secondary={
            level.Localizations?.find((x) => x.cultureCode === 'en-US')
              ?.description ?? ''
          }
          primary={`${
            level.Localizations?.find((x) => x.cultureCode === 'en-US')
              ?.title ?? ''
          } (${level.value} pts.)`}
        />
      </ListItem>
      <Drawer anchor="right" open={edit} onClose={() => setOpenEdit(false)}>
        <EditLevel
          levelProp={level}
          onClose={() => setOpenEdit(false)}
          onSave={handleEditSave}
        />
      </Drawer>
    </>
  );
}
