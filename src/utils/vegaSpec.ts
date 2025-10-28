import { EncodingMapping } from '../types';

export function generateVegaLiteSpec(data: any[], encodings: EncodingMapping, chartType: string) {
  const spec: any = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Generated chart',
    width: 500,
    height: 400,
    data: { values: data },
    mark: chartType,
    encoding: {},
  };

  // Add X encoding
  if (encodings.x) {
    spec.encoding.x = {
      field: encodings.x.name,
      type: encodings.x.type,
      title: encodings.x.name,
    };
    
    // For bar charts with nominal/ordinal X, add aggregate to Y
    if (chartType === 'bar' && (encodings.x.type === 'nominal' || encodings.x.type === 'ordinal')) {
      if (encodings.y && encodings.y.type === 'quantitative') {
        spec.encoding.y = {
          field: encodings.y.name,
          type: encodings.y.type,
          aggregate: 'mean',
          title: `Mean of ${encodings.y.name}`,
        };
      }
    }
  }

  // Add Y encoding (if not already set by bar chart logic)
  if (encodings.y && !spec.encoding.y) {
    spec.encoding.y = {
      field: encodings.y.name,
      type: encodings.y.type,
      title: encodings.y.name,
    };
  }

  // Add Color encoding
  if (encodings.color) {
    spec.encoding.color = {
      field: encodings.color.name,
      type: encodings.color.type,
      title: encodings.color.name,
    };
  }

  // Add Size encoding
  if (encodings.size) {
    spec.encoding.size = {
      field: encodings.size.name,
      type: encodings.size.type,
      title: encodings.size.name,
    };
  }

  return spec;
}