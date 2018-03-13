import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest/lib/mui';

export const PostList = props => (
  <List {...props} hasCreate>
    <Datagrid>
      <TextField source="id" sortable={false} />
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
);
