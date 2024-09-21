import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { AppLayout } from './Layout/AppLayout'
import { SignUp } from './Components/AuthComponent/Signup'
import { HomePage } from './Components/HomePageComponent/HomePage'
import { Login } from './Components/AuthComponent/Login'
import { UnAuthorized } from './Components/UnAuthorizedComponent/UnAuthorized'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/unauthorized" element={<UnAuthorized />} />
            </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
