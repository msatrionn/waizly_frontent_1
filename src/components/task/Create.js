import axios from "axios";
import React, { useEffect, useState } from "react";

const Create = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    task: "",
    name: "",
    address: "",
    status: 0,
  });
  const [regency, setRegency] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/task`,
        formData
      );

      if (response.status !== 201) {
        throw new Error("Failed to submit form");
      }

      setFormData({
        task: "",
        name: "",
        address: "",
      });

      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const addressOptions = async () => {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_GET_PROVINCE}`);
    setRegency(resp.data);
  };
  useEffect(() => {
    addressOptions();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800 opacity-75"
        onClick={onClose}
      ></div>
      <div className="z-10 bg-white p-10 rounded-lg shadow-md">
        Tambah data
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="task"
              className="block text-sm font-medium text-gray-700"
            >
              Task
            </label>
            <input
              type="text"
              id="task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Alamat
            </label>
            <select
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="" disabled>
                Pilih alamat
              </option>
              {regency.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded-md ml-4"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
