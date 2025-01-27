import React, { useState } from "react";
import { useRouter } from "next/router";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useToast } from "../../components/ui/toast-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { X } from "lucide-react";

const CreateEvent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true); // State to control dialog visibility
  const [form, setForm] = useState({
    name: "",
    date: "",
    description: "",
    googleFormLink: "",
  });
  const [posterFiles, setPosterFiles] = useState<File[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + posterFiles.length > 3) {
        showToast({
          title: "Error",
          description: "You can upload a maximum of 3 images.",
          variant: "destructive",
        });
      } else {
        setPosterFiles((prev) => [...prev, ...files].slice(0, 3));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConfirmed) {
      showToast({
        title: "Error",
        description: "Please confirm the details before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          posterUrl: posterFiles.length > 0 ? URL.createObjectURL(posterFiles[0]) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      showToast({
        title: "Success",
        description: "Event created successfully!",
        variant: "success",
      });

      router.push("/"); // Redirect to the home page after successful creation
    } catch (error) {
      console.error("Error creating event:", error);
      showToast({
        title: "Error",
        description: "Failed to create the event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    router.push("/"); // Redirect back to the home page
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Create Event</DialogTitle>
            {/* Single X Button for Closing */}
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleCloseDialog}
            >
              <X className="w-6 h-6" /> {/* Close Icon */}
            </button>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
            />
          </div>
          <div>
            <Label htmlFor="googleFormLink">Google Form Link</Label>
            <Input
              type="url"
              id="googleFormLink"
              name="googleFormLink"
              value={form.googleFormLink}
              onChange={handleChange}
              placeholder="Enter Google Form link for payment"
              required
            />
          </div>
          <div>
            <Label htmlFor="posterFiles">Event Poster</Label>
            <Input
              type="file"
              id="posterFiles"
              name="posterFiles"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500">You can upload up to 3 images.</p>
            <div className="flex gap-2 mt-2">
              {posterFiles.map((file, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Poster ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmation"
              checked={isConfirmed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIsConfirmed(e.target.checked)
              }
            />
            <Label htmlFor="confirmation">
              I confirm that all the information is correct and follows the guidelines.
            </Label>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEvent;
