import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
// import moment from "moment";
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelCreateForm from "../components/forms/HotelCreateForm";

const { Option } = Select;

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    // location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  // destructuring variables from state
  const { title, content, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    // Check if all required fields are filled
    if (!title || !content || !price || !from || !to || !bed) {
      toast.error("Please fill all the required fields.");
      return; // Prevent further execution
    }

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    // hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    console.log([...hotelData]);

    try {
      let res = await createHotel(token, hotelData);
      console.log("HOTEL CREATE RES", res);
      toast.success("New hotel is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const hotelForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label className="btn btn-outline-secondary btn-block m-2 text-left">
  //         Image
  //         <input
  //           type="file"
  //           name="image"
  //           onChange={handleImageChange}
  //           accept="image/*"
  //           hidden
  //         />
  //       </label>

  //       <input
  //         type="text"
  //         name="title"
  //         onChange={handleChange}
  //         placeholder="Title"
  //         className="form-control m-2"
  //         value={title}
  //       />

  //       <textarea
  //         name="content"
  //         onChange={handleChange}
  //         placeholder="Content"
  //         className="form-control m-2"
  //         value={content}
  //       />

  //       <input
  //         type="number"
  //         name="price"
  //         onChange={handleChange}
  //         placeholder="Price"
  //         className="form-control m-2"
  //         value={price}
  //       />

  //       {/* <input
  //         type="number"
  //         name="bed"
  //         onChange={handleChange}
  //         placeholder="Numbers of Beds"
  //         className="form-control m-2"
  //         value={bed}
  //       /> */}

  //       <Select
  //         onChange={(value) => setValues({ ...values, bed: value })}
  //         className="w-100 m-2"
  //         size="large"
  //         placeholder="Number of beds"
  //       >
  //         {/* <Option key={1} > {1}</Option>
  //         <Option key={2}> {2}</Option>
  //         <Option key={3}> {3}</Option>
  //         <Option key={4}> {4}</Option> */}
  //         <Option key={1} value={1}>
  //           1
  //         </Option>
  //         <Option key={2} value={2}>
  //           2
  //         </Option>
  //         <Option key={3} value={3}>
  //           3
  //         </Option>
  //         <Option key={4} value={4}>
  //           4
  //         </Option>
  //       </Select>

  //       <DatePicker
  //         placeholder="From date"
  //         className="form-control m-2"
  //         onChange={(date, dateString) =>
  //           setValues({ ...values, from: dateString })
  //         }
  //         disabledDate={(current) =>
  //           current && current.valueOf() < moment().subtract(1, "days")
  //         }
  //       />

  //       <DatePicker
  //         placeholder="To date"
  //         className="form-control m-2"
  //         onChange={(date, dateString) =>
  //           setValues({ ...values, to: dateString })
  //         }
  //         disabledDate={(current) =>
  //           current && current.valueOf() < moment().subtract(1, "days")
  //         }
  //       />
  //     </div>

  //     <button className="btn btn-outline-primary m-2">Save</button>
  //   </form>
  // );

  return (
    <>
      <div className="container-fluid bg-secondary  p-5 text-center">
        <h2>Add Hotel </h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {/* {hotelForm()}
             */}
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {/* {JSON.stringify(location)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
