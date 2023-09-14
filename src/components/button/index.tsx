import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts/DrawerContext'

export const AppRoutes = () => {
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Routes>
          <Route path="/home" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}></Button>} />
          
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
};