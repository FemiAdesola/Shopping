import React, { useState } from "react";
import { MainLoader } from "../common";
import { useNavigate, useParams } from "react-router-dom";
import { inputHelper, toastNotification } from "../Helper";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../Apis/productApi";

const productData = {
  title: "",
  description: "",
  productType: "",
  category: "",
  price: "",
};

const ProductUpsert = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productInput, setProductInput] = useState(productData);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data } = useGetProductByIdQuery(id);

  const handleProductInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const receiveData = inputHelper(event, productInput);
    setProductInput(receiveData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotification("Please upload an image", "error");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("Title", productInput.title);
    formData.append("Description", productInput.description);
    formData.append("ProductType", productInput.productType ?? "");
    formData.append("Category", productInput.category);
    formData.append("Price", productInput.price);
    if (imageToDisplay) formData.append("File", imageToStore);


    const response = await createProduct(formData);
    if (response) {
      setLoading(false);
      navigate("/Product/productitemlist")
    }



    setLoading(false);
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
  };
  //
  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className=" px-2 text-success"></h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
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
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={productInput.category}
              onChange={handleProductInput}
            />
            
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
