import React, { useState } from 'react';
import { MainLoader } from '../common';
import { useNavigate } from 'react-router-dom';
import { inputHelper, toastNotification } from '../Helper';

const productData = {
  title: "",
  description: "",
  productType: "",
  category: "",
  price: "",
};

const ProductUpsert = () => {
    const navigate = useNavigate();
    const [productInput, setProductInput] = useState(productData);
    const [imageToStore, setImageToStore] = useState<any>();
    const [imageToDisplay, setImageToDisplay] = useState<string>("");

      const handleProductInput = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const receiveData = inputHelper(event, productInput);
        setProductInput(receiveData);
      };

    // for isner file or image
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imgType = file.type.split("/")[1];
            const validImgTypes = ["jpeg", "jpg", "png"];

            const isImageTypeValid = validImgTypes.filter((e) => {
                return e === imgType;
            });
            if (file.size > 1000 * 1024) {
              setImageToStore("");
              toastNotification("File Must be less then 1 MB", "error");
              return;
            } else if (isImageTypeValid.length === 0) {
              setImageToStore("");
              toastNotification("File Must be in jpeg, jpg or png", "error");
              return;
            }

            // message needed to upload the file
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setImageToStore(file);
            reader.onload = (event) => {
              const imgUrl = event.target?.result as string;
              setImageToDisplay(imgUrl);
            };
        }
    }
    //
    return (
      <div className="container border mt-5 p-5 bg-light">
        <h3 className=" px-2 text-success">
        </h3>
        <form
          method="post"
          encType="multipart/form-data"
        >
          <div className="row mt-3">
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                required
                name="title"
                value={productInput.title}
                onChange={handleProductInput}
              />
              <textarea
                className="form-control mt-3"
                placeholder="Enter Description"
                name="description"
                rows={10}
                value={productInput.description}
                onChange={handleProductInput}
              ></textarea>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Enter Product Type"
                name="productType"
                value={productInput.productType}
                onChange={handleProductInput}
              />
              <select
                className="form-control mt-3 form-select"
                placeholder="Enter Category"
                name="category"
                value={productInput.category}
                onChange={handleProductInput}
              >
              </select>
              <input
                type="number"
                className="form-control mt-3"
                required
                placeholder="Enter Price"
                name="price"
                value={productInput.price}
                onChange={handleProductInput}
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control mt-3"
              />
              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-success form-control mt-3"
                  >
                    Submit
                  </button>
                </div>
                <div className="col-6">
                  <a
                    onClick={() => navigate("/product/productitemlist")}
                    className="btn btn-secondary form-control mt-3"
                  >
                    Back to Product Items
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-5 text-center">
              <img
                src={imageToDisplay}
                style={{ width: "100%", borderRadius: "30px" }}
                alt={imageToDisplay}
              />
            </div>
          </div>
        </form>
      </div>
    );
};

export default ProductUpsert;