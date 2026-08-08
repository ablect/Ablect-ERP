import { create } from "zustand";
import type { CRMActivity } from "../types/activity";

type ActivityStore = {
  activities: CRMActivity[];

  addActivity: (activity: CRMActivity) => void;

  updateActivity: (
    id: string,
    activity: Partial<CRMActivity>
  ) => void;

  deleteActivity: (id: string) => void;

  getActivity: (
    id: string
  ) => CRMActivity | undefined;
};

export const useActivityStore =
  create<ActivityStore>((set, get) => ({
    activities: [],

    addActivity: (activity) =>
      set((state) => ({
        activities: [
          ...state.activities,
          activity,
        ],
      })),

    updateActivity: (id, activity) =>
      set((state) => ({
        activities:
          state.activities.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...activity,
                  updatedAt:
                    new Date().toISOString(),
                }
              : item
          ),
      })),

    deleteActivity: (id) =>
      set((state) => ({
        activities:
          state.activities.filter(
            (item) => item.id !== id
          ),
      })),

    getActivity: (id) =>
      get().activities.find(
        (item) => item.id === id
      ),
  }));