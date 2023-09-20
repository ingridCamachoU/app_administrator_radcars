import { PlusIcon } from '@heroicons/react/24/solid';
import { DarkMode } from '../../context/DarkMode';
import { useContext } from 'react';

const Header_pages = ({title, onClick}) => {

    const {darkMode} = useContext(DarkMode);
    return (
        <>
            <div className='flex w-full justify-between pr-10 items-center'>
                <h1 className={`${darkMode ? ' text-white text-3xl' : ' text-slate-950 text-3xl'}`}>{title}</h1>
                <button
                    onClick={onClick}
                    className='bg-indigo-500 w-10 h-6 justify-center flex items-center rounded-xl' 
                    >
                    <PlusIcon className='w-5 h-4 text-indigo-500 rounded-full bg-slate-50'/>
                </button>
            </div>        
        </>
    );
}

export default Header_pages;
