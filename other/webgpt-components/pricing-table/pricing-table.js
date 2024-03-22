class WebgptElement extends HTMLElement {
    constructor() {
        super();
    }

    assertsToBeDirectChildOf(parentTagName) {
        // Note: Need to be in timeout to this.parentElement to be defined
        setTimeout(() => {
            if (this.parentElement.tagName.toLowerCase() !== parentTagName) {
                console.error(
                    `<${this.tagName.toLowerCase()}/> must be a direct child of <${parentTagName}/>, but it is child of <${this.parentElement.tagName.toLowerCase()}/>`,
                    this,
                );
            }
        }, 1);
    }
}

class PricingTable extends WebgptElement {
    constructor() {
        super();
        // TODO: Check that in root
    }
}

class PricingPlan extends WebgptElement {
    constructor() {
        super();
        this.assertsToBeDirectChildOf('pricing-table');
    }
}

class PricingPrice extends WebgptElement {
    constructor() {
        super();
        this.assertsToBeDirectChildOf('pricing-plan');
    }
}

class PricingFeature extends WebgptElement {
    constructor() {
        super();
        this.assertsToBeDirectChildOf('pricing-plan');
    }
}

customElements.define('pricing-table', PricingTable);
customElements.define('pricing-plan', PricingPlan);
customElements.define('pricing-price', PricingPrice);
customElements.define('pricing-feature', PricingFeature);
