import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext, memo } from 'react';
import { handleCatch, makeReq } from 'Utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const BlogsContext = React.createContext();

export const BlogsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [
    blogs,
    setBlogs,
    pushBlog,
    filterBlog,
    updateBlog,
    removeBlog,
    clearBlogs,
  ] = useArray([], '_id');

  useEffect(() => {
    // * If user is logged In , only then fetch data
    if (user) {
      (async () => {
        const resData = await makeReq(`/blogs`);
        setBlogs(resData.blogs);
      })();
    }
    // * Clear the State after user is logged Out
    else {
      setBlogs();
    }
  }, [user]);

  // * Create New Blog
  const createNewBlog = async (newBlogProfile, resetForm) => {
    try {
      const resData = await makeReq(
        `/blogs`,
        { body: { ...newBlogProfile } },
        'POST'
      );
      resetForm();

      pushBlog(resData.blog);
      toast.success('Blog Created Successfully !');
      setTimeout(() => {
        navigate('/app/blogs');
      }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  // * Create New Blog
  const modifyBlog = async (id, updatedBody) => {
    try {
      const resData = await makeReq(
        `/blogs/${id}`,
        { body: { ...updatedBody } },
        'PATCH'
      );

      updateBlog(id, resData.blog);
      toast.success('Blog Updated Successfully !');
    } catch (err) {
      handleCatch(err);
    }
  };

  const getBlogFromId = (id) => {
    if (!blogs) return undefined;

    return blogs.find((el) => el._id === id);
  };

  return (
    <BlogsContext.Provider
      displayName='Blogs Context'
      value={{ blogs, createNewBlog, modifyBlog, getBlogFromId }}
    >
      {children}
    </BlogsContext.Provider>
  );
};
