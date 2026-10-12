import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

const control =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function TicketFields({ data, setData, errors, options }) {
    return (
        <div className="space-y-5">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <input
                    id="title"
                    type="text"
                    className={control}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    maxLength={255}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows={5}
                    className={control}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                    <InputLabel htmlFor="priority" value="Priority" />
                    <select
                        id="priority"
                        className={control}
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                    >
                        {options.priorities.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <InputError message={errors.priority} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <select
                        id="status"
                        className={control}
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        {options.statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="category" value="Category" />
                    <select
                        id="category"
                        className={control}
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                    >
                        {options.categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <InputError message={errors.category} className="mt-2" />
                </div>
            </div>
        </div>
    );
}