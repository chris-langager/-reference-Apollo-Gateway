module.exports.resolvers = {
  Query: {
    self: async (_, __, ctx) => {
      if (!ctx.claims) {
        return null;
      }

      return ctx.claims;
    }
  },
  Mutation: {
    login: async (_, args, ctx) => {
      const { username, password } = args;

      if (password !== "test") {
        throw new Error("bad login");
      }

      const user = { id: "1", username };

      ctx.login(user);
      return user;
    },
    logout: async (_, __, ctx) => {
      ctx.logout();
      return true;
    }
  }
};
