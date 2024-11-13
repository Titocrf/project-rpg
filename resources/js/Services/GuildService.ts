import axios from 'axios';
import { Guild, Player } from '@/types/types';

export const fetchGuild = async (): Promise<Guild[]> => {
  const response = await axios.get('/api/guilds');
  return response.data;
};

export const createGuild = async (player: { name: string; class_id: number; xp: number }) => {
  await axios.post('/api/guilds', player);
};

export const updateGuild = async (id: number, player: { name: string; class_id: number; xp: number }) => {
  await axios.put(`/api/guilds/${id}`, player);
};

export const deleteGuild = async (id: number) => {
  await axios.delete(`/api/guilds/${id}`);
};

