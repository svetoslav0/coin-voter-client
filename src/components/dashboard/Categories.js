import React, { useEffect, useState } from 'react';

import { getAllCategories, addCategory, editCategory, deleteCategory } from '../../services/categories';

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [newCategoryName, setNewCategoryName] = useState('');
    const [updatedCategoryName, setUpdatedCategoryName] = useState('');

    const fetchCategories = async () => {
        const result = await getAllCategories();
        setCategories(result);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEditOnClick = c => {
        setSelectedCategory(c);
        setUpdatedCategoryName(c.name);
    }

    const handleDeleteOnClick = c => {
        setSelectedCategory(c);
    }

    const handleAddCategoryNameOnChange = e => {
        setNewCategoryName(e.target.value);
    }

    const handleAddActionOnClick = async () => {
        await addCategory({
            name: newCategoryName
        });

        await fetchCategories();
    }

    const handleUpdateCategoryNameOnChange = e => {
        setUpdatedCategoryName(e.target.value);
    }

    const handleChangeActionOnClick = async () => {
        const category = {
            id: selectedCategory.id,
            name: updatedCategoryName
        };

        await editCategory(category);
        await fetchCategories();
    }

    const handleDeleteActionOnClick = async () => {
        await deleteCategory(selectedCategory.id);
        await fetchCategories();
    }

    return (
        <div>
            {categories.map(c => {
                return (
                    <div className="row mb-3" key={c.id}>
                        <div className="col-md-4">
                            {c.name}
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-block btn-warning" onClick={() => handleEditOnClick(c)} data-toggle="modal" data-target="#editModalCenter">
                                Edit
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-block btn-danger" onClick={() => handleDeleteOnClick(c)} data-toggle="modal" data-target="#deleteModalCenter">
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}

            <div className="row mb-3">
                <div className="col-md-4 offset-4">
                    <button className="btn btn-block btn-success" data-toggle="modal" data-target="#addModalCenter">
                        Add New Category
                    </button>
                </div>
            </div>

            { /* Add modal */ }
            <div className="modal fade" id="addModalCenter" tabIndex="-1" role="dialog" aria-labelledby="addModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLongTitle">
                                Add new category
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>
                                    Category Name:&nbsp;
                                    <input type="text" name="new-category-name" onChange={handleAddCategoryNameOnChange} value={newCategoryName} />
                                </label>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleAddActionOnClick}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            { /* Edit modal */ }
            <div className="modal fade" id="editModalCenter" tabIndex="-1" role="dialog" aria-labelledby="editModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLongTitle">
                                Edit category <strong>{selectedCategory.name}</strong>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>
                                    New Name:&nbsp;
                                    <input type="text" name="updated-category-name" onChange={handleUpdateCategoryNameOnChange} value={updatedCategoryName} />
                                </label>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleChangeActionOnClick}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            { /* Delete modal */ }
            <div className="modal fade" id="deleteModalCenter" tabIndex="-1" role="dialog" aria-labelledby="deleteModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLongTitle">
                                You are about to delete category <strong>{selectedCategory.name}</strong>. Are you sure?
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleDeleteActionOnClick}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
