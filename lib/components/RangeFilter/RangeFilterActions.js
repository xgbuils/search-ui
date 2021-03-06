"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = void 0;
var apisearch_1 = require("apisearch");
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 * ON change search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedOption
 */
function onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, minValue, maxValue, from, to) {
    var clonedQuery = cloneDeep(currentQuery);
    if (minValue != from ||
        maxValue != to) {
        clonedQuery.filterByRange(filterName, filterField, [], [from + ".." + to], apisearch_1.FILTER_AT_LEAST_ONE, apisearch_1.FILTER_TYPE_RANGE, false);
    }
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
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onChangeSearchAction = onChangeSearchAction;
