// import styles from './PricingTableNext.module.css';

interface PricingTableNextProps {
    plans: Plan[];
}

interface Plan {
    id: number;
    name: string;
    price: number;
    benefits: string[];
}

/**
 * @@
 */
export function PricingTableNext(props: PricingTableNextProps) {
    const { plans } = props;
    return (
        <div className="pricing-table">
            {plans.map((plan) => (
                <div className="plan" key={plan.id}>
                    <h2 className="plan-name">{plan.name}</h2>
                    <div className="plan-price">${plan.price}/month</div>
                    <ul className="benefits-list">
                        {plan.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                    <button className="buy-now-btn">Buy Now</button>
                </div>
            ))}
        </div>
    );
}
