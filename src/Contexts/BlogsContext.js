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

  const [
    blogComments,
    setBlogComments,
    pushBlogComment,
    filterBlogComment,
    updateBlogComment,
    removeBlogComment,
    clearBlogComments,
  ] = useArray([], '_id');

  const fetchBlogs = async () => {
    const resData = await makeReq(`/blogs`);
    setBlogs(resData.blogs);
  };

  const fetchComments = async () => {
    try {
      const resData = await makeReq(`/blogs/comments`);
      // console.log(`resData`, resData);
      setBlogComments(resData.comments);
    } catch (err) {
      handleCatch(err);
    }
  };

  useEffect(() => {
    // * If user is logged In , only then fetch blogs
    if (user) {
      fetchBlogs();
      fetchComments();
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

  // * Modify New Blog
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

  // * Modify Blog Comment
  const modifyBlogComment = async (id, updatedBody) => {
    try {
      const resData = await makeReq(
        `/blogs/comments/${id}`,
        { body: { ...updatedBody } },
        'PATCH'
      );

      updateBlogComment(id, resData.comment);
      toast.success('Comment Updated Successfully !');
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
      value={{
        blogs,
        createNewBlog,
        modifyBlog,
        getBlogFromId,
        blogComments,
        modifyBlogComment,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};
