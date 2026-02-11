import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  GraduationCap, 
  PenTool
} from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 flex-shrink-0 z-10">
        {/* Logo */}
        <div className="flex items-center space-x-3 w-64 flex-shrink-0">
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">迪尚AI平台</span>
        </div>

        {/* Top Tabs */}
        <nav className="flex items-center h-full ml-4">
          <div className="h-full flex items-center px-6 border-b-2 border-indigo-600 text-indigo-600 font-bold text-base cursor-pointer bg-indigo-50/50">
            企划中心
          </div>
          {/* Example of other inactive tabs if needed in future */}
          {/* <div className="h-full flex items-center px-6 border-b-2 border-transparent text-slate-500 font-medium text-base hover:text-slate-700 cursor-pointer">
            设计中心
          </div> */}
        </nav>

        {/* User Profile (Optional placeholder for right side) */}
        <div className="ml-auto flex items-center space-x-3">
           <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
              JD
            </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-3 bg-indigo-50 text-indigo-700 rounded-lg transition-colors font-medium">
              <PenTool className="h-5 w-5 text-indigo-600" />
              <span>学位服智能提案</span>
            </button>
          </div>
          
          <div className="p-4 border-t border-slate-100">
            <div className="text-xs text-slate-400 text-center">
              v1.0.0 Pro Plan
            </div>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          <main className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
