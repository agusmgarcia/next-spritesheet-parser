const { PHASE_PRODUCTION_BUILD } = require("next/constants");

/** @type import('next').NextConfig */
module.exports = (phase) => ({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  devIndicators: false,
  output: phase === PHASE_PRODUCTION_BUILD ? "export" : undefined,
  reactStrictMode: true,
});
