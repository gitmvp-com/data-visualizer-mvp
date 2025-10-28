import React, { useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Vega } from 'react-vega';
import { generateVegaLiteSpec } from '../utils/vegaSpec';
import { EncodingMapping } from '../types';

interface ChartViewProps {
  data: any[];
  encodings: EncodingMapping;
  chartType: string;
}

const ChartView: React.FC<ChartViewProps> = ({ data, encodings, chartType }) => {
  const spec = useMemo(() => {
    if (data.length === 0 || !encodings.x || !encodings.y) {
      return null;
    }
    return generateVegaLiteSpec(data, encodings, chartType);
  }, [data, encodings, chartType]);

  if (data.length === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Load data to get started
        </Typography>
      </Box>
    );
  }

  if (!encodings.x || !encodings.y) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Drag fields to X and Y axes to create a chart
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={2} sx={{ p: 3, maxWidth: '100%' }}>
        {spec && <Vega spec={spec} actions={false} />}
      </Paper>
    </Box>
  );
};

export default ChartView;