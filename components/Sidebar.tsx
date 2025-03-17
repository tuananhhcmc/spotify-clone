"use client";
import {
    HomeIcon,
    HeartIcon,
    PlusCircleIcon,
    RssIcon,
    MagnifyingGlassIcon, // Thay thế SearchIcon
    BuildingLibraryIcon // Thay thế LibraryIcon
  } from '@heroicons/react/24/outline';
  
import IconButton from './IconButton'
import { signOut, useSession } from 'next-auth/react';
 
const Divider = () => <hr className='border-t-[0.1px] border-gray-900' />

  
const Sidebar = () => {
    const {data:session} = useSession()
    return (
        <div className='text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-scroll scrollbar-hidden sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block'>
            <div className='space-y-4'>
                {session?.user && <button onClick={() => {
                    signOut()
                }}>{session.user.name}-Log Out</button>}
                <IconButton icon={HomeIcon} label='Home' />
                <IconButton icon={MagnifyingGlassIcon} label='Search' />
                <IconButton icon={BuildingLibraryIcon} label='Your Library' />
  
                <Divider />
  
                <IconButton icon={PlusCircleIcon} label='Create Playlist' />
                <IconButton icon={HeartIcon} label='Liked Songs' />
                <IconButton icon={RssIcon} label='Your episodes' />
  
                <Divider />
  
                {/* Danh sách playlist */}
                {Array.from({ length: 27 }).map((_, index) => (
                    <p key={index} className='cursor-pointer hover:text-white'>
                        PLAYLIST {index + 1}
                    </p>
                ))}
            </div>
        </div>
    )
}
  
export default Sidebar
