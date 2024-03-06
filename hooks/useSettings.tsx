import { create } from "zustand";

type settingsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSettings = create<settingsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSettings