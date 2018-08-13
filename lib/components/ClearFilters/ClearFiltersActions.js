"use strict";
exports.__esModule = true;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
function clearFiltersAction(environmentId, currentQuery, repository) {
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.filters = {
        _query: currentQuery.getFilter("_query")
    };
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch({
            type: "RENDER_FETCHED_DATA",
            payload: {
                query: clonedQuery,
                result: result
            }
        });
    });
}
exports.clearFiltersAction = clearFiltersAction;