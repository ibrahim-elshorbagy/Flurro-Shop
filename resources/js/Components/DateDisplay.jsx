import React from 'react';
import { useTrans } from '@/Hooks/useTrans';

export default function DateDisplay({ item, showLabels = true, className = "" }) {
  const { t } = useTrans();

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  if (showLabels) {
    return (
      <div className={`text-sm space-y-1 ${className}`}>
        <div className="flex items-center gap-1">
          <i className="fa-regular fa-calendar-plus text-xs text-gray-500"></i>
          <span className="text-gray-600">{t('created')}:</span>
          <span>{formatDate(item.created_at)}</span>
        </div>
        {item.started_at && (
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-calendar-check text-xs text-green-500"></i>
            <span className="text-gray-600">{t('started')}:</span>
            <span>{formatDate(item.started_at)}</span>
          </div>
        )}
        {item.ended_at && (
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-calendar-xmark text-xs text-red-500"></i>
            <span className="text-gray-600">{t('ended')}:</span>
            <span>{formatDate(item.ended_at)}</span>
          </div>
        )}
      </div>
    );
  }

  // Compact format for table cells
  return (
    <div className={`text-sm space-y-1 ${className}`}>
      <div className="flex items-center gap-1">
        <i className="fa-regular fa-calendar-plus text-xs text-gray-500"></i>
        <span>{formatDate(item.created_at)}</span>
      </div>
      {item.started_at && (
        <div className="flex items-center gap-1">
          <i className="fa-regular fa-calendar-check text-xs text-green-500"></i>
          <span>{formatDate(item.started_at)}</span>
        </div>
      )}
      {item.ended_at && (
        <div className="flex items-center gap-1">
          <i className="fa-regular fa-calendar-xmark text-xs text-red-500"></i>
          <span>{formatDate(item.ended_at)}</span>
        </div>
      )}
    </div>
  );
}
