import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navBar/NavBar';
import rootReducers from './Components/Store/rootReducers';
import { Provider } from 'react-redux';
import TaskManagement from './Components/TaskManagement/TaskManagement';
import SocketInitialisation from './Components/Socket/SocketInitialisation';

function App() {
  return (
    <Provider store={rootReducers}>
      <SocketInitialisation tipID={"Test"}/>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path="/" element={<TaskManagement />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
