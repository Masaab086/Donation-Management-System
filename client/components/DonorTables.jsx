import { Pagination, Table, TextInput } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Adddonormodal from "../components/model/Adddonormodal";
import { changePage, fetchDonors, searchDonor } from "../store/donorSlice";
import Deletedonormodal from "./model/Deletedonormodal";
import Editdonormodal from "./model/Editdonormodal";

const DonorTables = () => {
  const allData = useSelector((state) => state.donor);
  const dispatch = useDispatch();

  const donors = allData.donors;

  // Add donor
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
  };

  // Delete
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const onDelete = (e, index) => {
    setDeleteModal(true);
    setDeleteId(donors[index]._id);
  };

  const closeDelete = () => {
    setDeleteId("");
    setDeleteModal(false);
  };

  // Pagination

  const handlePageChange = (page) => {
    dispatch(changePage(page));
    dispatch(fetchDonors());
  };

  // Edit modal

  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState("");

  const openEditModal = (index) => {
    setEditId(donors[index]._id);
    setEditModal(true);
  };

  const closeEidtModal = () => {
    setEditModal(false);
    setEditId("");
  };

  const handleSearch = (e) => {
    dispatch(searchDonor(e.target.value));
    dispatch(fetchDonors());
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
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </form>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setAddModal(true)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add donor
          </button>
        </div>
      </div>

      <div className="h-4/6 overflow-y-auto">
        <Table hoverable className="w-full h-full">
          <Table.Head>
            <Table.HeadCell>CNIC</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Amount Donated</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Action</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body>
            {donors != undefined && donors.length > 0 ? (
              donors.map((donor, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{donor.cnic}</Table.Cell>
                    <Table.Cell>{donor.donorName}</Table.Cell>
                    <Table.Cell>{donor.email}</Table.Cell>
                    <Table.Cell>{donor.phone}</Table.Cell>
                    <Table.Cell>
                      {donor.isRegularDonor === true
                        ? "Regular"
                        : "Non-Regular"}
                    </Table.Cell>
                    <Table.Cell>{donor.address}</Table.Cell>
                    <Table.Cell>Rs. {donor.ammountDonated}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Link
                          href={`/donor/${donor._id}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                        >
                          View
                        </Link>
                        <a
                          onClick={(e) => openEditModal(index)}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                        >
                          <p>Edit</p>
                        </a>
                        <a
                          onClick={(e) => onDelete(e, index)}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                        >
                          <p>Delete</p>
                        </a>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row></Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="h-2/6 px-10">
        <Pagination
          currentPage={allData.page}
          layout="navigation"
          onPageChange={handlePageChange}
          // totalPages={Math.ceil(allData.total / 10)}
          totalPages={allData.pageCount}
        />
      </div>

      {editModal === true ? (
        <Editdonormodal onClose={closeEidtModal} id={editId} />
      ) : (
        ""
      )}

      {addModal === true ? <Adddonormodal onClose={closeAddModal} /> : ""}
      {deleteModal === true ? (
        <Deletedonormodal onClose={closeDelete} id={deleteId} />
      ) : (
        ""
      )}
    </div>
  );
};

export default DonorTables;
