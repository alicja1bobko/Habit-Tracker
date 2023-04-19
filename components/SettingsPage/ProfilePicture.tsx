import { Avatar, Button } from "@mui/material";
import React from "react";
import { Settings } from "../../pages/settings";

type Props = {
  selectedImage: any;
  initializeSettings: Settings;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitImg: () => void;
  handleDeleteImg: () => Promise<void>;
};

export const ProfilePictureSection = ({
  selectedImage,
  initializeSettings,
  handleImageChange,
  handleSubmitImg,
  handleDeleteImg,
}: Props) => {
  return (
    <>
      <h2 className="text-4xl font-bolder">Profile Picture</h2>
      <div className="mt-5 lg:mt-10 grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 items-center gap-5">
        <div className="justify-center flex lg:block lg:pl-7">
          <Avatar
            alt="Avatar profile picture"
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : initializeSettings.image
            }
            sx={{
              width: 180,
              height: 180,
            }}
            variant="rounded"
          />
        </div>
        <div>
          <input
            className="file-input"
            type="file"
            id="image-input"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          <div className="mt-5 flex justify-between">
            <Button
              onClick={handleSubmitImg}
              variant="contained"
              aria-label={"save image"}
              sx={{
                height: "40px",
                width: "150px",
                backgroundColor: "#328C32",
                ":hover": {
                  backgroundColor: "#2d7e2d",
                },
              }}
              type="submit"
            >
              Save
            </Button>
            <Button
              onClick={handleDeleteImg}
              variant="contained"
              color="error"
              aria-label={"remove profile picture"}
              sx={{
                height: "40px",
                width: "150px",
                alignSelf: "center",
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
