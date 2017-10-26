/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import dispatcher from '../../dispatcher';

/**
 * Keyup suggested search action
 *
 * This action is triggered when a text input changes
 * receives three parameters:
 *   @param text         -> the text value for the search
 *   @param currentQuery -> current application query
 *   @param client       -> apisearch client to trigger a search
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */
export function keyupSuggestedSearchAction(
    text,
    currentQuery,
    client
) {
    let clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setQueryText(text)
        .enableSuggestions()
    ;

    client.search(clonedQuery, result => {
        dispatcher.dispatch({
            type: 'FETCH_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}