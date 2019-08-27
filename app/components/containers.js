import styled from "styled-components";
import Theme from "../theme";

export const Container = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    width: ${({wide}) => wide ? "100%" : "initial"};
`;

export const Section = styled.div`
    border: ${props => `1px solid ${Theme.primary}33`};
    border-radius: ${props => Theme.baseRadius};
    width: 100%;
    max-width: 800px;
    padding: 1rem;
    color: ${props => Theme.primary};
`;

export const SectionTitle = styled.p`
    margin: 0;
`; 