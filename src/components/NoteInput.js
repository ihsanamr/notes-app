import Swal from "sweetalert2";

class NoteInput extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <style>
        .form-container {
          background: #fff;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;

          position: sticky;
          top: 20px;
        }
        .form-title {
          margin-bottom: 20px;
          text-align: center;
          color: #2d3436;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #dfe6e9;
          border-radius: 6px;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
        }
        textarea {
          resize: vertical;
          min-height: 120px;
        }
        button {
          background-color: #6c5ce7;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-family: inherit;
          font-size: 1rem;
          width: 100%;
          transition: background 0.3s;
        }
        button:hover {
          background-color: #5649c0;
        }
        
        .error-message {
          color: #d63031;
          font-size: 0.85rem;
          margin-top: 6px;
          display: none;
        }
        .input-error {
          border-color: #d63031 !important;
        }
      </style>

      <div class="form-container">
        <h2 class="form-title">Buat Catatan Baru</h2>
        <form id="note-form">
          <div class="form-group">
            <label for="title">Judul</label>
            <input type="text" id="title" name="title" placeholder="Ini judul..." required autocomplete="off">
            <span id="titleError" class="error-message">Judul minimal harus 6 karakter.</span>
          </div>
          <div class="form-group">
            <label for="body">Isi Catatan</label>
            <textarea id="body" name="body" placeholder="Tulis catatanmu di sini..." required></textarea>
          </div>
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>
    `;
  }

  addEventListeners() {
    const form = this.querySelector("#note-form");
    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");
    const titleError = this.querySelector("#titleError");

    titleInput.addEventListener("input", () => {
      const minLength = 6;
      if (titleInput.value.length > 0 && titleInput.value.length < minLength) {
        titleInput.classList.add("input-error");
        titleError.style.display = "block";
        titleError.textContent = `Judul minimal harus ${minLength} karakter.`;
      } else {
        titleInput.classList.remove("input-error");
        titleError.style.display = "none";
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      if (title.length < 6 || body.length < 6) {
        Swal.fire({
          icon: "warning",
          title: "Peringatan",
          text: "Judul dan isi catatan harus minimal 6 karakter!",
        });
        return;
      }

      const newNote = {
        id: `notes-${Date.now()}`,
        title: title,
        body: body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      const noteEvent = new CustomEvent("note-added", {
        detail: newNote,
        bubbles: true,
      });
      this.dispatchEvent(noteEvent);

      form.reset();
    });
  }
}

customElements.define("note-input", NoteInput);
