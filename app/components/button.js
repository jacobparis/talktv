import styled from 'styled-components';
import Theme from '../theme';

export const Button = styled.button`
    border: ${props => props.inverted ? `1px solid ${Theme.primary}33` : "none"};
    border-radius: ${props => Theme.baseRadius};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    display: ${props => (props.wide ? "block" : "inline-block")};
    font-size: ${props => {
        const { baseFontSize } = Theme;
        const baseFontSizeParsed = parseInt(baseFontSize, 10);
        return (
            (props.small && `${baseFontSizeParsed * 0.875}px`) ||
            (props.large && `${baseFontSizeParsed * 1.375}px`) ||
            baseFontSize
        );
    }};
    font-weight: ${props => Theme.fontSemibold};
    line-height: ${props => (props.small && "1.5") || (props.large && "2.5") || "2"};
    padding: ${props => props.large ? "16px 25px 17px" : "0 1rem"};
    margin: 0.5rem 0;
    position: relative;
    text-align: center;
    color: ${props =>
        (props.inverted && Theme.primary) ||
        (props.link && Theme.baseFontColor) ||
        (props.primary && "#fff") ||
        "#333"};
    background-color: ${props =>
        (props.primary && Theme.primary) ||
        (props.danger && Theme.danger) ||
        ((props.inverted || props.link) && "#fff") ||
        (props.disabled && Theme.brandGrey)};
    width: 100%;
    &:hover {
        ${props => props.link && "text-decoration: underline;"}
        border: ${props => props.inverted ? `1px solid ${Theme.primary}CC` : "none"};
    }
`;