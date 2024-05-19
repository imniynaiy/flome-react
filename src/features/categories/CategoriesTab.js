import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Tab, Tabs, Box } from '@mui/material';
import { fetchPosts } from '../posts/postsSlice'
import { fetchCategories } from './categoriesSlice';

export const CategoriesTab = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    const currentCategory = useSelector(state => state.categories.currentCategory)
    const categoriesStatus = useSelector(state => state.categories.status)
    const error = useSelector(state => state.categories.error)

    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories())
        }
    }, [categoriesStatus, dispatch])

    let content

    if (categoriesStatus === 'loading') {
        content = <CircularProgress />
    } else if (categoriesStatus === 'succeeded') {
        content = (
        <>
        <Tab label="All" {...a11yProps(0)} />
        {categories.categories.map((category,i) => (
            <Tab label={category} {...a11yProps(i+1)} />
        ))}
        </>
        )
    } else if (categoriesStatus === 'failed') {
        content = <div>{error}</div>
    }

    const handleChange = (event, newValue) => {
        dispatch(fetchPosts(newValue))
    }

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return (
        <section className="categories-list">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentCategory} onChange={handleChange} aria-label="tabs for categories">
                    {content}
                </Tabs>
            </Box>
        </section>
    )
}