import React, { useState } from 'react';

const PageTitleForm = ({ activePage, updatePageTitle, onClose }) => {
  const [title, setTitle] = useState(activePage?.title || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePageTitle(title.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Page Title</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg"
            placeholder="Enter page title"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageTitleForm;