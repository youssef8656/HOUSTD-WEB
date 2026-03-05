import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentHome from './pages/student/StudentHome';
import OwnerHome from './pages/owner/OwnerHome';
import AdminHome from './pages/admin/AdminHome';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== allowedRole) {
    const path = currentUser.role === 'student' ? '/student' : currentUser.role === 'owner' ? '/owner' : '/admin';
    return <Navigate to={path} replace />;
  }
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  if (currentUser) {
    const path = currentUser.role === 'student' ? '/student' : currentUser.role === 'owner' ? '/owner' : '/admin';
    return <Navigate to={path} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
      <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentHome /></ProtectedRoute>} />
      <Route path="/owner" element={<ProtectedRoute allowedRole="owner"><OwnerHome /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminHome /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
