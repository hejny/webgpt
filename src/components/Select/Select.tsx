import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Select.module.css';

interface SelectProps<TValue extends string | number | symbol> {
    label?: string;
    value: TValue;
    onChange(newValue: TValue): void;
    visibleButtons: number;
    options: Record<TValue, string | ReactNode>;
    className?: string;
}

export function Select<TValue extends string | number | symbol>(props: SelectProps<TValue>) {
    const { label, value, onChange, visibleButtons, className } = props;

    const options: Array<{ id: TValue; label: string | ReactNode }> = Object.entries(props.options).map(
        ([id, label]) => ({
            id: id as TValue,
            label: label as string | ReactNode,
        }),
    );
    const firstOptions = options.slice(0, visibleButtons);
    const restOptions = options.slice(visibleButtons);

    return (
        <div className={classNames(styles.Select, className)}>
            {label && <span className={styles.title}>{label}</span>}

            {firstOptions.map((option) => (
                <button
                    key={(option.id === null ? 'null' : option.id === undefined ? 'undefined' : option.id).toString()}
                    onClick={() => void onChange(option.id)}
                    className={classNames(styles.option, value === option.id && styles.selected)}
                >
                    {option.label}
                </button>
            ))}

            {restOptions.length !== 0 && (
                <select
                    onChange={(event) => {
                        const i = parseInt(event.target.value);

                        if (i === -1) {
                            return;
                        }

                        onChange(restOptions[i].id);
                    }}
                    className={classNames(!firstOptions.some(({ id }) => id === value) && styles.selected)}
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
