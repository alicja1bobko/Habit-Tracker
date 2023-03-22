import { Delete, Edit } from "@material-ui/icons";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { weekdaysTable } from "../../utils/weekdays";
import { Modal } from "./Modal";

export const Habit = ({
  habitKey,
  habit,
}: {
  habitKey: string;
  habit: {
    name: string;
    description: string;
    frequency: Array<number>;
  };
}) => {
  const { name, frequency, description } = habit;

  const [open, setOpen] = useState(false);
  const handleDeleteButtonOnOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="p-3 pl-0">
        <div className="grid lg:grid-cols-2 lg:gap-5">
          <div>
            <h2 className="text-lg">{name}</h2>
            <p className="text-[#949494] max-w-sm">{description}</p>
          </div>
          <div className="flex gap-1 mt-3 lg:mt-0 self-center align-middle">
            {Object.keys(weekdaysTable).map((key: string, index: number) => {
              let selected = frequency.includes(index);

              return (
                <span
                  key={index}
                  className="rounded-full w-[40px] h-[40px] justify-center items-center flex"
                  style={{
                    backgroundColor: selected ? "#f87E3A" : "#fcfbf9",
                    color: selected ? "white" : "black",
                  }}
                >
                  {weekdaysTable[key]}
                </span>
              );
            })}

            <div className="ml-3">
              {/* Edit link */}
              <Tooltip title={"edit habit"}>
                <Link href={`/edit-habit/${habitKey}`} passHref>
                  <IconButton aria-label={"edit habit"}>
                    <Edit />
                  </IconButton>
                </Link>
              </Tooltip>

              {/* Delete button */}
              <Tooltip title={"delete habit"}>
                <IconButton
                  onClick={handleDeleteButtonOnOpen}
                  aria-label={"delete habit"}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        dialog={{
          title: `Delete "${name}"?`,
          description: `Delete habit can't be undone. All data associated with this habit (e.g. progress history) will be deleted.`,
          confirmText: "Delete",
          onConfirm: () => {},
        }}
      />
    </>
  );
};
