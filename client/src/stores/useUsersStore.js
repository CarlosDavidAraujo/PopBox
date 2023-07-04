import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  selectedUser: null,
  setUsers: (_users) => set(() => ({ users: _users })),
  selectUser: (userID) =>
    set((state) => ({
      selectUser: state.users.find((user) => user.id === userID),
    })),
}));
