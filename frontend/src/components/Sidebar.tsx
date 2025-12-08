'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function Sidebar() {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();

    return (
        <div className="flex flex-col w-full sm:w-[275px] sm:h-screen sm:sticky sm:top-0 px-4 py-4 border-b sm:border-b-0 sm:border-r border-gray-100 bg-white z-50">
            <div className="flex items-center justify-between sm:block mb-4">
                <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                </Link>

                {/* Mobile View: Auth buttons here if space permits, or hamburger. specific request: "in the sidebar... remove nav bar... responsive" */}
                <div className="sm:hidden flex items-center gap-2">
                    {isAuthenticated ? (
                        <Button onClick={logout} variant="outline" size="sm">Logout</Button>
                    ) : (
                        <>
                            <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                            <Link href="/sign-up"><Button size="sm" className="bg-black text-white">Sign up</Button></Link>
                        </>
                    )}
                </div>
            </div>

            <nav className="hidden sm:flex flex-col space-y-1 mb-4 flex-1">
                <SidebarLink href="/" icon={<Home size={26} />} text="Home" active />
            </nav>

            <div className="hidden sm:block mb-8">
                {isAuthenticated ? (
                    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl">
                        <p className="font-bold text-center">Welcome back!</p>
                        <p className="text-sm text-center text-gray-500 mb-2">{user?.name || user?.userName}</p>
                        <Button onClick={logout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold rounded-full">
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full rounded-full font-bold text-black border-gray-300 hover:bg-gray-50">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/sign-up" className="w-full">
                            <Button className="w-full rounded-full font-bold bg-black text-white hover:bg-black/90">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="hidden sm:flex mt-auto items-center justify-between p-3 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                {isAuthenticated && (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200">
                            {user?.avatarUrl && <img src={user.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />}
                        </div>
                        <div className="hidden xl:block">
                            <p className="font-bold text-sm">{user?.name || user?.userName}</p>
                            <p className="text-gray-500 text-sm">@{user?.userName}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SidebarLink({ href, icon, text, active }: { href: string; icon: React.ReactNode; text: string; active?: boolean }) {
    return (
        <Link href={href} className="flex items-center group w-fit">
            <div className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${active ? 'font-bold' : ''} group-hover:bg-gray-100`}>
                {icon}
                <span className="text-xl hidden xl:block">{text}</span>
            </div>
        </Link>
    );
}
