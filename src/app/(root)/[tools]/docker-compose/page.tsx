"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDownload, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Input from "@components/ui/Input";
import json2yaml from "json-to-pretty-yaml";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@components/ui/Tabs";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Label } from "@components/ui/Label";
import { Button } from "@components/ui/Button";
import Editor from "@components/Editor/Editor";
import { BsGear } from "react-icons/bs";
import Container from "@components/Container/Container";
import { useTool } from "context/ToolContext";

interface DockerServices {
  id: string;
  name: string;
  image: string;
  container_name: string;
  volumes: { id: string; internal: string; external: string }[];
  ports: { id: string; internal: string; external: string }[];
  env: { id: string; label: string; value: string }[];
  labels: { id: string; label: string; value: string }[];
}

type ObtainKeys<Obj, Type> = {
  [Prop in keyof Obj]: Obj[Prop] extends Type ? Prop : never;
}[keyof Obj];

type GetStringKeys = ObtainKeys<DockerServices, string>; //  "string1" | "string2"

const NAME = "Docker Compose Generator";
const DESCRIPTION = "Generate Docker Compose YAML";

const DockerCompose = () => {
  const [services, setServices] = useState<DockerServices[]>([]);
  const [yaml, setYaml] = useState("");
  const { setName, setDescription } = useTool();

  useEffect(() => {
    setName(NAME);
    setDescription(DESCRIPTION);

    return () => {
      setName("");
      setDescription("");
    };
  }, [setDescription, setName]);

  useEffect(() => {
    // Initialize service with single demo service
    setServices([
      {
        id: "0",
        name: "demo",
        image: "nginx",
        container_name: "demo",
        ports: [{ id: "0", external: "", internal: "" }],
        volumes: [{ id: "0", external: "", internal: "" }],
        env: [{ id: "0", label: "", value: "" }],
        labels: [{ id: "0", label: "", value: "" }],
      },
    ]);

    return () => {
      setServices([]);
      setYaml("");
    };
  }, []);

  const generateDockerComposeFromServices = () => {
    const serviceJson = services.map((service) => {
      const { name } = service;
      return {
        [name]: {
          image: service.image,
          deploy: {
            replicas: 1,
            restart_policy: {
              condition: "any",
            },
          },
          user: "1000",
          working_dir: null,
          container_name: service.container_name,
          ports: service.ports.map((port) => `${port.external}:${port.internal}`),
          volumes: service.volumes.map((volume) => `${volume.external}:${volume.internal}`),
          environment: service.env.map((env) => `${env.label}=${env.value}`),
          labels: service.labels.map((label) => `${label.label}=${label.value}`),
        },
      };
    });
    const allServices = Object.assign({}, ...serviceJson);

    const yaml = json2yaml.stringify(allServices);

    setYaml(yaml);
  };

  const downloadYaml = () => {
    const element = document.createElement("a");
    const file = new Blob([yaml], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "docker-compose.yml";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const addService = () => {
    const newService = {
      id: services.length.toString(),
      name: `service-${services.length}`,
      image: "nginx",
      container_name: "demo",
      ports: [{ id: "0", external: "", internal: "" }],
      volumes: [{ id: "0", external: "", internal: "" }],
      env: [{ id: "0", label: "", value: "" }],
      labels: [{ id: "0", label: "", value: "" }],
    };
    setServices([...services, newService]);
  };

  const getValueOfService = (name: string, key: GetStringKeys) => {
    const service = services.find((service) => service[key] === name);
    if (service === undefined) {
      return "";
    }
    return service[key];
  };

  const handleNameOfServiceChange = (e: ChangeEvent<HTMLInputElement>, name: string, key: GetStringKeys) => {
    const service = services.find((service) => service[key] === name);
    if (service === undefined) {
      return;
    }

    if (typeof service[key] === "string") {
      service[key] = e.target.value;
    }
    setServices([...services]);
  };

  const updateEnvOfService = (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "label" | "value") => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    const env = service.env[i];
    if (env === undefined) {
      return;
    }
    env[k] = e.target.value;
    setServices([...services]);
  };

  const addEnvToService = (name: string) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.env.push({ label: "", value: "", id: service.env.length.toString() });
    setServices([...services]);
  };

  const removeEnvFromService = (name: string, i: number) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.env.splice(i, 1);
    setServices([...services]);
  };

  const updateLabelOfService = (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "label" | "value") => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    const label = service.labels[i];
    if (label === undefined) {
      return;
    }
    label[k] = e.target.value;
    setServices([...services]);
  };

  const addLabelToService = (name: string) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.labels.push({ label: "", value: "", id: service.labels.length.toString() });
    setServices([...services]);
  };

  const removeLabelFromService = (name: string, i: number) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.labels.splice(i, 1);
    setServices([...services]);
  };

  const updatePortOfService = (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "external" | "internal") => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    const port = service.ports[i];
    if (port === undefined) {
      return;
    }
    port[k] = e.target.value;
    setServices([...services]);
  };

  const addPortToService = (name: string) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.ports.push({ external: "", internal: "", id: service.ports.length.toString() });
    setServices([...services]);
  };

  const removePortFromService = (name: string, i: number) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.ports.splice(i, 1);
    setServices([...services]);
  };

  const updateVolumeOfService = (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "external" | "internal") => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    const volume = service.volumes[i];
    if (volume === undefined) {
      return;
    }
    volume[k] = e.target.value;
    setServices([...services]);
  };

  const addVolumeToService = (name: string) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.volumes.push({ external: "", internal: "", id: service.volumes.length.toString() });
    setServices([...services]);
  };

  const removeVolumeFromService = (name: string, i: number) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    service.volumes.splice(i, 1);
    setServices([...services]);
  };

  const removeService = (name: string) => {
    const service = services.find((service) => service.name === name);
    if (service === undefined) {
      return;
    }
    const index = services.indexOf(service);
    services.splice(index, 1);
    setServices([...services]);
  };

  return (
    <>
      <div className="flex justify-end gap-2 mb-2">
        <Button onClick={generateDockerComposeFromServices}>
          <BsGear />
          Generate
        </Button>
        <Button onClick={downloadYaml}>
          <AiOutlineDownload /> Download
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <Tabs defaultValue={"0"}>
            <div className="flex ">
              <TabsList className="justify-start flex-wrap flex grow">
                {/* Loop over services and create TabsTrigger with name */}
                {services.map((service, i) => (
                  <TabsTrigger className="items-center flex gap-2" key={i} value={service.id}>
                    {service.name}
                    <AiOutlineClose onClick={() => removeService(service.name)} />
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button onClick={addService} variant={"default"} className="ml-3 bg-green-400">
                <AiOutlinePlus />
              </Button>
            </div>
            {/* Loop over services and create TabsContent with name, for inputs use Input component */}
            {services.map((service, i) => (
              <TabsContent className="border-0 p-0" key={i} value={service.id}>
                <div className="flex flex-col space-y-4 ">
                  <div className="flex gap-2">
                    <div className="grow">
                      <Label className="">Service</Label>
                      <Input placeholder="Name" value={getValueOfService(service.name, "name")} onChange={(e) => handleNameOfServiceChange(e, service.name, "name")} />
                    </div>
                    <div className="grow">
                      <Label>Image</Label>
                      <Input placeholder="Image" value={getValueOfService(service.image, "image")} onChange={(e) => handleNameOfServiceChange(e, service.image, "image")} />
                    </div>
                    <div className="grow">
                      <Label>Container name</Label>
                      <Input
                        placeholder="Container name"
                        value={getValueOfService(service.container_name, "container_name")}
                        onChange={(e) => handleNameOfServiceChange(e, service.container_name, "container_name")}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="flex  items-center gap-4 mb-2">
                      <Label>Volumes</Label>
                      <Button onClick={() => addVolumeToService(service.name)} variant={"default"} className="bg-green-400">
                        <AiOutlinePlus />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {service.volumes.map((volume, i) => (
                        <div key={`volume-${volume.id}-${service.id}`} className="flex gap-2">
                          <Input placeholder="internal" value={volume.internal} onChange={(e) => updateVolumeOfService(e, service.name, i, "internal")} />
                          <Input placeholder="external" value={volume.external} onChange={(e) => updateVolumeOfService(e, service.name, i, "external")} />
                          <Button onClick={() => removeVolumeFromService(service.name, i)} variant={"default"} className="bg-red-400">
                            <AiOutlineMinus />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <div className="flex  items-center gap-4 mb-2">
                      <Label>Ports</Label>
                      <Button onClick={() => addPortToService(service.name)} variant={"default"} className="bg-green-400">
                        <AiOutlinePlus />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {service.ports.map((port, i) => (
                        <div key={`port-${port.id}-${service.id}`} className="flex gap-2">
                          <Input placeholder="internal" value={port.internal} onChange={(e) => updatePortOfService(e, service.name, i, "internal")} />
                          <Input placeholder="external" value={port.external} onChange={(e) => updatePortOfService(e, service.name, i, "external")} />
                          <Button onClick={() => removePortFromService(service.name, i)} variant={"default"} className="bg-red-400">
                            <AiOutlineMinus />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <div className="flex  items-center gap-4 mb-2">
                      <Label>Environment</Label>
                      <Button onClick={() => addEnvToService(service.name)} variant={"default"} className="bg-green-400">
                        <AiOutlinePlus />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {service.env.map((env, i) => (
                        <div key={`env-${env.id}-${service.id}`} className="flex gap-2">
                          <Input placeholder="Label" value={env.label} onChange={(e) => updateEnvOfService(e, service.name, i, "label")} />
                          <Input placeholder="Value" value={env.value} onChange={(e) => updateEnvOfService(e, service.name, i, "label")} />
                          <Button onClick={() => removeEnvFromService(service.name, i)} variant={"default"} className="bg-red-400">
                            <AiOutlineMinus />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <div className="flex  items-center gap-4 mb-2">
                      <Label>Label</Label>
                      <Button onClick={() => addLabelToService(service.name)} variant={"default"} className="bg-green-400">
                        <AiOutlinePlus />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {service.labels.map((label, i) => (
                        <div key={`label-${label.id}-${service.id}`} className="flex gap-2">
                          <Input placeholder="Label" value={label.label} onChange={(e) => updateLabelOfService(e, service.name, i, "label")} />
                          <Input placeholder="Value" value={label.value} onChange={(e) => updateLabelOfService(e, service.name, i, "label")} />
                          <Button onClick={() => removeLabelFromService(service.name, i)} variant={"default"} className="bg-red-400">
                            <AiOutlineMinus />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
        <Container>
          <Editor
            disabled
            value={yaml}
            setValue={() => {
              return;
            }}
            language="yaml"
          />
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default DockerCompose;
