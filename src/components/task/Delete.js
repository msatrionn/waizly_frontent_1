import axios from "axios";
import React from "react";

const Delete = ({ isOpen, onClose, onDelete, taskId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete task");
      }

      onDelete();
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-500 opacity-[20%]"
        onClick={onClose}
      ></div>
      <div className="z-10 bg-white p-10 rounded-lg shadow-md">
        <p className="mb-4">Anda yakin ingin menghapus?</p>
        <div className="flex">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 p-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
