import { create } from "zustand";
import type { Lead } from "../types/lead";

type LeadStore = {
  leads: Lead[];

  addLead: (lead: Lead) => void;

  updateLead: (
    id: string,
    lead: Partial<Lead>
  ) => void;

  deleteLead: (id: string) => void;

  getLead: (id: string) => Lead | undefined;
};

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],

  addLead: (lead) =>
    set((state) => ({
      leads: [...state.leads, lead],
    })),

  updateLead: (id, lead) =>
    set((state) => ({
      leads: state.leads.map((item) =>
        item.id === id
          ? {
              ...item,
              ...lead,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter(
        (item) => item.id !== id
      ),
    })),

  getLead: (id) =>
    get().leads.find(
      (lead) => lead.id === id
    ),
}));