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
      margin-top: 5px;
      margin-bottom: 5px;
      max-width: 100% !important;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media only screen and (max-width: 414px) {
    margin-left: 10px;

    & img {
      margin-top: 5px;
      margin-bottom: 5px;
      width: 100%;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-left: 10px;

    & img {
      margin-top: 5px;
      margin-bottom: 5px;
      max-width: 550px;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-left: 10px;

    & img {
      margin-top: 5px;
      margin-bottom: 5px;
      max-width: 550px;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media only screen and (max-width: 1024px) {
    margin-left: 10px;

    & img {
      margin-top: 5px;
      margin-bottom: 5px;
      max-width: 100%;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
