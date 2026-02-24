customElements.define(
  "custom-pic",
  class extends HTMLElement {
    constructor() {
      super();

      this.mounted = false;
    }

    static get observedAttributes() {
      return ["url", "srcset"];
    }

    async loadImage(src, srcset) {
      let result;
      await new Promise((resolve) => {
        result = new Image();
        result.onload = resolve;
        if (srcset) {
          result.srcset = srcset;
        }
        result.src = src;
      });

      return result;
    }

    connectedCallback() {
      const src = this.getAttribute("src");
      const srcset = this.getAttribute("srcset");
      this.loadImage(src, srcset).then((image) => {
        const imageSize = this.getNativeSize(image);
        var sheet = new CSSStyleSheet();
        sheet.replaceSync(`
          :host {
            display: flex;
            width: 100%;
            height: 100%;
            max-width: ${imageSize.width}px;
            max-height: ${imageSize.height}px;

            align-items: center;
            justify-content: center;
          }

          img {
            display: block;
            max-width: 100%;
            max-height: 100%;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `);

        const shadow = this.attachShadow({ mode: "open" });
        shadow.adoptedStyleSheets = [sheet];
        shadow.appendChild(image);

        this.elem = image;
        this.mounted = true;
      });
    }

    getNativeSize(image) {
      return {
        width: image.naturalWidth,
        height: image.naturalHeight,
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }

      this[name] = newValue;
    }
  },
);
