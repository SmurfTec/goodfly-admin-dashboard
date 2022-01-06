import useArray from 'hooks/useArray';
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { handleCatch, makeReq } from 'utils/makeReq';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [
    products,
    setProducts,
    pushProduct,
    ,
    updateProduct,
    removeProduct,
    ,
  ] = useArray('loading', '_id');

  const [
    categories,
    setCategories,
    pushCategory,
    ,
    updateCategory,
    removeCategory,
    ,
  ] = useArray([], '_id');

  const [productComments, setProductComments, , , updateProductComment, , ,] =
    useArray([], '_id');

  const fetchProducts = async () => {
    // If user is logged In , only then fetch data

    const resData = await makeReq('/products');
    setProducts(resData.products);
  };

  const fetchCategories = async () => {
    // If user is logged In , only then fetch data

    const resData = await makeReq('/products/category');
    setCategories(resData.categories);
  };

  const fetchProductReviews = async () => {
    const resData = await makeReq(`/products/comments`);
    setProductComments(resData.comments);
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchProductReviews();
      fetchCategories();
    }
    // Clear the State after user is logged Out
    else {
      setProducts('loading');
    }
  }, [user]);

  const deleteProduct = async (id) => {
    try {
      await makeReq(`/products/${id}`, {}, 'DELETE');
      toast.success('Product Deleted Successfully !');
      removeProduct(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  // Update Product
  const modifyProduct = async (id, updatedProduct) => {
    try {
      const resData = await makeReq(
        `/products/${id}`, //* endpoint
        { body: { ...updatedProduct } }, //* {body,...customConfirg}
        'PATCH' //* method
      );
      toast.success('Product Updated Successfully !');
      // Update Product in the context array
      updateProduct(id, resData.product);
      setTimeout(() => {
        navigate('/app/products');
      }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  const getProductById = (id) =>
    products === 'loading' ? 'loading' : products?.find((el) => el._id === id);

  // Create New Product
  const createNewProduct = async (newProduct, resetForm) => {
    try {
      const resData = await makeReq(
        `/products`,
        { body: { ...newProduct } },
        'POST'
      );
      resetForm();

      pushProduct(resData.product);
      toast.success('Product Created Successfully !');
      setTimeout(() => {
        navigate('/app/products');
      }, 2000);
    } catch (err) {
      handleCatch(err);
    }
  };

  // * Modify Blog Comment
  const modifyProductComment = async (id, updatedBody) => {
    try {
      const resData = await makeReq(
        `/products/comments/${id}`,
        { body: { ...updatedBody } },
        'PATCH'
      );

      updateProductComment(id, resData.comment);
      toast.success('Comment Updated Successfully !');
    } catch (err) {
      handleCatch(err);
    }
  };

  const createNewCategory = async (categoryBody) => {
    try {
      const resData = await makeReq(
        `/products/category`,
        { body: categoryBody },
        'POST'
      );
      pushCategory(resData.category, 'start');
    } catch (err) {
      handleCatch(err);
    }
  };
  const deleteCategory = async (id) => {
    try {
      await makeReq(`/products/category/${id}`, {}, 'DELETE');
      removeCategory(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  const modifyCategory = async (id, updatedBody) => {
    try {
      const resData = await makeReq(
        `/products/category/${id}`,
        {
          body: updatedBody,
        },
        'PATCH'
      );
      updateCategory(id, resData.category);
    } catch (err) {
      handleCatch(err);
    }
  };

  const replyComment = async (comment, reply) => {
    try {
      await makeReq(
        `/products/comments/reply/${comment._id}`,
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
    <ProductContext.Provider
      displayName='Product Context'
      value={{
        products,
        deleteProduct,
        getProductById,
        modifyProduct,
        createNewProduct,
        productComments,
        modifyProductComment,
        categories,
        setCategories,
        pushCategory,
        updateCategory,
        removeCategory,
        deleteCategory,
        modifyCategory,
        createNewCategory,
        replyComment,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
