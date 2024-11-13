import React, { useEffect, useState } from 'react';
import { fetchPlayers, fetchClasses, updatePlayer, createPlayer, deletePlayer } from '@/Services/PlayerService';
import { Player, PlayerClass } from '@/types/types';
import PlayerList from '@/Components/Player/PlayerList';
import PlayerModal from '@/Components/Player/PlayerModal';
import Navigation from '@/Components/Navigation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PlayerDeleteModal from '@/Components/Player/PlayerDeleteModal';

const PlayerContainer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [classes, setClasses] = useState<PlayerClass[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState<{ name: string; class_id: number; xp: number }>({
    name: '',
    class_id: 1,
    xp: 0,
  });
  const [playerToDelete, setPlayerToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadPlayers();
    loadClasses();
  }, []);

  const loadPlayers = async () => {
    const fetchedPlayers = await fetchPlayers();
    setPlayers(fetchedPlayers);
  };

  const loadClasses = async () => {
    const fetchedClasses = await fetchClasses();
    setClasses(fetchedClasses);
  };

  const handleShowModal = (player?: Player) => {
    setSelectedPlayer(player || null);
    setNewPlayer(player ? { name: player.name, class_id: player.class_id, xp: player.xp } : { name: '', class_id: 1, xp: 0 });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowDeleteModal = (id: number) => {
    setPlayerToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleSavePlayer = async (data: any) => {
    if (selectedPlayer) {
      await updatePlayer(selectedPlayer.id, data);
    } else {
      await createPlayer(data);
    }
    loadPlayers();
    handleCloseModal();
  };

  const handleDeletePlayer = async () => {
    if (playerToDelete) {
      await deletePlayer(playerToDelete);
      loadPlayers();
      handleCloseDeleteModal();
    }
  };

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Jogadores</h2>}>
      <div>
        <Navigation />
        <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="text-xl font-semibold">Lista de Jogadores</h3>
                <button
                  onClick={() => handleShowModal()}
                  className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                >
                  Novo Jogador
                </button>
              </div>
              <PlayerList players={players} classes={classes} onEdit={handleShowModal} onDelete={handleShowDeleteModal} />
            </div>
          </div>
        </div>
        <PlayerModal
          show={showModal}
          onClose={handleCloseModal}
          player={newPlayer}
          classes={classes}
          onSave={handleSavePlayer}
        />
        <PlayerDeleteModal show={showDeleteModal} onClose={handleCloseDeleteModal} onDelete={handleDeletePlayer} />
      </div>
    </AuthenticatedLayout>
  );
};

export default PlayerContainer;
