import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataUpload from './components/DataUpload';
import FieldList from './components/FieldList';
import EncodingShelf from './components/EncodingShelf';
import ChartView from './components/ChartView';
import { DataField, EncodingMapping } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [data, setData] = useState<any[]>([]);
  const [fields, setFields] = useState<DataField[]>([]);
  const [chartType, setChartType] = useState<string>('bar');
  const [encodings, setEncodings] = useState<EncodingMapping>({
    x: null,
    y: null,
    color: null,
    size: null,
  });

  const handleDataLoaded = (loadedData: any[], loadedFields: DataField[]) => {
    setData(loadedData);
    setFields(loadedFields);
    // Reset encodings when new data is loaded
    setEncodings({ x: null, y: null, color: null, size: null });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Header */}
          <AppBar position="static" elevation={1}>
            <Toolbar>
              <BarChartIcon sx={{ mr: 2 }} />
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                Data Visualizer MVP
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Based on microsoft/data-formulator
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left Panel - Data Upload & Fields */}
            <Box
              sx={{
                width: 280,
                borderRight: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <DataUpload onDataLoaded={handleDataLoaded} />
              <FieldList fields={fields} />
            </Box>

            {/* Right Panel - Chart & Encodings */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <EncodingShelf
                encodings={encodings}
                setEncodings={setEncodings}
                chartType={chartType}
                setChartType={setChartType}
              />
              <ChartView data={data} encodings={encodings} chartType={chartType} />
            </Box>
          </Box>
        </Box>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;