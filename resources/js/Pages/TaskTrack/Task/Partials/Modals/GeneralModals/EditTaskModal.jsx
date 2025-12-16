import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import AppModal from '@/Components/AppModal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import DateInput from '@/Components/DateInput';

export default function EditTaskModal({ isOpen, onClose, task, currencies }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    name: '',
    note: '',
    price: '',
    currency_id: '',
    status: '',
    started_at: '',
    ended_at: '',
    _method: 'PUT',
  });

  useEffect(() => {
    if (task && isOpen) {
      setData({
        name: task.name,
        note: task.note || '',
        price: task.price || '',
        currency_id: task.currency_id || '',
        status: task.status || 'pending',
        started_at: task.started_at || '',
        ended_at: task.ended_at || '',

        _method: 'PUT',
      });
    } else if (!isOpen) {
      reset();
    }
    // eslint-disable-next-line
  }, [task, isOpen]);

  if (!task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.update', task.id), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('edit_project')}
      icon="fa-pen-to-square"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputLabel htmlFor="edit_task_name" value={t('project_name')} />
          <TextInput
            id="edit_task_name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={e => setData("name", e.target.value)}
            icon="fa-tasks"
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        {task.parent_id && (
          <>
            <div className="mb-4">
              <InputLabel htmlFor="edit_task_price" value={t('price')} />
              <TextInput
                id="edit_task_price"
                type="number"
                step="0.01"
                name="price"
                value={data.price}
                className="mt-1 block w-full"
                onChange={e => setData("price", e.target.value)}
                icon="fa-dollar-sign"
              />
              <InputError message={errors.price} className="mt-2" />
            </div>

            <div className="mb-4">
              <SelectInput
                label={t('currency')}
                name="currency_id"
                value={data.currency_id}
                onChange={e => setData("currency_id", e.target.value)}
                options={currencies ? currencies.map(currency => ({
                  value: currency.id,
                  label: `${currency.code} - ${currency.name}`
                })) : []}
                error={errors.currency_id}
                icon="fa-money-bill"
                disabled={!data.price}
              />
              <p className="mt-1 text-sm text-gray-500">
                {t('price_currency_required')}
              </p>
            </div>
          </>
        )}

        <div className="mb-4">
          <SelectInput
            label={t('status')}
            name="status"
            value={data.status}
            onChange={e => setData("status", e.target.value)}
            options={[
              { value: 'pending', label: `⏳ ${t('pending')}` },
              { value: 'active', label: `🔄 ${t('active')}` },
              { value: 'completed', label: `✅ ${t('completed')}` },
            ]}
            error={errors.status}
            icon="fa-tag"
          />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="edit_task_note" value={t('note_optional')} />
          <TextArea
            id="edit_task_note"
            name="note"
            value={data.note || ''}
            className="mt-1 block w-full"
            rows="3"
            onChange={e => setData("note", e.target.value)}
            icon="fa-note-sticky"
          />
          <InputError message={errors.note} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="edit_task_source_started_at" value={t('start_date_optional')} />
          <DateInput
            id="edit_task_source_started_at"
            name="started_at"
            value={data.started_at || ''}
            className="mt-1 block w-full"
            onChange={e => setData("started_at", e.target.value)}
            icon="fa-calendar-days"
          />
          <InputError message={errors.started_at} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="edit_task_source_ended_at" value={t('end_date_optional')} />
          <DateInput
            id="edit_task_source_ended_at"
            name="ended_at"
            value={data.ended_at || ''}
            className="mt-1 block w-full"
            onChange={e => setData("ended_at", e.target.value)}
            icon="fa-calendar-days"
          />
          <InputError message={errors.ended_at} className="mt-2" />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton
            type="button"
            onClick={onClose}
            icon="fa-xmark"
            disabled={processing}
          >
            {t('cancel')}
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            icon="fa-floppy-disk"
            disabled={processing}
          >
            {processing ? t('saving_changes') : t('save_changes')}
          </PrimaryButton>
        </div>
      </form>
    </AppModal>
  );
}
