import React from 'react';
import { useDrag } from 'react-dnd';
import {
  Box,
  Typography,
  List,
  ListItem,
  Chip,
  Divider,
} from '@mui/material';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import { DataField } from '../types';

interface FieldListProps {
  fields: DataField[];
}

const FieldItem: React.FC<{ field: DataField }> = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getIcon = () => {
    switch (field.type) {
      case 'quantitative':
        return <NumbersIcon fontSize="small" />;
      case 'temporal':
        return <CalendarTodayIcon fontSize="small" />;
      case 'ordinal':
        return <CategoryIcon fontSize="small" />;
      default:
        return <TextFieldsIcon fontSize="small" />;
    }
  };

  const getColor = () => {
    switch (field.type) {
      case 'quantitative':
        return 'primary';
      case 'temporal':
        return 'secondary';
      case 'ordinal':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <ListItem
      ref={drag}
      sx={{
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        '&:hover': { bgcolor: 'action.hover' },
        py: 0.5,
      }}
    >
      <Chip
        icon={getIcon()}
        label={field.name}
        size="small"
        color={getColor()}
        sx={{ width: '100%', justifyContent: 'flex-start' }}
      />
    </ListItem>
  );
};

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 2, pt: 0 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Fields ({fields.length})
      </Typography>
      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Load data to see fields
        </Typography>
      ) : (
        <List dense disablePadding>
          {fields.map((field, index) => (
            <FieldItem key={`${field.name}-${index}`} field={field} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default FieldList;