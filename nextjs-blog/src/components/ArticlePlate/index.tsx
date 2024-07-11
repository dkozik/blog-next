import React from "react";
import { IArticle } from "@/core/types";
import Link from "next/link";
import Button from "@/components/Button";

import * as htmlToText from "html-to-text";

import styles from "./ArticlePlate.module.scss";

interface IOwnProps {
  article: IArticle;
}

const Article: React.FC<IOwnProps> = (props) => {
  const { id, imageThumbSrc, body, title } = props.article;

  const memoizedBody = React.useMemo(() => {
    // const parser = htmlToReact.Parser({});
    // return parser.parse(body);
    return htmlToText.convert(body, {
      baseElements: {
        selectors: ["p"],
      },
      limits: {
        maxBaseElements: 3,
      },
      selectors: [{ selector: "a", format: "skip" }],
    });
  }, [body]);

  return (
    <div className={styles.ArticlePlate}>
      <div className={styles.Thumb}>
        <img src={imageThumbSrc} />
      </div>
      <div className={styles.Content}>
        <div className={styles.Title}>
          <Link href={`/article/${id}`}>{title}</Link>
        </div>
        <div className={styles.Body}>{memoizedBody}</div>
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
