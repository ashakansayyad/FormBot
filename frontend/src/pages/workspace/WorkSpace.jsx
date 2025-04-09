import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./WorkSpace.module.css";
import WorkSpaceFields from "../../components/workspacefields/WorkSpaceFields";
import WorkSpaceNavbar from "../../components/workspacenavbar/WorkSpaceNavbar";
import { getFormsData, createForm, updateForm } from "../../apis/form";
import { toast } from "react-toastify";
import {
  text_babble,
  image_babble,
  video_babble,
  gif_babble,
  text_inputs,
  buttons_inputs,
  phone_inputs,
  email_inputs,
  ratings_inputs,
  date_inputs,
  number_inputs,
  formbot_start_icon,
} from "../../assets/assets";

function WorkSpace() {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const { parentFileId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({
    text: false,
    image: false,
    video: false,
    gif: false,
  });

  const fetchFormsData = async () => {
    try {
      const res = await getFormsData(parentFileId);
      if (res && res.data) {
        // transformthe api response into the fields format

        const transformedFields = [
          ...res.data.babbles.map((babble, index) => ({
            type: babble.type,
            name: babble.name,
            value: babble.value || "",
            count: index + 1, //add a count based position in babbles
          })),
          ...res.data.inputFields.map((input, index) => ({
            type: input.type,
            name: input.name,
            value: input.value || (input.name === "Button" ? "" : undefined ),
            count: index + 1 + res.data.babbles.length, //continue counting after babbles
          })),
        ];
        setFields(transformedFields);
        setTitle(res.data.title || "");
        setIsEditing(true);
      } else {
        setIsEditing(false);
        setFields([]);
        setTitle("");
      }
    } catch (err) {
      setFields([]);
      setTitle("");
      setIsEditing(false);
      console.error("Error while fetching form data: ", err);
    }
  };
  const handleSaveForm = async () => {
    const babbles = fields
      .filter((item) => item.type === "babble")
      .map((item) => ({
        type: item.type,
        name: item.name,
        value: item.value ? item.value.trim() : null,
      }));
    const inputFields = fields
      .filter((item) => item.type === "input")
      .map((item) => ({
        type: item.type,
        name: item.name,
        value:item.name === "Button" ? item.value || null : undefined,    //only send value for button
      }));

    setError({}); //reset errors
    let isError = false;
    const newErrors = {};

    babbles.forEach((babble) => {
      if (!babble.value || babble.value.trim() === "") {
        isError = true;
        newErrors[babble.name.toLowerCase()] = true;
      }
    });

    if (isError) {
      setError(newErrors);
      toast.error("Please fill in all required babble!");
      return; //stop from submission
    }
    if (title === "") {
      toast.error("Enter form name first");
      return;
    }
    try {
      if (isEditing) {
        // update existing form
        const res = await updateForm(parentFileId, {
          title,
          babbles,
          inputFields,
        });
        if (res && res.data) {
          toast.success(res.data.message);
        }
      } else {
        // create new form
        const res = await createForm({
          title,
          babbles,
          inputFields,
          parentFileId,
        });
        if (res && res.data) {
          toast.success(res.data.message);
          setIsEditing(true); //switch to edit mode
        }
      }
    } catch (err) {
      console.error("Error: ", err);
      toast.error(err.response?.message);
    }
  };

  //store babble and inputFields in one array
  const handleFields = useCallback(
    (type, category) => {
      const count =
        fields.filter((item) => item.type === category && item.name === type)
          .length + 1;
      const newField = {
        type: category,
        name: type,
        value: category === "babble" ? "" : (type === "Button" && category === "input" ? "" : undefined),
        count,
      };
      setFields([...fields, newField]);
    },
    [fields, setFields]
  );

  const handleFieldsDelete = useCallback(
    (idx) => {
      const updatedFields = fields.filter((item, index) => index !== idx);
      setFields(updatedFields);
    },
    [fields, setFields]
  );

  useEffect(() => {
    fetchFormsData();
  }, [parentFileId]);

  return (
    <div className={styles.formbot}>
      <WorkSpaceNavbar
        title={title}
        setTitle={setTitle}
        parentFileId={parentFileId}
        handleSaveForm={handleSaveForm}
      />
      <div className={styles.formbotMainContainer}>
        <div className={styles.formbotMainContainer_left}>
          <div className={styles.formbotMainContainer_left_babblesContainer}>
            <h3>Bubbles</h3>
            <div>
              <button onClick={() => handleFields("Text", "babble")}>
                <img src={text_babble} />
                Text
              </button>
              <button onClick={() => handleFields("Image", "babble")}>
                <img src={image_babble} />
                Image
              </button>
              <button onClick={() => handleFields("Video", "babble")}>
                <img src={video_babble} />
                Video
              </button>
              <button onClick={() => handleFields("GIF", "babble")}>
                <img src={gif_babble} />
                GIF
              </button>
            </div>
          </div>
          <div className={styles.formbotMainContainer_left_inputsContainer}>
            <h3>Inputs</h3>
            <div>
              <button onClick={() => handleFields("Text", "input")}>
                <img src={text_inputs} />
                Text
              </button>
              <button onClick={() => handleFields("Number", "input")}>
                <img src={number_inputs} />
                Number
              </button>
              <button onClick={() => handleFields("Email", "input")}>
                <img src={email_inputs} />
                Email
              </button>
              <button onClick={() => handleFields("Phone", "input")}>
                <img src={phone_inputs} />
                Phone
              </button>
              <button onClick={() => handleFields("Date", "input")}>
                <img src={date_inputs} />
                Date
              </button>
              <button onClick={() => handleFields("Rating", "input")}>
                <img src={ratings_inputs} />
                Rating
              </button>
              <button onClick={() => handleFields("Button", "input")}>
                <img src={buttons_inputs} />
                Buttons
              </button>
            </div>
          </div>
        </div>
        <div className={styles.formbotMainContainer_right}>
          <div className={styles.startContainer}>
            <img src={formbot_start_icon} />
            Start
          </div>
          <WorkSpaceFields
            fields={fields}
            setFields={setFields}
            handleFieldsDelete={handleFieldsDelete}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
