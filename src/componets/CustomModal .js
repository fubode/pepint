import React, { useRef } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import PrintButton from './ejemplos/PrintButton ';

const CustomModal = ({ show, onHide }) => {
  const contentRef = useRef(null);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal Tamaño Carta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="d-flex justify-content-center">
          <Row>
            <Col xs={12} className="d-print-flex d-print-flex-column">
              <div
                className="print-content"
                ref={contentRef}
                style={{ maxWidth: "21.6cm", width: "100%", overflow: "auto" }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et nunc in lorem auctor dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla eget neque a elit efficitur posuere id ut turpis. Nulla tristique odio eget nibh interdum, ac gravida nisl semper. Aliquam aliquet nulla justo, id pretium tortor rutrum non. Suspendisse vitae congue magna. Vestibulum varius, purus vitae aliquam tincidunt, turpis elit convallis lectus, in sagittis sapien quam sed sem. Nullam eget mi sit amet enim tempus egestas. Sed ac urna ut odio consequat dignissim. Morbi malesuada est sed risus aliquet finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut iaculis nisi sed sagittis tincidunt. Sed auctor dui ac purus consectetur semper. Cras non odio non tellus commodo tempor ac in purus. Donec non fringilla urna.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <PrintButton contentRef={contentRef} />
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
