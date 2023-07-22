import axios from "axios";
import { Button, Table } from "flowbite-react";

import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import AddDonationModel from "../../components/model/AddDonationModel";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { withAuth, WithAuth } from "../../components/withAuth";
import { server } from "../../server";

export default withAuth(function DonorProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [donor, setDonor] = useState({
    _id: "null",
    cnic: "null",
    name: "null",
    email: "null",
    phone: "null",
    type: "null",
    address: "null",
    ammountDonated: 0,
    donations: [],
  });

  const [addModel, setAddModel] = useState(true);

  // Close Function to close addDonationModel

  const closeAddModel = () => {
    setAddModel(false);
    loadDetails();
  };
  const loadDetails = () => {
    axios
      .get(`${server}/api/donor/${id}`)
      .then((response) => {
        setDonor(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <div className=" w-screen h-screen font-poppins  max-w-screen max-h-screen overflow-hidden">
      <div className="w-screen h-[10vh] border-b-2">
        <Navbar />
      </div>
      <div className="w-screen h-[90vh] flex">
        <div className="bg-white w-[15%]  h-full">
          <Sidebar />
        </div>

        <div className=" w-[85%] h-full  max-w-[85%] ">
          <div className="h-fit">
            <Breadcrumb current={"Donor Profile"} />

            <h1 className="mx-12 text-[28px] font-semibold">Donor Profile</h1>
          </div>

          <div className="h-full  p-10 flex flex-col ">
            <div className="border rounded-lg shadow-sm p-8 h-fit">
              <span className="mx-4 my-2 font-bold text-xl  ">
                Donor Details
              </span>
              <div className=" grid grid-cols-4">
                <div>
                  <div className="px-4 py-2 font-semibold">Donor Name</div>
                  <div className="px-4 py-2">{donor.donorName}</div>
                </div>
                <div>
                  <div className="px-4 py-2 font-semibold">CNIC</div>
                  <div className="px-4 py-2">{donor.cnic}</div>
                </div>
                <div>
                  <div className="px-4 py-2 font-semibold">Address</div>
                  <div className="px-4 py-2">{donor.address}</div>
                </div>
                <div>
                  <div className="px-4 py-2 font-semibold">Type</div>
                  <div className="px-4 py-2">
                    {donor.type ? "Regular" : "Non-Regular"}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-full ">
              <div className="flex justify-between p-4 bg-gray-50">
                <div className="mx-4 font-bold text-xl">Donations</div>
                <div>
                  <Button
                    onClick={() => {
                      setAddModel(true);
                    }}
                  >
                    Add Donation
                  </Button>
                </div>
              </div>

              <Table hoverable>
                <Table.Head className="sticky ">
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
                  {donor.donations.length > 0 ? (
                    donor.donations.map((donation, index) => {
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
        </div>

        {addModel && <AddDonationModel onClose={closeAddModel} id={id} />}
      </div>
    </div>
  );
});
