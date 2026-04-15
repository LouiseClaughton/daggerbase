'use strict';

/**
 * session-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::session-data.session-data');
