# Data Visualizer MVP

> A simplified MVP version of [microsoft/data-formulator](https://github.com/microsoft/data-formulator)

A simple drag-and-drop data visualization builder using Vega-Lite. This MVP focuses on the core visualization feature without AI/LLM integration.

## Features

✅ **Upload CSV Data** - Load your data from CSV files

✅ **Drag-and-Drop Interface** - Intuitive field assignment to chart properties

✅ **Multiple Chart Types** - Bar, line, scatter, and more

✅ **Live Preview** - See your visualizations update in real-time

✅ **Sample Data** - Start exploring with built-in example datasets

## What's Different from the Original?

This MVP strips down the full Data Formulator to its core visualization capabilities:

- ❌ No AI/LLM features (no API keys needed)
- ❌ No data transformation with natural language
- ❌ No database integration
- ❌ No authentication
- ✅ Simple, focused visualization builder
- ✅ Works completely offline (no backend needed)

## Get Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

1. **Load Data**: Click "Upload CSV" or select a sample dataset
2. **Choose Chart Type**: Select from bar, line, scatter, area, etc.
3. **Drag Fields**: Drag data fields from the left panel to encoding channels (X, Y, Color, Size)
4. **View Chart**: Your visualization updates automatically!

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **Vega-Lite** - Visualization grammar
- **React-Vega** - React integration for Vega
- **React DnD** - Drag-and-drop functionality
- **Vite** - Build tool

## Project Structure

```
src/
├── App.tsx              # Main application component
├── components/
│   ├── DataUpload.tsx   # CSV file upload
│   ├── FieldList.tsx    # Draggable field list
│   ├── EncodingShelf.tsx # Drop zones for encodings
│   └── ChartView.tsx    # Vega-Lite chart renderer
├── utils/
│   ├── csvParser.ts     # CSV parsing utilities
│   └── vegaSpec.ts      # Vega-Lite spec generation
└── data/
    └── samples.ts       # Sample datasets
```

## Sample Datasets

The app includes sample datasets to help you get started:

- **Cars** - Auto specifications and performance
- **Movies** - Film ratings and box office data
- **Weather** - Temperature and precipitation data

## Contributing

This is an MVP demonstration project. Feel free to fork and extend it!

## License

MIT License - Based on microsoft/data-formulator

## Related Projects

- [microsoft/data-formulator](https://github.com/microsoft/data-formulator) - Full-featured AI-powered visualization tool
- [vega/vega-lite](https://github.com/vega/vega-lite) - The visualization grammar powering this app
