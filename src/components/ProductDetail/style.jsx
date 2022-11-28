import styled from "styled-components";

export const productItem = styled.div`
  margin-left: 50px;

  & img {
    max-width: 600px;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  margin-right: 50px;
  @media only screen and (max-width: 375px) {
    margin-left: 10px;

    & img {
      max-width: 250px;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
