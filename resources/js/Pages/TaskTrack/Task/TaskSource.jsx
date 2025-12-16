import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Tabs from '@/Components/Tabs';
import PrimaryButton from '@/Components/PrimaryButton';
import TaskSourcesTable from './Partials/Tables/TaskSourcesTable';
import CreateTaskSourceModal from './Partials/Modals/SourceModals/CreateTaskSourceModal';
import EditTaskSourceModal from './Partials/Modals/SourceModals/EditTaskSourceModal';
import SearchBar from '@/Components/SearchBar';
import { useTrans } from '@/Hooks/useTrans';

export default function TaskSource({ auth, taskSources, queryParams = null }) {
  const { t } = useTrans();
  queryParams = queryParams || {};

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskSource, setEditingTaskSource] = useState(null);

  // Toggle Create Modal
  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  // Toggle Edit Modal
  const toggleEditModal = (taskSource = null) => {
    setEditingTaskSource(taskSource);
    setIsEditModalOpen(!isEditModalOpen);
  };


  // Tab content
  const tabContent = (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
          <i className="fa-solid fa-list text-purple-500"></i> {t('companies')}
        </h2>
        <PrimaryButton
          type="button"
          onClick={toggleCreateModal}
          icon="fa-plus"
          size="large"
        >
          <span className='max-xs:hidden'>{t('add_new')}</span>
        </PrimaryButton>
      </div>

      <div className="mb-4">
        <SearchBar
          placeholder={t('search_companies')}
          defaultValue={queryParams.name || ''}
          queryKey="name"
          routeName="task-sources.index"
          icon="fa-magnifying-glass"
        />
      </div>

      <TaskSourcesTable
        taskSources={taskSources}
        onEdit={toggleEditModal}
      />
    </div>
  );

  const tabs = [
    {
      translationKey: 'companies',
      icon: 'fa-list',
      content: tabContent,
    },
  ];

  return (
    <AppLayout>
      <Head title={t('companies')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg border border-neutral-300">
          <div className="p-4 text-neutral-900">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateTaskSourceModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
      />

      <EditTaskSourceModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        taskSource={editingTaskSource}
      />
    </AppLayout>
  );
}
