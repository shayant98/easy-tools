/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type DockerService, type GetStringKeys } from "types/docker-service";
import { type ChangeEvent, createContext, type ReactNode, useContext, useEffect, useState } from "react";
import json2yaml from "json-to-pretty-yaml";

export type dockerComposeContextType = {
  services: DockerService[];
  yaml: string;
  generateDockerComposeFromServices: () => void;
  parseDockerCommand: (cmd: string) => void;
  downloadYaml: () => void;
  addService: ({
    name,
    image,
    container_name,
    ports,
    volumes,
    env,
    labels,
  }: {
    name?: string;
    image?: string;
    container_name?: string;
    ports?: { id: string; external: string; internal: string }[];
    volumes?: { id: string; external: string; internal: string }[];
    env?: { id: string; label: string; value: string }[];
    labels?: { id: string; label: string; value: string }[];
  }) => void;
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
  parseDockerCommand: () => {
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
  const [services, setServices] = useState<DockerService[]>([]);
  const [yaml, setYaml] = useState("");

  const parseDockerCommand = (cmd: string) => {
    //Sanitize the input
    cmd = cmd.trim();

    const isValidDockerCommand = cmd.startsWith("docker run");

    if (!isValidDockerCommand) {
      return;
    }

    const name = getNameFromCommand(cmd);
    const env = getValueFromCommand(cmd, {
      prefixes: ["-e", "--env"],
      seperator: "=",
    });
    const labels = getValueFromCommand(cmd, {
      prefixes: ["-l", "--label"],
      seperator: "=",
    });
    const ports = getValueFromCommand(cmd, {
      prefixes: ["-p", "--port"],
    });
    const volumes = getValueFromCommand(cmd, {
      prefixes: ["-v", "--volume"],
    });

    if (name === "" || name === undefined) {
      return;
    }

    const image = getContainerImageFromCommand(cmd);

    const restart = getConfigFromCommand(cmd, {
      prefixes: ["--restart"],
    });

    const network = getConfigFromCommand(cmd, {
      prefixes: ["--net"],
    });

    const object: Record<
      string,
      {
        image: string;
        container_name: string;
        ports?: string[];
        volumes?: string[];
        environment?: string[];
        labels?: string[];
        restart?: string;
        network_mode?: string;
      }
    > = {
      [name]: {
        image,
        container_name: name,
        // ports: ports.map((port) => `${port.label}:${port.value}`),
        // volumes: volumes.map((volume) => `${volume.label}:${volume.value}`),
        // environment: env.map((env) => `${env.label}=${env.value}`),
        // labels: labels.map((label) => `${label.label}=${label.value}`),
      },
    };

    const service = object[name];

    if (service === undefined) {
      return;
    }

    if (ports.length > 0) {
      service.ports = ports.map((port) => `${port.label}:${port.value}`);
    }

    if (volumes.length > 0) {
      service.volumes = volumes.map((volume) => `${volume.label}:${volume.value}`);
    }

    if (env.length > 0) {
      service.environment = env.map((env) => `${env.label}=${env.value}`);
    }

    if (labels.length > 0) {
      service.labels = labels.map((label) => {
        console.log(label);

        if (label.label === "" || label.value === "") {
          return "ddd";
        }
        return `${label.label}=${label.value}`;
      });
    }

    if (restart !== "") {
      service.restart = restart;
    }

    if (network !== "") {
      service.network_mode = network?.split("=")[1];
    }

    console.log(service);

    const yaml = json2yaml.stringify(service) as string;

    setYaml(yaml);
  };

  const getNameFromCommand = (cmd: string) => {
    const namePrefixes = ["--name", "-n"];

    const contains = namePrefixes.some((prefix) => cmd.includes(prefix));

    if (!contains) {
      return "";
    }

    const nameFlag = namePrefixes.find((prefix) => cmd.includes(prefix));

    if (nameFlag === undefined) {
      return "";
    }

    const everythingAfterNameFlag = cmd.split(`${nameFlag}=`)[1];

    if (everythingAfterNameFlag === undefined) {
      return "";
    }

    const name = everythingAfterNameFlag.split(" ")[0];

    return name;
  };

  const getContainerImageFromCommand = (cmd: string) => {
    const split = cmd.split(" ");
    const last = split[split.length - 1];

    if (last === undefined) {
      return "";
    }

    const containsSlash = last.includes("/");

    if (containsSlash) {
      return last;
    }
    return "";
  };

  const getConfigFromCommand = (
    cmd: string,
    {
      prefixes,
    }: {
      prefixes: string[];
    }
  ) => {
    const contains = prefixes.some((prefix) => cmd.includes(prefix));

    if (!contains) {
      return "";
    }

    const prefixFlag = prefixes.find((prefix) => cmd.includes(prefix));

    if (prefixFlag === undefined) {
      return "";
    }

    const everythingAfterFlag = cmd.split(`${prefixFlag}`)[1];

    if (everythingAfterFlag === undefined) {
      return "";
    }

    const config = everythingAfterFlag.trim().split(" ")[0];

    return config;
  };

  const getValueFromCommand = (
    cmd: string,
    {
      prefixes,
      seperator = ":",
    }: {
      prefixes: string[];
      seperator?: string;
    }
  ): {
    id: string;
    label: string;
    value: string;
  }[] => {
    const contains = prefixes.some((prefix) => cmd.includes(prefix));

    if (!contains) {
      return [];
    }

    const envFlag = prefixes.find((prefix) => cmd.includes(prefix));

    if (envFlag === undefined) {
      return [];
    }

    const commandSplitOnFlag = cmd.split(`${envFlag}`);

    if (commandSplitOnFlag === undefined) {
      return [];
    }

    //Remove everything before the first env flag
    commandSplitOnFlag.shift();

    const parsedValues = commandSplitOnFlag.map((env, i) => {
      env = env.trim();

      const label = env.split(seperator)[0];
      const value = env.split(seperator)[1]?.split(" ")[0];

      if (label === undefined || value === undefined) {
        return { id: "", label: "", value: "" };
      }

      return { id: i.toString(), label, value };
    });

    return parsedValues;
  };

  const generateDockerComposeFromServices = () => {
    const serviceJson = services.map((service) => {
      const { name } = service;

      const mainObject: Record<
        string,
        {
          image: string;
          user: string;
          container_name: string;
          ports?: string[];
          volumes?: string[];
          environment?: string[];
          labels?: string[];
        }
      > = {
        [name]: {
          image: service.image,
          user: "1000",
          // working_dir: null,
          container_name: service.container_name,
          ports: service.ports.filter((port) => port.external != "" || port.internal != "").map((port) => `${port.external}:${port.internal}`),
          volumes: service.volumes.filter((port) => port.external != "" || port.internal != "").map((volume) => `${volume.external}:${volume.internal}`),
          environment: service.env.filter((port) => port.label != "" || port.value != "").map((env) => `${env.label}=${env.value}`),
          labels: service.labels.filter((port) => port.label != "" || port.value != "").map((label) => `${label.label}=${label.value}`),
        },
      };

      const serviceObject = mainObject[name];

      //Should not happen, if it did. i doe wan koulo san verkeerd
      if (serviceObject === undefined) {
        return {};
      }

      if (serviceObject.ports != undefined && serviceObject.ports.length === 0) {
        delete serviceObject.ports;
      }

      if (serviceObject.volumes != undefined && serviceObject.volumes.length === 0) {
        delete serviceObject.volumes;
      }

      if (serviceObject.environment != undefined && serviceObject.environment.length === 0) {
        delete serviceObject.environment;
      }

      if (serviceObject.labels != undefined && serviceObject.labels.length === 0) {
        delete serviceObject.labels;
      }

      return mainObject;
    });

    const allServices = Object.assign({}, ...serviceJson) as Record<string, unknown>;

    const yaml = json2yaml.stringify(allServices) as string;

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

  const addService = ({
    name,
    image = "nginx",
    container_name = "demo",
    ports = [{ id: "0", external: "", internal: "" }],
    volumes = [{ id: "0", external: "", internal: "" }],
    env = [{ id: "0", label: "", value: "" }],
    labels = [{ id: "0", label: "", value: "" }],
  }: {
    name?: string;
    image?: string;
    container_name?: string;
    ports?: { id: string; external: string; internal: string }[];
    volumes?: { id: string; external: string; internal: string }[];
    env?: { id: string; label: string; value: string }[];
    labels?: { id: string; label: string; value: string }[];
  }) => {
    console.log(name);

    const newService = {
      id: services.length.toString(),
      name: name ?? `service-${services.length}`,
      image: image,
      container_name: container_name,
      ports: ports,
      volumes: volumes,
      env: env,
      labels: labels,
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
        parseDockerCommand,
      }}
    >
      {children}
    </dockerComposeContext.Provider>
  );
};

export { useDockerCompose, DockerComposeContextProvider };
