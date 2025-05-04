import { create } from 'zustand';
import { storageKeys } from '../config/storage-keys';

type User = {
  id: string;
  name: string;
  email: string;
};

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

const userStore = create<State & Actions>((set) => ({
  user: (() => {
    const stored =
      typeof window !== 'undefined'
        ? sessionStorage.getItem(storageKeys.user)
        : null;
    return stored ? JSON.parse(stored) : null;
  })(),
  setUser: (user) => {
    sessionStorage.setItem(storageKeys.user, JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    sessionStorage.removeItem(storageKeys.user);
    set({ user: null });
  },
}));

export const useUserStore = () => {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const clearUser = userStore((state) => state.clearUser);

  return { user, setUser, clearUser };
};

export default userStore;
