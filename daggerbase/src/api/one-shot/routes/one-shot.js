'use strict';

/**
 * one-shot router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::one-shot.one-shot');
