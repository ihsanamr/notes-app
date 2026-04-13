import { animate, stagger } from "animejs";

class ArchiveModal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._isOpen = false;
  }
  set notes(value) {
    this._notes = value;
    this.render();
  }

  get isOpen() {
    return this._isOpen;
  }

  open() {
    this._isOpen = true;
    this.render();
  }

  close() {
    this._isOpen = false;
    this._notes = [];
    this.render();
  }

  connectedCallback() {
    this._initUI();
    this.render();
  }

  _initUI() {
    if (this._shadowRoot.querySelector(".modal-content")) return;

    this._shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: none;
          font-family: 'Poppins', sans-serif;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          background-color: white;
          width: 90%;
          max-width: 800px;
          height: 80vh;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s cubicbezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex-grow: 1;
          background-color: #f5f6fa;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          align-items: start;
        }

        * { box-sizing: border-box; }

        .modal-overlay.visible { opacity: 1; }

        .modal-content.visible { opacity: 1; transform: translate(-50%, -50%) scale(1); }

        .modal-header h2 { margin: 0; font-family: 'Poppins', sans-serif; font-size: 1.5rem; color: #2d3436; }

        .close-btn { background: none; border: none; cursor: pointer; font-size: 1.5rem; color: #636e72; padding: 4px; border-radius: 50%; transition: background-color 0.2s; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; }
        
        .close-btn:hover { background-color: #dfe6e9; color: #2d3436; }
        .empty-message { grid-column: 1 / -1; text-align: center; color: #636e72; padding: 40px; font-family: 'Poppins', sans-serif; }
        .modal-body::-webkit-scrollbar { width: 8px; }
        .modal-body::-webkit-scrollbar-track { background: #f1f1f1; }
        .modal-body::-webkit-scrollbar-thumb { background: #b2bec3; border-radius: 4px; }
        .modal-body::-webkit-scrollbar-thumb:hover { background: #636e72; }
      </style>

      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>Arsip Catatan</h2>
          <button class="close-btn" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body" id="params-container">
          <!-- Notes will be injected here -->
        </div>
      </div>
    `;

    const closeBtn = this._shadowRoot.querySelector(".close-btn");
    const overlay = this._shadowRoot.querySelector(".modal-overlay");

    closeBtn.addEventListener("click", () => this.close());
    overlay.addEventListener("click", () => this.close());
  }

  render() {
    this._initUI();
    this._renderNotes();
    this._updateVisibility();
  }

  _renderNotes() {
    const container = this._shadowRoot.querySelector("#params-container");
    if (!container) return;

    container.innerHTML = "";

    if (this._notes && this._notes.length > 0) {
      this._notes.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.note = note;
        noteItem.style.opacity = "0";
        noteItem.style.transform = "translateY(20px)";
        container.appendChild(noteItem);
      });

      if (this._isOpen) {
        animate(container.querySelectorAll("note-item"), {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(50),
          easing: "easeOutExpo",
          duration: 600,
        });
      }
    } else {
      container.innerHTML =
        '<div class="empty-message">Tidak ada catatan yang diarsipkan</div>';
    }
  }

  _updateVisibility() {
    const overlay = this._shadowRoot.querySelector(".modal-overlay");
    const content = this._shadowRoot.querySelector(".modal-content");

    if (this._isOpen) {
      this.style.display = "block";
      requestAnimationFrame(() => {
        overlay.classList.add("visible");
        content.classList.add("visible");
      });
    } else {
      overlay.classList.remove("visible");
      content.classList.remove("visible");

      setTimeout(() => {
        if (!this._isOpen) {
          this.style.display = "none";
        }
      }, 300);
    }
  }
}

customElements.define("archive-modal", ArchiveModal);
