import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  TalentDaoNftToken,
  ArticlePublished,
} from "../generated/TalentDaoNftToken/TalentDaoNftToken";
import { Article, Author } from "../generated/schema";

export function handleArticlePublished(event: ArticlePublished): void {

  let articleId = event.params.article.toString();
  let authorId = event.params.author.toHexString();

  let author = Author.load(authorId);
  if (author === null) {
    author = new Author(authorId);
    author.address = event.params.author;
    author.createdAt = event.block.timestamp;
    author.save();
  }
  
  let article = Article.load(articleId);
  if (article === null) {
    article = new Article(articleId);
    article.articleId = event.params.article;
    article.author = author.id;
    article.createdAt = event.block.timestamp;
    article.save();
  }

}
