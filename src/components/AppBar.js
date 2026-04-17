class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["app-title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "app-title") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  set archiveCount(count) {
    const badge = this._shadowRoot.getElementById("archive-badge");
    if (badge) {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.add("visible");
      } else {
        badge.classList.remove("visible");
      }
    }
  }

  render() {
    const title = this.getAttribute("app-title") || "Notes";
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          color: #1a1a2e;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
        }
        
        div.container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h1 {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
        }

        nav ul {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .icon-btn {
          background: rgba(67, 97, 238, 0.05);
          border: none;
          color: #4a4e69;
          cursor: pointer;
          padding: 10px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .icon-btn:hover {
          background-color: rgba(67, 97, 238, 0.1);
          color: #4361ee;
          transform: translateY(-2px);
        }

        .icon-btn svg {
          width: 28px;
          height: 28px;
          fill: currentColor;
          transition: fill 0.3s;
        }

        .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #ef233c;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: bold;
          min-width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border-radius: 50%;
          border: 2px solid #fff;
          display: none;
          box-shadow: 0 4px 8px rgba(239, 35, 60, 0.3);
        }
        
        .badge.visible {
          display: block;
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
      
      <div class="container">
        <header>
          <h1>${title}</h1>
        </header>
        <nav>
          <ul>
            <li>
              <button id="archive-btn" class="icon-btn" aria-label="Arsip">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.58L16 13.5z"/>
                </svg>
                <span id="archive-badge" class="badge">0</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    `;

    const btnArchive = this._shadowRoot.getElementById("archive-btn");

    btnArchive.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-archive-modal", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("app-bar", AppBar);
