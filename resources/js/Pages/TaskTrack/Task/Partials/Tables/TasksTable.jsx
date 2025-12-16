import React from 'react';
import { router } from '@inertiajs/react';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function TasksTable({ childTasks, onEdit, onUpdateStatus }) {
  const { t } = useTrans();

  const deleteTask = (task) => {
    if (confirm(`${t('are_you_sure_delete')} "${task.name}"?`)) {
      router.delete(route('tasks.destroy', task.id));
    }
  };

  const formatPrice = (price, currencyCode = 'USD') => {
    if (price === null || price === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
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
    { field: 'name', label: t('task_name'), icon: 'fa-list-check' },
    { field: 'price', label: t('price'), icon: 'fa-dollar-sign' },
    { field: 'status', label: t('status'), icon: 'fa-tag' },
    { field: 'dates', label: t('dates'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    // { field: 'id', label: t('id') },
    { field: 'name', label: t('name') },
    { field: 'price', label: t('price') },
    { field: 'status', label: t('status') },
    { field: 'created_at', label: t('created_at') },
    { field: 'started_at', label: t('started') },
    { field: 'ended_at', label: t('ended') },
  ];

  // Row styling function based on task status
  const getRowClassName = (task, index, isSelected) => {
    if (isSelected) return ''; // Let SelectableTable handle selected state

    switch (task.status) {
      case 'completed':
        return 'bg-green-50 hover:bg-green-100';
      case 'active':
        return 'bg-blue-50 hover:bg-blue-100';
      case 'pending':
        return 'bg-yellow-50 hover:bg-yellow-100';
      default:
        return index % 2 === 0
          ? 'bg-neutral-100 hover:bg-neutral-200'
          : 'bg-neutral-50 hover:bg-neutral-100';
    }
  };

  // Custom card renderer for tasks
  const renderCard = (task, isSelected, handleSelect, index) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed':
          return 'border-green-300 bg-green-50';
        case 'active':
          return 'border-blue-300 bg-blue-50';
        case 'pending':
          return 'border-yellow-300 bg-yellow-50';
        default:
          return 'border-neutral-200 bg-white';
      }
    };

    const getStatusBadge = (status) => {
      switch (status) {
        case 'pending':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <i className="fa-solid fa-clock mx-2"></i>
              {t('pending')}
            </span>
          );
        case 'active':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <i className="fa-solid fa-arrows-rotate mx-2"></i>
              {t('active')}
            </span>
          );
        case 'completed':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <i className="fa-solid fa-check-circle mx-2"></i>
              {t('completed')}
            </span>
          );
        default:
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
              <i className="fa-solid fa-question-circle mx-2"></i>
              {t('unknown')}
            </span>
          );
      }
    };

    return (
      <div
        key={task.id}
        className={`
          relative p-4 rounded-lg border transition-all duration-200
          ${isSelected
            ? 'border-purple-500 bg-purple-50 shadow-md'
            : getStatusColor(task.status)
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
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900 truncate">
              {task.name}
            </h3>
            <p className="text-sm text-neutral-600">
              <i className="fa-solid fa-hashtag mx-2"></i>
              {task.id}
            </p>
          </div>
        </div>

        {/* Price and Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-dollar-sign text-green-600 mx-2"></i>
            <span className="text-lg font-bold text-green-600">
              {task.currency ? formatPrice(task.price, task.currency.code) : formatPrice(task.price)}
            </span>
          </div>
          {getStatusBadge(task.status)}
        </div>

        {/* Dates Section */}
        <div className="bg-neutral-100 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-calendar text-purple-600 mx-2"></i>
            <span className="text-sm font-medium text-neutral-700">
              {t('dates')}
            </span>
          </div>
          <DateDisplay item={task} />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-neutral-200">
          <ActionButton
            variant="edit"
            icon="fa-pen-to-square"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
          >
            {t('edit')}
          </ActionButton>

          {onUpdateStatus && (
            <ActionButton
              variant="info"
              icon="fa-arrows-rotate"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus(task);
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

  return (
    <SelectableTable
      columns={columns}
      data={childTasks ? childTasks.data : []}
      pagination={childTasks}
      routeName="tasks.show"
      queryParams={{}}
      sortOptions={sortOptions}
      defaultSortField={'id'}
      defaultSortDirection={'desc'}
      onBulkDelete={handleBulkDelete}
      bulkActions={bulkActions}
      getRowClassName={getRowClassName}
      renderCard={renderCard}
      renderRow={(task) => (
        <>
          <td className="px-3 py-2 font-mono">{task.row_number}</td>
          <td className="px-3 py-2">{task.name}</td>
          <td className="px-3 py-2">{task.currency ? formatPrice(task.price, task.currency.code) : formatPrice(task.price)}</td>
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
              variant="edit"
              icon="fa-pen-to-square"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              {t('edit')}
            </ActionButton>
            {onUpdateStatus && (
              <ActionButton
                variant="status"
                icon="fa-arrows-rotate"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(task);
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
