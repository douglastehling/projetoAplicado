import styled from "styled-components";
import "react-credit-cards/es/styles-compiled.css";

export const Wrapper = styled.div`
  input {
    ::placeholder {
      color: #ccc;
    }
  }
  .btn-check {
    background: #bee087;
    padding: 6px 7px;
    margin: 0 0.4rem;
    font-size: 1.3rem;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }

  .endereco {
  }

  .checkout {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-end;
  }

  .resumo {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    .total {
      margin: 20px 0px;
      font-size: 1.6rem;
    }
  }

  .cupom-desconto {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    .desc {
      font-size: 16px;
    }
    .input-check {
      background: #b2aeae;
      padding: 10px;
      border: none;
      color: #fff;
      text-transform: uppercase;

      ::placeholder {
        color: #ffffff9e;
      }
    }
  }

  .item {
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-bottom: 0.4em;

    .description {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-self: center;
      margin-left: 1rem;

      #title {
        font-size: 1.2rem;
        margin: 0;
      }
      #price {
        font-size: 1rem;
        color: #7fc254;
      }
    }
    .controls {
      display: flex;
      flex-direction: row;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      margin: 0;
      .btn-control {
        background: #c4c4c4;
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
  }

  @media screen and (max-width: 500px) {
    .rccs {
      zoom: 0.7;
    }
  }
  .success-checkmark {
    width: 80px;
    height: 115px;
    margin: 0 auto;
    .check-icon {
      width: 80px;
      height: 80px;
      position: relative;
      border-radius: 50%;
      box-sizing: content-box;
      border: 4px solid #4caf50;
      &::before {
        top: 3px;
        left: -2px;
        width: 30px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
      }
      &::after {
        top: 0;
        left: 30px;
        width: 60px;
        transform-origin: 0 50%;
        border-radius: 0 100px 100px 0;
        animation: rotate-circle 4.25s ease-in;
      }
      &::before,
      &::after {
        content: "";
        height: 100px;
        position: absolute;
        background: #ffffff;
        transform: rotate(-45deg);
      }
      .icon-line {
        height: 5px;
        background-color: #4caf50;
        display: block;
        border-radius: 2px;
        position: absolute;
        z-index: 10;
        &.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }
        &.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }
      }
      .icon-circle {
        top: -4px;
        left: -4px;
        z-index: 10;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        box-sizing: content-box;
        border: 4px solid rgba(76, 175, 80, 0.5);
      }
      .icon-fix {
        top: 8px;
        width: 5px;
        left: 26px;
        z-index: 1;
        height: 85px;
        position: absolute;
        transform: rotate(-45deg);
        background-color: #ffffff;
      }
    }
  }
  @keyframes rotate-circle {
    0% {
      transform: rotate(-45deg);
    }
    5% {
      transform: rotate(-45deg);
    }
    12% {
      transform: rotate(-405deg);
    }
    100% {
      transform: rotate(-405deg);
    }
  }
  @keyframes icon-line-tip {
    0% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 45px;
    }
  }
  @keyframes icon-line-long {
    0% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0px;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }
`;
