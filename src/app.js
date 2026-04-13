import "./style.css";
import "./components/AppBar.js";
import "./components/NoteInput.js";
import "./components/NoteItem.js";
import "./components/ArchiveModal.js";
import "./components/LoadingIndicator.js";
import Swal from "sweetalert2";
import { animate, stagger } from "animejs";

import {
  getNotes,
  getArchivedNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
  createNote,
} from "./data/notesApi.js";

const notesContainer = document.getElementById("notes-container");
const archiveModal = document.createElement("archive-modal");
const loadingIndicator = document.createElement("loading-indicator");

document.body.appendChild(archiveModal);
document.body.appendChild(loadingIndicator);

async function updateArchiveBadge() {
  try {
    const appBar = document.querySelector("app-bar");
    const archivedNotes = await getArchivedNotes();
    if (appBar) {
      appBar.archiveCount = archivedNotes.length;
    }
  } catch (error) {
    console.error("Failed to update badge", error);
  }
}

async function renderNotes() {
  try {
    loadingIndicator.show();

    const notes = await getNotes();

    await updateArchiveBadge();

    notesContainer.innerHTML = "";

    if (notes.length === 0) {
      const emptyElement = document.createElement("div");
      emptyElement.textContent = "Tidak ada catatan saat ini";
      emptyElement.style.textAlign = "center";
      emptyElement.style.color = "#636e72";
      emptyElement.style.padding = "20px";
      notesContainer.appendChild(emptyElement);
    } else {
      notes.forEach((note) => {
        const noteElement = document.createElement("note-item");
        noteElement.note = note;

        noteElement.style.opacity = "0";
        noteElement.style.transform = "translateY(20px)";
        notesContainer.appendChild(noteElement);
      });

      animate(notesContainer.querySelectorAll("note-item"), {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100),
        easing: "easeOutExpo",
        duration: 800,
      });
    }
  } catch (error) {
    console.error("Error in renderNotes:", error);
    notesContainer.innerHTML = "";
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal memuat catatan",
    });
  } finally {
    loadingIndicator.hide();
  }
}

async function updateModal() {
  if (archiveModal.isOpen) {
    const archivedNotes = await getArchivedNotes();
    archiveModal.notes = archivedNotes;
  }

  await updateArchiveBadge();
}

document.addEventListener("toggle-archive-modal", async () => {
  try {
    loadingIndicator.show();
    const archivedNotes = await getArchivedNotes();
    archiveModal.notes = archivedNotes;
    archiveModal.open();
  } catch (error) {
    console.error("Error opening archive modal:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal memuat arsip",
    });
  } finally {
    loadingIndicator.hide();
  }
});

document.addEventListener("note-added", async (event) => {
  try {
    loadingIndicator.show();
    await createNote(event.detail);
    await renderNotes();
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Catatan baru ditambahkan",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menambah catatan",
    });
  } finally {
    loadingIndicator.hide();
  }
});

document.addEventListener("note-archive-toggle", async (event) => {
  try {
    loadingIndicator.show();
    const { id, archived } = event.detail;

    if (archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }

    await renderNotes();
    await updateModal();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat mengubah arsip",
    });
  } finally {
    loadingIndicator.hide();
  }
});

document.addEventListener("note-delete", async (event) => {
  try {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Catatan ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      loadingIndicator.show();
      await deleteNote(event.detail.id);
      await renderNotes();
      await updateModal();
      Swal.fire({
        title: "Terhapus!",
        text: "Catatan berhasil dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menghapus catatan",
    });
  } finally {
    loadingIndicator.hide();
  }
});

document.addEventListener("DOMContentLoaded", renderNotes);
