import React, { useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { parseCSV, inferFieldTypes } from '../utils/csvParser';
import { sampleDatasets } from '../data/samples';
import { DataField } from '../types';

interface DataUploadProps {
  onDataLoaded: (data: any[], fields: DataField[]) => void;
}

const DataUpload: React.FC<DataUploadProps> = ({ onDataLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const data = parseCSV(text);
    const fields = inferFieldTypes(data);
    onDataLoaded(data, fields);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSampleData = (sampleName: string) => {
    const sample = sampleDatasets[sampleName];
    if (sample) {
      const fields = inferFieldTypes(sample.data);
      onDataLoaded(sample.data, fields);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Data Source
      </Typography>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
        sx={{ mb: 2, textTransform: 'none' }}
      >
        Upload CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <Divider sx={{ my: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Sample Data
        </Typography>
      </Divider>

      <List dense disablePadding>
        {Object.keys(sampleDatasets).map((key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton onClick={() => handleSampleData(key)}>
              <ListItemText
                primary={sampleDatasets[key].name}
                secondary={`${sampleDatasets[key].data.length} rows`}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{ fontSize: 12 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DataUpload;