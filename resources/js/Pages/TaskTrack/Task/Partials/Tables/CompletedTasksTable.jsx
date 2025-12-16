import React from 'react';
import { Link, router } from '@inertiajs/react';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function CompletedTasksTable({ tasks, onUpdateStatus }) {
  const { t } = useTrans();

  // Handle bulk delete
  const handleBulkDelete = (ids) => {
    router.delete(route('tasks.bulk-destroy'), {
      data: { ids },
      preserveScroll: true,
    });
  };

  // Define bulk actions for tasks
  const bulkActions = [
    {
      label: t('delete_tasks'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_tasks'
    }
  ];

  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'name', label: t('name'), icon: 'fa-list-check' },
    { field: 'task_source.name', label: t('company'), icon: 'fa-building' },
    { field: 'parent.name', label: t('project'), icon: 'fa-folder' },
    { field: 'dates', label: t('dates'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' },
  ];

  const defaultPerPage = 10;
  const perPageOptions = [5, 10, 25, 50];

  const sortOptions = [
    { field: 'name', label: t('name') },
    { field: 'task_source.name', label: t('company') },
    { field: 'parent.name', label: t('project') },
    { field: 'created_at', label: t('created_at') },
    { field: 'started_at', label: t('started') },
    { field: 'ended_at', label: t('ended') },
    { field: 'updated_at', label: t('completed_at') }
  ];

  // Custom card renderer for tasks
  const renderCard = (task, isSelected, handleSelect, index) => {
    return (
      <div
        key={task.row_number}
        className={`
          relative p-4 rounded-lg border transition-all duration-200
          ${isSelected
            ? 'border-purple-500 bg-purple-50 shadow-md'
            : 'border-neutral-200 bg-white'
          }
          hover:shadow-md
        `}
      >
        {/* Selection checkbox */}
        <div className="absolute ltr:top-3 ltr:right-3 rtl:top-3 rtl:left-3">
          <input
            type="checkbox"
            className="w-4 h-4 text-purple-600 bg-neutral-100 border-neutral-300 rounded focus:ring-purple-500 focus:ring-2"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              handleSelect(task);
            }}
          />
        </div>

        {/* Task Header */}
        <div className="flex items-start gap-3 mb-3 pr-8">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fa-solid fa-list-check text-green-600 mx-2"></i>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900">
              <Link
                href={route('tasks.show', { id: task.id })}
                className="text-blue-600 hover:underline"
              >
                {task.name}
              </Link>
            </h3>
          </div>
        </div>

        {/* Task Details */}
        <div className="space-y-2 mb-4">
          {/* Company */}
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <i className="fa-solid fa-building text-blue-500 mx-2"></i>
            <span className="font-medium">{t('company')}:</span>
            <span>{task.task_source?.name || 'N/A'}</span>
          </div>

          {/* Project */}
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <i className="fa-solid fa-folder text-orange-500 mx-2"></i>
            <span className="font-medium">{t('project')}:</span>
            {task.parent ? (
              <Link
                href={route('tasks.show', { id: task.parent.id })}
                className="text-blue-600 hover:underline"
              >
                {task.parent.name}
              </Link>
            ) : (
              <span>N/A</span>
            )}
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <i className="fa-solid fa-calendar text-purple-500 mx-2"></i>
            <span className="font-medium">{t('dates')}:</span>
            <div className="flex-1">
              <DateDisplay item={task} />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <i className="fa-solid fa-check-circle mx-2"></i>
            {t('completed')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
          <ActionButton
            variant="status"
            icon="fa-arrows-rotate"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(task);
            }}
            as="button"
          >
            {t('update_status')}
          </ActionButton>
        </div>
      </div>
    );
  };

  // Row styling function for completed tasks
  const getRowClassName = (task, index, isSelected) => {
    if (isSelected) return ''; // Let SelectableTable handle selected state

    // Completed tasks have green background
    return index % 2 === 0
      ? 'bg-green-50 hover:bg-green-100'
      : 'bg-green-25 hover:bg-green-75';
  };

  return (
    <SelectableTable
      columns={columns}
      data={tasks.data}
      pagination={tasks}
      sortOptions={sortOptions}
      defaultSortField="updated_at"
      defaultSortDirection="desc"
      defaultPerPage={defaultPerPage}
      perPageOptions={perPageOptions}
      bulkActions={bulkActions}
      renderCard={renderCard}
      getRowClassName={getRowClassName}
      renderRow={(task) => (
        <>
          <td className="px-3 py-2 font-mono">{task.row_number}</td>

          <td className="px-3 py-2">
            <Link
              href={route('tasks.show', { id: task.id })}
              className="text-blue-600 hover:underline"
            >
              {task.name}
            </Link>
          </td>
          <td className="px-3 py-2">{task.task_source?.name || 'N/A'}</td>
          <td className="px-3 py-2">
            {task.parent ? (
              <Link
                href={route('tasks.show', { id: task.parent.id })}
                className="text-blue-600 hover:underline"
              >
                {task.parent.name}
              </Link>
            ) : (
              'N/A'
            )}
          </td>
          <td className="px-3 py-2">
            <DateDisplay item={task} />
          </td>
          <td className="px-3 py-2 flex justify-center gap-2">
            <ActionButton
              variant="status"
              icon="fa-arrows-rotate"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus(task);
              }}
            >
              {t('update_status')}
            </ActionButton>
          </td>
        </>
      )}
    />
  );
}
