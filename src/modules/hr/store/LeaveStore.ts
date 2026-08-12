import { create } from "zustand";
import type { LeaveRequest } from "../types/LeaveRequest";

type LeaveState = {
  requests: LeaveRequest[];
  leaves: LeaveRequest[];
  setRequests: (requests: LeaveRequest[]) => void;
  setLeaves: (leaves: LeaveRequest[]) => void;
};

export const useLeaveStore = create<LeaveState>((set) => ({
  requests: [],
  leaves: [],
  setRequests: (requests) => set({ requests, leaves: requests }),
  setLeaves: (leaves) => set({ leaves, requests: leaves }),
}));
