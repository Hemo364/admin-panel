import { Link } from 'react-router';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Page404 = () => {
    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center gap-4 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-6'>
            <HiOutlineExclamationCircle className='text-6xl text-indigo-500' />
            <h1 className='text-4xl font-bold'>404</h1>
            <p className='text-slate-500 dark:text-slate-400'>صفحه‌ای که دنبالش بودید پیدا نشد.</p>
            <Link to='/dashboard' className='btn-primary mt-2'>بازگشت به داشبورد</Link>
        </div>
    );
};

export default Page404;
