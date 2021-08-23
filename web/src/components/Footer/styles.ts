import styled from 'styled-components';

export const FooterClass = styled.div`
    .FooterClass{
        padding: 15px;
        background-color: rgba(56, 159, 217, 0.9);
        width: 100%;
        position: fixed;
        bottom: 0;
        transition: filter 0.3s;
    }
    Button{
        float: right;
        margin: 0;
        top: 50%;
    }
    .accept{
        margin-right: 10px;
    }
    .CloseCookieAlert{
        color: white;
        background-color: Transparent;
        background-repeat:no-repeat;
        border: none;
        cursor: pointer;
        overflow: hidden;
        outline:none;
        font-size: 25px;
    }
    .ClosedCookieAlert{
        visibility: hidden;
    }
    p{
        font-size: medium;
    }
`;

export const TextClass = styled.div`
    color: white;
    font-size: 20px;
`;