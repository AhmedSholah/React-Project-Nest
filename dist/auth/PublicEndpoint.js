"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicEndpoint = void 0;
const common_1 = require("@nestjs/common");
const PublicEndpoint = () => (0, common_1.SetMetadata)('isPublic', true);
exports.PublicEndpoint = PublicEndpoint;
//# sourceMappingURL=PublicEndpoint.js.map