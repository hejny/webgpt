import { string_name } from "../../typeAliases";

export function nameToSubfolderPath(name: string_name): Array<string> {
    return [name.substr(0, 1).toLowerCase(), name.substr(1, 1).toLowerCase()];
}
