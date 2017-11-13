/**
 * Multiple filter actions
 */
import cloneDeep from 'clone-deep';
import dispatcher from '../../dispatcher';

/**
 * Define aggregations setup
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> the itemsPerPage to be displayed on the result container
 *   @param currentQuery -> current application query
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
    queryOptions,
    currentQuery
) {
    const {
        filterName,
        filterField
    } = queryOptions;
    let clonedQuery = cloneDeep(currentQuery);

    clonedQuery.aggregateBy(
        filterName,
        filterField,
        8
    );

    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    })
}

/**
 * Define aggregations setup
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> the itemsPerPage to be displayed on the result container
 *   @param currentQuery -> current application query
 *   @param client       -> Apisearch client
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery
 *     }
 *   }}
 */
export function filterAction(
    queryOptions,
    currentQuery,
    client
) {
    const {
        filterName,
        filterField,
        filterValues
    } = queryOptions;
    let clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filterBy(
        filterName,
        filterField,
        filterValues
    );

    client.search(clonedQuery, result => {
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                updatedQuery: clonedQuery,
                result
            }
        })
    })


}