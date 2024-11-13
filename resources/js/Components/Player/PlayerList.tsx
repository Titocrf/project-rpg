import { Player } from '@/types/types';
import React from 'react';

interface PlayerListProps {
  players: Player[];
  classes: { id: number; name: string }[];
  onEdit: (player?: Player) => void;
  onDelete: (id: number) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="p-6 text-gray-900 border p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
            <th className="px-6 py-3 text-left font-semibold" style={{ width: '5%' }}>ID</th>
              <th className="px-6 py-3 text-left font-semibold" style={{ width: '30%' }}>Nome</th>
              <th className="px-6 py-3 text-left font-semibold" style={{ width: '25%' }}>Classe</th>
              <th className="px-6 py-3 text-left font-semibold" style={{ width: '15%' }}>XP</th>
              <th className="px-6 py-3 text-center font-semibold" style={{ width: '20%' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{player.id}</td>
                <td className="px-6 py-3">{player.name}</td>
                <td className="px-6 py-3">{player.class.name}</td>
                <td className="px-6 py-3">{player.xp}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded-md mr-2"
                    onClick={() => onEdit(player)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md"
                    onClick={() => onDelete(player.id)}
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

export default PlayerList;
