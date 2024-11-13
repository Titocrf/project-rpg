import { Guild } from '@/types/types';
import React from 'react';

interface GuildListProps {
  guilds: Guild[];
  onEdit: (player?: Guild) => void;
  onDelete: (id: number) => void;
}

const GuildList: React.FC<GuildListProps> = ({ guilds, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="p-6 text-gray-900 border p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold" style={{ width: '5%' }}>ID</th>
              <th className="px-6 py-3 text-left font-semibold" style={{ width: '75%' }}>Nome</th>
              <th className="px-6 py-3 text-center font-semibold" style={{ width: '20%' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {guilds.map((guild) => (
              <tr key={guild.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{guild.id}</td>
                <td className="px-6 py-3">{guild.name}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded-md mr-2"
                    onClick={() => onEdit(guild)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md"
                    onClick={() => onDelete(guild.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuildList;
