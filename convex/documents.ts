import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Пользователь не авторизован");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Документ не существует");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Доступ запрещён");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => (
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        ))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    }

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  }
})

export const get = query({
  args: {
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Пользователь не авторизован")
    }

    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q
          .eq("userId", userId)
          .eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents
  }
})

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Пользователь не авторизован")
    }

    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false
    });

    return document
  }
})

export const getByID = query({
  args: {
    documentId: v.id("documents")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const document = await ctx.db.get(args.documentId)

    if (!document) {
      throw new Error("Документ не найден")
    }

    if (document.isPublished && !document.isArchived) {
      return document
    }

    if (!identity) {
      throw new Error("Пользователь не авторизован")
    }

    const userId = identity.subject;
    if (document.userId !== userId) {
      throw new Error("Доступ запрещён");
    }

    return document
  }
})

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Пользователь не авторизован")
    }

    const userId = identity.subject;

    const { id, ...rest } = args;
    const existingDocument = await ctx.db.get(args.id)
    
    if(!existingDocument) {
      throw new Error("Документ не существует")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Нет доступа")
    }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    })

    return document

  }
})

export const removeCoverImage = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Пользователь не авторизован")
    }

    const userId = identity.subject;

    const { id, ...rest } = args;
    const existingDocument = await ctx.db.get(args.id)

    if(!existingDocument) {
      throw new Error("Документ не существует")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Нет доступа")
    }

    const document = ctx.db.patch(args.id, {
      coverImage: undefined
    })

    return document

  }
})