import React from 'react';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const PrintButton = ({ contentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return <Button onClick={handlePrint}>Imprimir</Button>;
};

export default PrintButton;
