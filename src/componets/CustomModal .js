import React, { useRef } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import PrintButton from './ejemplos/PrintButton ';
import logo from '../assets/img/fubode-768x450.webp';
const CustomModal = ({ show, onHide, fecha, soli, formatFechaHora }) => {
  const contentRef = useRef(null);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>VISTA PREVIA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="d-flex justify-content-center">
          <Row>
            <Col xs={12} className="d-print-flex d-print-flex-column">
              <div
                className="print-content"
                ref={contentRef}
                style={{ Width: "21.6cm", width: "100%", height: "27.94 cm" }}
              >
                <div className='container-fluid m-4'>
                  <div className="container">
                    <div className="row">
                      <div className="col-8">
                        <h4>ENTIDAD: FUBODE IFD</h4>
                        <h5>SISTEMA DE AUTORIZACION ESPECIAL</h5>
                        <p><strong>FECHA Y HORA: </strong>{' ' + fecha}</p>
                        <p><strong>ESTADO DE LA SOLICITUD: </strong>{soli.estado == 'ACEPTADO' ? (' AUTORIZADO') : (' ' + soli.estado)}</p>
                      </div>
                      <div className="col-2">
                        <img src={logo} alt="Navbar Logo" style={{ width: '150px' }} />
                      </div>
                    </div>
                  </div>
                  <div className='m-3'>
                    <br />
                    <h5>DATOS DE LA SOLICITUD</h5>
                    <div className='border pr-4'>
                      <p className='m-3'> <strong>CODIGO: </strong>{soli.codigo_solicitud}</p>
                      <p className='m-3'><strong>FECHA DE CONSULTA: </strong>{formatFechaHora(soli.created_at)}</p>
                      <p className='m-3'><strong>FECHA DE RESPUESTA: </strong>{formatFechaHora(soli.fecha_modificacion)}</p>
                      <p className='m-3'><strong>NOMBRE COMPLETO: </strong>{soli.nombre_completo_uif}</p>
                      <p className='m-3'><strong>NRO DE CI: </strong>{soli.numero_doc}</p>
                      <p className='m-3'><strong>PRODUCTO: </strong>{soli.producto}</p>
                      <p className='m-3'><strong>CAEDEC: </strong>{soli.cod_caedec + " - " + soli.caedec}</p>
                      <p className='m-3'><strong>USUARIO: </strong>{soli.nombre_completo}</p>
                    </div>
                  </div>
                  <br />
                  <h5>OBSERVACIONES POR LA UNIDAD DE CUMPLIMIENTO</h5>
                  <div className='border'>
                    <p>{soli.descripcion}</p>
                  </div>
                  {
                    soli.correo_final !== 'unidad_cumplimiento@fubode.org' ? (
                      <>
                        <br />
                        <h5>OBSERVACIONES REALIZADAS POR ALTA GERENCIA</h5>
                        <div className='border'>
                        <p>{soli.detalle_gerencia}</p>
                        </div>
                      </>
                    ) : (
                      <>
                      </>
                    )
                  }
                  <br />
                  <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="d-flex justify-content-center bottom-div">
                      <p><strong>FIRMA Y SELLO DEL RESPONSABLE</strong></p>
                    </div>

                  </div>
                </div>
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
