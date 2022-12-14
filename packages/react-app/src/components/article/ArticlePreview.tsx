import React from "react";
import { NewArticleFormData } from "../../lib/shared/interfaces";

export interface ArticlePreviewParams {
  /**
   * The article form data to preview.
   */
  article: NewArticleFormData;
}

const ArticlePreview = ({ article }: ArticlePreviewParams) => {
  const coverImageUrl = URL.createObjectURL(article?.coverImage?.data);
  return (
    <article className="container mx-auto border-2 rounded-md border-red-tdao">
      <div className="relative bg-indigo-300">
        <img className="object-cover h-20 w-96" src={coverImageUrl} />
        <h1 className="text-l absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80 text-white font-bold">{article.title}</h1>
        <div className="absolute top-0 right-0 px-2 py-2">
          {article.categories?.map(cat => <span className="rounded-md p-1 bg-gray-800 text-xs text-white opacity-70">{cat?.toLowerCase()}</span>)}
        </div>
      </div>
      <div className="mt-4 ml-4">
        <h2 className="text-md font-bold">Abstract</h2>
        <p className="text-sm">{article?.abstract}</p>
        <div className="mt-2 mb-2"></div>
        <h3 className="text-sm font-bold">Authors</h3>
        <ul>
          <li>{article?.authors}</li>
        </ul>
        <div className="mt-2 mb-2"></div>
        <h3 className="text-sm font-bold">Manuscript</h3>
        <p className="text-sm">{article?.manuscriptFile?.name}</p>
      </div>
      <div className="mt-4 relative">
        <span className="absolute top-1/2 left-0">$talent: {article?.price?.toString()}</span>
        <span className="absolute top-1/2 right-0">{article?.blockchain}</span>
      </div>
    </article>
  );
};

export default ArticlePreview;
