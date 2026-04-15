'use strict';

/**
 * one-shot controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::one-shot.one-shot');
