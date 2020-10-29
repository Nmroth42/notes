import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Navigation from "./navigation";
import { toKebabCase } from "../helpers";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { OutboundLink } from "gatsby-plugin-gtag";

import style from "../styles/post.module.css";

type Props = {
  title: string;
  path: string;
  coverImage: any;
  excerpt?: string;
  body: string;
  tags: string[];
  previousPost: any;
  nextPost: any;
  avatar: any;
};

const Post = ({
  title,
  path,
  coverImage,
  excerpt,
  tags,
  body,
  previousPost,
  nextPost,
  avatar,
}: Props) => {
  const previousPath = previousPost && previousPost.frontmatter.path;
  const previousLabel = previousPost && previousPost.frontmatter.title;
  const nextPath = nextPost && nextPost.frontmatter.path;
  const nextLabel = nextPost && nextPost.frontmatter.title;
  // <OutboundLink
  //   href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
  //     `${title} by Alex Nault https://alexnault.dev${path}`
  //   )}`}
  //   target="_blank"
  //   rel="noopener noreferrer"
  // >
  //   Share
  // </OutboundLink>
  return (
    <article className={style.post}>
      <header>
        <h1 className={style.title}>{title}</h1>
        <div className={style.meta}>
          {excerpt}
          {tags ? (
            <div className={style.tags}>
              {tags.map((tag) => (
                <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
                  <span className={style.tag}>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </header>
  
      <MDXRenderer>{body}</MDXRenderer>
      <div className={style.actions}>

        <OutboundLink
          href={`https://github.com/alexnault/alexnault.dev/edit/master/src/posts/${path.replace(
            "/",
            ""
          )}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit
        </OutboundLink>
      </div>

      <Navigation
        previousPath={previousPath}
        previousLabel={previousLabel}
        nextPath={nextPath}
        nextLabel={nextLabel}
      />
    </article>
  );
};

export default Post;
