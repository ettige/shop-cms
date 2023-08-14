'use client'

import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useStoreModal } from "@/components/hooks/use-store-modal";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

const SetupPage = () => {
  const router = useRouter()

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);


  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);




  return null;
};

export default SetupPage;