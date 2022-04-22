import Swal from "sweetalert2/dist/sweetalert2.js";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import styled from "styled-components";

const Button = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  border: 0;
  font-weight: 400;
  & > p {
    margin-left: 10px;
  }
  background-color: ${(props) => {
    switch (props.theme) {
      case "red":
        return "var(--red);";
      default:
        return `var(--violet-1);`;
    }
  }};
`;

const FloatingButton = styled(Button)`
  font-size: 18px;
  border-radius: 50%;
  position: fixed;
  z-index: 15;
  box-shadow: 0px 0px 12px 2px rgb(0, 0, 0, 30%);

  ${(props) => {
    switch (props.theme) {
      case "add":
        return `width: 50px;
      height: 50px;
      right: 3.5%;
      bottom: 3.5%;
      background-color: var(--pink);

      @media (min-width: 1024px) {
        width: 55px;
        height: 55px;
        font-size: 25px;
      }`;

      case "signOut":
        return `width: 50px;
      height: 50px;
      right: 3.5%;
      bottom: 12%;
      background-color: var(--white-2);
      color: var(--black-2);
      
      @media (min-width: 1024px) {
        width: 55px;
        height: 55px;
        font-size: 25px;
        bottom: 11%;
      }`;
      default:
        return;
    }
  }}
`;

const NormalButton = styled.button`
  width: 100px;
  height: 40px;
  cursor: pointer;
  color: var(--white-2);
  font-family: var(--paragraph-font);
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  border: none;

  background-color: ${(props) => {
    switch (props.theme) {
      case "red":
        return "var(--red);";
      default:
        return `var(--violet-1);`;
    }
  }};
`;

const fontAwesomeIcons = {
  edit: "fa-solid fa-pen-to-square",
  delete: "fa-solid fa-trash",
  add: "fa-solid fa-plus",
  save: "fa-solid fa-floppy-disk",
  cancel: "fa-solid fa-ban",
};

export const DeleteButton = (props) => {
  const { uid, setEditable } = props;

  const context = useContext(AppContext);
  const { refetchBudget, refetchOperations } = context;

  const handleDelete = () => {
    Swal.fire({
      title: "¿Deseas eliminar este registro?",
      icon: "warning",
      background: "var(--dark-gray)",
      color: "var(--white-2)",
      showCancelButton: true,
      confirmButtonColor: "var(--green)",
      iconColor: "var(--red)",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: "http://localhost:3001/api/operations",
          data: {
            operation_uid: uid,
          },
          headers: {
            "x-api-key": window.localStorage.getItem("token"),
          },
        })
          .then((res) => {
            setEditable(false);
            if (res.statusCode !== 200) {
              refetchOperations();
              refetchBudget();
            }
            Swal.fire(
              "Registro eliminado",
              "El registro se elimino correctamente.",
              "success"
            );
          })
          .catch((err) => {
            Swal.fire(
              "OOPS! :(",
              "Ocurrió un error inesperado, intentalo más tarde.",
              "error"
            );
            console.log(err.response);
          });
      }
    });
  };

  return (
    <Button onClick={handleDelete} theme="red" type="button">
      <i className={fontAwesomeIcons.delete}></i>
      <p>Borrar</p>
    </Button>
  );
};

export const EditButton = (props) => {
  const { setEditable } = props;

  return (
    <Button onClick={() => setEditable(true)} type="button">
      <i className={fontAwesomeIcons.edit}></i>
      <p>Editar</p>
    </Button>
  );
};

export const SaveButton = () => {
  return <NormalButton type="submit">Guardar</NormalButton>;
};

export const AddButton = (props) => {
  const { setFormVisible } = props;

  return (
    <FloatingButton
      onClick={() => setFormVisible(true)}
      type="button"
      theme="add"
    >
      <i className="fa-solid fa-plus"></i>
    </FloatingButton>
  );
};

export const SignOut = (props) => {
  const context = useContext(AppContext);
  const { removeToken } = context;
  const handleSignOut = () => {
    Swal.fire({
      title: "Estás a punto de cerrar sesión",
      text: "¿Estás seguro/a?",
      icon: "warning",
      background: "var(--dark-gray)",
      color: "var(--white-2)",
      showCancelButton: true,
      confirmButtonColor: "var(--green)",
      iconColor: "var(--red)",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeToken("token");
      }
    });
  };

  return (
    <FloatingButton type="button" theme="signOut" onClick={handleSignOut}>
      <i className="fa-solid fa-right-from-bracket"></i>
    </FloatingButton>
  );
};

export const CancelButton = (props) => {
  const { setVisible } = props;

  const handleClick = () => {
    Swal.fire({
      title: "¿Deseas cancelar la edición?",
      icon: "question",
      showCancelButton: true,
      background: "var(--dark-gray)",
      color: "var(--white-2)",
      confirmButtonColor: "var(--green)",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setVisible(false);
      }
    });
  };

  return (
    <NormalButton onClick={() => handleClick()} theme="red" type="button">
      Cancelar
    </NormalButton>
  );
};
