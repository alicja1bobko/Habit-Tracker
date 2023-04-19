import { doc, updateDoc } from "firebase/firestore";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Modal } from "../components/loggedIn/Modal";
import useAuth from "../context/auth-context";
import { IUserData, useUser } from "../context/user-context";
import DashboardLayout from "../Layouts/DashboardLayout";
import { db } from "./api/firebase";
import { NextPageWithLayout } from "./_app";
import { storage } from "./api/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ProfilePictureSection } from "../components/SettingsPage/ProfilePicture";
import DeleteAccount from "../components/SettingsPage/DeleteAccount";
import Information from "../components/SettingsPage/Information";

export type Settings = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  image: string;
};

const settingsPage: NextPageWithLayout = () => {
  const { user, deleteAccount } = useAuth();
  const userData: IUserData | null = useUser();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [url, setUrl] = useState<string>();
  const [initializeSettings, setInitializeSettings] = useState<Settings>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    image: "",
  });

  const settingsKey = Object.keys(userData.settings)[0];
  const settingsRef = doc(db, `users/${user?.uid}/settings/${settingsKey}`);

  useEffect(() => {
    // wait for userData to load
    if (Object.keys(userData.settings).length !== 0) {
      const settings = userData.settings[settingsKey];
      setInitializeSettings({
        firstName: settings.firstName,
        lastName: settings.lastName,
        password: settings.password,
        email: settings.email,
        image: settings.image,
      });
    }
  }, [userData]);

  const handleDeleteModal = () => {
    setOpen(true);
  };

  const deleteAcc = async () => {
    try {
      await deleteAccount();
    } catch (err) {
      console.log(err, "error deleting account");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files instanceof FileList
      ? setSelectedImage(e.target.files[0])
      : setSelectedImage("");
  };

  const handleSubmitImg = () => {
    const imageRef = ref(storage, `image/${selectedImage.name}`);
    uploadBytes(imageRef, selectedImage)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            setUrl(url);
            await updateDoc(settingsRef, {
              image: url,
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteImg = async () => {
    await updateDoc(settingsRef, {
      image: "",
    });
    const storageImageRef = ref(storage, `image/${selectedImage.name}`);
    deleteObject(storageImageRef)
      .then(() => {
        console.log("File deleted");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setSelectedImage(""));
  };

  return (
    <>
      <div className="p-3 md:p-0 m-auto lg:w-3/5 3xl:w-1/2">
        <ProfilePictureSection
          selectedImage={selectedImage}
          initializeSettings={initializeSettings}
          handleImageChange={handleImageChange}
          handleSubmitImg={handleSubmitImg}
          handleDeleteImg={handleDeleteImg}
        />
        <Information initializeSettings={initializeSettings} />
        <hr />
        <DeleteAccount handleDeleteModal={handleDeleteModal} />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        dialog={{
          title: "Delete account?",
          description:
            "Deleted accounts can't be recovered. All data associated with your account will be deleted.",
          confirmText: "Delete account",
          onConfirm: async () => {
            deleteAcc();
          },
        }}
      />
    </>
  );
};

settingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Settings",
        description: "Habit tracker Settings",
      }}
    >
      <div className="w-full justify-center p-3 md:flex md:flex-column min-h-[calc(100vh-4rem)] md:pt-8 md:pb-8 bg-white rounded-3xl md:-translate-y-12">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default settingsPage;
