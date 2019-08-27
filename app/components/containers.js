import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    width: ${({wide}) => wide ? "100%" : "initial"};
`;