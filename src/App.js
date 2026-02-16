import logo from './logo.svg';
import './App.css';
import React from "react";
import Sidebar from './components/sideBar';

function App() {
     const [seciliId, setSeciliId] = React.useState(1);
  return (
    <div className="flex h-screen bg-slate-50">
      {/* SOL TARAF */}
      <Sidebar setSeciliId={setSeciliId} seciliId={seciliId} />

    </div>
  );
}

export default App;
