import CreateModal from "@/components/task/Create";
import UpdateModal from "@/components/task/Update";
import DeleteModal from "@/components/task/Delete";
import Loading from "@/utils/loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalEditData, setModalEditData] = useState({});
  const [modalDeleteData, setModalDeleteData] = useState(0);
  const [fetchData, setFetchData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalEdit = (val) => {
    setModalEditData(val);
    setIsModalEditOpen(true);
  };
  const openModalDelete = (val) => {
    setModalDeleteData(val);
    setIsModalDeleteOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalEdit = (val) => {
    setIsModalEditOpen(false);
  };

  const closeModalDelete = (val) => {
    setIsModalDeleteOpen(false);
  };

  const getData = async () => {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/task`);
      setOriginalData(resp?.data);
      setFetchData(resp?.data);
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      getData();
      setLoading(false);
      toast.success("Berhasil menambah data", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }, 500);
  };

  const handleSubmitUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      getData();
      setLoading(false);
      toast.success("Berhasil update", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }, 500);
  };

  const handleSubmitDelete = () => {
    setLoading(true);
    setTimeout(() => {
      getData();
      setLoading(false);
      toast.success("Berhasil Dihapus", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }, 500);
  };

  const handleCompleteToggle = async (taskId, item) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
        status: item.status === 1 ? 0 : 1,
        task: item.task,
        name: item.name,
        address: item.address,
      });
      toast.success(`Task ${item.status === 1 ? "incomplete" : "complete"}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getData();
    } catch (error) {
      toast.error(`Perubahan status gagal. ${error}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = originalData.filter((item) =>
      item.task.toLowerCase().includes(searchTerm)
    );
    setFetchData(filtered);
  };

  return (
    <div className="mx-auto p-4 mt-20 max-w-[800px] pb-4">
      <ToastContainer />
      {loading ? <Loading /> : <></>}
      <div className="bg-emerald-400 rounded-xl">
        <h1 className="text-center text-white text-xl font-bold">Todo List</h1>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="my-5 bg-green-400 text-white px-2 py-1 rounded-lg"
          onClick={openModal}
        >
          Tambah
        </button>
        <CreateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
        <UpdateModal
          isOpen={isModalEditOpen}
          onClose={closeModalEdit}
          initialData={modalEditData}
          onSubmit={handleSubmitUpdate}
        />
        <DeleteModal
          isOpen={isModalDeleteOpen}
          onClose={closeModalDelete}
          taskId={modalDeleteData}
          onDelete={handleSubmitDelete}
        />
        <div>
          <input
            type="text"
            className="border-2 border-gray"
            placeholder="Cari task"
            onChange={handleChangeSearch}
          />
        </div>
      </div>
      <div>
        <ul className="mx-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {fetchData.map((item) => {
            return (
              <li
                className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                key={item.id}
              >
                <div className="flex items-center">
                  <div className="w-[30%]">
                    <div>Task</div>
                    <div className="font-normal">
                      <i>{item.task}</i>
                    </div>
                  </div>
                  <div className="w-[30%]">
                    <div>Nama</div>
                    <div className="font-normal">
                      <i>{item.name}</i>
                    </div>
                  </div>
                  <div className="flex w-[30%]">
                    <div>
                      <div>Alamat</div>
                      <div className="font-normal">
                        <i>{item.address}</i>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="ml-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={item.status === 1}
                        onChange={() => handleCompleteToggle(item.id, item)}
                        className="mr-2"
                      />
                      {item.status === 1 ? "Completed" : "Incomplete"}
                    </div>
                    <div
                      className="ml-2 flex items-center bg-orange-400 px-2 py-1 text-white rounded-md cursor-pointer"
                      onClick={() => openModalEdit(item)}
                    >
                      Edit
                    </div>

                    <div
                      className="ml-2 flex items-center bg-red-600 px-2 py-1 text-white rounded-md cursor-pointer"
                      onClick={() => openModalDelete(item.id)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default index;
