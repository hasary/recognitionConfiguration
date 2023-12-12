import { Box, Button, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import * as React from 'react';


// the item.DisplayOrder will be swaped by the item with DisplayOrder = newOrder
function ChangeOrder(
  collection: { DisplayOrder: number }[],
  item: { DisplayOrder: number },
  newOrder: number
) {
  const swapItem = collection.find((x) => x.DisplayOrder === newOrder) as {
    DisplayOrder: number;
  };
  swapItem.DisplayOrder = item.DisplayOrder;
  item.DisplayOrder = newOrder;
  return [...collection];
}
function Debug(model: any) {
  return (
    <Box sx={{ fontSize: 9, backgroundColor: 'cyan' }}>
      <pre>{JSON.stringify(model, null, 2)}</pre>
    </Box>
  );
}
const Utils = {
 
  ChangeOrder: ChangeOrder,
  Debug: Debug,
};
export default Utils;
