import React from 'react';

export function InlineChart({ width = 600, height = 240, data = [], title = 'Inline Chart', slotLabel }) {
  const padding = 24;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const xs = data.map(d => d.x);
  const ys = data.map(d => d.y);
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, 1);

  const scaleX = x => padding + ((x - minX) / Math.max(1, (maxX - minX))) * innerW;
  const scaleY = y => padding + innerH - ((y - minY) / Math.max(1, (maxY - minY))) * innerH;

  const dPath = (data && data.length)
    ? data.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(pt.x)} ${scaleY(pt.y)}`).join(' ')
    : `M ${padding} ${height - padding} L ${width - padding} ${padding}`;

  const wrapperStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    background: '#fff',
    maxWidth: '100%',
    width
  };

  const titleStyle = { fontSize: '1.125rem', fontWeight: 600, marginBottom: 8 };
  const slotStyle = { fontSize: '0.875rem', color: '#6b7280', marginBottom: 12 };

  return (
    <div style={wrapperStyle}>
      <div style={titleStyle}>{title}</div>
      {slotLabel && <div style={slotStyle}>Slot: {slotLabel} ({width}×{height})</div>}
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={title} style={{ width: '100%', height: 240, display: 'block' }}>
        <rect x="0" y="0" width={width} height={height} fill="white" />
        <path d={dPath} fill="none" stroke="black" strokeWidth="2" />
      </svg>
    </div>
  );
}