import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/Dialog";
import { Button } from "@components/ui/Button";
import { AiOutlineSave } from "react-icons/ai";
import { FormEvent, useState } from "react";

import Input from "@components/ui/Input";
import { Textarea } from "@components/ui/Textarea";
import { Label } from "@components/ui/Label";
import { api } from "@utils/api";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
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
          <Save size={16} /> Save Snippet
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
              <AiOutlineSave /> Save Snippet
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
