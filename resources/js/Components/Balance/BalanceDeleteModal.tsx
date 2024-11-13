import React from 'react';

interface BalanceDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const BalanceDeleteModal: React.FC<BalanceDeleteModalProps> = ({ show, onClose, onDelete }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50 ${show ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Confirmar Exclusão</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p>Tem certeza que deseja excluir este balançeamento?</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceDeleteModal;
