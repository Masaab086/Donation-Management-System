import { Label, Pagination, Select, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";

import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDonations,
  setFilter,
  setTypeFilter,
} from "../store/donationSlice";

import { fetchUser, removeUser, searchUser } from "../store/donationslice";
import AddDonationModel from "./model/AddDonationModel";
import AdduserModel from "./model/AdduserModel";
import Deleteusermodel from "./model/Deleteusermodel";
import Editusermoel from "./model/EdituserModel";

const DonationTables = () => {
  const allData = useSelector((state) => state.donation);

  const donations = allData.donations;

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(fetchDonations());
  };

  const changePage = (page) => {
    dispatch(changePage(page));
    dispatch(fetchDonations());
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
    dispatch(fetchDonations());
  };

  const handleTypeFilterChange = (e) => {
    dispatch(setTypeFilter(e.target.value));
    dispatch(fetchDonations());
  };
  const closeUpdateModel = () => {
    setUpdateModel(false);
  };

  return (
    <div className="w-full bg-white flex flex-col h-full ">
      <div className="px-6 py-4 flex justify-start items-center">
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
            value={allData.dateFilter}
            onChange={(e) => handleTypeFilterChange(e)}
          >
            <option selected disabled value={""}>
              Donation Type
            </option>
            <option value={"all"}>All</option>
            <option value={"inkind"}>In-Kind</option>
            <option value={"money"}>Money</option>
          </Select>
        </div>
      </div>
      <div className="flex-1 overflow-hidden h-full">
        <div
          className={`w-full   ${
            donations.length > 0 ? "overflow-y-auto" : "overflow-y-hidden"
          } h-full`}
        >
          <Table hoverable>
            <Table.Head className="sticky">
              <Table.HeadCell>Donation Id</Table.HeadCell>
              <Table.HeadCell>Donor Id</Table.HeadCell>
              <Table.HeadCell>Donation Type</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {donations.length > 0 ? (
                donations.map((donation, index) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {donation._id}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {donation.donorId}
                      </Table.Cell>
                      <Table.Cell>{donation.donationType}</Table.Cell>
                      <Table.Cell>{donation.ammount}</Table.Cell>
                      <Table.Cell>{donation.description}</Table.Cell>
                      <Table.Cell>
                        {
                          new Date(donation.createdAt)
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

      {addModel === true ? <AddDonationModel onClose={closeAddModel} /> : ""}

      {updateModel && <Editusermoel onClose={closeUpdateModel} id={updateId} />}

      {deleteModel && (
        <Deleteusermodel onClose={closeDeleteModel} id={deleteId} />
      )}
    </div>
  );
};

export default DonationTables;
