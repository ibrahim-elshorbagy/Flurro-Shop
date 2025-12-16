import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Tabs from '@/Components/Tabs';
import SearchBar from '@/Components/SearchBar';
import PrimaryButton from '@/Components/PrimaryButton';
import CategoryForm from './Partials/CategoryForm';
import { useTrans } from '@/Hooks/useTrans';
import CategoryTable from './Tables/CategoryTable';

export default function Categories({ auth, categories, allCategories, queryParams = null }) {
  queryParams = queryParams || {};
  const { t } = useTrans();

  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Toggle Form Modal (handles both create and edit)
  const toggleFormModal = (category = null) => {
    setEditingCategory(category);
    setIsFormModalOpen(!isFormModalOpen);
  };

  // Categories table content
  const categoriesTableContent = (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold leading-tight text-neutral-900 flex items-center gap-2">
          <i className="fa-solid fa-sitemap text-purple-500"></i> {t('categories')}
        </h2>
        <PrimaryButton
          type="button"
          onClick={() => toggleFormModal()}
          icon="fa-plus"
          size="large"
        >
          <span className='max-xs:hidden'>{t('add_new')}</span>
        </PrimaryButton>
      </div>

      <div className="mb-4">
        <SearchBar
          placeholder={t('search_categories')}
          defaultValue={queryParams.name || ""}
          queryKey="name"
          routeName="admin.shop.categories.index"
          icon="fa-magnifying-glass"
        />
      </div>

      <CategoryTable
        categories={categories}
        onEdit={toggleFormModal}
      />
    </div>
  );

  const tabs = [
    {
      title: t('categories'),
      icon: 'fa-sitemap',
      content: categoriesTableContent,
    },
  ];

  return (
    <AppLayout>
      <Head title={t('categories')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg border border-neutral-300">
          <div className="p-4 text-neutral-900">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>

      {/* Single Form Modal for both Create and Edit */}
      <CategoryForm
        isOpen={isFormModalOpen}
        onClose={() => toggleFormModal()}
        category={editingCategory}
        allCategories={allCategories}
      />
    </AppLayout>
  );
}
