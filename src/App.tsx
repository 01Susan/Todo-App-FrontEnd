import './output.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import { NotFound } from './pages/Notfound';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './pages/ProtectedRoutes'
import { AuthProvider } from './hooks/useAuth'


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" Component={Signup} />
            <Route path="/signup" Component={Signup} />
            <Route path="/signin" Component={Signin} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="*" Component={NotFound}></Route>
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
