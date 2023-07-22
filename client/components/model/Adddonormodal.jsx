import axios from "axios";
import { Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createDonor } from "../../store/donorSlice";

const Adddonormodal = ({ onClose }) => {
  const passwordIcons = {
    hidden: <AiOutlineEyeInvisible />,
    show: <AiOutlineEye className="cursor-pointer" />,
  };

  const [form, setForm] = useState({
    donorName: "",
    cnic: "",
    email: "",
    phone: "",
    address: "",
    isRegularDonor: false,
    ammountDonated: 0,
  });

  const handleFormChange = (e) => {
    const oldForm = { ...form };
    oldForm[e.target.name] = e.target.value;
    setForm({ ...oldForm });
  };

  const handleCheckBoxChange = (e) => {
    const value = !form.isRegularDonor;
    const oldForm = { ...form };
    oldForm.isRegularDonor = value;
    setForm({ ...oldForm });
  };

  const dispatch = useDispatch();
  const submitForm = async (e) => {
    e.preventDefault();

    dispatch(createDonor(form));
    onClose();
  };
  return (
    <div className="fixed w-screen h-screen top-0 left-0 right-0 bg-black bg-opacity-25 flex items-center justify-center">
      <div className="w-3/5">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={(e) => onClose()}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Add donor
            </h3>
            <form className="space-y-6 py-4 px-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="cnic">CNIC</Label>
                  <TextInput
                    id="cnic"
                    name="cnic"
                    type={"text"}
                    placeholder={"00000-0000000-0"}
                    required
                    value={form.cnic}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div>
                  <Label htmlFor="donorName">Donor Name</Label>
                  <TextInput
                    id="donorName"
                    name="donorName"
                    placeholder="Donor Name"
                    type={"text"}
                    value={form.donorName}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Email</Label>
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="jhon.doe@gmail.com"
                    type={"email"}
                    value={form.email}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Phone</Label>
                  <TextInput
                    id="phone"
                    name="phone"
                    placeholder="0300561377"
                    type={"tel"}
                    value={form.phone}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <TextInput
                  id="address"
                  name="address"
                  placeholder="Street 123 "
                  type={"text"}
                  value={form.address}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="regular">Regular Donor</Label>
                <Checkbox
                  name="regular"
                  checked={form.isRegularDonor}
                  onChange={(e) => handleCheckBoxChange(e)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={(e) => submitForm(e)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add donor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adddonormodal;
