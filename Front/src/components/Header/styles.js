import styled from "styled-components";

export const Wrapper = styled.div`
  #menu {
    a {
      font-size: 15px;
      transition: all 0.4s ease;

      &:hover {
        font-size: 16px;
      }
    }
    a::after {
      content: "|";
      float: right;
      color: #bdbdbd;
      padding-left: 16px;
    }

    a:last-child::after {
      display: none;
    }
  }
`;
