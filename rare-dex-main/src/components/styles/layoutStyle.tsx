import styled from "styled-components";

export const Styles = styled.div`
  height: 100%;
  .layout {
    height: 100%;
    background-color: #131a35;
    .main {
      height: calc(100% - 76px);
      display: flex;
      .board {
        width: calc(100% - 224px);
        background-color: #0d0928;
        border-top-left-radius: 20px;
      }
    }
  }
`;
