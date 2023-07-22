import { Pagination, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";

import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser, removeUser, searchUser } from "../store/userSlice";
import AdduserModel from "./model/AdduserModel";
import Deleteusermodel from "./model/Deleteusermodel";
import Editusermoel from "./model/EdituserModel";

const UserTables = () => {
  const allData = useSelector((state) => state.user);

  const users = allData.users;

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value));
    dispatch(fetchUser());
  };

  const changePage = (page) => {
    dispatch(changePage(page));
    dispatch(fetchUser());
  };

  // Delete items functionality
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const closeDeleteModel = () => {
    setDeleteModel(false);
  };

  const handleDeleteClick = (e, index) => {
    setDeleteId(users[index]._id);
    setDeleteModel(true);
  };

  // Add model

  const [addModel, setAddModel] = useState(false);
  const handleAddModelOpen = (e) => {
    setAddModel(true);
  };
  const closeAddModel = () => {
    setAddModel(false);
  };

  // Update model
  const [updateModel, setUpdateModel] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const handleUpdateModelOpen = (e, index) => {
    setUpdateId(users[index]._id);
    setUpdateModel(true);
  };

  const closeUpdateModel = () => {
    setUpdateModel(false);
  };

  return (
    <div className="w-full bg-white flex flex-col h-full ">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="w-1/5">
          <form
            className="flex items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-full">
              <TextInput
                icon={BiSearch}
                id="search"
                placeholder="Search"
                type="text"
                value={allData.search}
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </form>
        </div>

        <div>
          <button
            type="button"
            onClick={(e) => handleAddModelOpen()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden h-full">
        <div
          className={`w-full   ${
            users.length > 0 ? "overflow-y-auto" : "overflow-y-hidden"
          } h-full`}
        >
          <Table hoverable>
            <Table.Head className="sticky">
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>First name</Table.HeadCell>
              <Table.HeadCell>Last name</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>phone</Table.HeadCell>
              <Table.HeadCell>Activated</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.length > 0 ? (
                users.map((user, index) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user._id}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.firstName}
                      </Table.Cell>
                      <Table.Cell>{user.lastName}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.phone}</Table.Cell>
                      <Table.Cell>
                        {user.isAccountActivated ? "Yes" : "No"}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                            <p>Reset Password</p>
                          </a>
                          <a
                            onClick={(e) => handleUpdateModelOpen(e, index)}
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                          >
                            <p>Edit</p>
                          </a>
                          <a
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            onClick={(e) => handleDeleteClick(e, index)}
                          >
                            <p>Delete</p>
                          </a>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell
                    colSpan={7}
                    className="whitespace-nowrap  dark:text-white col-span-4 text-2xl font-bold text-gray-400 text-center"
                  >
                    No data to preview
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>

      <div id="table-footer" className="w-full  lg:h-1/4  bg-gray-100 p-4">
        <div className="flex items-center justify-around">
          <Pagination
            currentPage={allData.page}
            onPageChange={changePage}
            showIcons
            totalPages={allData.pageCount}
          />
        </div>
      </div>

      {addModel === true ? <AdduserModel onClose={closeAddModel} /> : ""}

      {updateModel && <Editusermoel onClose={closeUpdateModel} id={updateId} />}

      {deleteModel && (
        <Deleteusermodel onClose={closeDeleteModel} id={deleteId} />
      )}
    </div>
  );
};

export default UserTables;
