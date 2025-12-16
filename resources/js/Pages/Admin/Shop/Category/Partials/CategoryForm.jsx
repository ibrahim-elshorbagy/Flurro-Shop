import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import AppModal from '@/Components/AppModal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import { useTrans } from '@/Hooks/useTrans';

export default function CategoryForm({ isOpen, onClose, category, allCategories }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    name: '',
    slug: '',
    parent_id: '',
    active: true,
    _method: 'POST',
  });

  useEffect(() => {
    if (data.name && (!data.slug || !category)) {
      // Auto-generate slug from name if slug is empty or in create mode
      const generatedSlug = data.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setData('slug', generatedSlug);
    }
  }, [data.name, category]);

  useEffect(() => {
    if (category && isOpen) {
      // Edit mode
      setData({
        name: category.name,
        slug: category.slug || '',
        parent_id: category.parent_id || '',
        active: category.active,
        _method: 'PUT',
      });
    } else if (!isOpen) {
      // Reset when modal closes
      reset();
      setData({
        name: '',
        slug: '',
        parent_id: '',
        active: true,
        _method: 'POST',
      });
    }
    // eslint-disable-next-line
  }, [category, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = category
      ? route('admin.shop.categories.update', category.id)
      : route('admin.shop.categories.store');

    post(url, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  // Filter available parent categories based on the 2-level rule
  const availableParentCategories = useMemo(() => {
    let filtered = allCategories;

    // Rule 1: Remove current category from options (can't be its own parent)
    if (category) {
      filtered = filtered.filter(cat => cat.id !== category.id);
    }

    // Rule 2: Only show ROOT categories (categories with no parent)
    // This enforces the 2-level hierarchy: Parent (root) → Child
    filtered = filtered.filter(cat => cat.parent_id === null);

    // Rule 3: If editing a category that has children, don't show ANY parent options
    // Because a parent cannot become a child
    if (category && allCategories.some(cat => cat.parent_id === category.id)) {
      return []; // No options available
    }

    return filtered;
  }, [allCategories, category]);

  // Check if category has children (for displaying info message)
  const hasChildren = category && allCategories.some(cat => cat.parent_id === category.id);

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? t('edit_category') : t('add_new_category')}
      icon={category ? 'fa-pen-to-square' : 'fa-plus'}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputLabel htmlFor="category_name" value={t('category_name')} required />
          <TextInput
            id="category_name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={e => setData("name", e.target.value)}
            icon="fa-tag"
            required
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="category_slug" value={t('slug')} />
          <TextInput
            id="category_slug"
            type="text"
            name="slug"
            value={data.slug}
            className="mt-1 block w-full"
            onChange={e => {
              const value = e.target.value
                .toLowerCase()
                .replace(/[^a-zA-Z0-9-_]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              setData("slug", value);
            }}
            icon="fa-link"
          />
          <InputError message={errors.slug} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="parent_id" value={t('parent_category')} />

          {hasChildren ? (
            <div className="mt-1 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              <i className="fa-solid fa-info-circle mr-2"></i>
              {t('category_has_children_info')}
            </div>
          ) : availableParentCategories.length === 0 && !category ? (
            <div className="mt-1 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <i className="fa-solid fa-info-circle mr-2"></i>
              {t('no_parent_categories_available')}
            </div>
          ) : (
            <SelectInput
              name="parent_id"
              value={data.parent_id}
              onChange={e => setData("parent_id", e.target.value)}
              options={[
                { value: '', label: t('none_root_category') },
                ...availableParentCategories.map(cat => ({
                  value: cat.id.toString(),
                  label: cat.name
                }))
              ]}
              icon="fa-folder-tree"
              error={errors.parent_id}
              disabled={hasChildren}
            />
          )}
          <InputError message={errors.parent_id} className="mt-2" />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={data.active}
              onChange={e => setData("active", e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-neutral-100 border-neutral-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <InputLabel htmlFor="active" value={t('active')} />
          </div>
          <InputError message={errors.active} className="mt-2" />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton
            type="button"
            onClick={onClose}
            icon="fa-xmark"
            rounded="rounded-lg"
            disabled={processing}
          >
            {t('cancel')}
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            icon="fa-floppy-disk"
            rounded="rounded-lg"
            withShadow={false}
            disabled={processing}
          >
            {processing ? t('saving') : category ? t('save_changes') : t('save')}
          </PrimaryButton>
        </div>
      </form>
    </AppModal>
  );
}
