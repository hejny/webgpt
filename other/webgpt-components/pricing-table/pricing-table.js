  // Define the PricingTable class
  class PricingTable extends HTMLElement {
    constructor() {
      super();

      // Create a shadow DOM
      const shadow = this.attachShadow({mode: 'open'});

      // Create a container for the pricing plans
      const container = document.createElement('div');
      container.setAttribute('class', 'pricing-container');

      // Append the container to the shadow DOM
      shadow.appendChild(container);
    }
  }

  // Define the PricingPlan class
  class PricingPlan extends HTMLElement {
    constructor() {
      super();

      // Create a shadow DOM
      const shadow = this.attachShadow({mode: 'open'});

      // Create a container for the pricing plan
      const container = document.createElement('div');
      container.setAttribute('class', 'pricing-plan');

      // Get the label and price attributes
      const label = this.getAttribute('label');
      const price = this.getAttribute('price');
      const suppressed = this.hasAttribute('suppressed');

      // Create the HTML for the pricing plan
      container.innerHTML = `
        <div class="plan-header">
          <h2>${label}</h2>
          <p>${price}</p>
        </div>
        <div class="plan-features">
          <slot></slot>
        </div>
      `;

      // Add a suppressed class if the plan is suppressed
      if (suppressed) {
        container.classList.add('suppressed');
      }

      // Append the container to the shadow DOM
      shadow.appendChild(container);
    }
  }

  // Define the PricingFeature class
  class PricingFeature extends HTMLElement {
    constructor() {
      super();

      // Create a shadow DOM
      const shadow = this.attachShadow({mode: 'open'});

      // Create a container for the pricing feature
      const container = document.createElement('div');
      container.setAttribute('class', 'pricing-feature');

      // Set the content of the container to the text content of the feature
      container.textContent = this.textContent;

      // Append the container to the shadow DOM
      shadow.appendChild(container);
    }
  }

  // Define the styles for the custom elements
  const styles = `
    .pricing-container {
      display: flex;
      justify-content: space-around;
      margin: 20px;
    }

    .pricing-plan {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      flex: 1;
    }

    .suppressed {
      opacity: 0.5;
    }

    .plan-header {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .plan-header h2 {
      margin: 0;
    }

    .plan-features {
      text-align: left;
    }

    .pricing-feature {
      margin: 5px 0;
    }
  `;

  // Create a style element and set the styles
  const style = document.createElement('style');
  style.textContent = styles;

  // Register the custom elements
  customElements.define('pricing-table', PricingTable);
  customElements.define('pricing-plan', PricingPlan);
  customElements.define('pricing-feature', PricingFeature);

  // Append the style element to the document head
  document.head.appendChild(style);