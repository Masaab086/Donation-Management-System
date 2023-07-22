import {
  Button,
  Label,
  Pagination,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchExpanses, setFilter, setTypeFilter } from "../store/expanseSlice";

import AddDonationModel from "./model/AddDonationModel";
import AddExpanseModel from "./model/AddExpanseModel";
import Deleteusermodel from "./model/Deleteusermodel";
import Editusermoel from "./model/EdituserModel";

const ExpanseTables = () => {
  const allData = useSelector((state) => state.expanse);

  const expanses = allData.expanses;

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(fetchDonations());
  };

  const changePage = (page) => {
    dispatch(changePage(page));
    dispatch(fetchExpanses());
  };

  // Delete items functionality
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const closeDeleteModel = () => {
    setDeleteModel(false);
  };

  const handleDeleteClick = (e, index) => {
    setDeleteId(donations[index]._id);
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
    setUpdateId(donations[index]._id);
    setUpdateModel(true);
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    dispatch(fetchExpanses());
  };

  const handleTypeFilterChange = (e) => {
    console.log(`Logging type filter change ${e.target.value}`);
    dispatch(setTypeFilter(e.target.value));
    dispatch(fetchExpanses());
  };
  const closeUpdateModel = () => {
    setUpdateModel(false);
  };

  return (
    <div className="w-full bg-white flex flex-col h-full ">
      <div className="px-6 py-4 flex justify-start items-center">
        <div className="w-1/2 flex">
          <div className="max-w-md mx-10 flex gap-2 items-center">
            <Select
              value={allData.dateFilter}
              onChange={(e) => handleFilterChange(e)}
            >
              <option disabled selected value={""}>
                Filter By Time
              </option>
              <option value={"all"}>All</option>
              <option value={"month"}>This Month</option>
              <option value={"year"}>This Year</option>
            </Select>
          </div>
          <div className="max-w-md mx-10 flex">
            <Select
              // value={allData.dateFilter}
              onChange={(e) => handleTypeFilterChange(e)}
            >
              <option selected disabled value={""}>
                Donation Type
              </option>
              <option value={"all"}>All</option>
              <option value={"Food"}>Food</option>
              <option value={"Shelter"}>Shelter</option>
              <option value={"Employee"}>Employee</option>
              <option value={"Education"}>Education</option>
            </Select>
          </div>
        </div>
        <div className="w-1/2 flex justify-end  items-center ">
          <Button className="mx-6" onClick={() => setAddModel(true)}>
            Add Expanse
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden h-full">
        <div
          className={`w-full   ${
            expanses.length > 0 ? "overflow-y-auto" : "overflow-y-hidden"
          } h-full`}
        >
          <Table hoverable>
            <Table.Head className="sticky">
              <Table.HeadCell>Expanse Id</Table.HeadCell>
              <Table.HeadCell>Expanse Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {expanses.length > 0 ? (
                expanses.map((expanse, index) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {expanse._id}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {expanse.type}
                      </Table.Cell>
                      <Table.Cell>{expanse.description}</Table.Cell>
                      <Table.Cell>{expanse.ammount}</Table.Cell>

                      <Table.Cell>
                        {
                          new Date(expanse.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                            <p>Details</p>
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

      {addModel === true ? <AddExpanseModel onClose={closeAddModel} /> : ""}

      {updateModel && <Editusermoel onClose={closeUpdateModel} id={updateId} />}

      {deleteModel && (
        <Deleteusermodel onClose={closeDeleteModel} id={deleteId} />
      )}
    </div>
  );
};

export default ExpanseTables;
