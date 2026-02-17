import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/services/authContext';
import { SidebarProvider } from './components/layout/SidebarContext';
import { Login } from './features/auth/components/Login';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';

import { SchoolList } from './features/schools/components/SchoolList';
import { SchoolCreate } from './features/schools/components/SchoolCreate';
import { SchoolDetail } from './features/schools/components/SchoolDetail';
import { SchoolEdit } from './features/schools/components/SchoolEdit';
import { AcademicStructure } from './features/schools/components/academic/AcademicStructure';
import { BulkImport } from './features/schools/components/imports/BulkImport';

import { FeeConfig } from './features/finance/components/FeeConfig';
import { PlanList } from './features/subscriptions/components/PlanList';
import { Finance } from './pages/Finance';

import { SupportDashboard } from './features/support/components/SupportDashboard';
import { Settings } from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout><Dashboard /></Layout>} />
                <Route path="/schools" element={<Layout><SchoolList /></Layout>} />
                <Route path="/schools/new" element={<Layout><SchoolCreate /></Layout>} />
                <Route path="/schools/:id" element={<Layout><SchoolDetail /></Layout>} />
                <Route path="/schools/:id/edit" element={<Layout><SchoolEdit /></Layout>} />
                <Route path="/schools/:id/academic" element={<Layout><AcademicStructure /></Layout>} />
                <Route path="/schools/:id/import" element={<Layout><BulkImport /></Layout>} />
                <Route path="/schools/:id/finance" element={<Layout><FeeConfig /></Layout>} />
                <Route path="/finance" element={<Layout><Finance /></Layout>} />
                <Route path="/subscriptions" element={<Layout><PlanList /></Layout>} />
                <Route path="/support" element={<Layout><SupportDashboard /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
