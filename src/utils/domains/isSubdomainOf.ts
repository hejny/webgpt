import { string_domain } from "../typeAliases";

/**
 * Checks if domain is subdomain of parentDomain
 * 
 * @param domain for example: "prague.webgpt.cz"
 * @param parentDomain for example: "webgpt.cz"
 */
export function isSubdomainOf(domain:string_domain, parentDomain:string_domain): boolean {

    if (domain.endsWith(`.${parentDomain}`)) {
        return true;
    }
    return false;
}