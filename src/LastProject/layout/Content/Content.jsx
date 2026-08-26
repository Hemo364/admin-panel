import {Routes, Route, Navigate } from 'react-router';
import ManageSortingItems from '../../Pages/ManageSortingItems/ManageSortingItems.jsx';
import Users from '../../Pages/Users/Users.jsx';
import Posts from '../../Pages/Posts/Posts.jsx';
import Comments from '../../Pages/Comments/Comments.jsx';
import Tasks from '../../Pages/Tasks/Tasks.jsx';
import Page404 from '../../Components/Page404.jsx';
import Dashboard from '../../Pages/Dashboard/Dashboard.jsx';

const Content = ({ open }) => {
    return (
        <div className={`w-full min-h-screen ${open ? "md:pr-64" : "md:pr-20"} transition-all duration-300 pt-16 bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200`}>
            <div className='p-4 sm:p-6'>
                <Routes>
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/users' element={<Users />}/>
                    <Route path='/posts' element={<Posts />}/>
                    <Route path='/comments' element={<Comments />}/>
                    <Route path='/tasks' element={<Tasks />}/>
                    <Route path='/ManageSortingItems' element={<ManageSortingItems />}/>
                    <Route path='/' element={<Navigate to="/dashboard"/>}/>
                    <Route path='/*' element={<Page404/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Content;