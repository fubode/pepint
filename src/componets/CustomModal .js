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
                style={{ width: "21.6cm", height: "27.94cm" }}
              >
                <div className='container-fluid m-4'>
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <p className='m-0 leelawadee-font'><strong>FECHA Y HORA: </strong></p>
                        <p className='m-0 leelawadee-font'>{fecha}</p>
                        <p className='m-0 leelawadee-font'><strong>ESTADO: </strong></p>
                        <p className='m-0 leelawadee-font'>{soli.estado == 'ACEPTADO' ? (' AUTORIZADO') : (' ' + soli.estado)}</p>
                      </div>
                      <div className="col-8 text-center">
                        <h5>SISTEMA DE</h5>
                        <h5>AUTORIZACION ESPECIAL</h5>
                      </div>

                      <div className="col-2">
                        <img src={logo} alt="Navbar Logo" style={{ width: '100px' }} />
                      </div>
                    </div>
                  </div>
                  <div className='m-3'>
                    <h5 className="leelawadee-font"><strong>DATOS DE LA SOLICITUD</strong></h5>
                    <div className='border pr-4' style={{ padding: '4px', margin: '0', width: '100%' }}>
                      <p className='m-0 leelawadee-font'><strong>CODIGO: </strong>{soli.codigo_solicitud}</p>
                      <p className='m-0 leelawadee-font'><strong>FECHA DE CONSULTA: </strong>{formatFechaHora(soli.created_at)}</p>
                      <p className='m-0 leelawadee-font'><strong>FECHA DE RESPUESTA: </strong>{formatFechaHora(soli.fecha_modificacion)}</p>
                      <p className='m-0 leelawadee-font'><strong>NOMBRE COMPLETO: </strong>{soli.nombre_completo_uif}</p>
                      <p className='m-0 leelawadee-font'><strong>NRO DE CI: </strong>{soli.numero_doc}</p>
                      <p className='m-0 leelawadee-font'><strong>PRODUCTO: </strong>{soli.producto}</p>
                      <p className='m-0 leelawadee-font'><strong>CAEDEC: </strong>{soli.cod_caedec + " - " + soli.caedec}</p>
                      <p className='m-0 leelawadee-font'><strong>USUARIO: </strong>{soli.nombre_completo}</p>
                    </div>
                  </div>

                  <div className='m-3'>
                    <h5 className="leelawadee-font"><strong>OBSERVACIONES POR LA UNIDAD DE CUMPLIMIENTO</strong></h5>
                    <div className='border pr-4' style={{ padding: '4px', margin: '0', width: '100%' }}>
                      <p className="leelawadee-font" style={{ margin: 0, padding: '4px' }}>{soli.descripcion}</p>
                    </div>
                  </div>

                  {
                    soli.correo_final !== 'unidad_cumplimiento@fubode.org' ? (
                      <>
                        <div className='m-3'>
                        <h5 className="leelawadee-font"><strong>OBSERVACIONES REALIZADAS POR ALTA GERENCIA</strong></h5>
                          <div className='border pr-4' style={{ padding: '4px', margin: '0', width: '100%' }}>
                            <p className="leelawadee-font" style={{ margin: 0, padding: '4px' }}>{soli.detalle_gerencia}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                      </>
                    )
                  }
                  <div className="d-flex justify-content-center bottom-div">
                    <p className="leelawadee-font mt-5"><strong>FIRMA Y SELLO DEL RESPONSABLE</strong></p>
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
