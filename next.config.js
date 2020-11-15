module.exports = {
  async headers() {
    return [
      {
        source: "/api/mwl/data",
        headers: [
          {
            key: "WWW-Authenticate",
            value:
              "Basic realm='Access to the myWebLog data enrichment API', charset='UTF-8'",
          },
        ],
      },
    ];
  },
};
