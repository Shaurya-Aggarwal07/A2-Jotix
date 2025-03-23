import React from 'react'

const Navbar = ({ 
  username, 
  currentMode, 
  setCurrentMode, 
  openPagesModal,
  activePage,
  goToHome
}) => {
  return (
    <nav className="bg-slate-900 w-full text-white py-2 flex flex-wrap justify-between items-center sticky top-0 px-4">
        <div className="logo flex items-center">
            <h1 className='font-bold text-xl cursor-pointer' onClick={goToHome}>iNotes</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {username && (
            <span className="hidden md:inline text-sm">Hey {username}!</span>
          )}
          
          <div className="bg-slate-700 rounded-lg p-1 flex">
            <button 
              onClick={() => setCurrentMode('list')}
              className={`px-2 py-1 text-sm rounded-md transition ${currentMode === 'list' ? 'bg-slate-900' : 'hover:bg-slate-800'}`}
            >
              List Mode
            </button>
            <button 
              onClick={() => setCurrentMode('notes')}
              className={`px-2 py-1 text-sm rounded-md transition ${currentMode === 'notes' ? 'bg-slate-900' : 'hover:bg-slate-800'}`}
            >
              Notes Mode
            </button>
          </div>
        </div>
        
        <ul className='flex gap-4'>
          <li 
            className='cursor-pointer hover:font-semibold'
            onClick={goToHome}
          >
            Home
          </li>
          <li 
            className='cursor-pointer hover:font-semibold'
            onClick={openPagesModal}
          >
            All Pages
          </li>
          <li className='cursor-pointer font-medium hidden md:block'>
            {activePage ? `Current: ${activePage?.title || 'Untitled'}` : ''}
          </li>
        </ul>
    </nav>
  )
}

export default Navbar