import React, { useEffect, useState } from 'react';
import { fetchGuild, updateGuild, createGuild, deleteGuild } from '@/Services/GuildService';
import { Guild } from '@/types/types';
import Navigation from '@/Components/Navigation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuildModal from '@/Components/Guild/GuildModal';
import GuildDeleteModal from '@/Components/Guild/GuildDeleteModal';
import GuildList from '@/Components/Guild/GuildList';

const GuildContainer = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<Guild | null>(null);
  const [newGuild, setNewGuild] = useState<{ name: string; }>({name: ''});
  const [guildToDelete, setGuildToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadGuilds();
  }, []);

  const loadGuilds = async () => {
    const fetchedPlayers = await fetchGuild();
    setGuilds(fetchedPlayers);
  };

  const handleShowModal = (guild?: Guild) => {
    setSelected(guild || null);
    setNewGuild(guild ? { name: guild.name } : { name: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowDeleteModal = (id: number) => {
    setGuildToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleSave = async (data: any) => {
    if (selected) {
      await updateGuild(selected.id, data);
    } else {
      await createGuild(data);
    }
    loadGuilds();
    handleCloseModal();
  };

  const handleDeletePlayer = async () => {
    if (guildToDelete) {
      await deleteGuild(guildToDelete);
      loadGuilds();
      handleCloseDeleteModal();
    }
  };

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Guilds</h2>}>
      <div>
        <Navigation />
        <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="text-xl font-semibold">Lista de Guilds</h3>
                <button
                  onClick={() => handleShowModal()}
                  className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                >
                  Nova Guild
                </button>
              </div>
              <GuildList guilds={guilds} onEdit={handleShowModal} onDelete={handleShowDeleteModal} />
            </div>
          </div>
        </div>
        <GuildModal
          show={showModal}
          onClose={handleCloseModal}
          guild={newGuild}
          onSave={handleSave}
        />
        <GuildDeleteModal show={showDeleteModal} onClose={handleCloseDeleteModal} onDelete={handleDeletePlayer} />
      </div>
    </AuthenticatedLayout>
  );
};

export default GuildContainer;
