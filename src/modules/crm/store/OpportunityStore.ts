import { create } from "zustand";
import type { Opportunity } from "../types/opportunity";

type OpportunityStore = {
  opportunities: Opportunity[];

  addOpportunity: (opportunity: Opportunity) => void;

  updateOpportunity: (
    id: string,
    opportunity: Partial<Opportunity>
  ) => void;

  deleteOpportunity: (id: string) => void;

  getOpportunity: (
    id: string
  ) => Opportunity | undefined;
};

export const useOpportunityStore =
  create<OpportunityStore>((set, get) => ({
    opportunities: [],

    addOpportunity: (opportunity) =>
      set((state) => ({
        opportunities: [
          ...state.opportunities,
          opportunity,
        ],
      })),

    updateOpportunity: (id, opportunity) =>
      set((state) => ({
        opportunities:
          state.opportunities.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...opportunity,
                  updatedAt:
                    new Date().toISOString(),
                }
              : item
          ),
      })),

    deleteOpportunity: (id) =>
      set((state) => ({
        opportunities:
          state.opportunities.filter(
            (item) => item.id !== id
          ),
      })),

    getOpportunity: (id) =>
      get().opportunities.find(
        (item) => item.id === id
      ),
  }));