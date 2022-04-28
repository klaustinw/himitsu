import { useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";

type Props = {
  value: string
};

const CopyButton = ({ value }: Props) => {
  const [tooltip, setTooltip] = useState(false);
  const target = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setTooltip(true);
    let timer = setTimeout(() => setTooltip(false), 1200);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline-light"
        id="button-addon2"
        className="border-start-0"
        onClick={handleCopy}
        ref={target}
      >
        <i className="bi bi-journals" />
      </Button>
      <Overlay target={target.current} show={tooltip} placement="right">
        {(props) => (
          <Tooltip {...props}>
            Copied!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default CopyButton;
