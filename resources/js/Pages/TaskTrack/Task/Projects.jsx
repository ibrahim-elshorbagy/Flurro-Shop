import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Tabs from '@/Components/Tabs';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ParentTasksTable from './Partials/Tables/ProjectTasksTable';
import CreateProjectModal from './Partials/Modals/ProjectModals/CreateProjectModal';
import EditTaskModal from './Partials/Modals/GeneralModals/EditTaskModal';
import UpdateTaskStatusModal from './Partials/Modals/GeneralModals/UpdateTaskStatusModal';
import SearchBar from '@/Components/SearchBar';
import DateDisplay from '@/Components/DateDisplay';
import { useTrans } from '@/Hooks/useTrans';

export default function Projects({ auth, taskSource, parentTasks, queryParams = null }) {
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

  // Company info tab content
  const taskSourceInfoContent = (
    <div className="bg-white p-4 rounded-md shadow border border-neutral-300">
      <h3 className="text-lg font-semibold mb-2 text-neutral-900">{taskSource.name}</h3>
      {taskSource.note && (
        <div className="mb-4">
          <p className="text-neutral-700">{taskSource.note}</p>
        </div>
      )}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2 text-neutral-900">{t('dates')}:</h4>
        <DateDisplay item={taskSource} showLabels={true} className="bg-neutral-50 p-3 rounded-md" />
      </div>
    </div>
  );

  // Tasks tab content
  const tasksContent = (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
          <i className="fa-solid fa-list-check text-purple-500"></i> {t('projects')}
        </h2>
        <PrimaryButton
          type="button"
          onClick={toggleCreateModal}
          icon="fa-plus"
          size="large"
        >
          <span className='max-xs:hidden'>{t('add_new_project')}</span>
        </PrimaryButton>
      </div>
      <div className="mb-4">
        <SearchBar
          placeholder={t('search_projects')}
          defaultValue={queryParams?.name || ''}
          routeName="tasks.index"
          routeParams={{ taskSource: taskSource.id }}
          queryKey="name"
          icon="fa-magnifying-glass"

        />
      </div>

      <ParentTasksTable
        parentTasks={parentTasks}
        onEdit={toggleEditModal}
        onStatusChange={toggleStatusModal}
      />
    </div>
  );

  const tabs = [
    {
      title: t('company_info'),
      icon: 'fa-info-circle',
      content: taskSourceInfoContent,
    },
    {
      title: t('projects'),
      icon: 'fa-list-check',
      content: tasksContent,
    },
  ];

  return (
    <AppLayout>
      <Head title={`Company: ${taskSource.name}`} />

      <div className="m-3 xl:m-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
            <i className="fa-solid fa-list text-purple-500"></i> {taskSource.name}
          </h2>
          <SecondaryButton
            as={Link}
            href={route('task-sources.index')}
            icon="fa-arrow-left"
          >
            {t('companies')}
          </SecondaryButton>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-lg border border-neutral-300">
          <div className="p-4 text-neutral-900">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        taskSource={taskSource}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        task={editingTask}
      />

      <UpdateTaskStatusModal
        isOpen={isStatusModalOpen}
        onClose={toggleStatusModal}
        task={editingTask}
      />
    </AppLayout>
  );
}

