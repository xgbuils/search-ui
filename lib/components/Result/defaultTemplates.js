"use strict";
exports.__esModule = true;
exports.defaultItemsListTemplate = void 0;
exports.defaultItemsListTemplate = "\n    <ul>\n    {{#items}}\n        <li class=\"as-result__item\">\n            <strong>Score:</strong> {{score}}<br />\n            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />\n            <strong>Title:</strong> {{metadata.title}}<br />\n            <strong>Description:</strong> {{metadata.description}}<br />\n            <strong>Link:</strong> <a href=\"{{metadata.link}}\" onclick=\"{{click}}\" target=\"_blank\">{{metadata.link}}</a>\n        </li>\n    {{/items}}\n    </ul>\n    {{^items}}No result{{/items}}\n";
