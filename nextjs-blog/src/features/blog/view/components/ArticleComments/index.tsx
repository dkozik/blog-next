import React from "react";
import { IArticleComment, IArticleWithComments } from "@/core/types";

import styles from "./ArticleComments.module.scss";

interface IOwnProps {
  comments: IArticleComment[];
}

const ArticleComments: React.FC<IOwnProps> = (props) => {
  const { comments = [] } = props;

  return (
    <div className={styles.ArticleComments}>
      {comments.map((comment) => {
        return <div key={comment.id}>{comment.body}</div>;
      })}
    </div>
  );
};

export default ArticleComments;
