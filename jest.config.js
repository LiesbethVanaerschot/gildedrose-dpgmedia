"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_jest_1 = require("ts-jest");
var tsconfig_json_1 = require("./tsconfig.json");
exports.default = {
    roots: ['<rootDir>/app', '<rootDir>/test/jest'],
    testMatch: ['<rootDir>/test/jest/*.spec.ts'],
    testPathIgnorePatterns: ['<rootDir>/test/jest/*.spec.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    clearMocks: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: (0, ts_jest_1.pathsToModuleNameMapper)(tsconfig_json_1.compilerOptions.paths, { prefix: '<rootDir>/' }),
};
//# sourceMappingURL=jest.config.js.map