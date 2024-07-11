
import addTodoBtn from "../assets/images/add-logo.png";
import { memo } from "react";

interface AddTodoBtnProps {
  onclick: () => void;
}

export const AddTodoBtn = memo(function AddTodoBtn({ onclick }: AddTodoBtnProps) {
  console.log("AddTodoBtn Component Rendering");

  return (
    <>
      <button onClick={onclick} className="rounded-full bg-purple flex justify-center items-center p-4">
        <img className="text-white " src={addTodoBtn} alt="add-button" />
      </button>
    </>
  )
})
