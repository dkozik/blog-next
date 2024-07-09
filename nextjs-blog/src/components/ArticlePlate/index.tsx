import React from "react";
import { IArticle } from "@/core/types";
import Link from "next/link";
import Button from "@/components/Button";

import styles from "./ArticlePlate.module.scss";

interface IOwnProps {
  article: IArticle;
}

const Article: React.FC<IOwnProps> = (props) => {
  const { id, imageSrc, body, title } = props.article;

  return (
    <div className={styles.ArticlePlate}>
      <div>
        <img src={imageSrc} />
      </div>
      <div className={styles.Content}>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Body}>{body}</div>
        <div className={styles.Actions}>
          <Link href={`/article/${id}`}>
            <Button>Button</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
