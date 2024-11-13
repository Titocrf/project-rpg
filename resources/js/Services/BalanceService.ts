import axios from 'axios';
import { Player, Balance } from '@/types/types';

export const fetchBalance = async (): Promise<Balance[]> => {
  const response = await axios.get('/api/balances');
  return response.data;
};

export const createBalance = async (confirmedPlayerIds: { id: number }[]) => {
  try {
    const response = await axios.post('/api/balances', {
      players: confirmedPlayerIds,
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao distribuir jogadores:', error);
    throw error;
  }
};

export const deleteBalance = async (id: number) => {
  await axios.delete(`/api/balances/${id}`);
};

