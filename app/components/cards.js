import styled from "styled-components";

export const Card = styled.div`
    color: #333;
    background-color: #fff;
    padding: 1.5rem;
    width: ${props => props.narrow ? "300px" : "800px"}
    max-width: 90%;
    text-align: center;
`;

export const Divider = styled.hr`
  width: 50%;
  opacity: 0.2;
  margin-bottom: 2rem;
  margin-top: 0;
`;

export const Icon = styled.p`
    font-size: 10rem;
    margin: 0;
    user-select: none;
`;
