import { DataField } from '../types';

export function parseCSV(text: string): any[] {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  const data: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }

  return data;
}

export function inferFieldTypes(data: any[]): DataField[] {
  if (data.length === 0) return [];

  const fields: DataField[] = [];
  const firstRow = data[0];

  for (const key in firstRow) {
    const values = data.map((row) => row[key]).filter((v) => v !== '' && v !== null && v !== undefined);
    
    if (values.length === 0) {
      fields.push({ name: key, type: 'nominal' });
      continue;
    }

    // Check if temporal (date-like)
    if (values.some((v) => !isNaN(Date.parse(v)) && isNaN(Number(v)))) {
      fields.push({ name: key, type: 'temporal' });
      continue;
    }

    // Check if quantitative (numeric)
    const numericValues = values.filter((v) => !isNaN(Number(v)));
    if (numericValues.length / values.length > 0.8) {
      fields.push({ name: key, type: 'quantitative' });
      continue;
    }

    // Check if ordinal (limited unique values)
    const uniqueValues = new Set(values);
    if (uniqueValues.size < values.length * 0.5 && uniqueValues.size < 20) {
      fields.push({ name: key, type: 'ordinal' });
      continue;
    }

    // Default to nominal
    fields.push({ name: key, type: 'nominal' });
  }

  return fields;
}