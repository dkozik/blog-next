import React from "react";
import { IArticle } from "@/core/types";
import ArticlePlate from "@/components/ArticlePlate";

interface IOwnProps {
  article: IArticle;
}

const ArticleRow: React.FC<IOwnProps> = (props) => {
  const { article } = props;
  return (
    <div>
      <ArticlePlate article={article} />
    </div>
  );
};

export default ArticleRow;
