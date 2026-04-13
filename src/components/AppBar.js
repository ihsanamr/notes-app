class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
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
    const title = this.getAttribute("title") || "Notes";
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #6c5ce7;
          color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        div.container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 24px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h1 {
          margin: 0;
          font-size: 1.8rem;
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
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .icon-btn:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .icon-btn svg {
          width: 32px;
          height: 32px;
          fill: currentColor;
        }

        .badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ff7675;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: bold;
          min-width: 20px;
          height: 20px;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          transform: translate(25%, -25%);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          z-index: 10;
        }
        
        .badge.visible {
          display: flex;
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
