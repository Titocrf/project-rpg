import React from 'react';
import { Balance } from '@/types/types';

interface BalanceTableProps {
  guilds: Balance[];
  onDelete: (id: number) => void;
}

const BalanceList: React.FC<BalanceTableProps> = ({ guilds, onDelete }) => {
  if (!guilds || guilds.length === 0) {
    return <div className="space-y-4 border p-4">Nenhuma guilda formada ainda.</div>;
  }

  return (
    <div className="mt-6 space-y-6">
      {guilds.map(guild => (
        <div key={guild.id} className="border p-4 rounded-lg shadow-md flex justify-between items-start bg-white">
          {/* Informações da guilda */}
          <div className="flex-1">
            <h4 className="font-bold text-xl">{guild.name}</h4>
            <p className="text-sm text-gray-500">Total de XP: <span className="font-semibold text-black">{guild.totalXP}</span></p>
            
            {/* Lista de jogadores */}
            <div className="mt-4">
              <h5 className="font-semibold text-lg mb-2">Jogadores:</h5>
              <ul className="space-y-2">
                {guild.players.map(player => (
                  <li key={`${guild.id}-${player.id}`} className="flex justify-between text-sm text-gray-700">
                    <span>{player.name} - {player.class.name}</span>
                    <span className="text-xs text-gray-500">({player.xp} XP)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Botão de exclusão */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
            onClick={() => onDelete(guild.id)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default BalanceList;
