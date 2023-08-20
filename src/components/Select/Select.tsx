import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './Select.module.css';

interface SelectProps<TValue extends string | number | symbol> {
    label?: string;
    value: TValue;
    onChange(newValue: TValue): void;
    visibleButtons: number;
    options: Record<TValue, string | ReactNode>;

        /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
    isDisabled?: boolean;
}

export function Select<TValue extends string | number | symbol>(props: SelectProps<TValue>) {
    const { label, value, onChange, visibleButtons, className, isDisabled } = props;

    const options: Array<{ id: TValue; label: string | ReactNode }> = Object.entries(props.options).map(
        ([id, label]) => ({
            id: id as TValue,
            label: label as string | ReactNode,
        }),
    );
    const firstOptions = options.slice(0, visibleButtons);
    const restOptions = options.slice(visibleButtons);

    return (
        <div className={classNames(styles.Select, className, isDisabled && styles.disabled)}>
            {label && <span className={styles.title}>{label}</span>}

            {firstOptions.map((option) => (
                <button
                    className={classNames(styles.option, value === option.id && styles.selected)}
                    key={(option.id === null ? 'null' : option.id === undefined ? 'undefined' : option.id).toString()}
                    onClick={() => void onChange(option.id)}
                >
                    {option.label}
                </button>
            ))}

            {restOptions.length !== 0 && (
                <select
                    disabled={isDisabled}
                    className={classNames(
                        styles.option,
                        !firstOptions.some(({ id }) => id === value) && styles.selected,
                    )}
                    onChange={(event) => {
                        const i = parseInt(event.target.value);

                        if (i === -1) {
                            return;
                        }

                        onChange(restOptions[i]!.id);
                    }}
                    value={
                        firstOptions.some(({ id }) => id === value)
                            ? 'FIRST_EMPTY_SELECT_VALUE'
                            : restOptions.findIndex(({ id }) => id === value)
                    }
                >
                    <option value={-1}>--- Select ---</option>
                    {restOptions.map((option, i) => (
                        <option key={i} value={i}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
