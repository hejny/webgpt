export function nameToSubfolderPath(name: string): Array<string> {
    return [name.substr(0, 1).toLowerCase(), name.substr(1, 1).toLowerCase()];
}
