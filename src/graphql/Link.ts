import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("description"),
      t.nonNull.string("url");
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return context.prisma.link.findMany();
      },
    });
    t.nonNull.field("link", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
      },
      // @ts-ignore
      resolve(parent, args, context, info) {
        const requestedLink = context.prisma.link.findUnique({
          where: {
            id: +args.id,
          },
        });
        return requestedLink;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const link = context.prisma.link.create({
          data: {
            description: args.description,
            url: args.url,
          },
        });
        return link;
      },
    });

    t.nonNull.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
        description: stringArg(),
        url: stringArg(),
      },

      resolve(parent, args, context) {
        const link = {
          description: args.description as string,
          url: args.url as string,
        };
        const updatedLink = context.prisma.link.update({
          where: { id: +args.id },
          data: link,
        });
        return updatedLink;
      },
    });

    t.nonNull.field("deleteLink", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
      },
      resolve(parent, args, context, info) {
        const deletedLink = context.prisma.link.delete({
          where: {
            id: +args.id,
          },
        });
        return deletedLink;
      },
    });
  },
});
