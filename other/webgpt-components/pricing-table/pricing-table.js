class PricingTable extends HTMLElement {
    constructor() {
        super();
        // TODO: Check that in root
    }
}

class PricingPlan extends HTMLElement {
    constructor() {
        super();
        // TODO: Check that direct parent is <pricing-table/>
    }
}

class PricingPrice extends HTMLElement {
    constructor() {
        super();
        // TODO: Check that direct parent is <pricing-plan/>
    }
}

class PricingFeature extends HTMLElement {
    constructor() {
        super();
        // TODO: Check that direct parent is <pricing-plan/>
    }
}

customElements.define('pricing-table', PricingTable);
customElements.define('pricing-plan', PricingPlan);
customElements.define('pricing-price', PricingPrice);
customElements.define('pricing-feature', PricingFeature);
