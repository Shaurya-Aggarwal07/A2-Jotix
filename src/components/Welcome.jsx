import { useState } from 'react';

const Welcome = ({ setUsername }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    localStorage.setItem('iNotesUsername', name);
    setUsername(name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-96 max-w-[90%]">
        <h2 className="text-2xl font-bold mb-4">Welcome to iNotes!</h2>
        <p className="mb-4">Please enter your name to get started:</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg"
            placeholder="Your name"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!name.trim()}
            className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900 disabled:bg-slate-400"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;