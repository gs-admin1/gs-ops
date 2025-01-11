import React, { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "./ui/alert-dialog";
import { Button } from "./ui/button";

function UserLogin() {
  // State variable to control dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Example variable to determine when to open dialog
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  function handleLogin() {
    setShouldOpenDialog(true);
    console.log("Login button clicked");
    console.log("shouldOpenDialog: ", shouldOpenDialog);
  }

  function handleCancel() {
    setShouldOpenDialog(false);
    console.log("Cancel button clicked");
    console.log("shouldOpenDialog: ", shouldOpenDialog);
  }

  function handleContinue() {
    setShouldOpenDialog(false);
    chrome.runtime.sendMessage({ type: 'LOGIN'});
    console.log("Continue button clicked");
    console.log("shouldOpenDialog: ", shouldOpenDialog);
  }

  // Effect to sync `shouldOpenDialog` with dialog visibility
  React.useEffect(() => {
    if (shouldOpenDialog) {
      setIsDialogOpen(true);
    }
    else {
      setIsDialogOpen(false);
    } 
  }, [shouldOpenDialog]);

  return (
    <div>
      <Button
        variant="ghost" 
        className="bg-slate-900 hover:bg-slate-900/90"
        title="Login to Maverick.Ai"
        onClick={handleLogin}>
        Login
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login</AlertDialogTitle>
            <AlertDialogDescription>
              Please login to use Maverick.Ai. This will open a new tab for login.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default UserLogin;
