class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  connectedCallback() {
    if (this._note) this.render();
  }

  formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  render() {
    const title = this._note ? this._note.title : "Tanpa Judul";
    const body = this._note ? this._note.body : "Tidak ada isi";
    const date = this._note ? this.formatDate(this._note.createdAt) : "";

    this.innerHTML = `
      <style>
        .card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          animation: fadeIn 0.5s ease-out;
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(67, 97, 238, 0.1);
        }

        .card h3 {
          margin-top: 0;
          margin-bottom: 6px;
          font-size: 1.35rem;
          color: #1a1a2e;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card .date {
          font-size: 0.82rem;
          color: #8d99ae;
          margin-bottom: 20px;
          font-weight: 500;
          display: block;
        }

        .card p {
          margin-top: 0;
          font-size: 1rem;
          color: #4a4e69;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.7;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }

        .delete-btn, .archive-btn {
          flex: 1;
          border: none;
          color: white;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .delete-btn {
          background: transparent;
          color: #ef233c;
          border: 2px solid rgba(239, 35, 60, 0.1);
        }

        .delete-btn:hover {
          background: #ef233c;
          color: white;
          border-color: #ef233c;
        }

        .archive-btn {
          background: rgba(67, 97, 238, 0.05);
          color: #4361ee;
          border: 2px solid transparent;
        }

        .archive-btn:hover {
          background: rgba(67, 97, 238, 0.1);
        }
      </style>
      
      <article class="card">
        <h3>${title}</h3>
        <span class="date">${date}</span>
        <p>${body}</p>
        <div class="action-buttons">
          <button class="archive-btn">
            ${this._note.archived ? "Kembalikan" : "Arsipkan"}
          </button>
          <button class="delete-btn">Hapus</button>
        </div>
      </article>
    `;

    const deleteButton = this.querySelector(".delete-btn");

    deleteButton.addEventListener("click", () => {
      console.log("NoteItem: Delete button clicked", this._note.id);
      this.dispatchEvent(
        new CustomEvent("note-delete", {
          detail: { id: this._note.id },
          bubbles: true,
          composed: true,
        })
      );
    });

    this.querySelector(".archive-btn").addEventListener("click", () => {
      console.log("NoteItem: Archive button clicked", this._note.id);
      this.dispatchEvent(
        new CustomEvent("note-archive-toggle", {
          detail: {
            id: this._note.id,
            archived: this._note.archived,
          },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("note-item", NoteItem);
