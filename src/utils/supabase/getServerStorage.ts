import { SupabaseClient } from '@supabase/supabase-js';
import type { IStorage } from 'everstorage';
import { getSupabaseForServer } from './getSupabaseForServer';
import { Database, Json } from './types';

/**
 * Internal cache for getServerStorage
 * @private
 * @singleton
 */
let serverStorage: IStorage<Json>;

/**
 * Get persistent key-value storage for server (like localStorage for browser)
 *
 * Note: The storage is internaly based on supabase
 * Note: The client is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY on server, use localStorage/sessionStorage in browser
 *
 * @returns instance of supabase client
 */
export function getServerStorage(): IStorage<any> {
    if (!serverStorage) {
        serverStorage = new ServerStorage();
    }

    return serverStorage;
}

class ServerStorage implements IStorage<Json> {
    private readonly supabase: SupabaseClient<Database>;
    public constructor() {
        this.supabase = getSupabaseForServer();
    }

    /**
     * Returns the number of key/value pairs currently present in the list associated with the Json.
     */
    public get length(): Promise<number> {
        return Promise.resolve(0); // <- TODO: Implement
    }

    /**
     * Empties the list associated with the Json of all key/value pairs, if there are any.
     */
    public async clear(): Promise<void> {
        throw new Error('Can not clear whole server storage for security reasons');
    }

    /**
     * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the Json.
     */
    public async getItem(key: string): Promise<Json | null> {
        // TODO: [0] Filter by validUntil
        const { data } = await this.supabase.from('Value').select('value').eq('key', key).single();

        if (!data) {
            return null;
        }

        return data.value;
    }

    /**
     * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of key/value pairs in the Json.
     */
    public async key(index: number): Promise<string | null> {
        throw new Error('Can not list keys of server storage for security reasons');
    }

    /**
     * Removes the key/value pair with the given key from the list associated with the Json, if a key/value pair with the given key exists.
     */
    public async removeItem(key: string): Promise<void> {
        // TODO: [0] Never delete JUST invalidate
        await this.supabase.from('Value').delete().eq('key', key);
    }

    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     *
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     */
    public async setItem(key: string, value: Json): Promise<void> {
        const existingValue = await this.getItem(key);
        if (!existingValue) {
            await this.supabase.from('Value').insert({ key, value });
        } else {
            // TODO: [0] Never update JUST add new version
            // TODO: [0] Never allow multiple valid values
            await this.supabase.from('Value').update({ value }).eq('key', key);
        }
    }
}

/**
 * TODO: [0] Implement validUntil
 */
