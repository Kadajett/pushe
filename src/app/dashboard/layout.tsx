'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
} from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome,
  faFilm,
  faHeart,
  faClock,
  faUsers,
  faGear,
  faBars,
  faBell,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

import type { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

// Image URLs used:
// 1. /logo.svg - Used for the StreamFlix logo in sidebar
// 2. User profile image comes from either:
//    - user.image (from generateUser())
//    - Fallback: "https://avatar.vercel.sh/" + user.username

// Unsplash API helper function
async function getUnsplashImage(query: string) {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('Unsplash access key not configured');
  }

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }
    return response.json() as Promise<{ urls: { regular: string } }>;
  });

  return response.urls.regular;
}

type IconType = typeof FontAwesomeIcon;

type NavigationItem = {
  name: string;
  href: string;
  icon: IconProp;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/dashboard', icon: faHome, current: true },
  { name: 'Movies', href: '/movies', icon: faFilm, current: false },
  { name: 'Watchlist', href: '/watchlist', icon: faHeart, current: false },
  { name: 'History', href: '/history', icon: faClock, current: false },
  { name: 'Friends', href: '/friends', icon: faUsers, current: false },
  { name: 'Settings', href: '/settings', icon: faGear, current: false },
] satisfies NavigationItem[];

const user = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  id: "123"
};

const recentMovies = [
  {
    title: "The Matrix",
    description: "A computer programmer discovers a mysterious world.",
    releaseDate: "1999-03-31",
    runtime: 136,
    ratings: { average: 8.7, count: 1500 }
  },
  {
    title: "Inception",
    description: "A thief enters dreams to steal secrets.",
    releaseDate: "2010-07-16",
    runtime: 148,
    ratings: { average: 8.8, count: 2000 }
  }
];

const recommendations = {
  userId: "123",
  recommendedMovies: [
    {
      movie: {
        title: "The Dark Knight",
        description: "Batman faces his greatest challenge.",
        releaseDate: "2008-07-18",
        runtime: 152
      },
      score: 4.8
    },
    {
      movie: {
        title: "Pulp Fiction",
        description: "Multiple storylines interweave in Los Angeles.",
        releaseDate: "1994-10-14",
        runtime: 154
      },
      score: 4.6
    }
  ],
  generatedAt: new Date()
};

const activityLog = [
  { id: 1, action: "Watched The Matrix", timestamp: "2024-01-20T10:00:00Z" },
  { id: 2, action: "Added Inception to watchlist", timestamp: "2024-01-19T15:30:00Z" },
  { id: 3, action: "Rated Interstellar", timestamp: "2024-01-18T20:15:00Z" }
];

const notifications = [
  {
    id: 1,
    title: "New Release",
    message: "The Matrix 4 is now available",
    createdAt: "2024-01-20T08:00:00Z",
    read: false
  },
  {
    id: 2,
    title: "Friend Activity",
    message: "Jane started watching Inception",
    createdAt: "2024-01-19T14:30:00Z",
    read: true
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)


  
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  useEffect(() => {
    const loadProfilePicture = async () => {
      const url = await getUnsplashImage(user.name ?? user.username);
      setProfilePictureUrl(url);
    };
    void loadProfilePicture();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 xl:hidden">
        {/* Similar mobile sidebar implementation as template, but with our navigation items */}
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <div className="flex h-16 shrink-0 items-center">
            {'/logo.svg' && (
              <Image
                src="/logo.svg"
                alt="StreamFlix"
                className="h-8 w-auto"
                width={32}
                height={32}
              />
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-1 flex-col fixed pt-16">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                        )}
                      >
                        <FontAwesomeIcon icon={item.icon} className="h-6 w-6 shrink-0" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              {/* User profile */}
              <li className="-mx-6 mt-auto">
                <a
                  href="/profile"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {profilePictureUrl && (
                    <Image
                      src={profilePictureUrl}
                      alt={user.name ?? user.username}
                      className="h-8 w-8 rounded-full bg-gray-800"
                      width={32}
                      height={32}
                    />
                  )}
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user.name ?? user.username}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="xl:pl-72">
        {/* Top navigation */}
        <div className="fixed w-full top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Search */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="flex flex-1" action="/search">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500" aria-hidden="true" />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                  placeholder="Search movies, shows..."
                  type="search"
                  name="search"
                />
              </div>
            </form>
            
            {/* Notifications */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <FontAwesomeIcon icon={faBell} className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="lg:pr-96 pt-16">
          {children}
        </main>

        {/* Activity feed sidebar */}
        <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-base font-semibold text-white">Activity</h2>
          </header>
          <ul role="list" className="divide-y divide-white/5">
            {activityLog.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-x-3">
                  <div className="flex-auto">
                    <p className="text-sm text-gray-400">
                      {activity.action} - {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}