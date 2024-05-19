import * as React from 'react';
import Layout from '../layout/Layout'
import { PostForm } from './PostForm';
import { PostsList } from './PostsList';
import { useSelector } from 'react-redux'
import { validateUser } from '../user/userSlice';
import { Header } from '../layout/Header';
import { CategoriesTab } from '../categories/CategoriesTab';

export function Post() {

  const user = useSelector(state => state.user)
    const [didLogin, setDidLogin] = React.useState(false)

    React.useEffect(() => {
        setDidLogin(validateUser(user.username, user.expiredAt, user.token))
    }, [user]);

  return (
    <Layout>
        <Header title="Flome" isLogin={didLogin} />
        <CategoriesTab />
        <PostsList isLogin={didLogin} />
        {didLogin? <PostForm action="new" />: null}
    </Layout>
  );
}