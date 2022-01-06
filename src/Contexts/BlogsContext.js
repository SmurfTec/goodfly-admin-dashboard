import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext } from 'react';
import { handleCatch, makeReq } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const BlogsContext = React.createContext();

export const BlogsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs, pushBlog, , updateBlog, filterBlog, ,] = useArray(
    [],
    '_id'
  );

  const [blogComments, setBlogComments, , , updateBlogComment, , ,] = useArray(
    [],
    '_id'
  );

  const fetchBlogs = async () => {
    try {
      const resData = await makeReq(`/blogs`);
      setBlogs(resData.blogs);
    } catch (err) {
    } finally {
      setLoading(false);
    }
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
    return blogs?.find((el) => el._id === id);
  };

  const deleteBlog = async (id) => {
    try {
      await makeReq(`/blogs/${id}`, {}, 'DELETE');
      toast.success('Blog Deleted Successfully');
      navigate('/app/blogs');
      filterBlog(id);
    } catch (err) {
      handleCatch(err);
    } finally {
    }
  };

  const replyComment = async (comment, reply) => {
    try {
      await makeReq(
        `/blogs/comments/reply/${comment._id}`,
        {
          body: { reply: reply },
        },
        'PATCH'
      );
      toast.success('Reply Sent Successfully');
    } catch (err) {
      handleCatch(err);
    } finally {
    }
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
        loading,
        deleteBlog,
        replyComment,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};
