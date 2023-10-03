import { number_positive, title } from '../../utils/typeAliases';
import styles from './PricingTableNext.module.css';

interface PricingTableNextProps {
    /**
     * @@@
     */
    plans: Plan[];
}

interface Plan {
    /**
     * @@@
     */
    readonly id: number;

    /**
     * @@@
     */
    readonly title: title;

    /**
     * @@@
     */
    readonly price: number_positive;

    /**
     * @@@
     */
    readonly benefits: string[];
}

/**
 * Renders the pricing table
 */
export function PricingTableNext(props: PricingTableNextProps) {
    const { plans } = props;
    return (
        <div className={styles['pricing-table']}>
            {plans.map((plan) => (
                <div className={styles.plan} key={plan.id}>
                    <h2 className={styles['plan-name']}>{plan.title}</h2>
                    <div className={styles['plan-price']}>${plan.price}/month</div>
                    <ul className={styles['benefits-list']}>
                        {plan.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                    <button className={styles['buy-now-btn']}>Buy Now</button>
                </div>
            ))}
        </div>
    );
}

/**
 * TODO: !! Run BPE and check auto-annotations
 */
