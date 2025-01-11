import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Presentation } from "lucide-react";
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function MeetDialog() {
  // State variable to control dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Example variable to determine when to open dialog
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  function handleMeet() {
    setShouldOpenDialog(true);
    console.log("Join Meeting button clicked");
    console.log("shouldOpenDialog: ", shouldOpenDialog);
  }

  function handleCancel() {
    setShouldOpenDialog(false);
    console.log("Cancel button clicked");
    console.log("shouldOpenDialog: ", shouldOpenDialog);
  }

  function handleJoin() {
    setShouldOpenDialog(false);
    chrome.runtime.sendMessage({ type: 'JOIN'});
    console.log("Join button clicked");
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
          title="Click to enter meeting link"
          onClick={handleMeet}
          className="bg-slate-900 hover:bg-slate-900/90"
        >
          <Presentation className="h-6 w-6" />
          <span>Join Meeting</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meeting</DialogTitle>
            <DialogDescription>
              Please enter the meeting link and select the platform to join the meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Meeting Link
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Platform
            </Label>
            <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Microsoft Teams</SelectItem>
                  <SelectItem value="sveltekit">Google Meet</SelectItem>
                  <SelectItem value="astro">Zoom</SelectItem>
                  <SelectItem value="nuxt">Slack</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleJoin}>
              Join
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MeetDialog;
