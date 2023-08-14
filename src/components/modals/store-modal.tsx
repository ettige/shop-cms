'use client'

import { useStoreModal } from "@/components/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { StoreForm } from "@/components/forms/store-form";
import { SigninForm } from "../forms/signin-form";

export const StoreModal = () => {
    const store = useStoreModal();
    return (
        <Modal
            title="ساخت فروشگاه"
            description="به اسانی کسب و کار اینترنتی خود را شروع کنید."
            isOpen={store.isOpen}
            onClose={store.onClose}
        >
            <StoreForm onCancel={store.onClose} />
        </Modal>
    )
}
