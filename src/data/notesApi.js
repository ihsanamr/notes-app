import Swal from "sweetalert2";

const BASE_URL = "https://notes-api.dicoding.dev/v2";

export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal mengambil catatan");
    }
    console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error fetching notes:", error);

    Swal.fire({
      icon: "error",
      title: "Gagal Mengambil Catatan",
      text: error.message,
    });
    return [];
  }
}

export async function createNote({ title, body }) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal membuat catatan");
    }

    return result.data;
  } catch (error) {
    console.error("Error creating note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal Membuat Catatan",
      text: error.message,
    });
  }
}

export async function getArchivedNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal mengambil catatan arsip");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    return [];
  }
}

export async function archiveNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal mengarsipkan catatan");
    }

    return result;
  } catch (error) {
    console.error("Error archiving note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal Mengarsipkan",
      text: error.message,
    });
  }
}

export async function unarchiveNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal mengembalikan catatan");
    }

    return result;
  } catch (error) {
    console.error("Error unarchiving note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal Mengembalikan Catatan",
      text: error.message,
    });
  }
}

export async function deleteNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal menghapus catatan");
    }

    // console.log(result);

    return result;
  } catch (error) {
    console.error("Error deleting note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal Menghapus",
      text: error.message,
    });
  }
}
