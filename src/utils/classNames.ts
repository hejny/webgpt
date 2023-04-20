/**
 * Util for joining multiple truthy class names into one string
 *
 * @argument classes Classes to join. If not truthy, it is not used in the
 * final string
 *
 */
export function classNames(...classes: Array<string | undefined | false | null>) {
    return classes.filter((className) => className).join(' ');
}
