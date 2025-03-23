import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import PagesModal from './components/PagesModal'
import PageTitleForm from './components/PageTitleForm'
import Home from './components/Home'

function App() {
  // User state
  const [username, setUsername] = useState('');
  
  // App navigation state
  const [view, setView] = useState('home'); // 'home', 'notes'
  
  // Mode management (list or notes)
  const [currentMode, setCurrentMode] = useState('list');
  
  // Pages management
  const [pages, setPages] = useState([]);
  const [activePageId, setActivePageId] = useState(null);
  const [isPagesModalOpen, setIsPagesModalOpen] = useState(false);
  const [isTitleFormOpen, setIsTitleFormOpen] = useState(false);
  
  // Active page content
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  
  // Get the active page object
  const activePage = pages.find(p => p.id === activePageId);

  // Initial load of data from localStorage
  useEffect(() => {
    // Check for username
    const storedUsername = localStorage.getItem('iNotesUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Load pages
    const storedPages = localStorage.getItem('iNotesPages');
    if (storedPages) {
      try {
        const parsedPages = JSON.parse(storedPages);
        setPages(parsedPages);
        
        // Set active page if there's at least one page
        if (parsedPages.length > 0) {
          // Try to find a page matching the current mode
          const pageMatchingMode = parsedPages.find(p => p.mode === currentMode);
          if (pageMatchingMode) {
            setActivePageId(pageMatchingMode.id);
          } else {
            // Otherwise just use the first page
            setActivePageId(parsedPages[0].id);
          }
        }
      } catch (error) {
        console.error("Error parsing stored pages:", error);
        createDefaultPages();
      }
    } else {
      createDefaultPages();
    }
  }, []);
  
  // Function to create default pages
  const createDefaultPages = () => {
    const defaultPages = [
      { id: uuidv4(), title: 'My Tasks', mode: 'list', todos: [] },
      { id: uuidv4(), title: 'My Notes', mode: 'notes', todos: [] }
    ];
    setPages(defaultPages);
    localStorage.setItem('iNotesPages', JSON.stringify(defaultPages));
    setActivePageId(defaultPages[0].id);
  };

  // Load active page content when activePageId changes
  useEffect(() => {
    if (activePageId && pages.length > 0) {
      const page = pages.find(p => p.id === activePageId);
      if (page) {
        setTodos(page.todos || []);
        setCurrentMode(page.mode);
      }
    } else if (pages.length > 0 && !activePageId) {
      // Set first page of current mode as active if none selected
      const firstPageOfMode = pages.find(p => p.mode === currentMode);
      if (firstPageOfMode) {
        setActivePageId(firstPageOfMode.id);
      }
    }
  }, [activePageId, pages]);

  // Update localStorage when pages change
  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem('iNotesPages', JSON.stringify(pages));
    }
  }, [pages]);

  // Update page content in pages array
  const updatePageContent = (newTodos) => {
    if (!activePageId) return;
    
    const updatedPages = pages.map(page => {
      if (page.id === activePageId) {
        return { ...page, todos: newTodos };
      }
      return page;
    });
    
    setPages(updatedPages);
    localStorage.setItem('iNotesPages', JSON.stringify(updatedPages));
  };

  // Toggle show completed tasks
  const toggleFinished = () => {
    setShowCompleted(!showCompleted);
  };

  // Create a new page
  const createNewPage = (mode = currentMode) => {
    const newPageId = uuidv4();
    const newPage = { 
      id: newPageId, 
      title: '', 
      mode: mode, // Use the mode passed as parameter
      todos: [] 
    };
    
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    localStorage.setItem('iNotesPages', JSON.stringify(updatedPages));
    setActivePageId(newPageId);
    setTodos([]);
    setIsPagesModalOpen(false);
    setIsTitleFormOpen(true);
    setView('notes');
  };

  // Delete a page
  const deletePage = (pageId) => {
    const updatedPages = pages.filter(page => page.id !== pageId);
    setPages(updatedPages);
    localStorage.setItem('iNotesPages', JSON.stringify(updatedPages));
    
    // If active page was deleted, set a new active page
    if (pageId === activePageId) {
      const pageOfSameMode = updatedPages.find(p => p.mode === currentMode);
      if (pageOfSameMode) {
        setActivePageId(pageOfSameMode.id);
      } else {
        setActivePageId(null);
        setTodos([]);
      }
    }
  };

  // Update page title
  const updatePageTitle = (newTitle) => {
    if (!activePageId) return;
    
    const updatedPages = pages.map(page => {
      if (page.id === activePageId) {
        return { ...page, title: newTitle };
      }
      return page;
    });
    
    setPages(updatedPages);
    localStorage.setItem('iNotesPages', JSON.stringify(updatedPages));
  };

  // Set active page
  const setActivePage = (pageId) => {
    setActivePageId(pageId);
    setView('notes');
  };

  // Handle adding a new todo
  const handleAdd = () => {
    if (!todo.trim() || !activePageId) return;
    
    // Create new todo with current date/time
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS
    
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
      createdAt: formattedDate,
      createdBy: username || 'Anonymous'
    };
    
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    updatePageContent(updatedTodos);
    setTodo('');
  };

  // Handle editing a todo
  const handleEdit = (e, id) => {
    const todoIndex = todos.findIndex(item => item.id === id);
    if (todoIndex === -1) return;
    
    const newTodoText = prompt('Edit note:', todos[todoIndex].todo);
    if (newTodoText === null || newTodoText === '') return;
    
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].todo = newTodoText;
    // Add last edited timestamp
    updatedTodos[todoIndex].lastEdited = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    setTodos(updatedTodos);
    updatePageContent(updatedTodos);
  };

  // Handle deleting a todo
  const handleDel = (e, id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    updatePageContent(updatedTodos);
  };

  // Handle todo text input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Handle checkbox change
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const todoIndex = todos.findIndex(item => item.id === id);
    if (todoIndex === -1) return;
    
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].isCompleted = !updatedTodos[todoIndex].isCompleted;
    // Add completion timestamp if marked complete
    if (updatedTodos[todoIndex].isCompleted) {
      updatedTodos[todoIndex].completedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    } else {
      updatedTodos[todoIndex].completedAt = null;
    }
    
    setTodos(updatedTodos);
    updatePageContent(updatedTodos);
  };

  // Handle mode change
  const handleModeChange = (mode) => {
    if (mode === currentMode) return;
    
    // Set the current mode first
    setCurrentMode(mode);
    setView('notes');
    
    // Find a page in the new mode to make active
    const pageInNewMode = pages.find(p => p.mode === mode);
    if (pageInNewMode) {
      setActivePageId(pageInNewMode.id);
    } else {
      // Create a new page specifically in the new mode
      createNewPage(mode);
    }
  };

  // Display formatted creation time
  const displayTime = (timestamp) => {
    if (!timestamp) return '';
    return timestamp;
  };

  // Go to home page
  const goToHome = () => {
    setView('home');
  };

  return (
    <>
      {!username && <Welcome setUsername={setUsername} />}
      
      <Navbar 
        username={username} 
        currentMode={currentMode} 
        setCurrentMode={handleModeChange} 
        openPagesModal={() => setIsPagesModalOpen(true)}
        activePage={activePage}
        goToHome={goToHome}
      />
      
      {isPagesModalOpen && (
        <PagesModal 
          isOpen={isPagesModalOpen} 
          onClose={() => setIsPagesModalOpen(false)} 
          pages={pages}
          currentMode={currentMode}
          setActivePage={setActivePage}
          deletePage={deletePage}
          createNewPage={() => createNewPage(currentMode)}
        />
      )}
      
      {isTitleFormOpen && (
        <PageTitleForm 
          activePage={activePage}
          updatePageTitle={updatePageTitle}
          onClose={() => setIsTitleFormOpen(false)}
        />
      )}
      
      {view === 'home' ? (
        <Home username={username} />
      ) : (
        <div className="md:container bg-neutral-400 md:mx-auto mx-3 my-5 rounded-xl p-5 flex flex-col items-center justify-center gap-2 min-h-[90vh]">
          {!activePage ? (
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-4">No page selected</h2>
              <button 
                onClick={() => createNewPage(currentMode)}
                className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900"
              >
                Create New Page
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-full mb-4">
                <h1 className="text-2xl font-bold text-center">
                  {activePage.title || 'Untitled Page'}
                </h1>
                <button 
                  onClick={() => setIsTitleFormOpen(true)}
                  className="ml-2 text-sm bg-slate-700 text-white p-1 rounded-full"
                >
                  <FaEdit />
                </button>
              </div>
              
              <div className="upar flex items-center justify-center gap-x-2 my-2 w-[80%] flex-wrap">
                <h1 className="text-xl font-bold mx-2">
                  {currentMode === 'list' ? 'New task:' : 'New note:'}
                </h1>
                <input 
                  type="text" 
                  className="rounded-xl px-2 md:w-full" 
                  onChange={handleChange} 
                  value={todo} 
                  onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
                <button 
                  disabled={todo.length === 0} 
                  onClick={handleAdd} 
                  className="font-bold text-white px-2 py-1 rounded-xl bg-slate-600 hover:bg-black disabled:bg-gray-400"
                >
                  Add
                </button>
              </div>
              
              {currentMode === 'list' && (
                <div className="my-2">
                  <input 
                    type="checkbox" 
                    id="showCompleted"
                    onChange={toggleFinished} 
                    checked={showCompleted} 
                  />
                  <label htmlFor="showCompleted" className="ml-2">Show completed tasks</label>
                </div>
              )}
              
              <hr className="w-full" />
              
              <div className="niche w-full flex flex-col p-2 items-center justify-center gap-2">
                <h2 className="text-lg font-bold my-2">
                  {currentMode === 'list' ? 'My Tasks:' : 'My Notes:'}
                </h2>
                
                {todos.length === 0 ? (
                  <p className="text-gray-700">
                    {currentMode === 'list' 
                      ? 'No tasks added. Nothing to show...' 
                      : 'No notes added. Nothing to show...'}
                  </p>
                ) : (
                  todos.map(item => {
                    // For list mode, respect showCompleted setting
                    if (currentMode === 'list' && !showCompleted && item.isCompleted) {
                      return null;
                    }
                    
                    return (
                      <div 
                        key={item.id} 
                        className="note flex flex-col w-full bg-white p-2 rounded-lg"
                      >
                        <div className="flex justify-between">
                          <div className="flex gap-x-1 w-3/4 break-words">
                            {currentMode === 'list' && (
                              <input 
                                name={item.id} 
                                onChange={handleCheckbox} 
                                type="checkbox" 
                                checked={item.isCompleted || false} 
                              />
                            )}
                            <div className={currentMode === 'list' && item.isCompleted ? "line-through" : ""}>
                              {item.todo}
                            </div>
                          </div>
                          <div className="btns flex flex-shrink-0">
                            <button 
                              onClick={(e) => handleEdit(e, item.id)} 
                              className="font-bold text-white px-1 mx-1 rounded-xl bg-slate-600 hover:bg-black"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              onClick={(e) => handleDel(e, item.id)} 
                              className="font-bold text-white px-1 mx-1 rounded-xl bg-slate-600 hover:bg-black"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                        
                        {/* Display creation info */}
                        <div className="text-xs text-gray-500 mt-1">
                          {item.createdAt && (
                            <span>Created: {displayTime(item.createdAt)}</span>
                          )}
                          {item.createdBy && (
                            <span> by {item.createdBy}</span>
                          )}
                          {item.lastEdited && (
                            <span> • Edited: {displayTime(item.lastEdited)}</span>
                          )}
                          {item.completedAt && (
                            <span> • Completed: {displayTime(item.completedAt)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App