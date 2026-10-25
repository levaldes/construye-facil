import React from 'react';

export const MetricCard = ({ title, value, textColor = 'text-dark' }) => {
  return (
    <div className="card h-100 shadow-sm border-0 bg-light p-3">
      <h6 className="text-uppercase text-muted small fw-bold mb-2">{title}</h6>
      <div className={`fs-4 fw-bold ${textColor}`}>{value}</div>
    </div>
  );
};