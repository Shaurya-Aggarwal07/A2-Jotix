import React from 'react';

const Home = ({ username }) => {
  return (
    <div className="md:container md:mx-auto mx-3 my-5 flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome to Jotix</h1>
          {username && <p className="text-lg text-slate-600">Hey there, {username}!</p>}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="feature-card bg-slate-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-700 mb-3">📝 List Mode</h2>
            <p className="text-slate-600 mb-4">
              Perfect for creating checkable task lists. Use this for:
            </p>
            <ul className="list-disc pl-6 text-slate-600">
              <li>Grocery shopping lists</li>
              <li>Daily to-do tasks</li>
              <li>Project checklists</li>
              <li>Meeting agendas</li>
            </ul>
          </div>
          
          <div className="feature-card bg-slate-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-700 mb-3">📚 Notes Mode</h2>
            <p className="text-slate-600 mb-4">
              Designed for free-form note taking. Ideal for:
            </p>
            <ul className="list-disc pl-6 text-slate-600">
              <li>Daily journal entries</li>
              <li>Meeting notes</li>
              <li>Research summaries</li>
              <li>AI world updates</li>
            </ul>
          </div>
          
          <div className="feature-card bg-slate-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-700 mb-3">🗂️ Multiple Pages</h2>
            <p className="text-slate-600">
              Organize your thoughts in separate pages. Create different pages for different projects, topics, or categories.
              All your data is stored locally for privacy.
            </p>
          </div>
          
          <div className="feature-card bg-slate-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-700 mb-3">📱 Stay Organized</h2>
            <p className="text-slate-600">
              Easy access to all your notes and tasks. Switch between modes, create new pages, 
              and manage everything from one intuitive interface.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-slate-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-slate-700 mb-3">Getting Started</h2>
          <ol className="list-decimal pl-6 text-slate-600 space-y-2">
            <li>Choose between <strong>List Mode</strong> and <strong>Notes Mode</strong> from the navigation bar</li>
            <li>Create new pages by clicking <strong>All Pages</strong> in the navigation bar</li>
            <li>Add a title to your page to keep things organized</li>
            <li>Start adding notes or tasks to your page</li>
            <li>Your data will be saved automatically in your browser's local storage</li>
          </ol>
        </div>
        
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Jotix - Write, Save, Check Off, Stay Organized!</p>
          <p>Last updated: 2025-03-23</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
