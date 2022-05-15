import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import styled from 'styled-components';
import { request } from '../../lib/datocms';
import { useEffect } from 'react';

const PostPage = ({ title, text }) => {
  useEffect(() => {
    console.log(title);
  }, [title]);
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

const getStaticPaths = async () => {
  //   const GET_ALL_POSTS_SLUGS = `query  {
  //         article {
  //           title
  //         }
  //       }`;
  //   const data = await request({
  //     query: GET_ALL_POSTS_SLUGS,
  //   });
  const data = ['title2', 'abc'];
  const paths = data.map((e) => ({
    params: {
      slug: e,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const GET_POST_DETAILS = `query  {
        article(filter: { title: { eq: ${slug} } }) {
            title
          text
        }
      }`;

  const data = await request({
    query: GET_POST_DETAILS,
  });
  const article = data.article;
  return {
    props: article,
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
