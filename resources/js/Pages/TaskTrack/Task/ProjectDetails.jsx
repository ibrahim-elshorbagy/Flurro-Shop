import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Tabs from '@/Components/Tabs';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SearchBar from '@/Components/SearchBar';
import ChildTasksTable from './Partials/Tables/TasksTable';
import CreateTaskModal from './Partials/Modals/TaskModal/CreateTaskModal';
import EditTaskModal from './Partials/Modals/GeneralModals/EditTaskModal';
import UpdateTaskStatusModal from './Partials/Modals/GeneralModals/UpdateTaskStatusModal';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function ProjectDetails({ auth, task, childTasks, taskSummary = [], currencies = [], queryParams = null }) {
  const { t } = useTrans();

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Toggle Create Modal
  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  // Toggle Edit Modal
  const toggleEditModal = (task = null) => {
    setEditingTask(task);
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Toggle Status Modal
  const toggleStatusModal = (task = null) => {
    setEditingTask(task);
    setIsStatusModalOpen(!isStatusModalOpen);
  };

  // Format price for display
  const formatPrice = (price, currency = 'USD') => {
    if (price === null || price === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  // Task info tab content
  const taskInfoContent = (
    <div className="bg-white p-4 rounded-md shadow border border-neutral-300">
      <h3 className="text-lg font-semibold mb-2 text-neutral-900">{task.name}</h3>

      {!task.parent_id && taskSummary && taskSummary.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2 text-neutral-900">{t('task_values_by_currency')}:</h4>
          <div className="bg-neutral-50 p-3 rounded-md">
            {taskSummary.map((item, index) => (
              <p key={index} className="text-neutral-700 mb-1">
                <span className="font-medium">{item.currency}:</span> {formatPrice(item.total, item.currency)}
              </p>
            ))}
            {taskSummary.length === 0 && (
              <p className="text-neutral-500">{t('no_tasks_with_monetary_values')}</p>
            )}
          </div>
        </div>
      )}

      {task.parent_id && task.price && (
        <div className="mb-2">
          <p className="text-neutral-700">
            <span className="font-medium">{t('price')}:</span> {formatPrice(task.price, task.currency?.code || 'USD')}
          </p>
        </div>
      )}

      {task.note && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2 text-neutral-900">{t('task_note')}:</h4>
          <div >
            <p className="p-3 rounded-md bg-neutral-50 text-neutral-700">{task.note}</p>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2 text-neutral-900">{t('dates')}:</h4>
        <DateDisplay item={task} showLabels={true} className="bg-neutral-50 p-3 rounded-md" />
      </div>
    </div>
  );

  // Tasks tab content
  const childTasksContent = (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
          <i className="fa-solid fa-list-check text-purple-500"></i> {t('tasks')}
        </h2>
        <PrimaryButton
          type="button"
          onClick={toggleCreateModal}
          icon="fa-plus"
          size="large"
        >
          {t('add_new_task')}
        </PrimaryButton>
      </div>


      <div className="mb-4">
        <SearchBar
          placeholder={t('search_tasks')}
          defaultValue={queryParams?.name || ''}
          routeName="tasks.show"
          routeParams={{ task: task.id }}
          queryKey="name"
          icon="fa-magnifying-glass"

        />
      </div>

      <ChildTasksTable
        childTasks={childTasks}
        onEdit={toggleEditModal}
        onUpdateStatus={toggleStatusModal}
      />
    </div>
  );

  const tabs = [
    {
      translationKey: 'project_info',
      icon: 'fa-info-circle',
      content: taskInfoContent,
    },
    {
      translationKey: 'tasks',
      icon: 'fa-list-check',
      content: childTasksContent,
    },
  ];

  return (
    <AppLayout>
      <Head title={`${t('project')}: ${task.name}`} />

      <div className="m-3 xl:m-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
            <i className="fa-solid fa-list-check text-purple-500"></i> {task.name}
          </h2>
          <SecondaryButton
            as={Link}
            href={route('tasks.index', task.task_source_id)}
            icon="fa-arrow-left"
          >
            {t('projects')}
          </SecondaryButton>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-lg border border-neutral-300">
          <div className="p-4 text-neutral-900">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        parentTask={task}
        currencies={currencies}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        task={editingTask}
        currencies={currencies}
      />

      <UpdateTaskStatusModal
        isOpen={isStatusModalOpen}
        onClose={toggleStatusModal}
        task={editingTask}
      />
    </AppLayout>
  );
}
