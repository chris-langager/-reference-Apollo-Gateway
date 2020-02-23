const { ApolloServer } = require("apollo-server-express");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

class DataSourceWithCookies extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (
      !context ||
      !context.req ||
      !context.req.headers ||
      !context.req.headers.cookie
    ) {
      return;
    }
    request.http.headers.set("cookie", context.req.headers.cookie);
  }

  async didReceiveResponse(response, request, context) {
    const body = await super.didReceiveResponse(response, request, context);

    const { headers } = response;
    context.responseCookies = headers.get("set-cookie");

    return body;
  }
}

const gateway = new ApolloGateway({
  serviceList: [{ name: "core", url: "http://localhost:6001/graphql" }],
  buildService({ url }) {
    return new DataSourceWithCookies({ url });
  }
});

module.exports.server = new ApolloServer({
  gateway,
  subscriptions: false,
  introspection: true,
  playground: true,
  context: integrationContext => {
    const { req } = integrationContext;
    return { req };
  },
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ context, response }) {
            response.http.headers.set("set-cookie", context.responseCookies);
          }
        };
      }
    }
  ]
});
