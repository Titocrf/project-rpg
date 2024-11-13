import React from 'react';
import NavLink from './NavLink';

const Navigation: React.FC = () => {
    return (
        <nav className="bg-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-4">
                    <NavLink
                        href="/dashboard"
                        active={window.location.pathname === '/dashboard'}
                        className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href="/players"
                        active={window.location.pathname === '/players'}
                        className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Jogadores
                    </NavLink>
                    <NavLink
                        href="/guilds"
                        active={window.location.pathname === '/guilds'}
                        className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Guilds
                    </NavLink>
                    <NavLink
                        href="/balances"
                        active={window.location.pathname === '/balances'}
                        className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Balanceamento
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
