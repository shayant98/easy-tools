import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClear, AiOutlineCloudDownload, AiOutlinePlus } from "react-icons/ai";
import Input from "@components/ui/Input";
import BaseLayout from "@layout/BaseLayout";
import json2yaml from "json-to-pretty-yaml";
import { toast } from "react-toastify";
import Editor from "@components/Editor/Editor";

const DockerCompose = () => {
  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [service, setservice] = useState("");
  const [volumes, setvolumes] = useState<{ internal: string; external: string }[]>([]);
  const [ports, setports] = useState<{ internal: string; external: string }[]>([]);
  const [env, setenv] = useState<{ label: string; value: string }[]>([]);
  const [labels, setlabels] = useState<{ label: string; value: string }[]>([]);
  const [yaml, setyaml] = useState("");

  useEffect(() => {
    setvolumes([{ internal: "", external: "" }]);
    setports([{ internal: "", external: "" }]);
    setenv([{ label: "", value: "" }]);
    setlabels([{ label: "", value: "" }]);
  }, []);

  const handleAddVolume = () => {
    setvolumes((prevVolumes) => [...prevVolumes, { internal: "", external: "" }]);
  };

  const handleRemoveVolume = (index: number) => {
    setvolumes((prevVolumes) => [...prevVolumes.filter((port, i) => i !== index)]);
  };
  const handleAddPort = () => {
    setports((prevPorts) => [...prevPorts, { internal: "", external: "" }]);
  };

  const handleRemovePort = (index: number) => {
    setports((prevPort) => [...prevPort.filter((port, i) => i !== index)]);
  };
  const handleAddEnv = () => {
    setenv((prevenvs) => [...prevenvs, { label: "", value: "" }]);
  };

  const handleRemoveEnv = (index: number) => {
    setenv((prevenvs) => [...prevenvs.filter((env, i) => i !== index)]);
  };
  const handleAddLabel = () => {
    setlabels((prevLabel) => [...prevLabel, { label: "", value: "" }]);
  };

  const handleRemoveLabel = (index: number) => {
    setlabels((prevLabel) => [...prevLabel.filter((env, i) => i !== index)]);
  };

  const handleGenerateDockerFile = () => {
    if (service === "") {
      toast("A service name is required", { type: "error" });
      return;
    }
    if (image === "") {
      toast("An image is required", { type: "error" });
      return;
    }
    volumes.map((volume) => {
      if (volume.external === "" || volume.internal === "") {
        toast("Volume format invalid", { type: "error" });
        return;
      }
    });
    ports.map((port) => {
      if (port.external === "" || port.internal === "") {
        toast("Port format invalid", { type: "error" });
        return;
      }
    });
    env.map((env) => {
      if (env.label === "" || env.value === "") {
        toast("ENV format invalid", { type: "error" });
        return;
      }
    });
    labels.map((label) => {
      if (label.label === "" || label.value === "") {
        toast("Label format invalid", { type: "error" });
        return;
      }
    });
    toast("Generating docker-compose.yaml", { type: "success" });

    const template = {
      services: {
        [service]: {
          container_name: name ?? "cont1",
          deploy: {
            replicas: 1,
            restart_policy: {
              condition: "any",
            },
          },
          environment: env.reduce((a, v) => ({ ...a, [v.label]: v.value }), {}),
          hostname: "nginc.demo",
          image: image ?? "image",
          labels: labels.reduce((a, v) => ({ ...a, [v.label]: v.value }), {}),
          ports: ports.map((port) => `${port.external}:${port.internal}`),
          user: "1000",
          volumes: volumes.map((volume) => `${volume.external}:${volume.internal}`),
          working_dir: null,
        },
      },
    };

    const yaml = json2yaml.stringify(template);
    setyaml(yaml);
  };

  const updateEnv = (e: ChangeEvent<HTMLInputElement>, i: number, k: "label" | "value") => {
    const environment = env[i];
    if (environment === undefined) {
      return;
    }
    environment[k] = e.target.value;
    setenv([...env.slice(0, i), environment, ...env.slice(i + 1, env.length)]);
  };

  const updateLabel = (e: ChangeEvent<HTMLInputElement>, i: number, k: "label" | "value") => {
    const label = labels[i];
    if (label === undefined) {
      return;
    }
    label[k] = e.target.value;
    setenv([...env.slice(0, i), label, ...env.slice(i + 1, env.length)]);
  };

  const updateVolume = (e: ChangeEvent<HTMLInputElement>, i: number, k: "internal" | "external") => {
    const volume = volumes[i];
    if (volume === undefined) {
      return;
    }
    volume[k] = e.target.value;
    setvolumes([...volumes.slice(0, i), volume, ...volumes.slice(i + 1, volumes.length)]);
  };

  const downloadTxtFile = () => {
    if (yaml === "") {
      toast.error("Please generate the file first");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([yaml], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "docker-compose.yaml";
    document.body.appendChild(element);
    element.click();
    toast.success("Downloading docker-compose.yaml");
  };

  return (
    <BaseLayout showBackButton title="Docker compose generator">
      <div className="flex gap-x-2 mb-2">
        <div className="flex justify-end gap-x-1 w-full ">
          <div className="flex text-xs items-center gap-1 bg-gray-900 rounded px-4 py-2 cursor-pointer" onClick={handleGenerateDockerFile}>
            <AiOutlinePlus /> Generate
          </div>
          <div className="bg-gray-900 rounded px-4 py-2 cursor-pointer" onClick={downloadTxtFile}>
            <AiOutlineCloudDownload />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full">
          <div className="flex   gap-4 ">
            <div className="flex flex-col px-8 py-4 w-full bg-gray-900 rounded overflow-auto">
              <div className="flex gap-2 w-full ">
                <Input value={service} onChange={(e) => setservice(e.target.value)} title={"Service"} />
                <Input value={image} onChange={(e) => setimage(e.target.value)} title={"Image"} />
                <Input value={name} onChange={(e) => setname(e.target.value)} title={"Container name"} />
              </div>

              <div className="flex gap-2 items-center mt-5 mb-3 ">
                <h6 className="text-xl font-bold">Volumes</h6>
                <div className="flex bg-green-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleAddVolume()}>
                  <AiOutlinePlus className="text-cl" />
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                {volumes.map((volume, i) => (
                  <div key={i} className="flex items-center w-full gap-x-2">
                    <Input value={volume.internal} onChange={(e) => updateVolume(e, i, "internal")} />
                    <Input value={volume.external} onChange={(e) => updateVolume(e, i, "external")} />
                    <div className="flex bg-red-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleRemoveVolume(i)}>
                      <AiOutlineClear className="" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center mt-5 mb-3 ">
                <h6 className="text-xl font-bold">Ports</h6>
                <div className="flex bg-green-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleAddPort()}>
                  <AiOutlinePlus className="text-cl" />
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                {ports.map((port, i) => (
                  <div key={i} className="flex items-center w-full gap-x-2">
                    <Input
                      value={""}
                      onChange={() => {
                        return;
                      }}
                    />
                    <Input
                      value={""}
                      onChange={() => {
                        return;
                      }}
                    />
                    <div className="flex bg-red-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleRemovePort(i)}>
                      <AiOutlineClear className="" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center mt-5 mb-3 ">
                <h6 className="text-xl font-bold">Environment Variables</h6>
                <div className="flex bg-green-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleAddEnv()}>
                  <AiOutlinePlus className="text-cl" />
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                {env.map((env, i) => (
                  <div key={i} className="flex items-center w-full gap-x-2">
                    <Input value={env.label} onChange={(e) => updateEnv(e, i, "label")} />
                    <Input value={env.value} onChange={(e) => updateEnv(e, i, "value")} />
                    <div className="flex bg-red-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleRemoveEnv(i)}>
                      <AiOutlineClear className="" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center mt-5 mb-3 ">
                <h6 className="text-xl font-bold">Labels</h6>
                <div className="flex bg-green-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleAddLabel()}>
                  <AiOutlinePlus className="text-cl" />
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                {labels.map((label, i) => (
                  <div key={i} className="flex items-center w-full gap-x-2">
                    <Input value={label.label} onChange={(e) => updateLabel(e, i, "label")} title={"Name"} />
                    <Input value={label.value} onChange={(e) => updateLabel(e, i, "value")} title={"Value"} />
                    <div className="flex bg-red-500 text-sm rounded h-full items-center px-4 py-2  cursor-pointer" onClick={() => handleRemoveLabel(i)}>
                      <AiOutlineClear className="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col p-8 w-full bg-gray-900">
              <Editor
                disabled
                value={yaml}
                setValue={() => {
                  return;
                }}
                language="dockerfile"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DockerCompose;
