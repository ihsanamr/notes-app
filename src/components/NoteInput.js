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
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 32px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: sticky;
          top: 100px;
          z-index: 90;
        }
        .form-title {
          margin-bottom: 24px;
          text-align: center;
          color: #1a1a2e;
          font-size: 1.6rem;
          font-weight: 700;
        }
        .form-group {
          margin-bottom: 24px;
        }
        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #4a4e69;
          font-size: 0.95rem;
        }
        #note-form input, #note-form textarea {
          width: 100%;
          padding: 14px 18px;
          background: rgba(248, 249, 250, 0.7);
          border: 2px solid transparent;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          color: #2b2d42;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #note-form input::placeholder, #note-form textarea::placeholder {
          color: #abb5c4;
        }
        #note-form input:focus, #note-form textarea:focus {
          outline: none;
          background: #ffffff;
          border-color: rgba(67, 97, 238, 0.5);
          box-shadow: 0 4px 15px rgba(67, 97, 238, 0.1);
        }
        #note-form textarea {
          resize: vertical;
          min-height: 140px;
          line-height: 1.6;
        }
        #note-form button {
          background-color: #4361ee;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-family: inherit;
          font-size: 1.05rem;
          width: 100%;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 4px 15px rgba(67, 97, 238, 0.2);
        }
        #note-form button:hover {
          background-color: #3b55d9;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(67, 97, 238, 0.3);
        }
        
        .error-message {
          color: #ef233c;
          font-size: 0.85rem;
          margin-top: 8px;
          font-weight: 500;
          display: none;
        }
        .input-error {
          border-color: rgba(239, 35, 60, 0.5) !important;
          background: #fff !important;
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
