"use strict";
exports.__esModule = true;
var preact_1 = require("preact");
var Template_1 = require("../Template");
/**
 * Show more component
 *
 * Provides two items
 *   -> Show more element
 *   -> Show less element
 */
var ShowMoreComponent = function (_a) {
    var allItemsLength = _a.allItemsLength, currentLimit = _a.currentLimit, handleShowMore = _a.handleShowMore, handleShowLess = _a.handleShowLess, showMoreContainerClassName = _a.showMoreContainerClassName, showMoreTemplate = _a.showMoreTemplate, showLessTemplate = _a.showLessTemplate;
    return (allItemsLength > currentLimit)
        ? (preact_1.h("div", { className: "as-showMore " + showMoreContainerClassName, onClick: handleShowMore },
            preact_1.h(Template_1["default"], { template: showMoreTemplate, className: "as-showMore--more" })))
        : (allItemsLength === currentLimit)
            ? (preact_1.h("div", { className: "as-showMore " + showMoreContainerClassName, onClick: handleShowLess },
                preact_1.h(Template_1["default"], { template: showLessTemplate, className: "as-showMore--less" })))
            : null;
};
exports["default"] = ShowMoreComponent;
