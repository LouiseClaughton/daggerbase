'use strict';

/**
 * one-shot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::one-shot.one-shot');
