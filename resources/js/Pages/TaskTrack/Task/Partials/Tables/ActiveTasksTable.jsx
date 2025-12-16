import React from 'react';
import { Link, router } from '@inertiajs/react';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function ActiveTasksTable({ tasks, onUpdateStatus }) {
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
    { field: 'ended_at', label: t('ended') }
  ];

  // Custom card renderer for tasks
  const renderTaskCard = (task, isSelected, handleSelect, index) => {
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

        {/* Task Name */}
        <div className="mb-3 pr-8">
          <div className="flex items-center gap-2 mb-1">
            <i className="fa-solid fa-list-check text-purple-500 mx-2"></i>
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {t('name')}
            </span>
          </div>
          <Link
            href={route('tasks.show', { id: task.id })}
            className="text-lg font-semibold text-blue-600 hover:underline block truncate"
          >
            {task.name}
          </Link>
        </div>

        {/* Company Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <i className="fa-solid fa-building text-green-500 mx-2"></i>
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {t('company')}
            </span>
          </div>
          <p className="text-sm text-neutral-700 truncate">
            {task.task_source?.name || 'N/A'}
          </p>
        </div>

        {/* Project Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <i className="fa-solid fa-folder text-yellow-500 mx-2"></i>
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {t('project')}
            </span>
          </div>
          {task.parent ? (
            <Link
              href={route('tasks.show', { id: task.parent.id })}
              className="text-sm text-blue-600 hover:underline block truncate"
            >
              {task.parent.name}
            </Link>
          ) : (
            <p className="text-sm text-neutral-500">N/A</p>
          )}
        </div>

        {/* Date Information */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <i className="fa-solid fa-calendar text-blue-500 mx-2"></i>
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {t('dates')}
            </span>
          </div>
          <div className="text-sm">
            <DateDisplay item={task} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-neutral-200">
          <ActionButton
            variant="success"
            icon="fa-check"
            size="xs"
            className="text-white bg-purple-500 hover:bg-purple-600"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus({ ...task, status: 'completed' });
            }}
            as="button"
          >
            {t('completed')}
          </ActionButton>
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

  return (
    <SelectableTable
      columns={columns}
      data={tasks.data}
      pagination={tasks}
      sortOptions={sortOptions}
      defaultSortField="created_at"
      defaultSortDirection="desc"
      defaultPerPage={defaultPerPage}
      perPageOptions={perPageOptions}
      bulkActions={bulkActions}
      renderCard={renderTaskCard}
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
              variant="success"
              icon="fa-check"
              size="sm"
              className="text-white bg-purple-500 hover:bg-purple-600"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus({ ...task, status: 'completed' });
              }}
            >
              {t('completed')}
            </ActionButton>
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
