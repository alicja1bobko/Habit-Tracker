import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

const NoHabits = () => {
  const router = useRouter();
  return (
    <>
      <Image
        height={400}
        width={400}
        alt="thinking person no habits page image"
        src={"/../public/assets/nohabits.jpg"}
      ></Image>
      <h2 className="text-3xl font-bolder mt-3">There are no habits</h2>
      <p className="p-5 mb-2">
        It looks like you don't have habits yet, why don't you add one?
      </p>
      <Button
        sx={{ width: "170px", height: "55px", gap: "8px" }}
        variant="contained"
        aria-label="add habit"
        color="success"
        onClick={() => router.push("/add-habit")}
      >
        <AddIcon /> ADD HABIT
      </Button>
    </>
  );
};

export { NoHabits };
