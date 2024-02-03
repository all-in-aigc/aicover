"use client";

import { FaComment, FaDownload } from "react-icons/fa";
import { useContext, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import Consultqr from "../consultqr";
import { Cover } from "@/types/cover";

export default function ({ cover }: { cover: Cover }) {
  const { user } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Consultqr open={open} setOpen={setOpen} />
      <Button className="mt-4 mx-auto" onClick={() => setOpen(true)}>
        <FaComment className="mr-2" />
        联系客服购买
      </Button>
    </>
  );
}
