import { User } from "@prisma/client";
import { objectType, extendType, nonNull, intArg } from "nexus";

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.field("link", { type: "Link" });
    t.nonNull.field("user", { type: "User" });
  },
});

export const VoteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("vote", {
      type: "Vote",
      args: {
        linkId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        if (!context.userId) {
          throw new Error("Cannot vote without logging in.");
        }

        const link = await context.prisma.link.update({
          where: { id: args.linkId },
          data: { voters: { connect: { id: context.userId } } },
        });

        const user = context.prisma.user.findUnique({
          where: { id: context.userId },
        });

        return {
          link,
          user: user as User,
        };
      },
    });
  },
});
