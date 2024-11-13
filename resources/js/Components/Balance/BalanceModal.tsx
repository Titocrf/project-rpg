import React, { useState } from 'react';
import { Player } from '@/types/types';
import { confirmPlayer, unconfirmPlayer } from '@/Services/PlayerService';
import { createBalance } from '@/Services/BalanceService';

interface BalanceModalProps {
  show: boolean;
  onClose: () => void;
  players: Player[];
  onDistribute: (guilds: any) => void;
}

const BalanceModal: React.FC<BalanceModalProps> = ({ show, onClose, players, onDistribute }) => {
  const [confirmedPlayers, setConfirmedPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmPlayer = async (player: Player) => {
    setLoading(true);

    try {
      if (confirmedPlayers.some(p => p.id === player.id)) {
        await unconfirmPlayer(player.id);
        setConfirmedPlayers(prev => prev.filter(p => p.id !== player.id));
      } else {
        await confirmPlayer(player.id);
        setConfirmedPlayers(prev => [...prev, player]);
      }
    } catch (error) {
      console.error(error);
      alert('Falha ao confirmar o jogador');
    } finally {
      setLoading(false);
    }
  };

  const handleDistributePlayers = async () => {
    try {
      setLoading(true);
      const confirmedPlayerIds = confirmedPlayers.map(player => ({ id: player.id }));
      const response = await createBalance(confirmedPlayerIds);
      console.log(response);
      onDistribute(response);
      onClose();
    } catch (error: any) {
      console.error(error.response.data.error);
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">Formação de Guild</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-medium">Jogadores Confirmados</h4>
            <div className="space-y-4 mt-4">
              {players.map(player => (
                <div key={player.id} className="flex items-center justify-between">
                  <span>{player.name} ({player.class.name})</span>
                  <button
                    onClick={() => handleConfirmPlayer(player)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-sm ${confirmedPlayers.some(p => p.id === player.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {confirmedPlayers.some(p => p.id === player.id)
                      ? 'Confirmado'
                      : loading
                        ? 'Carregando...'
                        : 'Confirmar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleDistributePlayers}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Distribuir Jogadores
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BalanceModal;
