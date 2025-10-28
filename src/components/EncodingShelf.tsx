import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataField, EncodingMapping, DragItem } from '../types';

interface EncodingShelfProps {
  encodings: EncodingMapping;
  setEncodings: React.Dispatch<React.SetStateAction<EncodingMapping>>;
  chartType: string;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
}

const DropZone: React.FC<{
  label: string;
  field: DataField | null;
  onDrop: (field: DataField) => void;
  onRemove: () => void;
}> = ({ label, field, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item: DragItem) => onDrop(item.field),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box sx={{ flex: 1, minWidth: 150 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
        {label}
      </Typography>
      <Paper
        ref={drop}
        variant="outlined"
        sx={{
          p: 1,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          bgcolor: isOver ? 'action.hover' : field ? 'action.selected' : 'background.paper',
          border: isOver ? 2 : 1,
          borderColor: isOver ? 'primary.main' : 'divider',
          borderStyle: field ? 'solid' : 'dashed',
        }}
      >
        {field ? (
          <Chip
            label={field.name}
            size="small"
            onDelete={onRemove}
            deleteIcon={<CloseIcon />}
            sx={{ width: '100%' }}
          />
        ) : (
          <Typography variant="body2" color="text.disabled">
            Drop field here
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

const EncodingShelf: React.FC<EncodingShelfProps> = ({
  encodings,
  setEncodings,
  chartType,
  setChartType,
}) => {
  const handleDrop = (channel: keyof EncodingMapping, field: DataField) => {
    setEncodings((prev) => ({ ...prev, [channel]: field }));
  };

  const handleRemove = (channel: keyof EncodingMapping) => {
    setEncodings((prev) => ({ ...prev, [channel]: null }));
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2, bgcolor: 'grey.50' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            label="Chart Type"
            onChange={(e) => setChartType(e.target.value)}
          >
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="point">Scatter</MenuItem>
            <MenuItem value="area">Area</MenuItem>
            <MenuItem value="circle">Circle</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <DropZone
          label="X Axis"
          field={encodings.x}
          onDrop={(field) => handleDrop('x', field)}
          onRemove={() => handleRemove('x')}
        />
        <DropZone
          label="Y Axis"
          field={encodings.y}
          onDrop={(field) => handleDrop('y', field)}
          onRemove={() => handleRemove('y')}
        />
        <DropZone
          label="Color"
          field={encodings.color}
          onDrop={(field) => handleDrop('color', field)}
          onRemove={() => handleRemove('color')}
        />
        <DropZone
          label="Size"
          field={encodings.size}
          onDrop={(field) => handleDrop('size', field)}
          onRemove={() => handleRemove('size')}
        />
      </Box>
    </Box>
  );
};

export default EncodingShelf;