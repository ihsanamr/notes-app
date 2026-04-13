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
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s; 
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.1);
        }

        .card h3 {
          margin-top: 0;
          margin-bottom: 8px;
          font-size: 1.25rem;
          color: #2d3436;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card .date {
          font-size: 0.85rem;
          color: #b2bec3;
          margin-bottom: 16px;
          display: block;
        }

        .card p {
          margin-top: 0;
          font-size: 0.95rem;
          color: #636e72;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.6;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .delete-btn, .archive-btn {
          flex: 1;
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .delete-btn {
          background: #ff7675;
        }

        .delete-btn:hover {
          background: #d63031;
        }

        .archive-btn {
          background: #f1c40f; 
          color: #2d3436;
        }

        .archive-btn:hover {
           background: #f39c12;
        }
        
        .delete-btn:active, .archive-btn:active {
            transform: scale(0.95);
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
