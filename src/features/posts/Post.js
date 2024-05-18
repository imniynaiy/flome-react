import * as React from 'react';
import Layout from '../layout/Layout'
import { PostForm } from './PostForm';
import { PostsList } from './PostsList';
import { Header } from '../layout/Header';

export function Post() {

  return (
    <Layout>
        <Header title="Flome"/>
        <PostsList />
        <PostForm action="new" />
    </Layout>
  );
}