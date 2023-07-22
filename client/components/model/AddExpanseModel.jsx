import axios from "axios";
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExpanse } from "../../store/expanseSlice";

const AddExpanseModel = ({ onClose }) => {
  const [form, setForm] = useState({
    type: "Food",
    description: "",
    ammount: 0,
  });

  const [error, setError] = useState({
    description: "",
    ammount: "",
  });
  const handleFormChange = (e) => {
    const oldForm = { ...form };
    oldForm[e.target.name] = e.target.value;
    setForm({ ...oldForm });
  };

  const dispatch = useDispatch();
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(form);

    const oldError = { ...error };
    if (form.ammount === 0) {
      oldError.ammount = "Ammount must be greater then 0";

      setError(oldError);
    }

    if (form.description.length === 0) {
      oldError.description = "Description is required";

      setError(oldError);
    }

    if (form.ammount > 0 && form.description.length > 0) {
      dispatch(createExpanse(form));
      onClose();
    }
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
              Add Expanse
            </h3>
            <form className="space-y-6 py-4 px-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">Expanse type</Label>
                  <Select
                    name="type"
                    type={"text"}
                    required
                    onChange={(e) => handleFormChange(e)}
                  >
                    {" "}
                    <option value={"Food"}>Food</option>
                    <option value={"Shelter"}>Shelter</option>
                    <option value={"Employee"}>Employee</option>
                    <option value={"Education"}>Education</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ammount">Amount</Label>
                  <TextInput
                    id="ammount"
                    name="ammount"
                    placeholder="1000"
                    required
                    type={"number"}
                    value={form.ammount}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Label
                    htmlFor="ammount"
                    className={`${
                      error.ammount.length === 0 && " hidden "
                    } text-red-600`}
                  >
                    {error.ammount}
                  </Label>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Something about expanse...."
                    type={"text"}
                    required
                    value={form.description}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <Label
                  htmlFor="description"
                  className={`${
                    error.description.length === 0 && " hidden "
                  } text-red-600`}
                >
                  {error.description}
                </Label>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={(e) => submitForm(e)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add Expanse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpanseModel;
