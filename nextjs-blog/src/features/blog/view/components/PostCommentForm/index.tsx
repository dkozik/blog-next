import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { IPostCommentForm } from "@/features/namespace";
import Button from "@/components/Button";

import styles from "./PostCommentForm.module.scss";

interface IOwnProps {
  onSubmit(values: IPostCommentForm): void;
}

const validatorSchema: yup.ObjectSchema<IPostCommentForm> = yup
  .object({
    message: yup.string().required("Please enter your comment"),
  })
  .required();

const PostCommentForm: React.FC<IOwnProps> = (props) => {
  const { onSubmit } = props;

  const { register, handleSubmit, formState, reset } =
    useForm<IPostCommentForm>({
      resolver: yupResolver(validatorSchema) as Resolver<IPostCommentForm>,
    });

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <div className={styles.PostCommentForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.Caption}>Comment</div>
        <div className={styles.Content}>
          <textarea placeholder="Your comment" {...register("message")} />
        </div>
        <div className={styles.ActionBar}>
          <Button
            type="submit"
            disabled={!formState.isValid || !formState.isDirty}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostCommentForm;
