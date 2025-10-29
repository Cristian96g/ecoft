import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Mapa = lazy(() => import('./pages/Map'))
const Calendario = lazy(() => import('./pages/Calendar'))
const Gamificacion = lazy(() => import('./pages/Gamification'))
const Reportes = lazy(() => import('./pages/Reports'))
const Educacion = lazy(() => import('./pages/Education'))
const Perfil = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Admin = lazy(() => import('./pages/Admin'))

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/gamificacion" element={<Gamificacion />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/educacion" element={<Educacion />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
};