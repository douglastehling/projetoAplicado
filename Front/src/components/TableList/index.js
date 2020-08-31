import React from "react";

// import { Container } from './styles';
import { Button, Table } from "react-bootstrap";
import api from "~/services/api";
import { FiXCircle } from "react-icons/fi";

function TableList({ itens, removeBook }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        {itens.length === 0 ? (
          <tr>
            <td colSpan="6">Nenhum contato</td>
          </tr>
        ) : (
          itens.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.phone}</td>
              <td>{x.address}</td>
              <td>
                <Button onClick={() => removeBook(x.id)} variant="danger">
                  <FiXCircle />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default TableList;
