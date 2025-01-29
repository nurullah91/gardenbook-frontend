"use client";

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalTitle: string;
  footerCancelButtonText?: string;
  footerExtraButton?: ReactNode;
}

export default function GBModal({
  isOpen,
  onClose,
  children,
  modalTitle,
  footerCancelButtonText,
  footerExtraButton,
}: ModalProps) {
  return (
    <>
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {footerCancelButtonText ? footerCancelButtonText : "Ok"}
                </Button>
                {footerExtraButton}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
