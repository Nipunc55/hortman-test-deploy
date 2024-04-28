import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { t } from "i18next";
import { educationMaterialSchema } from "../../../../utils/validations";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import UploadImage from "../../../molecules/admin/educationalMaterial/uploadImage/UploadImage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../../../../firebase/config";
import { createEducationMaterial } from "../../../../api/education_material";
import { Radio } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import UploadVideo from "../../../molecules/admin/uploadVideo/UploadVideo";
import InputField from "../../../atoms/donor/inputField/InputField";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
// import { checkValidations } from "../../../../utils/common/validationErrorMessage";
/* import CKEditorComponent from "./CKEditorComponent"; */

const AddEducationalMaterialForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    postType: "Article",
    title: "",
    content: "",
    url: "",
    thumbnail: ""
  };

  const [value, setValue] = useState("");
  const [image, setImage] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [postType, setPostType] = useState("Article");
  const [selectedPostType, setSelectedPostType] = useState("Article");

  const imageURLRef = useRef<string>("");
  const videoURLRef = useRef<string>("");

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file: any = event.target.files?.[0];
    setImage(file);
    console.log(file);
  }

  function handleVideo(event: React.ChangeEvent<HTMLInputElement>) {
    const file: any = event.target.files?.[0];
    console.log("FILE " + file);
    setVideo(file);
  }

  const handleImageUploader = async (): Promise<string | undefined> => {
    return await new Promise((resolve, reject) => {
      let url: string = "";
      if (!image) {
        toast.error("Please choose a image first");
        setIsLoading(false);
        return;
      }
      const id = toast.loading("image is uploading...");
      const imageRef = ref(imageDb, `educational-material/Videos/${v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Get the upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error: any) => {
          toast.update(id, {
            render: "Error during upload!. please try again",
            type: "error",
            isLoading: false
          });
          // Handle errors during the upload.
          console.error("Error during upload:", error);

          reject(error);
        },
        async () => {
          const downloadImageURL = await getDownloadURL(imageRef);
          imageURLRef.current = downloadImageURL;
          url = downloadImageURL;
          toast.update(id, {
            render: "Image upload success!",
            type: "success",
            isLoading: false
          });
          resolve(url);
        }
      );
      return url;
    });
  };

  const handleVideoUploader = async (): Promise<string | undefined> => {
    return await new Promise((resolve, reject) => {
      let url: string = "";
      if (!video) {
        toast.error("Please choose a video first");
        setIsLoading(false);
        return;
      }
      const id = toast.loading("video is uploading...");
      const videoRef = ref(imageDb, `educational-material/Videos/${v4()}`);
      const uploadTask = uploadBytesResumable(videoRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Get the upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error: any) => {
          // Handle errors during the upload.
          console.error("Error during upload:", error);
          toast.update(id, {
            render: "Error during upload!. please try again",
            type: "error",
            isLoading: false
          });
          reject(error);
        },
        async () => {
          const downloadVideoURL = await getDownloadURL(videoRef);
          videoURLRef.current = downloadVideoURL;
          url = downloadVideoURL;
          toast.update(id, {
            render: "Image upload success!",
            type: "success",
            isLoading: false
          });
          resolve(url);
        }
      );
      return url;
    });
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["image"],
    ["clean"] // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: educationMaterialSchema,
    validateOnChange: true
  });
  const { values, handleChange } = formik;
  // console.log(errors);

  async function handleSubmit() {
    setIsLoading(true);

    // const validations = checkValidations();
    // alert(validations);
    // if (validations) return;

    await handleImageUploader();

    if (selectedPostType === "Video") {
      await handleVideoUploader();
      if (!imageURLRef.current || !videoURLRef.current) {
        toast.error("File upload is not complete. Please wait and try again");
        setIsLoading(false);
        return;
      }
    } else {
      videoURLRef.current = "video";
    }

    if (!imageURLRef.current) {
      toast.error("File upload is not complete. Please wait and try again");
      setIsLoading(false);
      return;
    }

    const { apiSuccess, apiError }: any = await createEducationMaterial(
      values.title,
      postType,
      value,
      videoURLRef.current,
      imageURLRef.current
    );

    if (apiSuccess && apiSuccess.status === 200) {
      formik.resetForm();
      setImage(null);
      setVideo(null);
      navigate("/admin/educational-material");
    } else if (apiError) {
      console.log(apiError);

      toast.error(apiError.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again");
    }
    setIsLoading(false);
  }

  // const checkValidations = () => {
  //   const typedErrors: FormikErrors<any> = errors;

  //   const firstErrorValue = (Object.values(typedErrors) as string[])[0];

  //   toast.error(firstErrorValue);
  //   return firstErrorValue;
  // };

  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5">
      <div className="flex justify-between items-center px-5">
        <TableTitle
          text={`${t("educational-materials")}`}
          textSize="text-6xl"
          color="text-textSecondary"
        />
        <BasicButton
          styledBorderEnabled={false}
          onClick={() => {
            navigate("/admin/educational-material");
          }}
          text={`${t("back")}`}
        />
      </div>
      <div className="border-t-2 mt-4 border-secondary flex flex-row px-5 gap-6 ">
        <div className="w-10/12 mt-8 flex flex-col gap-8">
          <div className="">
            <div className="w-full">
              <InputField
                label={`${t("title")}`}
                placeholder={`${t("title")}`}
                value={values.title}
                onInputChange={handleChange}
                name="title"
              />
            </div>
          </div>
          <div className="rounded-lg overflow-hidden ">
            <div>
              <ReactQuill
                theme="snow"
                value={value}
                modules={modules}
                onChange={setValue}
                className="min-h-[462px] rounded-lg border border-[#9A793E] overflow-hidden outline-none"
              />
            </div>
          </div>
        </div>
        <div className="w-3/12 mt-14 flex flex-col gap-8">
          <div className="w-full border-2 border-[#9A793E] rounded-lg py-1">
            <div className="text-textSecondary px-1 text-lg font-medium border-b border-secondary">
              Catergories
            </div>
            <div className="flex gap-2 items-center">
              <Radio
                name="Article"
                label="Article"
                labelProps={{ className: "text-base font-medium text-black" }}
                crossOrigin={""}
                className="outline-none checked:border-none w-3 h-3"
                checked={selectedPostType === "Article"}
                value={postType}
                onChange={() => {
                  setSelectedPostType("Article");
                  setPostType("Article");
                }}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.75 1.50492C12.8812 2.15806 13.8222 3.09531 14.4799 4.22389C15.1375 5.35248 15.489 6.63325 15.4996 7.93942C15.5101 9.2456 15.1794 10.5319 14.54 11.6709C13.9007 12.81 12.9749 13.7623 11.8544 14.4337C10.7339 15.105 9.45752 15.472 8.15157 15.4985C6.84562 15.5249 5.55541 15.2098 4.40867 14.5844C3.26192 13.9589 2.2984 13.0448 1.6135 11.9326C0.928597 10.8203 0.546057 9.54845 0.50375 8.24292L0.5 7.99992L0.50375 7.75692C0.545752 6.46166 0.922661 5.19939 1.59773 4.09316C2.2728 2.98694 3.22299 2.07451 4.35567 1.44483C5.48835 0.815154 6.76486 0.489717 8.06075 0.500248C9.35665 0.510778 10.6277 0.856918 11.75 1.50492ZM8 6.49992C7.64155 6.4999 7.29494 6.62825 7.02294 6.86173C6.75095 7.0952 6.57156 7.41835 6.51725 7.77267L6.50375 7.88817L6.5 7.99992L6.50375 8.11242C6.52564 8.40345 6.63196 8.68178 6.80968 8.9133C6.98739 9.14481 7.22879 9.31944 7.50428 9.41581C7.77977 9.51217 8.07739 9.52606 8.36067 9.4558C8.64394 9.38553 8.90056 9.23415 9.09908 9.0202C9.2976 8.80626 9.42939 8.53905 9.47831 8.25132C9.52722 7.96359 9.49114 7.66784 9.37447 7.40031C9.2578 7.13279 9.06563 6.90511 8.82149 6.74518C8.57735 6.58525 8.29186 6.50001 8 6.49992Z"
                      fill="#C8934F"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex gap-2 items-center">
              <Radio
                name="Video"
                label="Video"
                labelProps={{ className: "text-base font-medium text-black" }}
                crossOrigin={""}
                className="outline-none checked:border-none w-3 h-3"
                checked={selectedPostType === "Video"}
                value={postType}
                onChange={() => {
                  setSelectedPostType("Video");
                  setPostType("Video");
                }}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.75 1.50492C12.8812 2.15806 13.8222 3.09531 14.4799 4.22389C15.1375 5.35248 15.489 6.63325 15.4996 7.93942C15.5101 9.2456 15.1794 10.5319 14.54 11.6709C13.9007 12.81 12.9749 13.7623 11.8544 14.4337C10.7339 15.105 9.45752 15.472 8.15157 15.4985C6.84562 15.5249 5.55541 15.2098 4.40867 14.5844C3.26192 13.9589 2.2984 13.0448 1.6135 11.9326C0.928597 10.8203 0.546057 9.54845 0.50375 8.24292L0.5 7.99992L0.50375 7.75692C0.545752 6.46166 0.922661 5.19939 1.59773 4.09316C2.2728 2.98694 3.22299 2.07451 4.35567 1.44483C5.48835 0.815154 6.76486 0.489717 8.06075 0.500248C9.35665 0.510778 10.6277 0.856918 11.75 1.50492ZM8 6.49992C7.64155 6.4999 7.29494 6.62825 7.02294 6.86173C6.75095 7.0952 6.57156 7.41835 6.51725 7.77267L6.50375 7.88817L6.5 7.99992L6.50375 8.11242C6.52564 8.40345 6.63196 8.68178 6.80968 8.9133C6.98739 9.14481 7.22879 9.31944 7.50428 9.41581C7.77977 9.51217 8.07739 9.52606 8.36067 9.4558C8.64394 9.38553 8.90056 9.23415 9.09908 9.0202C9.2976 8.80626 9.42939 8.53905 9.47831 8.25132C9.52722 7.96359 9.49114 7.66784 9.37447 7.40031C9.2578 7.13279 9.06563 6.90511 8.82149 6.74518C8.57735 6.58525 8.29186 6.50001 8 6.49992Z"
                      fill="#C8934F"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="w-full border-2 border-[#9A793E] rounded-lg py-1">
            <div className="text-textSecondary px-1 text-lg font-medium border-b border-secondary">
              Cover Image
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="mt-6 px-5">
                <UploadImage
                  handleChange={handleImage}
                  selectedFile={image}
                  value={values.url}
                />
              </div>
            </div>
          </div>

          {selectedPostType === "Video" && (
            <div className="w-full border-2 border-[#9A793E] rounded-lg py-1">
              <div className="text-textSecondary px-1 text-lg font-medium border-b border-secondary">
                Video
              </div>
              <div className="flex gap-2 justify-center items-center">
                <div className="mt-6 px-5">
                  <UploadVideo
                    handleChange={handleVideo}
                    selectedFile={video}
                    value={values.thumbnail}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t-2 mt-10 border-secondary">
        <div className="flex w-full justify-end mt-5 px-5">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <LoaderIconSvg />
            </div>
          ) : (
            <BasicButton
              styledBorderEnabled={false}
              onClick={handleSubmit}
              text={`${t("Publish")}`}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEducationalMaterialForm;
