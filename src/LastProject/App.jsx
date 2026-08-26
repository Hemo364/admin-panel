import Content from './layout/Content/Content';
import SideBar from './layout/SideBar/SideBar';
import Header from './layout/Header/Header';
import { useState } from 'react';

const App = () => {
    const [open, isOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <div className=''>
            <Content open={open} />
            <Header open={open} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <SideBar open={open} isOpen={isOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </div>
    );
};

export default App;
