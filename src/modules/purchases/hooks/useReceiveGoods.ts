import {
  goodsReceivedNoteService,
} from "../services/GoodsReceivedNoteService";

import {
  useGoodsReceivedNoteStore,
} from "../store/GoodsReceivedNoteStore";

import type { GoodsReceivedNote } from "../types/GoodsReceivedNote";

export function useReceiveGoods() {
  async function receive(id: string) {
    const notes = await goodsReceivedNoteService.getAll();

    const updated: GoodsReceivedNote[] = notes.map((note): GoodsReceivedNote =>
      note.id === id
        ? {
            ...note,
            status: "Received",
          }
        : note
    );

    useGoodsReceivedNoteStore
      .getState()
      .setNotes(updated);
  }

  return {
    receive,
  };
}