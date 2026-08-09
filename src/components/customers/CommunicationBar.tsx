import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, MessageSquareText, Phone, Send } from "lucide-react";
import { useState } from "react";

import type { Customer } from "../../modules/customers/types/Customer";
import { useUIFeedback } from "./useUIFeedback";

type CommunicationBarProps = {
  customer: Customer;
};

export default function CommunicationBar({ customer }: CommunicationBarProps) {
  const [showSms, setShowSms] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const feedback = useUIFeedback();

  async function copyPhone() {
    if (!customer.phone) return;
    try {
      await navigator.clipboard.writeText(customer.phone);
      setCopied(true);
      feedback.click();
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      feedback.error();
    }
  }

  function openSms() {
    feedback.click();
    setShowSms((value) => !value);
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          href={customer.phone ? `tel:${customer.phone}` : undefined}
          onClick={feedback.click}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          <Phone size={17} />
          <span className="hidden sm:inline">Call</span>
        </motion.a>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={openSms}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-50 px-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
        >
          <MessageSquareText size={17} />
          <span className="hidden sm:inline">SMS</span>
        </motion.button>
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          href={customer.email ? `mailto:${customer.email}` : undefined}
          onClick={feedback.click}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-50 px-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
        >
          <Mail size={17} />
          <span className="hidden sm:inline">Email</span>
        </motion.a>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Phone</p>
          <p className="truncate text-sm font-semibold text-slate-800">{customer.phone || "No phone number"}</p>
        </div>
        <button
          type="button"
          onClick={copyPhone}
          disabled={!customer.phone}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700 disabled:opacity-40"
          title="Copy phone number"
        >
          {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showSms && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            className="overflow-hidden rounded-2xl border border-sky-100 bg-sky-50/70 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">SMS composer</p>
                <p className="text-xs text-slate-500">Ready for your SMS provider/backend integration.</p>
              </div>
              <Send size={17} className="text-sky-600" />
            </div>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              maxLength={320}
              placeholder={`Write a message to ${customer.name}...`}
              className="w-full resize-none rounded-xl border border-sky-100 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">{message.length}/320</span>
              <button
                type="button"
                disabled={!message.trim() || !customer.phone}
                onClick={() => {
                  feedback.success();
                  setMessage("");
                }}
                className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Queue SMS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
