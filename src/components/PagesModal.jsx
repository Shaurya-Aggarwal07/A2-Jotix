import React from 'react';
import { MdDelete } from "react-icons/md";

const PagesModal = ({ 
  isOpen, 
  onClose, 
  pages, 
  currentMode, 
  setActivePage,
  deletePage,
  createNewPage
}) => {
  if (!isOpen) return null;
  
  const filteredPages = pages.filter(page => page.mode === currentMode);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {currentMode === 'list' ? 'My Lists' : 'My Notes'}
          </h2>
          <button 
            onClick={onClose}
            className="text-xl font-bold hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4">
          <button 
            onClick={createNewPage}
            className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900"
          >
            + Create New Page
          </button>
        </div>
        
        {filteredPages.length === 0 ? (
          <p className="text-center text-gray-500 my-8">No pages created yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredPages.map(page => (
              <div 
                key={page.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div 
                  className="flex-1 truncate"
                  onClick={() => {
                    setActivePage(page.id);
                    onClose();
                  }}
                >
                  {page.title || 'Untitled Page'}
                </div>
                <button 
                  onClick={() => deletePage(page.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesModal;