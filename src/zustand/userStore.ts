import { create } from 'zustand';

interface UserState {
    user: {
        id: string;
        name: string;
    } | null;
    setUser: (user: { id: string; name: string }) => void;
    reset: () => void;
}

export const useUserStore = create<UserState>(set => ({
    user: null,
    setUser: user => set({ user }),
    reset: () => set({ user: null }),
}));
