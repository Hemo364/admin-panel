import { Link } from 'react-router';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Page404 = () => {
    return (
        <div className='flex items-center justify-center min-h-[70vh] p-6'>
            <div className='card-surface flex flex-col items-center gap-4 p-8 sm:p-12 text-center max-w-md w-full'>
                <HiOutlineExclamationCircle className='text-6xl text-indigo-500' />
                <h1 className='text-4xl font-bold'>404</h1>
                <p className='text-slate-500 dark:text-slate-400'>صفحه‌ای که دنبالش بودید پیدا نشد.</p>
                <Link to='/dashboard' className='btn-primary mt-2'>بازگشت به داشبورد</Link>
            </div>
        </div>
    );
};

export default Page404;
