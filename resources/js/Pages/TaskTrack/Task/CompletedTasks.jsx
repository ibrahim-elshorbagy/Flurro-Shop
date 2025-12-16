import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Tabs from '@/Components/Tabs';
import SearchBar from '@/Components/SearchBar';
import CompletedTasksTable from './Partials/Tables/CompletedTasksTable';
import UpdateTaskStatusModal from './Partials/Modals/GeneralModals/UpdateTaskStatusModal';
import { useTrans } from '@/Hooks/useTrans';

export default function CompletedTasks({ auth, tasks, queryParams = null }) {
  const { t } = useTrans();
  queryParams = queryParams || {};

  // Modal state
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Toggle Status Modal
  const toggleStatusModal = (task = null) => {
    setCurrentTask(task);
    setIsStatusModalOpen(!isStatusModalOpen);
  };

  // Tab content
  const completedTasksContent = (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
          <i className="fa-solid fa-check text-purple-500"></i> {t('completed_project_tasks')}
        </h2>
      </div>

      <div className="mb-4">
        <SearchBar
          placeholder={t('search_tasks')}
          defaultValue={queryParams.name || ""}
          queryKey="name"
          routeName="tasks.completed"
          icon="fa-magnifying-glass"
        />
      </div>

      <CompletedTasksTable
        tasks={tasks}
        onUpdateStatus={toggleStatusModal}
      />
    </div>
  );

  const tabs = [
    {
      translationKey: 'completed_project_tasks',
      icon: 'fa-check',
      content: completedTasksContent,
    },
  ];

  return (
    <AppLayout>
      <Head title={t('completed_project_tasks')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg border border-neutral-300">
          <div className="p-4 text-neutral-900">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateTaskStatusModal
        isOpen={isStatusModalOpen}
        onClose={toggleStatusModal}
        task={currentTask}
      />
    </AppLayout>
  );
}
