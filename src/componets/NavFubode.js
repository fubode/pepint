import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import { FaUser } from "react-icons/fa";
import logo from "../assets/img/fubode-768x450.webp";
import { useSolicitud } from "../context/SolicitudContext";
import { useState } from "react";
import Password from "./Password";

function NavFubode() {
  const expand = false;

  const { funcionario, salir } = useSolicitud();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <div className="container-fluid d-flex">
            <div>
              <Navbar.Brand href="#">
                <img src={logo} alt="Navbar Logo" style={{ width: "100px" }} />
              </Navbar.Brand>
            </div>
            <div className="flex-grow-1 text-center">
              <h5 className="m-0">
                SISTEMA DE AUTORIZACION ESPECIAL
              </h5>
            </div>
            {Object.keys(funcionario).length > 0 && (
              <div className="ms-auto">
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                >
                  <FaUser size={20} />
                </Navbar.Toggle>
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Usuario
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Card className="text-center">
                        <Card.Body>
                          <Card.Title>{funcionario.nombre_asesor}</Card.Title>
                          <Card.Text>{funcionario.correo}</Card.Text>
                          <Card.Text>{funcionario.nombre_cargo}</Card.Text>
                          <Card.Text>{funcionario.nombre_agencia}</Card.Text>
                        </Card.Body>
                      </Card>

                      {/*!show ? (
                        <>
                          <Button
                            onClick={setShow(!show)}
                            variant="primary"
                            className="mt-3"
                          >
                            CAMBIAR CONTRASEÑA
                          </Button>
                        </>
                      ) : (
                        <>
                          {
                            <Password />
                          }
                        </>
                        )*/}
                      <Button
                        onClick={salir}
                        variant="primary"
                        className="mt-3"
                      >
                        Salir
                      </Button>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
      <hr className="my-4" />
    </>
  );
}

export default NavFubode;
