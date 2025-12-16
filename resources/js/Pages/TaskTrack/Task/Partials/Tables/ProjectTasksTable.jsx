import React from 'react';
import { Link, router } from '@inertiajs/react';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function ProjectTasksTable({ parentTasks, onEdit, onStatusChange }) {
  const { t } = useTrans();

  const deleteTask = (task) => {
    if (confirm(`${t('are_you_sure_delete')} "${task.name}"?`)) {
      router.delete(route('tasks.destroy', task.id));
    }
  };

  const formatPrice = (price) => {
    if (price === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleBulkDelete = (ids) => {
    router.delete(route('tasks.bulk-destroy'), {
      data: { ids },
      preserveScroll: true,
    });
  };

  // Define bulk actions for tasks
  const bulkActions = [
    {
      label: t('delete_projects'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_projects'
    }
  ];

  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'name', label: t('project_name'), icon: 'fa-list-check' },
    { field: 'status', label: t('status'), icon: 'fa-tag' },
    { field: 'dates', label: t('dates'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    // { field: 'id', label: t('id') },
    { field: 'name', label: t('name') },
    { field: 'status', label: t('status') },
    { field: 'created_at', label: t('created_at') },
    { field: 'started_at', label: t('started') },
    { field: 'ended_at', label: t('ended') },
  ];

  // Custom card renderer for tasks
  const renderCard = (task, isSelected, handleSelect, index) => {
    const getStatusConfig = (status) => {
      switch (status) {
        case 'pending':
          return {
            bg: 'bg-yellow-100 text-yellow-700',
            icon: 'fa-clock',
            emoji: '⏳'
          };
        case 'active':
          return {
            bg: 'bg-blue-100 text-blue-700',
            icon: 'fa-play',
            emoji: '🔄'
          };
        case 'completed':
          return {
            bg: 'bg-purple-100 text-purple-700',
            icon: 'fa-check-circle',
            emoji: '✅'
          };
        default:
          return {
            bg: 'bg-neutral-100 text-neutral-700',
            icon: 'fa-question',
            emoji: '❓'
          };
      }
    };

    const statusConfig = getStatusConfig(task.status);

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
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <i className="fa-solid fa-list-check text-purple-600 text-lg"></i>
            </div>
          </div>
          <div className="flex-1 min-w-0 ltr:pr-6 rtl:pl-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-neutral-500 font-mono">
                #{task.row_number}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 truncate">
              {task.name}
            </h3>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg}`}>
            <i className={`fa-solid ${statusConfig.icon} mx-2`}></i>
            {statusConfig.emoji} {t(task.status)}
          </span>
        </div>

        {/* Date Information */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <i className="fa-solid fa-calendar mx-2"></i>
            <span className="font-medium">{t('dates')}:</span>
          </div>
          <div className="pl-6">
            <DateDisplay item={task} />
          </div>
        </div>

        {/* Additional Task Info */}
        {task.description && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <i className="fa-solid fa-align-left mx-2"></i>
              <span className="font-medium">{t('description')}:</span>
            </div>
            <p className="text-sm text-neutral-600 pl-6 line-clamp-2">
              {task.description}
            </p>
          </div>
        )}

        {/* Progress Info */}
        {task.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <i className="fa-solid fa-chart-line mx-2"></i>
              <span className="font-medium">{t('progress')}:</span>
            </div>
            <div className="pl-6">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress || 0}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-neutral-600">
                  {task.progress || 0}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Priority Badge */}
        {task.priority && (
          <div className="mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              <i className={`fa-solid ${
                task.priority === 'high' ? 'fa-exclamation' :
                task.priority === 'medium' ? 'fa-minus' : 'fa-arrow-down'
              } mx-2`}></i>
              {t(task.priority)} {t('priority')}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-neutral-200">
          <ActionButton
            as="a"
            href={route('tasks.show', task.id)}
            variant="info"
            icon="fa-eye"
            size="xs"
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
              onEdit(task);
            }}
          >
            {t('edit_project')}
          </ActionButton>

          {onStatusChange && (
            <ActionButton
              variant="status"
              icon="fa-arrows-rotate"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(task);
              }}
            >
              {t('change_status')}
            </ActionButton>
          )}

          <ActionButton
            variant="delete"
            icon="fa-trash"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task);
            }}
          >
            {t('delete')}
          </ActionButton>
        </div>
      </div>
    );
  };

  // Row styling function for table view
  const getRowClassName = (task, index, isSelected) => {
    if (isSelected) return ''; // Let SelectableTable handle selected state

    // Different styling based on status
    if (task.status === 'completed') {
      return 'bg-green-50 hover:bg-green-100';
    } else if (task.status === 'active') {
      return 'bg-blue-50 hover:bg-blue-100';
    } else if (task.status === 'pending') {
      return 'bg-yellow-50 hover:bg-yellow-100';
    } else {
      // Default alternating rows
      return index % 2 === 0
        ? 'bg-neutral-100 hover:bg-neutral-200'
        : 'bg-neutral-50 hover:bg-neutral-100';
    }
  };

  return (
    <SelectableTable
      columns={columns}
      data={parentTasks ? parentTasks.data : []}
      pagination={parentTasks}
      routeName="tasks.index"
      queryParams={{}}
      sortOptions={sortOptions}
      defaultSortField={'id'}
      defaultSortDirection={'desc'}
      onBulkDelete={handleBulkDelete}
      bulkActions={bulkActions}
      renderCard={renderCard}
      getRowClassName={getRowClassName}
      renderRow={(task) => (
        <>
          <td className="px-3 py-2 font-mono">{task.row_number}</td>
          <td className="px-3 py-2">{task.name}</td>
          <td className="px-3 py-2">
            {task.status === 'pending' && (
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                ⏳ {t('pending')}
              </span>
            )}
            {task.status === 'active' && (
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                🔄 {t('active')}
              </span>
            )}
            {task.status === 'completed' && (
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                ✅ {t('completed')}
              </span>
            )}
          </td>
          <td className="px-3 py-2">
            <DateDisplay item={task} />
          </td>
          <td className="px-3 py-2 flex justify-center gap-2">
            <ActionButton
              as="a"
              href={route('tasks.show', task.id)}
              variant="info"
              icon="fa-eye"
              size="xs"
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
                onEdit(task);
              }}
            >
              {t('edit_project')}
            </ActionButton>
            {onStatusChange && (
              <ActionButton
                variant="status"
                icon="fa-arrows-rotate"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(task);
                }}
              >
                {t('change_status')}
              </ActionButton>
            )}
            <ActionButton
              variant="delete"
              icon="fa-trash"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task);
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
