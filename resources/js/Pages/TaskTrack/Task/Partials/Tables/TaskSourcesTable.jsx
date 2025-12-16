import React from 'react';
import { Link, router } from '@inertiajs/react';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function TaskSourcesTable({ taskSources, onEdit }) {
  const { t } = useTrans();

  const deleteTaskSource = (taskSource) => {
    if (confirm(`${t('are_you_sure_delete')} "${taskSource.name}"?`)) {
      router.delete(route('task-sources.destroy', taskSource.id));
    }
  };

  const handleBulkDelete = (ids) => {
    router.delete(route('task-sources.bulk-destroy'), {
      data: { ids },
      preserveScroll: true,
    });
  };

  // Define bulk actions for task sources
  const bulkActions = [
    {
      label: t('delete_companies'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_companies'
    }
  ];

  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'name', label: t('name'), icon: 'fa-list' },
    { field: 'note', label: t('note'), icon: 'fa-note-sticky' },
    { field: 'dates', label: t('dates'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    // { field: 'id', label: t('id') },
    { field: 'name', label: t('name') },
    { field: 'created_at', label: t('created_at') },
    { field: 'started_at', label: t('started') },
    { field: 'ended_at', label: t('ended') },
  ];

  // Custom card renderer for task sources
  const renderCard = (taskSource, isSelected, handleSelect, index) => {
    return (
      <div
        key={taskSource.row_number}
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
              handleSelect(taskSource);
            }}
          />
        </div>

        {/* Task Source Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <i className="fa-solid fa-list text-purple-600 text-lg"></i>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900 truncate">
              {taskSource.name}
            </h3>
            <p className="text-sm text-neutral-600">
              <i className="fa-solid fa-hashtag mx-2"></i>
              {taskSource.row_number}
            </p>
          </div>
        </div>

        {/* Note Section */}
        {taskSource.note && (
          <div className="mb-3">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-note-sticky text-amber-500 mx-2 mt-1"></i>
              <div className="flex-1">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {taskSource.note.length > 100
                    ? taskSource.note.substring(0, 100) + '...'
                    : taskSource.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dates Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-calendar text-blue-500 mx-2"></i>
            <span className="text-sm font-medium text-neutral-700">
              {t('dates')}
            </span>
          </div>
          <div className="ml-6">
            <DateDisplay item={taskSource} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-neutral-200">
          <ActionButton
            variant="info"
            icon="fa-list-check"
            size="xs"
            as="a"
            href={route('tasks.index', taskSource.id)}
            onClick={(e) => e.stopPropagation()}
          >
            {t('view')}
          </ActionButton>

          <ActionButton
            variant="edit"
            icon="fa-pen-to-square"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(taskSource);
            }}
          >
            {t('edit')}
          </ActionButton>

          <ActionButton
            variant="delete"
            icon="fa-trash"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              deleteTaskSource(taskSource);
            }}
          >
            {t('delete')}
          </ActionButton>
        </div>
      </div>
    );
  };

  return (
    <SelectableTable
      columns={columns}
      data={taskSources ? taskSources.data : []}
      pagination={taskSources}
      routeName="task-sources.index"
      queryParams={{}}
      sortOptions={sortOptions}
      defaultSortField={'id'}
      defaultSortDirection={'desc'}
      onBulkDelete={handleBulkDelete}
      bulkActions={bulkActions}
      renderCard={renderCard}
      renderRow={(taskSource) => (
        <>
          <td className="px-3 py-2 font-mono">{taskSource.row_number}</td>
          <td className="px-3 py-2">{taskSource.name}</td>
          <td className="px-3 py-2">
            {taskSource.note ? taskSource.note.substring(0, 50) + (taskSource.note.length > 50 ? '...' : '') : '-'}
          </td>
          <td className="px-3 py-2">
            <DateDisplay item={taskSource} />
          </td>
          <td className="px-3 py-2 flex justify-center gap-2">
            <ActionButton
              variant="info"
              icon="fa-list-check"
              size="xs"
              as="a"
              href={route('tasks.index', taskSource.id)}
              onClick={(e) => e.stopPropagation()}
            >
              {t('view')}
            </ActionButton>
            <ActionButton
              variant="edit"
              icon="fa-pen-to-square"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(taskSource);
              }}
            >
              {t('edit')}
            </ActionButton>
            <ActionButton
              variant="delete"
              icon="fa-trash"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                deleteTaskSource(taskSource);
              }}
            >
              {t('delete')}
            </ActionButton>
          </td>
        </>
      )}
    />
  );
}
