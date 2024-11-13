import React, { useEffect, useState } from 'react';
import { fetchPlayers } from '@/Services/PlayerService';
import { Player, Balance } from '@/types/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Navigation from '@/Components/Navigation';
import BalanceList from '@/Components/Balance/BalanceList';
import BalanceModal from '@/Components/Balance/BalanceModal';
import { fetchBalance, deleteBalance } from '@/Services/BalanceService';
import BalanceDeleteModal from '@/Components/Balance/BalanceDeleteModal';

const BalanceContainer = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [balances, setBalances] = useState<Balance[]>([]);
    const [showGuildFormModal, setShowGuildFormModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [balanceToDelete, setBalanceToDelete] = useState<number | null>(null);

    useEffect(() => {
        loadBalances();
        loadPlayers();
    }, []);

    const loadBalances = async () => {
        const fetchedBalances = await fetchBalance();
        setBalances(fetchedBalances);
    };

    const loadPlayers = async () => {
        const fetchedPlayers = await fetchPlayers();
        setPlayers(fetchedPlayers);
    };

    const handleDistributePlayers = () => {
        loadBalances();
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleShowDeleteModal = (id: number) => {
        setBalanceToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (balanceToDelete) {
            await deleteBalance(balanceToDelete);
            loadBalances();
            handleCloseDeleteModal();
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Formação das Guildas</h2>}>
            <div>
                <Navigation />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center px-6 py-4">
                                <h3 className="text-xl font-semibold">Guilds Formadas</h3>
                                <button
                                    onClick={() => setShowGuildFormModal(true)}
                                    className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                                >
                                    Formar Guilda
                                </button>
                            </div>
                            <BalanceList guilds={balances} onDelete={handleShowDeleteModal} />
                        </div>
                    </div>
                </div>
                <BalanceModal
                    show={showGuildFormModal}
                    onClose={() => setShowGuildFormModal(false)}
                    players={players}
                    onDistribute={handleDistributePlayers}
                />
                <BalanceDeleteModal show={showDeleteModal} onClose={handleCloseDeleteModal} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
};

export default BalanceContainer;
