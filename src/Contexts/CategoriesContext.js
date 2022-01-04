import useArray from 'hooks/useArray';
import React, { useState, useEffect, useContext } from 'react';
import { handleCatch, makeReq } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const CategoriesContext = React.createContext();

export const CategoriesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [categories, setCategories, pushCategory, , updateCategory, , ,] =
    useArray([], '_id');

  const fetchCategories = async () => {
    try {
      const resData = await makeReq(`/categories`);
      setCategories(resData.categories);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // * If user is logged In , only then fetch categories
    if (user) {
      fetchCategories();
    }
    // * Clear the State after user is logged Out
    else {
      setCategories();
    }
  }, [user]);

  // * Create New Category
  const createNewCategory = async (newCategoryProfile, resetForm) => {
    try {
      const resData = await makeReq(
        `/categories`,
        { body: { ...newCategoryProfile } },
        'POST'
      );
      resetForm();

      pushCategory(resData.blog);
      toast.success('Category Created Successfully !');
      setTimeout(() => {
        navigate('/app/categories');
      }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  // * Modify New Category
  const modifyCategory = async (id, updatedBody) => {
    try {
      const resData = await makeReq(
        `/categories/${id}`,
        { body: { ...updatedBody } },
        'PATCH'
      );

      updateCategory(id, resData.blog);
      toast.success('Category Updated Successfully !');
    } catch (err) {
      handleCatch(err);
    }
  };

  const getCategoryFromId = (id) => {
    return categories?.find((el) => el._id === id);
  };

  return (
    <CategoriesContext.Provider
      displayName='Categories Context'
      value={{
        categories,
        createNewCategory,
        modifyCategory,
        getCategoryFromId,
        loading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
