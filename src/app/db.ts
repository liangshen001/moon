import { DBSchema } from '@ngrx/db';

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
    version: 1,
    name: 'moon_app',
    stores: {
        friendGroupings: {
            autoIncrement: true,
            primaryKey: 'id'
        },
        loginUsers: {
            autoIncrement: true,
            primaryKey: 'account'
        }
    },
};
