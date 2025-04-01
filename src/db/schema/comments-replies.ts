import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { comments } from './comments';
import { users } from './users';

export const commentsReplies = pgTable('comments_replies', {
  id: uuid().primaryKey().defaultRandom(),
  commentId: uuid().references(() => comments.id),
  authorId: text().references(() => users.clerkId),
  content: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const commentsRepliesRelations = relations(commentsReplies, ({ one }) => ({
  comment: one(comments, {
    fields: [commentsReplies.commentId],
    references: [comments.id],
  }),
  author: one(users, {
    fields: [commentsReplies.authorId],
    references: [users.clerkId],
  }),
}));
