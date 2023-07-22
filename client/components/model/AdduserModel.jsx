import { Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addUser, createUser } from "../../store/userSlice";
const AdduserModel = (props) => {
  const passwordIcons = {
    hidden: <AiOutlineEyeInvisible />,
    show: <AiOutlineEye className="cursor-pointer" />,
  };

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    isToResetPassword: false,
  });

  const handleFormChange = (e) => {
    const oldForm = { ...form };
    oldForm[e.target.name] = e.target.value;
    setForm({ ...oldForm });
  };

  const generatePassword = async (e) => {
    e.preventDefault();

    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
    let password = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    const oldForm = { ...form };
    oldForm.password = password;
    setForm({ ...oldForm });

    console.log(password);
  };

  const handleCheckBoxChange = (e) => {
    const value = !form.isToResetPassword;

    const oldForm = { ...form };
    oldForm.isToResetPassword = value;
    setForm({ ...oldForm });
  };

  const dispatch = useDispatch();

  // Submit function that will add the user
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
    props.onClose();
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
            onClick={(e) => props.onClose()}
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
              Add user
            </h3>
            <form className="space-y-6 py-4 px-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <TextInput
                    id="firstName"
                    name="firstName"
                    type={"text"}
                    placeholder={"First name"}
                    value={form.firstName}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <TextInput
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type={"text"}
                    value={form.lastName}
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
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer"
                    onClick={(e) => setPasswordVisibility(!passwordVisibility)}
                  >
                    {passwordVisibility === true
                      ? passwordIcons.show
                      : passwordIcons.hidden}
                  </div>

                  <input
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    id="password"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={form.password}
                    onChange={(e) => handleFormChange(e)}
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => generatePassword(e)}
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Generate Password
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Label>Require to reset Password</Label>
                <Checkbox
                  checked={form.isToResetPassword}
                  onChange={(e) => handleCheckBoxChange(e)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={(e) => submitForm(e)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add user
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdduserModel;
