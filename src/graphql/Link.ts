import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";
import { links } from "../database";

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
        return links;
      },
    });
    t.nonNull.field("link", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
      },
      // @ts-ignore
      resolve(parent, args, context, info) {
        return links.find((link) => link.id == +args.id);
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
        const link = {
          id: links.length + 1,
          description: args.description,
          url: args.url,
        };
        links.push(link);
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
        const idx = links.findIndex((link) => link.id == +args.id);

        const link = {
          id: args.id as unknown as number,
          description: args.description as string,
          url: args.url as string,
        };

        links[idx] = link;
        return link;
      },
    });
    t.nonNull.field("deleteLink", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
      },
      resolve(parent, args, context, info) {
        const idx = links.findIndex((link) => link.id == +args.id);
        const link = links[idx];
        delete links[idx];
        return link;
      },
    });
  },
});
