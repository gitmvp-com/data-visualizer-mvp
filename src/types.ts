export interface DataField {
  name: string;
  type: 'quantitative' | 'nominal' | 'ordinal' | 'temporal';
}

export interface EncodingMapping {
  x: DataField | null;
  y: DataField | null;
  color: DataField | null;
  size: DataField | null;
}

export interface DragItem {
  field: DataField;
  type: string;
}