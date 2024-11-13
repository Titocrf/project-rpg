import React, { useState, useEffect } from 'react';

interface PlayerModalProps {
  show: boolean;
  onClose: () => void;
  player: { name: string; class_id: number; xp: number };
  classes: { id: number; name: string }[];
  onSave: (playerData: { name: string; class_id: number; xp: number }) => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ show, onClose, player, classes, onSave }) => {
  const [name, setName] = useState<string>('');
  const [class_id, setClassId] = useState<number>(1);
  const [xp, setXp] = useState<number>(0);

  useEffect(() => {
    if (show && player) {
      setName(player.name);
      setClassId(player.class_id);
      setXp(player.xp);
    }
  }, [show, player]);

  const handleSave = () => {
    onSave({ name, class_id, xp });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50 ${show ? 'block' : 'hidden'}`}
    >
      <div
        className="bg-white rounded-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{player ? 'Editar Jogador' : 'Novo Jogador'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700">Classe</label>
            <select
              id="class"
              value={class_id}
              onChange={(e) => setClassId(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="xp" className="block text-sm font-medium text-gray-700">XP</label>
            <input
              id="xp"
              type="number"
              placeholder="Digite o XP"
              value={xp}
              onChange={(e) => setXp(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerModal;
