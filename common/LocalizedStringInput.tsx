import { Stack, TextField } from '@mui/material';

import { LocalizedString } from './interfaces/LocalizedString';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps, CustomTabPanel } from './CustomTabs';
import MockData from './MockData';

export default function LocalizedStringInput(props: {
  text: LocalizedString[];
  onChange: (Text: LocalizedString[]) => void;
}) {
  const { text, onChange } = props;

  const [model, setModel] = React.useState<LocalizedString[]>([]);
  const [value, setValue] = React.useState(0);

  const getLoclizedStringByCulture = (
    collection: LocalizedString[],
    cultureCode: string
  ) => collection.find((x) => x.cultureCode === cultureCode) as LocalizedString;

  React.useEffect(() => {
    const data = MockData.AvailableLanguages.map((cultureCode: string) => {
      const item = getLoclizedStringByCulture(text, cultureCode);
      return { ...item, cultureCode: cultureCode } as LocalizedString;
    });
    setModel(data);
  }, []);
  const handleCultureChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const handleTitleChange = (cultureCode: string, value: string) => {
    getLoclizedStringByCulture(model, cultureCode).title = value;
    setModel([...model]);
    onChange(model);
  };

  const handleDescriptionChange = (cultureCode: string, value: string) => {
    getLoclizedStringByCulture(model, cultureCode).description = value;
    setModel([...model]);
    onChange(model);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleCultureChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {model.map((ls, i) => (
            <Tab label={ls.cultureCode} {...a11yProps(i)} />
          ))}
        </Tabs>

        {model.map((ls, i) => (
          <CustomTabPanel value={value} index={i}>
            <Stack direction="column" spacing={2}>
              <TextField
                autoFocus
                sx={{ width: 300 }}
                margin="dense"
                id={`name${i}`}
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={ls.title}
                onChange={(e: { target: { value: string } }) => {
                  handleTitleChange(ls.cultureCode, e.target.value);
                }}
              />
              <TextField
                minRows={3}
                label="Description"
                multiline
                value={ls.description}
                onChange={(e: { target: { value: string } }) => {
                  handleDescriptionChange(ls.cultureCode, e.target.value);
                }}
              />
            </Stack>
          </CustomTabPanel>
        ))}
      </Box>
      {/* {JSON.stringify(model)} */}
    </>
  );
}
