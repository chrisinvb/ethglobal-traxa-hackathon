import {
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { LatestContainers } from "./LatestContainers";

function ContainerNotFoundDialog({ containerId, onClose, isOpen }) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Container "{containerId}" not found
          </AlertDialogHeader>

          <AlertDialogBody>
            We could not find your container. Here are some of the latest
            containers that were successfully tracked:
            <div className="h-4"></div>
            <LatestContainers
              className="pt-4 max-h-full"
              direction={"column"}
              containerClicked={() => onClose()}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export { ContainerNotFoundDialog };
