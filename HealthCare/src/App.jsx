import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { AppLayout } from './Layout/AppLayout'
import { SignUp } from './Components/AuthComponent/Signup'
import { HomePage } from './Components/HomePageComponent/HomePage'
import { Login } from './Components/AuthComponent/Login'
import { UnAuthorized } from './Components/UnAuthorizedComponent/UnAuthorized'
import { AdminLayout } from './Layout/Layouts/AdminLayout'
import { LayoutAdminIndex } from './Layout/Index/LayoutAdminIndex'
import { DoctorLayout } from './Layout/Layouts/DoctorLayout'
import { LayoutDoctorIndex } from './Layout/Index/LayoutDoctorIndex'
import { DoctorHomePage } from './Components/DoctorComponents/DoctorHomePage'
import { PageNotFound } from './Components/PageNotFoundComponent/PageNotFound'
import { FetchDisabledUsers } from './Components/AdminComponents/fetchDisabledUsers'
import { UpdateDashboardPassword } from './Components/AdminComponents/UpdateDashboardPassword'
import { LayoutPatientIndex } from './Layout/Index/LayoutPatientIndex'
import { PatientLayout } from './Layout/Layouts/PatientLayout'
import { BookAppointment } from './Components/PatientComponents/BookAppointment'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
            <Routes>
              <Route index path="/" element={ <HomePage /> } />
              <Route path="signup" element={ <SignUp />} />
              <Route path="login" element={ <Login />} />
              <Route path="admin" element={
                                            <AdminLayout>
                                              <LayoutAdminIndex />
                                            </AdminLayout>
                                          }>
                <Route index element={ <FetchDisabledUsers /> } />
                <Route path="updateDashboardPassword" element={ <UpdateDashboardPassword /> } />
              </Route>
              <Route path="doctor" element={
                                              <DoctorLayout>
                                                <LayoutDoctorIndex />
                                              </DoctorLayout>
                                            }>
                <Route index element={ <DoctorHomePage /> } />
              </Route>
              <Route path="patient" element={
                                              <PatientLayout>
                                                <LayoutPatientIndex />
                                              </PatientLayout>
                                            }>
                <Route index element={ <BookAppointment /> } />
              </Route>
              <Route path="unauthorized" element={ <UnAuthorized /> } />
              <Route path='*' element={ <PageNotFound /> } />
            </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
