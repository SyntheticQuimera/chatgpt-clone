"use client";

import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "0.25rem",
      borderRadius: "0.375rem",
      backgroundColor: "#2021230",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#ececf1",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#343541" : "#2a2b32",
      cursor: "pointer",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#2a2b32",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#ececf1",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ececf1",
    }),
  };
  return (
    <div>
      <Select
        className='text-sm md:mt-2'
        isSearchable
        isLoading={isLoading}
        menuPosition='fixed'
        styles={customStyles}
        placeholder={model}
        defaultValue={model}
        options={models?.modelOptions}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
