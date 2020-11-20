import React, { useState } from 'react'

import PostPreview from "../components/postPreview";

import typography from "../styles/typography.module.css";
import style from "../styles/postPreviews.module.css";
import * as queryString from 'query-string'
import { navigate } from "gatsby"

type Props = {
  posts: { node: { [key: string]: any } }[];
};

const PostPreviews = ({ posts }: Props) => {

  // gatsby server-side error
  // React.useEffect(() => {
  //
  //   let value = ''
  //   const { search: bvalue } = queryString.parse(location.search);
  //   if (bvalue) {
  //     value = bvalue
  //   }
  //   const searchResults = posts.filter(post => {
  //     if (
  //       post.node.frontmatter.title
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       post.node.frontmatter.title.includes(value.toLowerCase()) ||
  //       post.node.frontmatter.date
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       post.node.frontmatter.date.includes(value.toLowerCase())
  //     ) {
  //       return post
  //     }
  //   })
  //   setAllPosts(searchResults)
  // }, []);

  // const { search } = queryString.parse(location.search)
  // const [query, setQuery] = useState(search || '')
  const [query, setQuery] = useState('')
  const [allPosts, setAllPosts] = useState(posts)

  const handleSearch = (e) => {

    let { value } = e.target
    navigate(`/?search=${e.target.value}`)
    console.log(posts)
    const searchResults = posts.filter(post => {
      if (
        post.node.frontmatter.title
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        post.node.frontmatter.title.includes(value.toLowerCase()) ||
        post.node.frontmatter.date
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        post.node.frontmatter.date.includes(value.toLowerCase())
      ) {
        return post
      }
    })
    setQuery(e.target.value)
    if ( e.target.value.length < 1) {
    navigate(`/`)
  }
    // location.search = value


  setAllPosts(searchResults)
    console.log(e.target.value.length)
  }

  return (
    <>
      <h2 className={typography.h3}></h2>
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          onChange={handleSearch}
          value={query}
          placeholder="Search..."
          style={{ width: '100%', maxWidth: '300px' }}
        />
      </div>
      <div className={style.postPreviews}>
        {allPosts.map(({ node }) => {
          const {
            id,
            frontmatter: { title, date, path, coverImage },
          } = node;

          return (
            <PostPreview
              key={id}
              title={title}
              date={date}
              path={path}
              coverImage={coverImage}
            />
          );
        })}
      </div>
    </>
  );
};

export default PostPreviews;
