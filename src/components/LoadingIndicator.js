class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        :host(.visible) {
          visibility: visible;
          opacity: 1;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #dfe6e9;
          border-top: 5px solid #6c5ce7;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner"></div>
    `;
  }

  show() {
    this.classList.add("visible");
  }

  hide() {
    this.classList.remove("visible");
  }
}

customElements.define("loading-indicator", LoadingIndicator);
