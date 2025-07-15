import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import cuid2 from "@paralleldrive/cuid2";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Folder, PlusCircle, Trash } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type ProjectFolder = {
  id: string;
  name: string;
  children?: ProjectFolder[];
};

type ProjectTree = ProjectFolder[];

const ProjectTreeGen = ({
  setSelectedPresets,
}: {
  setSelectedPresets: Dispatch<
    SetStateAction<
      {
        title: string;
        value: string;
      }[]
    >
  >;
}) => {
  const [project, setProject] = useState<ProjectTree>([
    {
      id: cuid2.createId(),
      name: "",
    },
  ]);

  const [open, setOpen] = useState(false);

  const addFolder = ({}) => {
    const newProject = [...project];
    newProject.push({ name: "", id: cuid2.createId() });
    setProject(newProject);
  };

  const addSubFolder = (index: number) => {
    const newProject = [...project];

    const folder = newProject[index];

    if (folder === undefined) {
      return;
    }
    if (folder.children === undefined) {
      folder.children = [
        {
          id: cuid2.createId(),
          name: "",
        },
      ];
    } else {
      folder.children.push({
        id: cuid2.createId(),
        name: "",
      });
    }
    setProject(newProject);
  };

  const generateMarkdownProjectStructure = () => {
    let markdown = "";
    const generateRecord = (
      folder: ProjectFolder,
      depth = 0,
      isFinal = false,
    ) => {
      markdown += `${"  ".repeat(depth)}${isFinal ? "┗ " : "┣"}📁 ${folder.name}\n`;

      if (folder.children) {
        folder.children.forEach((child, index) => {
          generateRecord(
            child,
            depth + 1,
            index === folder.children!.length - 1,
          );
        });
      }
    };

    project.forEach((folder, index) => {
      generateRecord(folder, 0, index === project.length - 1);
    });

    setSelectedPresets((prev) => {
      const hasProjectStructure = prev.some(
        (preset) => preset.title === "Project Structure",
      );
      if (hasProjectStructure) {
        return prev.map((preset) => {
          if (preset.title === "Project Structure") {
            return {
              ...preset,
              onClick: () => {
                setOpen(true);
              },
              value: `\n## Project Structure\n\`\`\`\n${markdown}\n\`\`\``,
            };
          }
          return preset;
        });
      }

      return [
        ...prev,
        {
          title: "Project Structure",
          onClick: () => {
            setOpen(true);
          },
          value: `\n## Project Structure\n\`\`\`\n${markdown}\n\`\`\``,
        },
      ];

      //       return [
      //         ...prev,
      //         {
      //           title: "Project Structure",
      //           onClick: () => {
      //             setOpen(true);
      //           },
      //           value: `
      // ## Project Structure
      // \`\`\`
      // ${markdown}
      // \`\`\``,
      //         },
      //       ];
    });

    setOpen(false);
  };

  const removeFolder = ({
    id,
    parentId,
  }: {
    id: string;
    parentId?: string;
  }) => {
    let folders: ProjectFolder[] = [];

    if (parentId) {
      const parentFolder = project.find((folder) => folder.id === parentId);

      if (parentFolder === undefined) {
        return;
      }

      if (parentFolder.children === undefined) {
        return;
      }

      folders = parentFolder.children;
    } else {
      folders = [...project];
    }

    const foundFolder = folders.find((folder) => folder.id === id);

    if (foundFolder === undefined) {
      return;
    }

    folders = folders.filter((folder) => folder.id !== id);

    if (parentId) {
      const parentFolder = project.find((folder) => folder.id === parentId);

      console.log("parent id", parentFolder);

      if (parentFolder === undefined) {
        return;
      }

      setProject((prev) => {
        const allButParent = prev.filter((folder) => folder.id !== parentId);

        return [...allButParent, { ...parentFolder, children: folders }];
      });

      return;
    }

    setProject(folders.filter((folder) => folder.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full cursor-pointer flex-wrap items-center justify-between rounded bg-secondary px-4 py-2 text-center text-xs">
        Project Tree Generator
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Tree Generator</DialogTitle>
          <DialogDescription>
            Generate a tree of your project directory
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={addFolder}>
            <PlusCircle className="h-4 w-4" />
            Add Parent Folder
          </Button>
        </div>

        {project.map((folder, index) => (
          <div
            key={index}
            className="grid items-center gap-2 rounded-md bg-secondary/20 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Folder />
              <Input
                value={folder.name}
                onChange={(e) => {
                  const newProject = [...project];

                  if (newProject[index] === undefined) {
                    return;
                  }
                  newProject[index]!.name = e.target.value;
                  setProject(newProject);
                }}
                placeholder="Folder Name"
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => addSubFolder(index)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() =>
                  removeFolder({
                    id: folder.id,
                  })
                }
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {folder.children?.map((subFolder, subIndex) => (
              <div key={subIndex} className="">
                <div className="ml-4 flex items-center gap-2">
                  <Folder />
                  <Input
                    value={subFolder.name}
                    onChange={(e) => {
                      const newProject = [...project];
                      if (newProject[index]!.children === undefined) {
                        return;
                      }

                      newProject[index]!.children![subIndex]!.name =
                        e.target.value;
                      setProject(newProject);
                    }}
                    placeholder="Folder Name"
                  />
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() =>
                      removeFolder({
                        id: subFolder.id,
                        parentId: folder.id,
                      })
                    }
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <Button onClick={generateMarkdownProjectStructure}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectTreeGen;
