import styled from "styled-components";

export const Wrapper = styled.div`
  .controls {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: space-around;
    margin: 0;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .btn-control {
      padding: 3px 20px;
      color: #fff;
      cursor: pointer;
      border-radius: 20px;
    }
    .available {
      background: #a09e9e;
    }
    .notAvailable {
      background: #e0dcdc;
      cursor: not-allowed;
    }
    .number-label {
      padding: 3px 20px;
      background: #f4f4f4;
    }
  }
`;

export const Checkout = styled.div.attrs((props) => ({
  hasProduct: props.hasProduct || false,
}))`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${({ hasProduct }) => (hasProduct ? "#16557f" : "#16557f6b")};
  border-radius: 50px;
  position: fixed;
  bottom: 2%;
  right: 1%;
  transition: all 0.2s ease-in-out;
  cursor: ${({ hasProduct }) => (hasProduct ? "pointer" : "normal")};

  &:hover {
    transform: scale(1.1);
  }
`;
