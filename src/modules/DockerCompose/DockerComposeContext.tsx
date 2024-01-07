import { DockerServices, GetStringKeys } from "models/DockerService";
import { ChangeEvent, createContext, ReactNode, useContext, useEffect, useState } from "react";
import json2yaml from "json-to-pretty-yaml";

export type dockerComposeContextType = {
  services: DockerServices[];
  yaml: string;
  generateDockerComposeFromServices: () => void;
  downloadYaml: () => void;
  addService: () => void;
  removeService: (name: string) => void;
  getValueOfService: (name: string, key: GetStringKeys) => string;
  handleNameOfServiceChange: (e: ChangeEvent<HTMLInputElement>, name: string, key: GetStringKeys) => void;
  updateEnvOfService: (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "label" | "value") => void;
  addEnvToService: (name: string) => void;
  removeEnvFromService: (name: string, i: number) => void;
  updateLabelOfService: (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "label" | "value") => void;
  addLabelToService: (name: string) => void;
  removeLabelFromService: (name: string, i: number) => void;
  updatePortOfService: (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "external" | "internal") => void;
  addPortToService: (name: string) => void;
  removePortFromService: (name: string, i: number) => void;
  updateVolumeOfService: (e: ChangeEvent<HTMLInputElement>, name: string, i: number, k: "external" | "internal") => void;
  addVolumeToService: (name: string) => void;
  removeVolumeFromService: (name: string, i: number) => void;
};

const dockerComposeContext = createContext<dockerComposeContextType>({
  services: [],
  yaml: "",
  generateDockerComposeFromServices: () => {
    return;
  },
  downloadYaml: () => {
    return;
  },
  addService: () => {
    return;
  },
  removeService: () => {
    return;
  },
  getValueOfService: () => "",
  handleNameOfServiceChange: () => {
    return;
  },
  updateEnvOfService: () => {
    return;
  },
  addEnvToService: () => {
    return;
  },
  removeEnvFromService: () => {
    return;
  },
  updateLabelOfService: () => {
    return;
  },
  addLabelToService: () => {
    return;
  },
  removeLabelFromService: () => {
    return;
  },
  updatePortOfService: () => {
    return;
  },
  addPortToService: () => {
    return;
  },
  removePortFromService: () => {
    return;
  },
  updateVolumeOfService: () => {
    return;
  },
  addVolumeToService: () => {
    return;
  },
  removeVolumeFromService: () => {
    return;
  },
});

const useDockerCompose = () => {
  if (!dockerComposeContext) {
    throw new Error("useDockerComposeContext must be used within a DockerComposeContextProvider");
  }

  return useContext(dockerComposeContext);
};

const DockerComposeContextProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<DockerServices[]>([]);
  const [yaml, setYaml] = useState("");

  const generateDockerComposeFromServices = () => {
    const serviceJson = services.map((service) => {
      const { name } = service;

      const mainObject = {
        [name]: {
          image: service.image,

          user: "1000",
          // working_dir: null,
          container_name: service.container_name,
          ports: service.ports.map((port) => `${port.external}:${port.internal}`),
          volumes: service.volumes.map((volume) => `${volume.external}:${volume.internal}`),
          environment: service.env.map((env) => `${env.label}=${env.value}`),
          labels: service.labels.map((label) => `${label.label}=${label.value}`),
        },
      };

      return mainObject;
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

  return (
    <dockerComposeContext.Provider
      value={{
        services,
        yaml,
        downloadYaml,
        addService,
        removeService,
        handleNameOfServiceChange,
        updateEnvOfService,
        addEnvToService,
        removeEnvFromService,
        updateLabelOfService,
        addLabelToService,
        removeLabelFromService,
        updatePortOfService,
        addPortToService,
        removePortFromService,
        updateVolumeOfService,
        addVolumeToService,
        removeVolumeFromService,
        getValueOfService,
        generateDockerComposeFromServices,
      }}
    >
      {children}
    </dockerComposeContext.Provider>
  );
};

export { useDockerCompose, DockerComposeContextProvider };
