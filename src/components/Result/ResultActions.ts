/**
 * Search actions
 */
import {ItemUUID} from "apisearch";
import {Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

/**
 *
 * Configure query
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 * @param fields
 * @param filter
 */
export function configureQuery(
    environmentId: string,
    currentQuery: Query,
    itemsPerPage: number,
    highlightsEnabled: boolean,
    promotedUUIDs: ItemUUID[],
    excludedUUIDs: ItemUUID[],
    fields: string[],
    filter: Function
) {
    const clonedQuery = cloneDeep(currentQuery);
    filter(clonedQuery);

    /**
     * Set result size
     */
    clonedQuery.size = itemsPerPage;

    /**
     * Set specific fields
     */
    clonedQuery.setFields(fields);

    /**
     * Enabling highlights on query result
     */
    if (highlightsEnabled) {
        clonedQuery.enableHighlights();
    }

    /**
     * Promoted uuids
     */
    for (const i in promotedUUIDs) {
        clonedQuery.promoteUUID(promotedUUIDs[i]);
    }

    /**
     * excluded uuids
     */
    for (const i in excludedUUIDs) {
        clonedQuery.excludeUUID(excludedUUIDs[i]);
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery,
        },
    });
}
