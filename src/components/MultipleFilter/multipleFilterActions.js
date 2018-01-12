/**
 * Multiple filter actions
 */
import cloneDeep from 'clone-deep';
import container from "../../container";
import {APISEARCH_DISPATCHER} from "../../constants";

/**
 * Define aggregations setup
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery
 *     }
 *   }}
 */
export function aggregationSetup(
    {
        filterName,
        aggregationField,
        applicationType,
        sortBy,
        fetchLimit
    },
    {
        environmentId,
        currentQuery
    }
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.aggregateBy(
        filterName,
        aggregationField,
        applicationType,
        sortBy,
        fetchLimit
    );

    const dispatcher = container
        .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
    ;
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    })
}

/**
 * Filter action
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery,
 *        result
 *     }
 *   }}
 */
export function filterAction(
    {
        filterName,
        filterField,
        aggregationField,
        filterValues,
        applicationType,
        sortBy,
        fetchLimit
    },
    {
        environmentId,
        currentQuery,
        client
    }
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filterBy(
        filterName,
        filterField,
        filterValues,
        applicationType,
        false,
        sortBy
    );
    clonedQuery.aggregateBy(
        filterName,
        aggregationField,
        applicationType,
        sortBy,
        fetchLimit
    );
    clonedQuery.setPage(1);

    client.search(clonedQuery, (result, error) => {
        if (error) return;

        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                updatedQuery: clonedQuery,
                result
            }
        })
    })
}