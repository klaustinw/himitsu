import { Form } from "react-bootstrap";
import { createEncryptionMethodKeys, EncryptionMethod } from "../../utils/types";
import { capitalCase } from "change-case";
import { useContext } from "react";
import AppContext from "../../utils/app_state_context";
import { local_storage } from "../../utils/functions";
import SettingsContext from "./context";

const DefaultEncryptionOptions = () => {
  const { appSettings } = useContext(AppContext);
  const setAppSettings = useContext(SettingsContext);
  const setDefaultEncryption = (method: EncryptionMethod) => {
    setAppSettings(prev => {
      let settings = {
        ...prev,
        encryption: method,
      };

      local_storage.set("settings", settings);
      return settings;
    });
  };

  return (
    <>
      {
        createEncryptionMethodKeys(
          "BackendEncryption",
          "FrontendEncryption",
          "NoEncryption"
        ).map(method => {
          return (
            <Form.Check
              type="radio"
              name="encryption"
              key={method}
              id={method}
              checked={appSettings.encryption === EncryptionMethod[method]}
              label={capitalCase(method)}
              onChange={_ => setDefaultEncryption(EncryptionMethod[method])}
            />
          );
        })
      }
    </>
  );

};

export default DefaultEncryptionOptions;
