/**
 * Search actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

/**
 * Initial Search
 *
 * @param environmentId
 * @param currentQuery
 * @param initialSearch
 */
export function initialSearchSetup(
    environmentId: string,
    currentQuery: Query,
    initialSearch: string
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filters._query.values = [initialSearch];
    clonedQuery.page = 1;

    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery,
        },
    });
}

/**
 * Search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param queryText
 * @param visibleResults
 */
export function simpleSearchAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    queryText: string,
    visibleResults: boolean
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;

    if (!visibleResults) {
        dispatcher.dispatch({
            type: "RENDER_FETCHED_DATA",
            payload: {
                query: clonedQuery,
                result: null,
                visibleResults: visibleResults
            },
        });

        return;
    }

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch({
                type: "RENDER_FETCHED_DATA",
                payload: {
                    query: clonedQuery,
                    result: result,
                    visibleResults: visibleResults
                },
            });
        })
        .catch((error) => {
            // Do nothing
        });
}
