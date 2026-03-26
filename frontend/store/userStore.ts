import { create } from "zustand";
import type { UserProfile } from "@/types";

interface UserStore {
  userProfile: UserProfile | null;
  setUser: (profile: UserProfile) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userProfile: null,
  setUser: (profile) => set({ userProfile: profile }),
}));

export default useUserStore;
