"use client";

import { useEffect, useState } from "react";
import AdminPanelModal from "@/features/admin/components/AdminPanelModal";

export default function AdminShortcutListener() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d";
      if (!isShortcut) return;

      event.preventDefault();
      setOpen((current) => !current);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return <AdminPanelModal onClose={() => setOpen(false)} />;
}
