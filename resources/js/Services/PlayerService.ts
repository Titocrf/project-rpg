import axios from 'axios';
import { Player, PlayerClass } from '@/types/types';

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await axios.get('/api/players');
  return response.data;
};

export const fetchClasses = async (): Promise<PlayerClass[]> => {
  const response = await axios.get('/api/classes');
  return response.data;
};

export const createPlayer = async (player: { name: string; class_id: number; xp: number }) => {
  await axios.post('/api/players', player);
};

export const updatePlayer = async (id: number, player: { name: string; class_id: number; xp: number }) => {
  await axios.put(`/api/players/${id}`, player);
};

export const confirmPlayer = async (playerId: number) => {
  await axios.post(`/api/players/${playerId}/confirm`);
};

export const unconfirmPlayer = async (playerId: number) => {
  await axios.post(`/api/players/${playerId}/unconfirm`);
};


export const deletePlayer = async (id: number) => {
  await axios.delete(`/api/players/${id}`);
};
