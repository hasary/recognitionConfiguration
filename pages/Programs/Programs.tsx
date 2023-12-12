import * as React from 'react';
import List from '@mui/material/List';
import {
Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  ListItem,
  ListItemText,
  ListSubheader,
  Checkbox,
  Tooltip,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import MockData from '../../common/MockData';
import Program from '../../common/interfaces/Program';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export default function Home() {
  const [programs, setPrograms] = React.useState<Program[]>([]);

  React.useEffect(() => {
    //API call load Program
    setPrograms(MockData.Programs);
  }, []);

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
        <ListSubheader component="div" id="nested-list-subheader">
          Recognition Programs:
       
        </ListSubheader>
        {programs.map((program, index) => (
          <ListItem
            secondaryAction={
              <>
             
              
                  <Link to={'main'}>
                    <Tooltip title="Configure the program">
                      <SettingsIcon />
                    </Tooltip>
                  </Link>
              
              </>
            }
          >
            <ListItemText
              secondary={program.description ?? ''}
              primary={program.code}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
