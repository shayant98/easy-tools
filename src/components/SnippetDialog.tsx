import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { type FormEvent, useState } from "react";

import { Input } from "@components/ui/Input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { api } from "@utils/api";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Save } from "lucide-react";

const SnippetDialog = ({ value, language }: SnippetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [snippetName, setsnippetName] = useState("");
  const [snippetDescription, setsnippetDescription] = useState("");
  const [snippetLanguage, setsnippetLanguage] = useState(language);

  const { mutateAsync: saveSnippet, isLoading: isSavingSnippet } = api.snippet.saveSnippet.useMutation();

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();

    if (snippetName.trim().length < 1) {
      toast("Snippet name cannot be empty", {
        toastId: "snippet-name-error",
        type: "error",
      });
      return;
    }
    if (value.trim().length < 1) {
      toast("Snippet content cannot be empty", {
        toastId: "snippet-content-error",
        type: "error",
      });

      return;
    }
    toast.promise(saveSnippet({ title: snippetName, content: value, language, desc: snippetDescription }), {
      pending: "Saving snippet...",
      success: "Snippet saved successfully",
      error: "Failed to save snippet",
    });

    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="" size={"sm"} disabled={isSavingSnippet}>
          <Save className="mr-2 h-4 w-4" /> Save Snippet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ready to save?</DialogTitle>
          <DialogDescription>Enter a name, so you can identify your snippet later. Optionally you can add a description to further seperate your snippet</DialogDescription>
          <div className="">
            <Label>Name</Label>
            <Input value={snippetName} onChange={(e) => setsnippetName(e.target.value)} title="Name" placeholder="Eg. foo snippet 1" showClear />
          </div>
          <div className="">
            <Label>Description</Label>
            <Textarea value={snippetDescription} onChange={(e) => setsnippetDescription(e.target.value)} placeholder="Enter a description" />
          </div>
          <div className="">
            <Select>
              <Label>Language</Label>
              <SelectTrigger>
                <SelectValue placeholder="Select a language or format" defaultValue={snippetLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TS">Typescript</SelectItem>
                <SelectItem value="ZOD">ZOD</SelectItem>
                <SelectItem value="YAML">YAML</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label>Snippet</Label>
            <Textarea value={value} disabled placeholder="Snippet value wil be visible here" />
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleSubmission} variant="default" className="w-full" disabled={isSavingSnippet || !snippetName || !value}>
              <Save className="mr-2 h-4 w-4" /> Save Snippet
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

interface SnippetDialogProps {
  value: string;
  language: string;
}

export default SnippetDialog;
